import { randomUUID } from "crypto";
import { CreatePersonBody } from "../../../@types";
import { Repository } from "../repository";
import { Exception } from "../../../exception";

export class Service {
  constructor(private repository: Repository) {}

  public createPerson = async ({
    nome,
    apelido,
    nascimento,
    stack,
  }: CreatePersonBody) => {
    const userId = randomUUID();

    await this.repository.createPerson({
      nome,
      apelido,
      nascimento: new Date(nascimento),
      stack,
      userId,
    });
  };

  public findById = async (userId: string) => {
    const userFound = await this.repository.findById(userId);

    if (!userFound) {
      throw new Exception(404, "user does not exists");
    }

    return userFound;
  };
}
