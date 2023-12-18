
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTING } from '../utils/routes'
import { toast } from 'react-toastify';
import tokenService from './token.service';
import { baseUrl } from './baseUrl';

const AuthService = () => {
  const { userToken, setUserObject } = tokenService();
  const navigate = useNavigate();

  // const baseUrl = 'https://fmd.arraydigitals.com/api';


  //USER REGISTRATION STARTS
  // User Login Starts
  const handleLogin = (data) => {
    return axios.post(`${baseUrl}/users/login`, data)
  }
  const onSuccessLogin = (res, checkVal) => {
    if (res?.data?.success && res?.data?.data?.type == "1") {
      let token = res?.data?.token;
      let userData = res?.data?.data;
      userToken(token, checkVal);
      navigate(ROUTING.HOMEPAGE)
      setUserObject(userData, checkVal)
    }
    else {
      toast.error('invalid Login!');
    }
  }
  // User Register Starts
  const handleRegister = (data) => {
    return axios.post(`${baseUrl}/users/register`, data)
  }
  const OnSuccessRegister = res => {
    if (res?.data?.success) {
      navigate(ROUTING.LOGIN)
    }
  }
  //USER REGISTRATION ENDS





  return { handleLogin, handleRegister, onSuccessLogin, OnSuccessRegister, }
}

export default AuthService