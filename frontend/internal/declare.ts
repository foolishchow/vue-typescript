/**
 * reffer: https://github.com/Microsoft/TypeScript/issues/21621
 */
import Vue from 'vue'
import { Vue as vue } from 'vue/types/vue'
export type ModelType<T> = {
  value: T;
  onInput?: (value: T) => void;
} | { 'v-model'?: T; }

type DefaultJSXElementAttributes = {
  ref?: any;
  'v-lazy'?: string;
  'v-press'?: boolean | string;
  'v-show'?: boolean;
  'v-pull-up'?: () => void;
  'pull-up-disabled'?: boolean;
  domPropsInnerHTML?: any;
  class?: string | { [key: string]: boolean }
  style?: string | object;
}

export interface VueComponent<Props> extends Vue {
  $props: Props & DefaultJSXElementAttributes;
}
export class VueComponent<Props> extends Vue {
}





