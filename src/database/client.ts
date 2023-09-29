import mysql from "mysql2/promise";

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

const client = mysql.createPool({
  host: DATABASE_HOST!,
  port: Number(DATABASE_PORT),
  user: DATABASE_USER!,
  password: DATABASE_PASSWORD!,
  connectionLimit: 50,
});

const bootstrapMysql = async () => {
  const sqlCreateDatabase = "CREATE DATABASE IF NOT EXISTS rinha_backend";

  await client.execute(sqlCreateDatabase);

  const sqlCreateTable = `
    CREATE TABLE IF NOT EXISTS rinha_backend.person(
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      nickname VARCHAR(32) NOT NULL UNIQUE,
      birth_date DATE NOT NULL,
      stacks JSON,
      wrapper VARCHAR(750) NOT NULL
    );
  `;

  await client.execute(sqlCreateTable);
};

export { bootstrapMysql, client };
