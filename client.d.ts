declare module "*.svg?dataURI" {
  const src: string;
  export default src;
}

declare module "*.svg?raw" {
  const src: string;
  export default src;
}

declare module "*.svg?component" {
  import { ComponentProps, FunctionComponent } from "react";

  const ReactComponent: FunctionComponent<
    ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
