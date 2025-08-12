import './FrontEtc.scss';

interface Props {
  etc: string;
}

function FrontEtc({ etc }: Props) {
  return (
    <>
      <hr />
      <div className='front-etc-container'>
        <span className='front-etc-contents'>
          {etc}
        </span>
      </div>
    </>
  );
};

export default FrontEtc;