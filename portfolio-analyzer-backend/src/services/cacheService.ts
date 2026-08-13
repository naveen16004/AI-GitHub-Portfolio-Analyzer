// src/services/cacheService.ts
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();

  // Cache items for 10 minutes by default
  set<T>(key: string, data: T, ttlMs: number = 10 * 60 * 1000): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }
}

export const globalCache = new CacheService();