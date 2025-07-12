import PageTemplate from '../components/common/PageTemplate';
import Native from '../components/home/Native';
// TODO: useLoggedIn, useNative 훅 구현 필요

const AssociatePage = () => {
  // const { user } = useLoggedIn();
  // const { menu, native, onMenu } = useNative();

  // 임시: 실제 구현 시 위 주석 해제
  const user = null;
  const menu = null;
  const native = null;
  const onMenu = () => {};

  return (
    <PageTemplate user={user}>
      <Native menu={menu} native={native} onMenu={onMenu} />
    </PageTemplate>
  );
};

export default AssociatePage; 