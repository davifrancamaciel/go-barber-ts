export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>
  recover<T>(key: string): Promise<T | null>
  ivalidate(key: string): Promise<void>
  ivalidatePrefix(prefix: string): Promise<void>
}
