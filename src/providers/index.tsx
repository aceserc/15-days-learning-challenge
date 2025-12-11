import type React from "react";
import { QueryProvider } from "./query-client-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return <QueryProvider>{props.children}</QueryProvider>;
};

export { Providers };
