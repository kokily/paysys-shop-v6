import { Link } from "react-router-dom";
import './BottomItem.scss';
import { useActiveLink } from "@/hooks/useActiveLink";

interface Props {
  href: string;
  icon: string;
  name: string;
}

function BottomItem({ href, icon, name }: Props) {
  const { className } = useActiveLink({
    href,
    activeClassName: 'active',
    baseClassName: 'link-anchor',
  });

  return (
    <Link to={href} className={className}>
      <>
        <i className="material-icons">{icon}</i>
        {name}
      </>
    </Link>
  )
}

export default BottomItem;