import amqp from "amqplib/callback_api";

let channel: amqp.Channel;

export const connectRabbitMQ = (callback: () => void) => {
  console.log("Attempting to connect to RabbitMQ...");

  amqp.connect("amqp://localhost", (err, connection) => {
    if (err) {
      throw err;
    }

    console.log("Successfully connected to RabbitMQ.");

    connection.createChannel((err, ch) => {
      if (err) {
        throw err;
      }
      console.log("Channel successfully created.");
      channel = ch;
      callback();
    });
  });
};

export const getChannel = (): amqp.Channel => {
  return channel;
};
