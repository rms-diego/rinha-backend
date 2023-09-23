import { app } from "./app";
import { bootstrapMysql } from "./database/client";

const bootstrap = async () => {
  const { PORT } = process.env;

  await bootstrapMysql();

  await app.listen({ port: Number(PORT), host: "0.0.0.0" });
  console.log(`Server is running\nOn port: ${PORT}`);
};

bootstrap();
