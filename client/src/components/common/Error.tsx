import './Error.scss';

interface Props {
  error: string | null;
}

function Error({ error }: Props) {
  const code = error?.slice(-3, error.length);

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>에러 발생!!</h3>
          {error && (
            <h1>
              <span>{code}</span>
            </h1>
          )}
        </div>
        {error && <h2>{error}</h2>}
      </div>
    </div>
  );
}

export default Error;
