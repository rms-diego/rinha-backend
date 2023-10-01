import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";

import { errorMiddleware } from "../middleware/error-middleware";

import { client } from "../database/client";
import { redis } from "../database/redis";

import { Repository } from "../modules/person/repository";
import { Service } from "../modules/person/service";
import { Controller } from "../modules/person/controller";

const repository = new Repository(client);
const service = new Service(repository, redis);
const controller = new Controller(service);

const app = fastify({
  logger: true,
});

app.register(cors);
app.register(controller.createRoutes);
app.setErrorHandler(errorMiddleware);

export { app };
