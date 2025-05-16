import { useNavigate } from "react-router";
import style from "./logout.module.css";

export const Logout = () => {
    const navigate = useNavigate()
  const onClick = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_id");
    navigate('/sign-up')
  };
  return <a className={style.text} onClick={onClick}>Logout</a>;
};
