import { UndefinedUser } from "./undefinedUser";
import { ofUserData } from "../../types";

const sessionStorageHandler = () => {
  const sessionUser = window.sessionStorage.getItem("UserData")
    ? JSON.parse(window.sessionStorage.getItem("UserData")!)
    : UndefinedUser;
  const setsessionStorage = (data: ofUserData) =>
    JSON.stringify(
      window.sessionStorage.setItem("UserData", JSON.stringify(data))
    );
  return { sessionUser, setsessionStorage };
};
export default sessionStorageHandler;
