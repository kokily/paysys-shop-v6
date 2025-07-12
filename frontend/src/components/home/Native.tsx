import React from 'react';

interface Props {
  menu?: any;
  native?: any;
  onMenu?: () => void;
}

const Native = ({ menu, native, onMenu }: Props) => (
  <div>
    <h2>Native 컴포넌트 (임시)</h2>
    {/* 실제 구현 필요 */}
  </div>
);

export default Native; 