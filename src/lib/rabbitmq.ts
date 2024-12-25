import amqp from "amqplib";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

const QUEUE_NAME = "schedules";

const connectToRabbitMQ = async () => {
  if (!connection || !channel) {
    connection = await amqp.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel();

    console.log("Connected to RabbitMQ");
  }

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  return { connection, channel };
};

export const sentToQueue = async (message: Object) => {
  const { channel } = await connectToRabbitMQ();

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });

  console.log(`Message sent to queue`);
};
