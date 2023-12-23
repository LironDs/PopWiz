import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function successMsg(message: string) {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
export function errorMsg(message: string) {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
