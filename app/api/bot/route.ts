import { NextRequest, NextResponse } from 'next/server';
import { bot } from '@/common/telegramBot'

export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);

    const webHookUrl = searchParams.get('webhook');

    await bot.setWebHook(webHookUrl);
   
    return NextResponse.json(
      {
        connected: true,
      },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}