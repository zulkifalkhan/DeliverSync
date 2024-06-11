import { getChannel } from "../framework/initRabbitMQ";

const ORDER_QUEUE = "order_queue";

export const sendOrderToQueue = (order: any) => {
  const channel = getChannel();
  channel.assertQueue(ORDER_QUEUE, { durable: false });
  channel.sendToQueue(ORDER_QUEUE, Buffer.from(JSON.stringify(order)));
};

export const startOrderConsumer = () => {
  const channel = getChannel();
  channel.assertQueue(ORDER_QUEUE, { durable: false });
  channel.consume(ORDER_QUEUE, async (msg) => {
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      // Process the order (e.g., assign a rider)
      //   await processOrder(order); // Define this function in assignmentService
      channel.ack(msg);
    }
  });
};
