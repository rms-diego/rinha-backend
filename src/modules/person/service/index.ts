import { randomUUID } from "crypto";
import { CreatePersonBody } from "@/@types";
import { Repository } from "../repository";
import { Exception } from "@/exception";

export class Service {
  constructor(private repository: Repository) {}

  public createPerson = async ({
    nome,
    apelido,
    nascimento,
    stack,
  }: CreatePersonBody) => {
    const userId = randomUUID();

    const wrapper = JSON.stringify({
      nome,
      apelido,
      nascimento: new Date(nascimento),
      stack,
    });

    await this.repository.createPerson({
      nome,
      apelido,
      nascimento: new Date(nascimento),
      stack,
      userId,
      wrapper,
    });

    return userId;
  };

  public findById = async (userId: string) => {
    const userFound = await this.repository.findById(userId);

    if (!userFound) {
      throw new Exception(404);
    }

    return userFound;
  };

  public countPersons = async () => {
    const totalPersons = await this.repository.countPersons();

    return totalPersons;
  };

  public findByTerm = async (term: string) => {
    const personsFound = await this.repository.findByTerm(term);

    const serialize = personsFound.map((person) => ({
      id: person.id,
      nome: person.name,
      apelido: person.nickname,
      nascimento: person.birth_date,
      stack: person.stacks,
    }));

    return serialize;
  };
}
