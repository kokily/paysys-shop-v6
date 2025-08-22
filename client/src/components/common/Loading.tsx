import './Loading.scss';

interface Props {
  message?: string;
}

function Loading({ message }: Props) {
  return (
    <div className="loader-container">
      {message && <div>{message}</div>}
      <div className="loader" />
    </div>
  );
}

export default Loading;
