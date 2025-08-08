import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { integration } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { fetchDatabaseSchema } from '@/lib/dbSchema';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: integrationId } = await params;

    const existingIntegration = await db
      .select()
      .from(integration)
      .where(
        and(
          eq(integration.id, integrationId),
          eq(integration.userId, session.user.id)
        )
      );

    if (existingIntegration.length === 0) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    await db
      .delete(integration)
      .where(
        and(
          eq(integration.id, integrationId),
          eq(integration.userId, session.user.id)
        )
      );

    return NextResponse.json({ message: 'Integration deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Integration deletion error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: integrationId } = await params;

    if (!integrationId) {
      return NextResponse.json({ error: 'Integration ID is required' }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const { type, database_url } = body;

    // Validate type
    if (!type || !['database', 'shopify'].includes(type)) {
      return NextResponse.json(
        { error: 'Type is required and must be either "database" or "shopify"' },
        { status: 400 }
      );
    }

    // Validate database URL
    if (!database_url || typeof database_url !== 'string') {
      return NextResponse.json(
        { error: 'Database URL is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate database URL format
    const urlPattern = /^(postgresql|mysql):\/\/.+/i;
    if (!urlPattern.test(database_url)) {
      return NextResponse.json(
        { error: 'Invalid database URL format. Must start with postgresql:// or mysql://' },
        { status: 400 }
      );
    }

    // Check if integration exists and belongs to the user
    const existingIntegration = await db
      .select()
      .from(integration)
      .where(
        and(
          eq(integration.id, integrationId),
          eq(integration.userId, session.user.id)
        )
      );

    if (existingIntegration.length === 0) {
      return NextResponse.json(
        { error: 'Integration not found or does not belong to user' },
        { status: 404 }
      );
    }

    // Check for duplicate database URL (excluding the current integration ID)
    const duplicateIntegration = await db
      .select()
      .from(integration)
      .where(
        and(
          eq(integration.database_url, database_url),
          eq(integration.userId, session.user.id)
        )
      );

    // Filter out the current integration ID
    const filteredDuplicates = duplicateIntegration.filter(integration => integration.id !== integrationId);

    if (filteredDuplicates.length > 0) {
      return NextResponse.json(
        { error: 'Integration with this database URL already exists for this user' },
        { status: 400 }
      );
    }

    let dbSchema = null;
    let isValid = false;

    // Fetch database schema if it's a database integration
    if (type === 'database') {
      try {
        const schema = await fetchDatabaseSchema(database_url);
        dbSchema = JSON.stringify(schema);
        isValid = true;
      } catch (error) {
        console.error('Failed to fetch database schema:', error);
        isValid = false;
      }
    } else {
      // For Shopify integrations, mark as valid
      isValid = true;
    }

    // Update the integration
    await db
      .update(integration)
      .set({
        type: type as 'database' | 'shopify',
        database_url: database_url,
        db_schema: dbSchema,
        valid: isValid,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(integration.id, integrationId),
          eq(integration.userId, session.user.id)
        )
      );

    return NextResponse.json(
      {
        message: 'Integration updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Integration update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 