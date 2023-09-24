import { Pool, RowDataPacket } from "mysql2/promise";
import { CreatePersonDTO, UserFound, UsersFoundByTermDTO } from "@/@types";

export class Repository {
  constructor(private client: Pool) {}

  public createPerson = async ({
    userId,
    nome,
    apelido,
    nascimento,
    stack,
    wrapper,
  }: CreatePersonDTO) => {
    const sql = `
        INSERT INTO rinha_backend.person(
          id, 
          name, 
          nickname, 
          birth_date,
          stacks,
          wrapper
        )
        VALUES(?, ?, ?, ?, ?, ?)
      `;

    await this.client.execute(sql, [
      userId,
      nome,
      apelido,
      nascimento,
      stack,
      wrapper,
    ]);
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

  public countPersons = async () => {
    const sql = `
      SELECT COUNT(*) AS totalPersons
      FROM rinha_backend.person 
    `;

    const countIndex = 0;
    const [data] = await this.client.execute<RowDataPacket[]>(sql);

    return data[countIndex] as { totalPersons: number };
  };

  public findByTerm = async (term: string) => {
    const sql = `
      SELECT * FROM rinha_backend.person
      WHERE wrapper LIKE ?
      LIMIT 50;
    `;

    const [data] = await this.client.execute<RowDataPacket[]>(sql, [
      `%${term}%`,
    ]);

    return data as UsersFoundByTermDTO[];
  };
}
