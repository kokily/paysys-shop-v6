import type { PropsWithChildren } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function PageTemplate({ children }: PropsWithChildren) {;
  return (
    <div className="page-template">
      <Header />

      <main className="main-content">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default PageTemplate;