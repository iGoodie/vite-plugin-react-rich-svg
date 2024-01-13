declare module "*.svg?url" {
  /**
   * Imports svg as a data uri (mimetype = image/svg+xml)
   *
   * @example
   * "data:image/svg+xml,..."
   */
  const src: `data:image/svg+xml,${string}`;
  export default src;
}

declare module "*.svg?base64" {
  /**
   * Imports svg as an encoded base64 string
   *
   * @example
   * "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53..."
   */
  const src: string;
  export default src;
}

declare module "*.svg?raw" {
  /**
   * Imports the actual text content of the svg file/code
   *
   * @example
   * "<?xml version="1.0"?>\n<svg>..</svg>"
   */
  const src: string;
  export default src;
}

declare module "*.svg?component" {
  import { ComponentProps, FunctionComponent } from "react";

  /**
   * Imports svg as a React Component
   *
   * @example
   * import SvgIcon from "./my-svg-icon.svg?component";
   *
   * <SvgIcon width={100} height={100} />
   *
   */
  const ReactComponent: FunctionComponent<
    ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
