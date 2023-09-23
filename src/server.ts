import { app } from "./app";

const bootstrap = async () => {
  const { PORT } = process.env;

  await app.listen({ port: Number(PORT), host: "0.0.0.0" });
  console.log(`Server is running\nOn port: ${PORT}`);
};

bootstrap();
