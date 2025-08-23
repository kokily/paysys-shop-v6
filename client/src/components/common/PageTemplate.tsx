import type { PropsWithChildren } from 'react';
import './PageTemplate.scss';
import Footer from './footer/Footer';
import Header from './header/Header';

function PageTemplate({ children }: PropsWithChildren) {
  return (
    <div className="page-template">
      <Header />

      <main className="main-contents">{children}</main>

      <Footer />
    </div>
  );
}

export default PageTemplate;
