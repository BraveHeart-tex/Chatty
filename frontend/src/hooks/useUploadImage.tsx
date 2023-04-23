import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function useUploadImage() {
  return useMutation((data: FormData) =>
    axios
      .post("https://api.cloudinary.com/v1_1/dmwafn98h/image/upload", data)
      .then((res) => res.data)
  );
}

export default useUploadImage;
