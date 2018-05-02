export const pure = function <T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}