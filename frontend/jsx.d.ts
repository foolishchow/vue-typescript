/// <reference path="./internal/declares/index.d.ts"/>
import Vue, { VNode, ComponentOptions } from "vue"

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface ElementAttributesProperty { $props: {} }
    interface IntrinsicElements {
      'transition': {
        name: string
      }
      [elem: string]: any
    }
  }
}