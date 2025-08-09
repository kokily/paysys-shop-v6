import type { PropsWithChildren } from "react";
import Header from "./header/Header";

function PageTemplate({ children }: PropsWithChildren) {;
  return (
    <div className="page-template">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default PageTemplate;