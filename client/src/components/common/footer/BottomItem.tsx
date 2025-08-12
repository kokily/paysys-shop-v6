import { Link } from "react-router-dom";
import './BottomItem.scss';
import { useActiveLink } from "@/hooks/useActiveLink";
import { useAppDispatch } from "@/store/hooks";
import { clearBills, clearScrollY, setHall, setSearch, setUserId } from "@/store/slices/billSlice";

interface Props {
  href: string;
  icon: string;
  name: string;
}

function BottomItem({ href, icon, name }: Props) {
  const dispatch = useAppDispatch();
  const { className } = useActiveLink({
    href,
    activeClassName: 'active',
    baseClassName: 'link-anchor',
  });

  const handleClick = () => {
    if (href === '/fronts') {
      dispatch(clearBills());
      dispatch(clearScrollY());
      dispatch(setSearch(''));
      dispatch(setHall(''));
      dispatch(setUserId(''));
    }
  };

  return (
    <Link to={href} className={className} onClick={handleClick}>
      <>
        <i className="material-icons">{icon}</i>
        {name}
      </>
    </Link>
  )
}

export default BottomItem;