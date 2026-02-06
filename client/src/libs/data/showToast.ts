import { toast } from 'react-toastify';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  },
  warning: (message: string) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  },
  info: (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  },
  notify: (message: string, onClick?: () => void) => {
    toast.info(message, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: false,
      onClick,
      style: {
        width: '520px',
        minHeight: '80px',
        fontSize: '18px',
        textAlign: 'center',
      }
    });
  },
};
