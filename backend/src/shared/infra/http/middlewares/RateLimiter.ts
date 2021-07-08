import { Request, Response, NextFunction, response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'
import AppError from '@shared/errors/AppError'

const resdisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS
})

const rateLimiter = new RateLimiterRedis({
  storeClient: resdisClient,
  keyPrefix: 'middleware',
  points: 5, //quantidade de requisições
  duration: 1 // segundo
})

export default async function rateLimiterMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch (error) {
    throw new AppError('Número que requisições exedidas', 429)
  }
}
