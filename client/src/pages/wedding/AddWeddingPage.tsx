import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import AddWedding from '../../components/wedding/add/AddWedding';

function AddWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩전표 추가 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <AddWedding />
      </PageTemplate>
    </>
  );
}

export default AddWeddingsPage;
