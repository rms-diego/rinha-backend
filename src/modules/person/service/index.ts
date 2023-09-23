import { randomUUID } from "crypto";
import { createPersonBody } from "../../../@types";
import { Repository } from "../repository";

export class Service {
  constructor(private repository: Repository) {}

  public createPerson = async ({
    nome,
    apelido,
    nascimento,
    stack,
  }: createPersonBody) => {
    const userId = randomUUID();

    await this.repository.createPerson({
      nome,
      apelido,
      nascimento: new Date(nascimento),
      stack,
      userId,
    });
  };
}
