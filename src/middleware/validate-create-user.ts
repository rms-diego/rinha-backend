import { CreatePersonBody } from "@/@types";
import { Exception } from "@/exception";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const validateCreateUser = (
  req: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const { nome, apelido, nascimento, stack } = req.body as CreatePersonBody;

  const isValidDate = new Date(nascimento).getTime();

  if (typeof apelido !== "string" || apelido.length > 32) {
    throw new Exception(400);
  }

  if (typeof nome !== "string" || nome.length > 100) {
    throw new Exception(400);
  }

  if (typeof nascimento !== "string" || !isValidDate) {
    throw new Exception(400);
  }

  if (!Array.isArray(stack) && stack !== null) {
    throw new Exception(400);
  }

  if (!stack) {
    return done;
  }

  const isInvalidValue = stack.some((stack) => typeof stack !== "string");

  if (isInvalidValue) {
    throw new Exception(400);
  }

  done();
};
