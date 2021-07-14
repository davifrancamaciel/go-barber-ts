import 'reflect-metadata' // isntalar por conta do uso de decorators vide doc type orm
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors' // para o express capturar os erros asincronos
import { errors } from 'celebrate'

import cors from 'cors'
import routes from './routes'
import rateLimiterMiddleware from './middlewares/RateLimiter'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(rateLimiterMiddleware)
app.use(routes)
app.use(errors())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
    err
  })
})

const port = process.env.API_PORT ? process.env.API_PORT : 3334

app.listen(port, () => {
  console.log(`🎉 Backend rodando 😜 na porta ${port}`)
})
