import { Client } from 'pg';
import mysql from 'mysql2/promise';

interface TableSchema {
  table_name: string;
  columns: ColumnSchema[];
}

interface ColumnSchema {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default?: string;
  character_maximum_length?: number;
}

interface DatabaseSchema {
  tables: TableSchema[];
  total_tables: number;
  database_type: 'postgresql' | 'mysql';
}

export async function fetchDatabaseSchema(databaseUrl: string): Promise<DatabaseSchema> {
  try {
    if (databaseUrl.startsWith('postgresql://')) {
      return await fetchPostgreSQLSchema(databaseUrl);
    } else if (databaseUrl.startsWith('mysql://')) {
      return await fetchMySQLSchema(databaseUrl);
    } else {
      throw new Error('Unsupported database type. Only PostgreSQL and MySQL are supported.');
    }
  } catch (error) {
    console.error('Error fetching database schema:', error);
    throw new Error('Failed to connect to database or fetch schema');
  }
}

async function fetchPostgreSQLSchema(databaseUrl: string): Promise<DatabaseSchema> {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();

    // Get all tables
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    const tablesResult = await client.query(tablesQuery);
    const tables = tablesResult.rows;

    const tableSchemas: TableSchema[] = [];

    for (const table of tables) {
      const columnsQuery = `
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1
        ORDER BY ordinal_position;
      `;
      
      const columnsResult = await client.query(columnsQuery, [table.table_name]);
      const columns: ColumnSchema[] = columnsResult.rows.map(row => ({
        column_name: row.column_name,
        data_type: row.data_type,
        is_nullable: row.is_nullable,
        column_default: row.column_default,
        character_maximum_length: row.character_maximum_length,
      }));

      tableSchemas.push({
        table_name: table.table_name,
        columns,
      });
    }

    return {
      tables: tableSchemas,
      total_tables: tableSchemas.length,
      database_type: 'postgresql',
    };
  } finally {
    await client.end();
  }
}

async function fetchMySQLSchema(databaseUrl: string): Promise<DatabaseSchema> {
  // Parse MySQL connection string
  const url = new URL(databaseUrl);
  const ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined;
  
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading slash
    ssl: ssl as { rejectUnauthorized: boolean }, // Type assertion to handle the SSL type
  });

  try {
    // Get all tables
    const [tablesResult] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    
    const tables = tablesResult as { table_name: string }[];
    const tableSchemas: TableSchema[] = [];

    for (const table of tables) {
      const [columnsResult] = await connection.execute(`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length
        FROM information_schema.columns 
        WHERE table_schema = DATABASE()
        AND table_name = ?
        ORDER BY ordinal_position;
      `, [table.table_name]);
      
      const columns: ColumnSchema[] = (columnsResult as { 
        column_name: string;
        data_type: string;
        is_nullable: string;
        column_default: string;
        character_maximum_length: number
      }[]).map(row => ({
        column_name: row.column_name,
        data_type: row.data_type,
        is_nullable: row.is_nullable,
        column_default: row.column_default,
        character_maximum_length: row.character_maximum_length,
      }));

      tableSchemas.push({
        table_name: table.table_name,
        columns,
      });
    }

    return {
      tables: tableSchemas,
      total_tables: tableSchemas.length,
      database_type: 'mysql',
    };
  } finally {
    await connection.end();
  }
}

export function validateDatabaseConnection(databaseUrl: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    try {
      await fetchDatabaseSchema(databaseUrl);
      resolve(true);
    } catch (error) {
      console.error('Database connection validation failed:', error);
      resolve(false);
    }
  });
} 