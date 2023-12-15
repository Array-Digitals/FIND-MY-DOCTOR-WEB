import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";

const TokenService = () => {
    const navigate = useNavigate();

    const userToken = (token) => {
        sessionStorage.setItem("token", JSON.stringify(token));
    }
    const getToken = () => {
        const getToken =  sessionStorage.getItem("token");
        return getToken
    }

    const setUserObject = (data) => {
        sessionStorage.setItem("data", JSON.stringify(data));
    }

    const getStorageData = () => {
        const savedData = JSON.parse(sessionStorage.getItem("data"));
        return savedData;
    }


    const clearToken = () => {
        sessionStorage.clear();
        navigate(ROUTES.HOMEPAGE)
        window.location.reload();
    }

    return { userToken, setUserObject, getStorageData, clearToken, getToken }

}

export default TokenService