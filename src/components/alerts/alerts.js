import Swal from 'sweetalert2'

export const alertBasic = (menssage) => {
    Swal.fire({
        title: menssage,
        confirmButtonColor: "#008DEB",
    });
}

export const alertConfirm = (menssage) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: menssage,
        showConfirmButton: false,
        timer: 2000
    });
}

export const alertError = (menssage) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: menssage,
        showConfirmButton: false,
        timer: 2000
    });
}

export const alertInfo = (menssage) => {
    Swal.fire({
        position: "center",
        icon: "info",
        title: menssage,
        showConfirmButton: false,
        timer: 2000
    });
}