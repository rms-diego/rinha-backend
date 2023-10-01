import { randomUUID } from "crypto";
import { CreatePersonBody } from "@/@types";
import { Repository } from "../repository";
import { Exception } from "@/exception";
import { Redis } from "ioredis";

export class Service {
  constructor(private repository: Repository, private redis: Redis) {}

  public createPerson = async ({
    nome,
    apelido,
    nascimento,
    stack,
  }: CreatePersonBody) => {
    const userAlreadyExists = await this.redis.get(apelido);

    if (userAlreadyExists) {
      throw new Exception(422);
    }

    const userId = randomUUID();

    const wrapper = JSON.stringify(`
      ${nome} | ${apelido} | ${new Date(nascimento).toISOString()} | ${stack}
    `);

    await this.repository.createPerson({
      nome,
      apelido,
      nascimento: new Date(nascimento),
      stack,
      userId,
      wrapper,
    });

    await this.redis.set(apelido, JSON.stringify(true));

    await this.redis.set(
      userId,
      JSON.stringify({
        nome,
        apelido,
        nascimento: new Date(nascimento),
        stack,
        userId,
        wrapper,
      })
    );

    return userId;
  };

  public findById = async (userId: string) => {
    const userFound = await this.redis.get(userId);

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
