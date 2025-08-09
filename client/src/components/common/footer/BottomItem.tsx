import ActiveLink from "../ActiveLink";
import './BottomItem.scss';

interface Props {
  href: string;
  icon: string;
  name: string;
}

function BottomItem({ href, icon, name }: Props) {
  return (
    <ActiveLink href={href} activeClassName="active">
      <>
        <i className="material-icons">{icon}</i>
        {name}
      </>
    </ActiveLink>
  )
}

export default BottomItem;