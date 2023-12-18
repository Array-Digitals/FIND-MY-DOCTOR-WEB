import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";

const TokenService = () => {
    const navigate = useNavigate();

    const userToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token));
    }
    const getToken = () => {
        const getToken = localStorage.getItem("token");
        return getToken
    }

    const setUserObject = (data) => {
        localStorage.setItem("data", JSON.stringify(data));
    }

    const getStorageData = () => {
        const savedData = JSON.parse(localStorage.getItem("data"));
        return savedData;
    }


    const clearToken = () => {
        localStorage.clear();
        navigate(ROUTES.HOMEPAGE)
        window.location.reload();
    }

    return { userToken, setUserObject, getStorageData, clearToken, getToken }

}

export default TokenService