import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import AddReserve from '../../components/front/add/AddReserve';

function AddReservePage() {
  return (
    <>
      <Helmet>
        <title>빌지 예약금 입력 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <AddReserve />
      </PageTemplate>
    </>
  );
}

export default AddReservePage;
