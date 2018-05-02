export enum CommonResponseCode {
  ERROR = -1,
  SUCCESS = 0,
  INVALID_TOKEN = 30006,
  SYSTEM_ERROR = 39999
}

export type CommonResponse = {
  success: boolean;
  code: CommonResponseCode;
  msg: string | null;
}