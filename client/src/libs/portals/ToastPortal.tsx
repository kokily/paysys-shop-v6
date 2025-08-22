import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

function ToastPortal() {
  return createPortal(
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />,
    document.body
  );
}

export default ToastPortal;
