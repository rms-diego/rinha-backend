import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../service";

import {
  CreatePersonBody,
  FindByIdParams,
  FindByTermQueryParams,
} from "@/@types";
import { randomUUID } from "crypto";

export class Controller {
  constructor(private service: Service) {}

  public createRoutes = async (app: FastifyInstance) => {
    const instanceId = randomUUID();

    app.get("/", () => ({
      message: "Server is running",
      port: process.env.PORT,
      id: instanceId,
    }));

    app.post("/pessoas", this.createPerson);
    app.get("/pessoas/:id", this.findById);
    app.get("/contagem-pessoas", this.countPerson);
    app.get("/pessoas", this.findByTerm);
  };

  public createPerson = async (req: FastifyRequest, reply: FastifyReply) => {
    const { apelido, nome, nascimento, stack } = req.body as CreatePersonBody;

    await this.service.createPerson({
      apelido,
      nome,
      nascimento,
      stack,
    });

    return reply.status(201).send();
  };

  public findById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as FindByIdParams;

    const userFound = await this.service.findById(id);

    return reply.status(200).send(userFound);
  };

  public countPerson = async (_req: FastifyRequest, reply: FastifyReply) => {
    const totalPersons = await this.service.countPersons();

    return reply.status(200).send(totalPersons);
  };

  public findByTerm = async (req: FastifyRequest, reply: FastifyReply) => {
    const { term } = req.query as FindByTermQueryParams;

    const usersFound = await this.service.findByTerm(term);

    return reply.status(200).send(usersFound);
  };
}
