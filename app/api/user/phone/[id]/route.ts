import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { phoneNumber } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';



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

    const { id: phoneId } = await params;

    const existingPhone = await db
      .select()
      .from(phoneNumber)
      .where(
        and(
          eq(phoneNumber.id, phoneId),
          eq(phoneNumber.userId, session.user.id)
        )
      );

    if (existingPhone.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await db
      .delete(phoneNumber)
      .where(
        and(
          eq(phoneNumber.id, phoneId),
          eq(phoneNumber.userId, session.user.id)
        )
      );

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (err) {
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

    const { id: phoneId } = await params;

    if (!phoneId) {
      return NextResponse.json({ error: 'Phone ID is required' }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const { phone_number: phoneNumberValue, country_code: countryCodeValue } = body;


    // Check if phone number exists and belongs to the user
    const existingPhone = await db
      .select()
      .from(phoneNumber)
      .where(
        and(
          eq(phoneNumber.id, phoneId),
          eq(phoneNumber.userId, session.user.id)
        )
      );

    if (existingPhone.length === 0) {
      return NextResponse.json(
        { error: 'Phone number not found or does not belong to user' },
        { status: 404 }
      );
    }

    // Check for duplicate phone number (excluding the current phone ID)
    const duplicatePhone = await db
      .select()
      .from(phoneNumber)
      .where(
        and(
          eq(phoneNumber.country_code, countryCodeValue),
          eq(phoneNumber.phone_number, phoneNumberValue),
          eq(phoneNumber.userId, session.user.id),
        )
      );

    // Filter out the current phone ID in-memory
    // const filteredDuplicates = duplicatePhone.filter(phone => phone.id !== phoneId);

    if (duplicatePhone.length > 0) {
      return NextResponse.json(
        { error: 'Phone number already exists for this user' },
        { status: 400 }
      );
    }

    // Update the phone number
    await db
      .update(phoneNumber)
      .set({
        phone_number: phoneNumberValue,
        country_code: countryCodeValue,
        valid: false,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(phoneNumber.id, phoneId),
          eq(phoneNumber.userId, session.user.id)
        )
      );

    return NextResponse.json(
      {
        message: 'Phone number updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}