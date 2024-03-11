import { redisService } from './redis.service'
import { CacheGateway } from './types/cache.types'

export const cacheService: CacheGateway = redisService
