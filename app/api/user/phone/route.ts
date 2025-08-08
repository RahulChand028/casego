import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { phoneNumber } from '@/lib/schema';
import { eq, count, and } from 'drizzle-orm';
import { headers } from 'next/headers';

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
    const { phone_number: phoneNumberValue, country_code: countryCodeValue } = body;

    // Validate phone number
    if (!phoneNumberValue || typeof phoneNumberValue !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!countryCodeValue || typeof countryCodeValue !== 'string') {
      return NextResponse.json(
        { error: 'Country code is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if user already has 5 phone numbers
    const existingPhoneCount = await db
      .select({ count: count() })
      .from(phoneNumber)
      .where(eq(phoneNumber.userId, session.user.id));

    if (existingPhoneCount[0]?.count >= 5) {
      return NextResponse.json(
        { error: 'You have reached the maximum limit of 5 phone numbers. Please delete an existing number to add a new one.' },
        { status: 400 }
      );
    }

    // Check if phone number already exists for this user
    const existingPhone = await db
      .select()
      .from(phoneNumber)
      .where(
        and(
          eq(phoneNumber.country_code, countryCodeValue),
          eq(phoneNumber.phone_number, phoneNumberValue),
          eq(phoneNumber.userId, session.user.id)
        )
      );

    if (existingPhone.length > 0) {
      return NextResponse.json(
        { error: 'This phone number is already registered with your account' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the phone number
    const phoneId = `phone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert the new phone number
    const newPhoneNumber = await db
      .insert(phoneNumber)
      .values({
        id: phoneId,
        userId: session.user.id,
        country_code: countryCodeValue,
        phone_number: phoneNumberValue,
        valid: false, // Default to false, will be validated later
      })
      .returning();

    return NextResponse.json(
      {
        message: 'Phone number added successfully',
        phoneNumber: newPhoneNumber[0],
      },
      { status: 201 }
    );

  } catch (error) {
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

    // Get all phone numbers for the user
    const userPhoneNumbers = await db
      .select()
      .from(phoneNumber)
      .where(eq(phoneNumber.userId, session.user.id));

    return NextResponse.json(
      {
        phoneNumbers: userPhoneNumbers,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}