import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successToastMessage =(message)=>{
  toast.success(message)
};


const failToastMessage = (message)=>{
    toast.error(message)
}

export {successToastMessage,failToastMessage};

