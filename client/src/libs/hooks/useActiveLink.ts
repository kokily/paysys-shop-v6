import { useLocation } from 'react-router-dom';

interface Props {
  href: string;
  activeClassName: string;
  baseClassName?: string;
}

export function useActiveLink({ href, activeClassName, baseClassName }: Props) {
  const { pathname } = useLocation();

  const isActive = pathname === href;
  const className = isActive ? `${baseClassName} ${activeClassName}`.trim() : baseClassName;

  return { isActive, className };
}
