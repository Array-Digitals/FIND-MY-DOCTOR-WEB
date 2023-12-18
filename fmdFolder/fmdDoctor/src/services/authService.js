import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/Routes';
import { toast } from 'react-toastify';
import tokenService from './tokenService';
import { baseUrl } from './contants';
import axiosService from './axiosInterceptor';

const AuthService = () => {
  const { userToken, setUserObject, clearToken, clearToken1 } = tokenService();
  const navigate = useNavigate();
  const {axios} = axiosService();

  // const baseUrl = 'https://fmd.arraydigitals.com/api';


  //USER REGISTRATION STARTS
  // User Login Start
  const handleLogin = (data) => {
    return axios.post(`${baseUrl}/users/login`, data)
  }

  const onSuccessLogin = (res) => {
    if (res?.data?.success && res?.data?.data?.type == "2") {
      let token = res?.data?.token;
      let userData = res?.data?.data;
      userToken(token);
      navigate(ROUTES.HOMEPAGE)
      setUserObject(userData)
      // window.location.reload();
    }
    else {
      toast.error('invalid Login!');
      clearToken1();
    }
  }

  return { handleLogin, onSuccessLogin }
}

export default AuthService