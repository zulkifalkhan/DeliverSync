import amqp from "amqplib/callback_api";

let channel: amqp.Channel;

export const connectRabbitMQ = (callback: () => void) => {
  amqp.connect("amqp://localhost", (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((err, ch) => {
      if (err) {
        throw err;
      }
      channel = ch;
      callback();
    });
  });
};

export const getChannel = (): amqp.Channel => {
  return channel;
};
