declare module "countup.js" {
  export interface CountUpInstance {
    start(): void;
    pauseResume(): void;
    reset(): void;
    update(val: number | string): void;
    error: any;
  }
  export interface CountUpOptions {
    useEasing?: boolean,
    useGrouping?: boolean,
    separator?: string,
    decimal?: string,
    prefix?: string,
    suffix?: string
  }
  interface CountUpConstructor {
    new(target: HTMLElement | string, startVal: number | string, endVal: number | string, decimals?: number | string, duration?: number | string, options?: CountUpOptions): CountUpInstance;
  }
  const CountUp: CountUpConstructor;
  export default CountUp;
}