import { ofSignUp } from "../../types";
export const onChangeHandler = (
  event: React.ChangeEvent,
  setSignUpData: React.Dispatch<React.SetStateAction<ofSignUp>>
) => {
  const { name, value } = event.target as HTMLInputElement;
  setSignUpData((prev) => {
    return { ...prev, [name]: value };
  });
};
