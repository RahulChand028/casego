import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { integration } from '@/lib/schema';
import { eq, count, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { fetchDatabaseSchema } from '@/lib/dbSchema';

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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

    // Check if user already has 5 integrations
    const existingIntegrationCount = await db
      .select({ count: count() })
      .from(integration)
      .where(eq(integration.userId, session.user.id));

    if (existingIntegrationCount[0]?.count >= 5) {
      return NextResponse.json(
        { error: 'You have reached the maximum limit of 5 integrations. Please delete an existing integration to add a new one.' },
        { status: 400 }
      );
    }

    // Check if integration already exists for this user with same URL
    const existingIntegration = await db
      .select()
      .from(integration)
      .where(
        and(
          eq(integration.database_url, database_url),
          eq(integration.userId, session.user.id)
        )
      );

    if (existingIntegration.length > 0) {
      return NextResponse.json(
        { error: 'This database URL is already registered with your account' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the integration
    const integrationId = `integration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    let dbSchema = null;
    let isValid = false;

    // Fetch database schema if it's a database integration
    if (type === 'database') {
      try {
        const schema = await fetchDatabaseSchema(database_url);
        dbSchema = JSON.stringify(schema);
        isValid = true;
        console.log(`Successfully fetched schema for ${schema.total_tables} tables`);
      } catch (error) {
        console.error('Failed to fetch database schema:', error);
        isValid = false;
      }
    } else {
      // For Shopify integrations, mark as valid
      isValid = true;
    }

    // Insert the new integration
    const newIntegration = await db
      .insert(integration)
      .values({
        id: integrationId,
        userId: session.user.id,
        type: type as 'database' | 'shopify',
        database_url: database_url,
        db_schema: dbSchema,
        valid: isValid,
      })
      .returning();

    return NextResponse.json(
      {
        message: 'Integration added successfully',
        integration: newIntegration[0],
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Integration creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all integrations for the user
    const userIntegrations = await db
      .select()
      .from(integration)
      .where(eq(integration.userId, session.user.id));

    return NextResponse.json(
      {
        integrations: userIntegrations.map((integration) => ({
          ...integration,
          db_schema: undefined,
          database_url: '',
        })),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Integration fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 