export const SignUpUrl = "https://spieser-api.onrender.com/api/user/create";
export const LogInUrl = "https://spieser-api.onrender.com/api/user/login";
export const createPostUrl = "https://spieser-api.onrender.com/api/post/create"
export const getAllPostUrl = "https://spieser-api.onrender.com/api/post/"
export const getUserPostUrl = "https://spieser-api.onrender.com/api/user/posts"
export const LikePostUrl = "https://spieser-api.onrender.com/api/post/likepost"
export const AddCommentUrl = "https://spieser-api.onrender.com/api/post/addcomment"
export const GetAllCommenstUrl = "https://spieser-api.onrender.com/api/post/comments"
export const deletePostUrl = "https://spieser-api.onrender.com/api/post/deletepost"
export const savePostUrl = "https://spieser-api.onrender.com/api/post/savepost"
export const getSavedPostUrl = "https://spieser-api.onrender.com/api/post/getsavedpost"
export const searchURl = "https://spieser-api.onrender.com/api/user/search"
import { SetStateAction } from "react";
import { uploadImage } from "../components/Firebase/FireBase";

export const fileOnChangeHandler = async (
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
    throw alert("Not a Image");
  }

  return await uploadImage(files[0])
    .then((res) => {
      setSignUpData((prev) => ({ ...prev, userimage: res }));
      setImageProcessing(false);
    })
    .catch((err) => {
      console.log(err);
      setImageProcessing(false);
    });
};
export type ofSignUp = {
  username: string;
  password: string;
  confirm:string;
  userimage: string;
};
export type ofLogIn = {
    username:string,
    password:string,
}
export const onChangeHandler = (
  event: React.ChangeEvent,
  setSignUpData: React.Dispatch<React.SetStateAction<ofSignUp>>
) => {
  const { name, value } = event.target as HTMLInputElement;
  setSignUpData((prev) => {
    return { ...prev, [name]: value };
  });
};
