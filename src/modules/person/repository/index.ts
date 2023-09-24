import { Pool } from "mysql2/promise";
import { createPersonDTO } from "../../../@types";

export class Repository {
  constructor(private client: Pool) {}

  public createPerson = async ({
    userId,
    nome,
    apelido,
    nascimento,
    stack,
  }: createPersonDTO) => {
    const sql = `
      INSERT INTO rinha_backend.person(id, name, nickname, birth_date, stacks)
      Values(?, ?, ?, ?, ?)
    `;

    await this.client.execute(sql, [userId, nome, apelido, nascimento, stack]);
  };
}
