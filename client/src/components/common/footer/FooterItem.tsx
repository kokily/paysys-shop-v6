import { Link } from 'react-router-dom';
import { useActiveLink } from '../../../libs/hooks/useActiveLink';
import './FooterItem.scss';

interface Props {
  href: string;
  icon: string;
  name: string;
}

function FooterItem({ href, icon, name }: Props) {
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
  );
}

export default FooterItem;
