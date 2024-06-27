#DeliverSync
##DeliverSync is a microservice designed to optimize the process of assigning orders to riders based on their real-time location and availability, ensuring timely and efficient deliveries

## Key Features
- Real-Time Updates
- Efficient Matching
- Scalability

## Tech Stack
- Node.js
- TypeScript
- Express.js
- MongoDB
- Socket.io
- Swagger
- Jest

## Installation

1. Clone the repository
```bash
git clone 

## npm install
Add env 

npm start

Folder Structure :
src/
  framework/
    middlewares/
    initDatabase.ts
    initRedis.ts
    initRabbitMQ.ts     # Initialize RabbitMQ connection
    initSocket.ts
  server/
    controllers/
      orderController.ts
      riderController.ts
      assignmentController.ts
    routes/
      orderRoutes.ts
      riderRoutes.ts
      assignmentRoutes.ts
  services/
    orderService.ts
    riderService.ts
    assignmentService.ts
    queueService.ts
      # Queue handling logic for sending/receiving messages
  repositories/
    orderRepository.ts
    riderRepository.ts
  shared/
    dtos/
  tests/
    unit/
    blackbox/
  app.ts
  loadbalancer/
    nginx.conf

