import { createClient } from 'redis'
import {
  DeleteCacheParams,
  GetCacheParams,
  CacheGateway,
  SetCacheParams,
} from './types/cache.types'
import { env } from '@/env'

const getRedisClient = async () => {
  const url = `redis://:${env.REDIS_PASSWORD}@${env.REDIS_HOST}:${env.REDIS_PORT}`
  const isDevelopment = env.NODE_ENV === 'dev'
  return createClient({ ...(!isDevelopment && { url }) })
    .on('error', (err: Error) => {
      console.error(JSON.stringify(err), getRedisClient)
    })
    .connect()
}

const get = async ({ key }: GetCacheParams): Promise<string | null> => {
  const client = await getRedisClient()

  return client.get(key)
}

const set = async ({
  key,
  value,
  ttlInSeconds,
}: SetCacheParams): Promise<void> => {
  const client = await getRedisClient()

  await client.set(key, value, {
    EX: ttlInSeconds,
  })
}

const del = async ({ key }: DeleteCacheParams): Promise<void> => {
  const client = await getRedisClient()

  await client.del(key)
}

export const redisService: CacheGateway = {
  get,
  set,
  delete: del,
}
