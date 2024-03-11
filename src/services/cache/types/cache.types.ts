export type GetCacheParams = {
  key: string
}

export type DeleteCacheParams = {
  key: string
}

export type SetCacheParams = {
  key: string
  value: string
  ttlInSeconds?: number
}

export interface CacheGateway {
  get(params: GetCacheParams): Promise<string | null>
  set(params: SetCacheParams): Promise<void>
  delete(params: DeleteCacheParams): Promise<void>
}
