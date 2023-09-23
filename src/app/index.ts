import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";

import { client } from "../database/client";
import { Repository } from "../modules/person/repository";
import { Service } from "../modules/person/service";
import { Controller } from "../modules/person/controller";

const repository = new Repository(client);
const service = new Service(repository);
const controller = new Controller(service);

const app = fastify();
app.register(cors);
app.register(controller.createRoutes);

export { app };
