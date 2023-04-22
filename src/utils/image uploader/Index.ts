import { ofSignUp } from "../../types";
import { SetStateAction } from "react";
import { uploadImage } from "../firebase config/FireBase";

export const ImageUploader = async (
  event: React.ChangeEvent,
  setSignUpData: React.Dispatch<SetStateAction<ofSignUp>>,
  setImageProcessing: React.Dispatch<SetStateAction<boolean>>
) => {
  const { files } = event.target as HTMLInputElement;
  setImageProcessing(true);
  if (!files) {
    setImageProcessing(false);
    return;
  }
  if (!files[0].type.startsWith("image/")) {
    setImageProcessing(false);
    throw alert("Not a valid Image");
  }

  return await uploadImage(files[0])
    .then((res) => {
      if (res) {
        setSignUpData((prev) => ({ ...prev, userimage: res }));
        setImageProcessing(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setImageProcessing(false);
    });
};
