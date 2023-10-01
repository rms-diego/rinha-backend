import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../service";

import {
  CreatePersonBody,
  FindByIdParams,
  FindByTermQueryParams,
} from "@/@types";

import { randomUUID } from "crypto";
import { validateCreateUser } from "@/middleware/validate-create-user";

export class Controller {
  constructor(private service: Service) {}

  public createRoutes = async (app: FastifyInstance) => {
    const instanceId = randomUUID();

    app.get("/", () => ({
      message: "Server is running",
      port: process.env.PORT,
      id: instanceId,
    }));

    app.post(
      "/pessoas",
      { preHandler: [validateCreateUser] },
      this.createPerson
    );

    app.get("/pessoas/:id", this.findById);
    app.get("/contagem-pessoas", this.countPerson);
    app.get("/pessoas", this.findByTerm);
  };

  public createPerson = async (req: FastifyRequest, reply: FastifyReply) => {
    const { apelido, nome, nascimento, stack } = req.body as CreatePersonBody;

    const userId = await this.service.createPerson({
      apelido,
      nome,
      nascimento: new Date(nascimento),
      stack,
    });

    reply.header("Location", `/pessoas/${userId}`);

    return reply.status(201).send();
  };

  public findById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as FindByIdParams;

    const userFound = await this.service.findById(id);

    return reply.status(200).send(userFound);
  };

  public countPerson = async (_req: FastifyRequest, reply: FastifyReply) => {
    const totalPersons = await this.service.countPersons();

    return reply
      .status(200)
      .send(`COUNT PERSONS: ${totalPersons.totalPersons}`);
  };

  public findByTerm = async (req: FastifyRequest, reply: FastifyReply) => {
    const { t } = req.query as FindByTermQueryParams;

    if (!t) {
      return reply.status(400).send();
    }

    const usersFound = await this.service.findByTerm(t);

    return reply.status(200).send(usersFound);
  };
}
