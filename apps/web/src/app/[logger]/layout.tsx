import { PropsWithChildren } from "react";
import Tabs from "../../ui/tabs";
import { notFound } from "next/navigation";
const pages = ["messages", "events"] as const;
const Layout = (
  props: PropsWithChildren<{ params: { logger: (typeof pages)[number] } }>
) => {
  const path = props.params.logger;
  if (!pages.includes(path)) {
    notFound();
  }
  return (
    <div className="pt-16">
      <div className="fixed top-0 left-0 right-0  h-16 flex items-center">
        <div className="container px-4 lg:px-0 mx-auto transition-all">
          <Tabs path={`/${path}`} />
        </div>
      </div>
      <main className="container px-4 lg:px-0 mx-auto transition-all">
        <div>{props.children}</div>
      </main>
    </div>
  );
};
export default Layout;
