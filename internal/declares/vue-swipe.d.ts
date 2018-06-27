declare module "vue-swipe" {
  import Vue from "vue"
  export type SwipeOptions = {
    /**
     * speed of animation.  default 300
     */
    speed?: number;
    /**
     * the start swipe item index  default 0
     */
    defaultIndex?: number;
    /**
     * disable user drag swipe item  defalut: false
     */
    disabled?: boolean;
    /**
     * delay of auto slide.  default: 3000
     */
    auto?: number;
    /**
     * creates an infinite slider without endpoints  default: true
     */
    continuous?: boolean;
    /**
     * show indicators on slider bottom  default: true
     */
    showIndicators?: boolean;
    /**
     * do not drag when there is only one swipe - item  default: true
     */
    noDragWhenSingle?: boolean;
    /**
     *  preventDefault when touch start, useful for some lower version Android Browser(4.2 etc).   default: false
     */
    prevent?: boolean;
    /**
     * solve nesting.   default: false
     */
    propagation?: boolean;

    class?: string | { [key: string]: boolean }

    onChange?: (newIndex: number, oldIndex: number) => void
  }
  export class Swipe extends Vue{
    props: SwipeOptions;
    goto(newIndex: number): void;
  }
  export class SwipeItem extends Vue{}
}