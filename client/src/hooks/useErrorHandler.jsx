import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../store/notificationSlice";

const useErrorHandler = () => {
  const dispatch = useDispatch();

  const handleError = (error) => {
    console.error("Error at error handler:", error);

    let errorMessage = "An error occurred";

    if (typeof error === "string") {
      errorMessage = error;
    }
    // else if (error instanceof Error || error.message) {
    //   errorMessage = error.message;
    // }
    else if (error && typeof error === "object") {
      errorMessage =
        error.response?.data?.message || error.data?.message || errorMessage;
    }

    dispatch(showNotification({ message: errorMessage, severity: "error" }));
  };

  return { handleError };
};

export default useErrorHandler;
