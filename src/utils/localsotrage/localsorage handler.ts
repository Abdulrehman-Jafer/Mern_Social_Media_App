import { UndefinedUser } from "./undefinedUser";
import { ofUserData } from "../../types";

const LocalStorageHandler = () => {
  const localUser = (window.localStorage.getItem("UserData") ? JSON.parse(window.localStorage.getItem("UserData")!) : UndefinedUser )
  const setLocalStorage = (data:ofUserData) => JSON.stringify(window.localStorage.setItem("UserData",JSON.stringify(data)))
  return {localUser,setLocalStorage}
};
export default LocalStorageHandler