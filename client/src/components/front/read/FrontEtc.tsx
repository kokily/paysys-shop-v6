import './FrontEtc.scss';

interface Props {
  etc: string;
}

function FrontEtc({ etc }: Props) {
  return (
    <>
      <hr />
      <div className="front-etc-container">
        <div className="front-etc-content">{etc}</div>
      </div>
    </>
  );
}

export default FrontEtc;
