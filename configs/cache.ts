import { CacheItem } from 'internal/cache/cache';
export const UserTokenCache: CacheItem<{ user: string; token: string }> = 'user-token';
