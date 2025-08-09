import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  href: string;
  activeClassName: string;
  children: React.ReactElement;
}

function ActiveLink({ href, activeClassName, children }: Props) {
  const { pathname } = useLocation();
  const child = React.Children.only(children);
  let className = (child as React.ReactElement<any>).props.className || '';

  if (pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return (
    <Link to={href} className="link-anchor">
      {React.cloneElement(child as React.ReactElement<any>, { className })}
    </Link>
  );
}

export default ActiveLink;