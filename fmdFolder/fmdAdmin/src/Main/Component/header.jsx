import React, { useContext, useState } from "react";
import ProfileImg from "../../assets/images/profile-img.jpg";
import { SidebarContext } from "../../App";
import { ROUTES } from "../../utils/Routes";
import { Link } from "react-router-dom";
import TokenService from "../../services/tokenService";
import { useEffect } from "react";
import AdminService from "../../services/adminApi";

export const Header = (props) => {
  const { clearToken, getStorageData } = TokenService();
  let imageUrl = "http://fmd.arraydigitals.com"
  const { getSingleAdmin, getUserMeta } = AdminService();
  const [userImage, setUserImage] = useState({});
  // const {storage}
  const { sideBar, setSideBar } = useContext(SidebarContext);
  const handleSignout = () => {
    clearToken();
  };
  const [userDetails , setUserDetails]  =useState({})
  const getAdminId = getStorageData().id;
  useEffect(() => {
    getSingleAdmin(getAdminId).then((res)=>{
      setUserDetails(res?.data?.data[0])
      // console.log(res?.data?.data[0])
    }).catch((res)=>{
      console.log(res, 'err');
    })
    getUserMeta(getAdminId).then((res)=>{
      setUserImage(res?.data?.data[0], 'res');
    }).catch((res)=>{
      console.log(res?.data?.data,'res');
    })
  }, [userDetails])
  return (
    <>
      <header>
        <div className="headerInner">
          <button className="menuButton" onClick={() => setSideBar(!sideBar)}>
            <i className="bi bi-list"></i>
          </button>
          <div className="navRight">
            <div className="dropdown notificationDropDown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell"></i>
                <div className="notificationShow">
                </div>
              </button>
              <ul className="dropdown-menu notificationMenu">
                <li className=''><a className="dropdown-item " href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
              </ul>
            </div>

            <div className="dropdown notificationDropDown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-envelope"></i>
                <div className="notificationShow">
                </div>
              </button>
              <ul className="dropdown-menu notificationMenu">
                <li className=''><a className="dropdown-item " href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#">
                  <div className='notificationItem'>
                    <p className='notificationHeading'>Heading</p>
                    <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                  </div>
                </a></li>
              </ul>
            </div>

            <div className="aboutDoctor">
              <p className="doctorName">{userDetails.fullname}</p>
              <p className="doctorSpeciality">Admin</p>
            </div>
            <div className="dropdown profileDropDown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                  <img src={userImage ? `${imageUrl}/${userImage.meta_value}` : ProfileImg} alt="" className='profileImage' />
                <div className="notificationShow"></div>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to={ROUTES.PROFILE} className="dropdown-item" href="#">
                    <i className="bi bi-person" />
                    Profile
                  </Link>
                </li>
                {/* <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-envelope" />
                    Inbox
                  </a>
                </li> */}
                <li onClick={handleSignout}>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-box-arrow-in-left" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
