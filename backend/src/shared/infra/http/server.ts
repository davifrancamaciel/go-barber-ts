import 'reflect-metadata'; // isntalar por conta do uso de decorators vide doc type orm

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // para o express capturar os erros asincronos

import cors from 'cors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}
	return res.status(500).json({
		status: 'error',
		message: 'Erro interno no servidor',
	});
});

const port = process.env.API_PORT ? process.env.API_PORT : 4333;

app.listen(port, () => {
	console.log(`🎉 Backend rodando 😜 na porta ${port}`);
});
