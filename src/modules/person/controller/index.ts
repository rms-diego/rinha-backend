import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../service";

import { CreatePersonBody, FindByIdParams } from "../../../@types";

export class Controller {
  constructor(private service: Service) {}

  public createRoutes = async (app: FastifyInstance) => {
    app.get("/", () => ({ message: "hello, world!" }));

    app.post("/pessoas", this.createPerson);
    app.get("/pessoas/:id", this.findById);

    // /contagem-pessoas
    // /pessoas?t=[:termo da busca]
    // /pessoas/[:id]
  };

  public createPerson = async (req: FastifyRequest, reply: FastifyReply) => {
    console.time();
    const { apelido, nome, nascimento, stack } = req.body as CreatePersonBody;

    await this.service.createPerson({
      apelido,
      nome,
      nascimento,
      stack,
    });

    console.timeEnd();
    return reply.status(201).send();
  };

  public findById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as FindByIdParams;

    const userFound = await this.service.findById(id);

    return reply.status(200).send(userFound);
  };
}
