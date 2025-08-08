import { Client } from 'pg';


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