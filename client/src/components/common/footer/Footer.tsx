import FooterItem from './FooterItem';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-contents">
        <FooterItem href="/member" icon="military_tech" name="회원" />
        <FooterItem href="/associate" icon="camera_enhance" name="준회원" />
        <FooterItem href="/general" icon="face" name="일 반" />
        <FooterItem href="/cart" icon="shopping_cart" name="전표확인" />
        <FooterItem href="/fronts" icon="receipt_long" name="빌지목록" />
      </div>
    </footer>
  );
}

export default Footer;
