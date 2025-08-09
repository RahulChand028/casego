import { NextRequest, NextResponse } from 'next/server';
import { bot } from '@/common/telegramBot';
import { executeQuery, registerTelegramUser, getTelegramUserDBCred } from '@/app/api/bot/webhook/utils';


export async function POST(request: NextRequest) {
  try {

    const body = await request.json();

    console.log(
      "body",
      body
    );


     //const result = await executeQuery('','');



    // Handle the update
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      const contact = body.message.contact;
      const from = body.message.from;

      if(text) {

        const integrationInfo = await getTelegramUserDBCred(from.id);

        if(integrationInfo.integrated) {
          bot.sendMessage(chatId, integrationInfo.schema ? JSON.stringify( { schema: true } , null, 4) : integrationInfo.message);
        } else {
          bot.sendMessage(chatId, integrationInfo.message);
        }
        
      }

      if (contact && contact?.user_id == from.id) {
        const registeredMessage = await registerTelegramUser(contact.phone_number, from.id);
          bot.sendMessage(
            chatId,
            registeredMessage,
            { parse_mode: 'HTML' }
          );
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
