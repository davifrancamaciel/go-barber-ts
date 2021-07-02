import { createConnections } from 'typeorm';

createConnections();

// yarn typeorm migration:create -n CreateAppointments
// yarn typeorm migration:run
// yarn typeorm migration:revert