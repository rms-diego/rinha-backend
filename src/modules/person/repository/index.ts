import { Pool, RowDataPacket } from "mysql2/promise";
import { CreatePersonDTO, UserFound } from "../../../@types";

export class Repository {
  constructor(private client: Pool) {}

  public createPerson = async ({
    userId,
    nome,
    apelido,
    nascimento,
    stack,
  }: CreatePersonDTO) => {
    const sql = `
      INSERT INTO rinha_backend.person(
        id, 
        name, 
        nickname, 
        birth_date,
        stacks
      )
      VALUES(?, ?, ?, ?, ?)
    `;

    await this.client.execute(sql, [userId, nome, apelido, nascimento, stack]);
  };

  public findById = async (id: string) => {
    const sql = `
      SELECT id, name, nickname, birth_date, stacks 
      FROM rinha_backend.person 
      WHERE id = ?;
    `;

    const [data] = await this.client.execute<RowDataPacket[]>(sql, [id]);

    const userIndex = 0;
    const userFound = data[userIndex] as UserFound;

    return userFound;
  };
}
