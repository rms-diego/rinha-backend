import { type QueryError } from "mysql2/promise";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

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

  return reply.status(500).send({ error: error.message });
};
