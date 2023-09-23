import mysql from "mysql2/promise";

const bootstrapMysql = async () => {
  const client = await clientMysql();

  const sqlCreateDatabase = "CREATE DATABASE IF NOT EXISTS rinha_backend";

  await client.execute(sqlCreateDatabase);

  const sqlCreateTable = `
    CREATE TABLE IF NOT EXISTS rinha_backend.person(
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      nickname VARCHAR(32) NOT NULL,
      birth_date DATE NOT NULL,
      stacks JSON NOT NULL
    );
  `;

  await client.execute(sqlCreateTable);
};

const clientMysql = async () => {
  const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD } =
    process.env;

  return mysql.createConnection({
    host: DATABASE_HOST!,
    port: Number(DATABASE_PORT),
    user: DATABASE_USER!,
    password: DATABASE_PASSWORD!,
  });
};

export { bootstrapMysql, clientMysql };
