import { Link } from 'react-router-dom';
import './Logo.scss';

interface Props {
  link: string;
}

function Logo({ link }: Props) {
  return (
    <Link to="/member" className={`logo-container ${link}`}>
      행사전표시스템
    </Link>
  );
}

export default Logo;
