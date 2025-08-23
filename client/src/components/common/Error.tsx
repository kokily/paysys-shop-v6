import './Error.scss';

interface Props {
  code: string;
  message: string;
}

function Error({ code, message }: Props) {
  const errorCode = code.split('');

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>에러 발생!!</h3>
          <h1>
            {errorCode.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </h1>
        </div>
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default Error;
