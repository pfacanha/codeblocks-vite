// Import the framework and instantiate it
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import Block from "./db/model";
import cors from "@fastify/cors";
import sequelize from "./lib/sequelize";

console.log("🟡 Syncing models...");
await sequelize.sync({ alter: true });

const fastify = Fastify({
  logger: true,
});

// Register CORS plugin
await fastify.register(cors, {
  origin: "*", // Allow all origins — use with caution!
  methods: ["GET", "POST", "DELETE", "OPTIONS"], // credentials: true, // if needed for cookies or auth headers
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ hello: "world" });
});

fastify.get("/blocks", async function handler(request, reply) {
  // create a transsaction object
  const transaction = await sequelize.transaction();
  // Find all users
  try {
    const blocks = await Block.findAll({ transaction });

    await transaction.commit();

    console.log(blocks.every((block) => block instanceof Block)); // true
    console.log("All blocks:", JSON.stringify(blocks, null, 2));

    reply.send(blocks.map((block) => block.toJSON()));
  } catch {
    await transaction.rollback();
    reply
      .send(500)
      .send({
        message: "Rollback was triggered and transaction was not completed!",
      });
  }
});

// POST route with proper typing
fastify.post(
  "/create",
  async function (
    request: FastifyRequest<{ Body: Block }>,
    reply: FastifyReply
  ) {
    // create a transsaction object
    const transaction = await sequelize.transaction();

    const { title, code } = request.body;

    console.log({ title, code });

    try {
      // send data to the database
      const codeblock = await Block.create({ title, code }, { transaction });

      await transaction.commit();

      console.log("Title is :", codeblock.title);
      console.log("Code is :", codeblock.code);

      reply.code(201).send(codeblock);
    } catch {
      await transaction.rollback();
      reply.code(500).send({
        message: "Rollback was activated and transaction was not concluded!",
      });
    }
  }
);

fastify.delete(
  "/:id/delete",
  async function handler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    console.log("Deleting block with id:", id);

    // query database and delete block with the current id
    await Block.destroy({
      where: {
        id: parseInt(id),
      },
    });

    reply.code(204).send();
  }
);

fastify.put(
  "/:id/edit",
  async function editHandler(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { title: string; code: string };
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { title, code } = request.body;

    await Block.update(
      { title, code },
      {
        where: { id },
      }
    );
    const block = await Block.findByPk(id);
    reply.send(block);
  }
);

// Run the server!
(async () => {
  try {
    await fastify.listen({ port: 3000, host: "localhost" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
