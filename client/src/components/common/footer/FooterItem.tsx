import { Link } from 'react-router-dom';
import { useActiveLink } from '../../../libs/hooks/useActiveLink';
import './FooterItem.scss';
import { useAppDispatch } from '../../../store/hooks';
import { clearBills, clearScrollY, setHall, setTitle, setUserId } from '../../../store/slices/billSlice';

interface Props {
  href: string;
  icon: string;
  name: string;
}

function FooterItem({ href, icon, name }: Props) {
  const dispatch = useAppDispatch();
  const { className } = useActiveLink({
    href,
    activeClassName: 'active',
    baseClassName: 'link-anchor',
  });

  const onClick = () => {
    if (href === '/fronts') {
      dispatch(clearBills());
      dispatch(clearScrollY());
      dispatch(setTitle(''));
      dispatch(setHall(''));
      dispatch(setUserId(''));
    }
  };

  return (
    <Link to={href} className={className} onClick={onClick}>
      <>
        <i className="material-icons">{icon}</i>
        {name}
      </>
    </Link>
  );
}

export default FooterItem;
