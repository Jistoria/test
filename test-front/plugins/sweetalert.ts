import Swal from 'sweetalert2';

export const useAlert = {
  success: (title: string, text: string) =>
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
    }),

  error: (title: string, text: string) =>
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
    }),

  confirm: (title: string, text: string) =>
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }),
};
