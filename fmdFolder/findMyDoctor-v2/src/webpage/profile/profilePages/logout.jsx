import React from 'react'
import { useNavigate } from 'react-router-dom';
import tokenService from '../../../services/token.service';
// import { ROUTING } from '../../../utils/routes';


 const Logout = () => {
  const navigate = useNavigate();
  const { clearToken } = tokenService();
  const handleSignOut = () => {
    clearToken();
}


  return (
    <>
       <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Logout</p>
          </div>
        </div>
        <div className="body">
          <p className='mainPara'>Are you sure you want to Logout?</p>
          <button className='accept' onClick={handleSignOut}>Yes</button>
        </div>
      </div>
    </>
  )
}
export default Logout
