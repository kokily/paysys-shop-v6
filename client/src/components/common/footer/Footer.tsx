import BottomItem from './BottomItem';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-contents">
        <BottomItem href="/member" icon="military_tech" name="회원" />
        <BottomItem href="/reserve" icon="camera_enhance" name="예비역" />
        <BottomItem href="/general" icon="face" name="일 반" />
        <BottomItem href="/cart" icon="shopping_cart" name="전표확인" />
        <BottomItem href="/fronts" icon="receipt_long" name="빌지목록" />
      </div>
    </div>
  )
}

export default Footer;