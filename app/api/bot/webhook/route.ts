import { NextRequest, NextResponse } from 'next/server';
import { bot } from '@/common/telegramBot'
import { executeQuery  } from '@/app/api/bot/webhook/utils'
export async function POST(request: NextRequest) {
  try {

    const body = await request.json();

    console.log(
      "body",
      body
    );

    // get userinfo
    // check user present
    // getInfosource
    // make a call

     const result = await executeQuery('');



    // Handle the update
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      if(text) {
        bot.sendMessage(chatId, JSON.stringify(result,null,4));
      }
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
