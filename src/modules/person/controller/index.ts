import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../service";

import { createPersonBody } from "../../../@types";

export class Controller {
  constructor(private service: Service) {}

  public createRoutes = async (app: FastifyInstance) => {
    app.get("/", () => ({ message: "hello, world!" }));

    app.post("/pessoas", this.createPerson);

    // /contagem-pessoas
    // /pessoas?t=[:termo da busca]
    // /pessoas/[:id]
  };

  public createPerson = async (req: FastifyRequest, reply: FastifyReply) => {
    const { apelido, nome, nascimento, stack } = req.body as createPersonBody;

    await this.service.createPerson({
      apelido,
      nome,
      nascimento,
      stack,
    });

    return reply.status(201).send();
  };
}
