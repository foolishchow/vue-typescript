declare module 'element-table' {
  export interface ElTable {
    $props: {
      data: any[];
      height?: number | string;
      stripe?: boolean;
      border?: boolean;
      fit?: boolean;
      'show-header'?: boolean;
      'highlight-current-row'?: boolean;
      'row-class-name': (row: any, index: number) => string | string;
      'row-style': (row: any, index: number) => object | object;
      'row-key': (row: any) => string | string;
    }

    onselect(): void;
    onselect(): void;
  }
  export interface ElTableColumn {

  }
}