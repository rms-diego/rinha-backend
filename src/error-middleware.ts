import { type QueryError } from "mysql2/promise";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { Exception } from "./exception";

const isSqlError = (value: Error): value is QueryError => {
  return typeof value === "object" && "sqlState" in value;
};

export const errorMiddleware = async (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) => {
  if (isSqlError(error)) {
    return reply.status(422).send();
  }

  if (error instanceof Exception) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  return reply.status(500).send({ error: error.message });
};
