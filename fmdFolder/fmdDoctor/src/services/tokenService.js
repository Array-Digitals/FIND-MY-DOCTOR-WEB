import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";

const TokenService = () => {
    const navigate = useNavigate();

    const userToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("storageChange", new Date().getTime());
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

    const getDoctorData = () => {
        const savedData = JSON.parse(localStorage.getItem("doctorProfile"));
        return savedData;
    }

    const clearToken = () => {
        localStorage.clear();
        navigate(ROUTES.HOMEPAGE);
    }
    const clearToken1 = () => {
        localStorage.clear();
        navigate(ROUTES.HOMEPAGE);
    }

    return { userToken, setUserObject, getStorageData, clearToken, clearToken1, getToken, getDoctorData }

}

export default TokenService