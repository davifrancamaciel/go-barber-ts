import { createConnections } from 'typeorm';

createConnections();
// docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
// docker run --name mongobarber -p 27017:27017 -d -t mongo
// docker run --name redisbarber -p 6379:6379 -d -t redis:alpine

// yarn typeorm migration:create -n CreateAppointments
// yarn typeorm migration:run
// yarn typeorm migration:revert