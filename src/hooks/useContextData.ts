import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const useContextData = () => {
const data = useContext(UserContext)
return data
}
export default useContextData