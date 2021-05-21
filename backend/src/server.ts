import 'reflect-metadata'; // isntalar por conta do uso de decorators vide doc type orm
import express from 'express';
import cors from 'cors';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

const port = process.env.API_PORT ? process.env.API_PORT : 4333;

app.listen(port, () => {
	console.log(`🎉 Backend rodando 😜 na porta ${port}`);
});
