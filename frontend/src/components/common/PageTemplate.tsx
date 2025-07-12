import React from 'react';

interface Props {
  user?: any;
  children: React.ReactNode;
}

const PageTemplate = ({ user, children }: Props) => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
    {/* 상단 유저 정보 등 필요시 추가 */}
    {children}
  </div>
);

export default PageTemplate; 