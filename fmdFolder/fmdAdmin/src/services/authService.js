import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/Routes";
import { toast } from "react-toastify";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import axiosService from "./axiosInterceptor";

const AuthService = () => {
  const { userToken, setUserObject } = TokenService();
  const navigate = useNavigate();
  const { axios } = axiosService()


  const { getToken } = TokenService();
  const token = getToken()
  let newToken = token?.slice(1, -1);

  // const baseUrl = "https://fmd.arraydigitals.com/api";
  // const baseUrl = "http://192.168.18.96:3000/api";

  //USER REGISTRATION STARTS
  // User Login Starts
  const handleLogin = (data) => {
    // return axios.post(`${baseUrl}/users/login`, data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/users/login`,
      headers: {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
    return axios.request(config)

  };
  const onSuccessLogin = (res) => {
    // console.log(res, 'authhhh');
    if ((res?.data?.success === 1 && res?.data?.data?.type == "7")) {
      let token = res?.data?.token;
      let userData = res?.data?.data;
      userToken(token);
      navigate(ROUTES.HOMEPAGE);
      setUserObject(userData);
      window.location.reload();
      // console.log('if');
    }
    else if(res?.data?.success === 0){
      // console.log('else if');
      toast.error("invalid Login!");
    }
    else {
      toast.error("invalid Login!");
    }
  };

  // Admin Api
  const createAdmin = (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/users/create-admin`,
      headers: {
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios.request(config);
  };
  const updateAdmin = (data) => {
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${baseUrl}/users/update-admin`,
      headers: {
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios.request(config);
  };
  const getAdmin = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/users/list`,
      headers: {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json'
    },
    };
    return axios.request(config)
  }

  return { handleLogin, onSuccessLogin, createAdmin, getAdmin, updateAdmin };
};

export default AuthService;
