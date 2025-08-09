import { Client } from 'pg';
import { db } from '@/lib/db';
import { phoneNumber } from '@/lib/schema';
import { integration } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const registerTelegramUser = async (userPhoneNumber:string, userId:string) => {

  console.log( {
    userPhoneNumber:`+${userPhoneNumber}`,
    userId
  })

  const phoneExist = await db.select().from(phoneNumber)      
      .where(
          eq(phoneNumber.phone_number, `+${userPhoneNumber}`)
      );


  if(phoneExist?.length) {
    await db.update(integration).set({ 
      telegram_userId: userId
    }).where(eq(integration.userId, phoneExist[0].userId));

    return '<b>Your phone number has been registered successfully.</b> You can now use our services.';

  } 

  return '<b>Action required:</b> Please share the phone number registered on your <b>CaseGo</b> profile.';

}

export const getTelegramUserDBCred = async (userId:string) => {

  const DBInfo = await db.select().from(integration)      
      .where(
          eq(integration.telegram_userId, userId)
      );

  if(DBInfo?.length) {
    return { 
      integrated: true,
      url: DBInfo[0].database_url,
      schema: DBInfo[0].db_schema,
      message: DBInfo[0].db_schema ? 'There is a issue with DB url you provided please make sure url is correct' : ''
    };
  } 

  return { 
    integrated: false,
    url: '',
    schema: '',
    message: "You Haven't Integrated DB Yet, Visit CaseGo App To Integrate." 
  };

}

export const executeQuery = async (connectionUrl: string, query: string) => {

  try {
    const client = new Client({
      connectionString: connectionUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result.rows;

  } catch(error) {

    console.log(error)

  }

}