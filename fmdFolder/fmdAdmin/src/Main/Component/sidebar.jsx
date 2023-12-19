import React, { useContext, useEffect, useState } from "react";
import logoImg from "../../assets/images/Logo.png";
import { SidebarContext } from "../../App";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/Routes";
import TokenService from "../../services/tokenService";
// import { UserDoctorBookingReport } from "../WebPage/adminReports/userDoctorBookingReport";

export const Sidebar = () => {
  const { sideBar, setSideBar } = useContext(SidebarContext);

  const closeButton = () => {
    setSideBar(!sideBar);
  };

  const { getStorageData } = TokenService();
  const [userAuth, setUserAuth] = useState(JSON.parse(getStorageData().access.permissions));

  const [isUserAuth, setIsUserAuth] = useState({
    doctor: 0,
    insurance: 0,
    admin: 0,
    pharmacy: 0,
    lab: 0
  })

  useEffect(() => {
    const updatedIsUserAuth = {
      doctor: 0,
      insurance: 0,
      admin: 0,
      pharmacy: 0,
      lab: 0
    };

    Object.keys(userAuth).forEach(category => {
      const permissions = userAuth[category];
      if (Object.values(permissions).includes(1)) {
        updatedIsUserAuth[category] = 1;
      }
    });

    setIsUserAuth(updatedIsUserAuth);
  }, [userAuth]);

// console.log(userAuth, 'ieress');
  return (
    <>
      <aside id="sidebar" className={sideBar ? "sidebarwidth" : "sidebar"}>
        <div className="sideBarInner">
          <div className="aSideCloseButton">
            <button onClick={closeButton}>
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="LogoImage">
            <Link to={ROUTES.HOMEPAGE}>
              <img src={logoImg} alt="" />
            </Link>
          </div>

          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-anotherItem">
              <NavLink to={ROUTES.HOMEPAGE}>
                <i className="ri-bar-chart-box-line sideIcon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            {isUserAuth.doctor === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-person-lines-fill sideIcon" />
                  <span>Doctors</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {userAuth.doctor.add === 1 &&
                    <>
                      <li>
                        <NavLink
                          to={ROUTES.DOCTOR_FORM}
                          className="navLinkA "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                          <i className="bi bi-plus-lg" />
                          <span>Add Doctor</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.SPECIALIST}
                          className="navLinkp "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                          <i className="bi bi-plus-lg" />
                          <span>Online Category</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.DOCTOR_TYPE}
                          className="navLinkl "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                          <i className="bi bi-plus-lg" />
                          <span>Physical Category</span>
                        </NavLink>
                      </li>
                    </>

                  }
                  {userAuth.doctor.assign === 1 &&
                    < li >
                      <NavLink
                        to={ROUTES.ASSIGN_DOCTOR}
                        className="navLinkA "
                        activeclassname="active"
                      >
                        {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                        <i className="bi bi-plus-lg" />
                        <span>Assign Physical Doctor</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.doctor.manage === 1 &&
                    <>
                      <li>
                        <NavLink
                          to={ROUTES.DOCTOR_BOOKING}
                          className="navLinkA "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                          <i className="bi bi-plus-lg" />
                          <span>Active Doctor Bookings</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.HISTORY_DOCTOR_BOOKING}
                          className="navLinkA "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='addDocSideBar' /> */}
                          <i className="bi bi-plus-lg" />
                          <span>History Doctor Bookings</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.DOCTOR_MANAGE}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          {/* <input type="radio" name='sidebar' id='manageDocSideBar' /> */}
                          <i className="bi bi-pencil" />
                          <span>Manage Doctors</span>
                        </NavLink>
                      </li>
                    </>
                  }
                </ul>
              </li>
            )}
            {isUserAuth.lab === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav1"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-clipboard-pulse sideIcon" />
                  <span>Labs</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav1"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {userAuth.lab.add === 1 &&
                    <>
                      <li>
                        <NavLink
                          to={ROUTES.LAB_FORM}
                          className="navLinkB "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Lab</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.LAB_ASISTANT}
                          className="navLinkM "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Phlebotomist</span>
                        </NavLink>
                      </li>
                    </>

                  }
                  {userAuth.lab.addTest === 1 &&
                    <>
                      <li>
                        <NavLink
                          to={ROUTES.TEST_FORM}
                          className="navLinkD "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Test</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.TEST_TO_LAB}
                          className="navLinF "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Test to Lab</span>
                        </NavLink>
                      </li>
                    </>

                  }
                  {userAuth.lab.assign === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.ASSIGN_TEST}
                        className="navLinZ "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Manage & Assign Test</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.lab.manageOrder === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.ALL_TEST}
                        className="navLinL "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Tests Order</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.lab.manage === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.LAB_MANAGE}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Manage Labs</span>
                      </NavLink>
                    </li>
                  }
                </ul>
              </li>
            )}
            {isUserAuth.pharmacy === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav2"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-capsule sideIcon"></i>
                  <span>Pharmacy</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav2"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {
                    userAuth.pharmacy.add === 1 &&
                    <React.Fragment>

                      <li>
                        <NavLink
                          to={ROUTES.PRODUCT_FORM}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Product</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={ROUTES.PRODUCT_UPLOAD_FORM}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Upload Product</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.BRAND_FORM}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Brand</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={ROUTES.CATEGORY_FORM}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Add Category</span>
                        </NavLink>
                      </li>
                    </React.Fragment>
                  }
                  {
                    userAuth.pharmacy.track === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.PRODUCT_TRACKING}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Track Orders</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.pharmacy.allOrder === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.ALL_ORDERS}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>All Orders</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.pharmacy.manage === 1 &&
                    <React.Fragment>
                      <li>
                        <NavLink
                          to={ROUTES.PHARMACY_MANAGE}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-pencil" />
                          <span>Manage Product</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={ROUTES.CATEGORY_MANAGE}
                          className="navLinkC "
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Manage Category</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={ROUTES.BRAND_MANAGE}
                          className="navLinkz"
                          activeclassname="active"
                        >
                          <i className="bi bi-plus-lg" />
                          <span>Manage Brand</span>
                        </NavLink>
                      </li>
                    </React.Fragment>
                  }
                </ul>
              </li>
            )}
            {isUserAuth.insurance === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav6"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-clipboard2-check sideIcon" />
                  <span>Insurance</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav6"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {
                    userAuth.insurance.addPkg === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_PACKAGE_FORM}
                        className="navLinkB "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Add Insurance Package</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.insurance.addProv === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_PROVIDER_FORM}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Add Insurance Provider</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.insurance.managePkg === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_PACKAGE_MANAGE}
                        className="navLinkD "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Manage Package</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.insurance.manageProv === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_PROVIDER_MANAGE}
                        className="navLinkE "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Manage Provider</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.insurance.manageBooking === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.ALL_INSURANCE_BOOKING}
                        className="navLinkE "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Insurance Booking</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth.insurance.insureBooking === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_PROVIDER_BOOKING}
                        className="navLinkE "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Insurance Provider Booking</span>
                      </NavLink>
                    </li>
                  }
                </ul>
              </li>
            )}
            {isUserAuth.admin === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav5"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-person sideIcon"></i>
                  <span>User</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav5"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {
                    userAuth?.admin?.add === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.USER_FORM}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Add User</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.admin?.manage === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.USER_MANAGE}
                        className="navLinkC "
                        activeclassname="active"
                      >
                        <i className="bi bi-pencil" />
                        <span>Manage User</span>
                      </NavLink>
                    </li>
                  }
                </ul>
              </li>
            )}
            {userAuth?.admin?.services === 1 && (
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav8"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-gear sideIcon"></i>
                  <span>Services</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav8"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <NavLink
                      to={ROUTES.CITY}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Cities</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={ROUTES.PROMO_CODE}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Promo Code</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={ROUTES.BANNERS}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Banners</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={ROUTES.CONATCT_US}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Contact Us</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={ROUTES.NEWS_LETTER}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>News Letter</span>
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to={ROUTES.PUSH_NOTIFICATION}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Push Notification</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={ROUTES.ADD_POPUP}
                      className="navLinkC "
                      activeclassname="active"
                    >
                      <i className="bi bi-plus-lg" />
                      <span>Add Offer Popup</span>
                    </NavLink>
                  </li> */}
                </ul>
              </li>
            )}
            {(userAuth?.doctor?.report === 1 || userAuth?.insurance?.insureReport === 1 || userAuth?.lab?.reportOrder === 1 || userAuth?.lab?.reportPhlebotomist === 1 || userAuth?.pharmacy?.orderReporting === 1) &&
              <li className="nav-item">
                <a
                  className="nav-link  collapsed"
                  data-bs-target="#charts-nav3"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-folder2-open sideIcon" />
                  <span>Reports</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="charts-nav3"
                  className="nav-content collapse "
                  data-bs-parent="#sidebar-nav"
                >
                  {userAuth?.doctor?.report === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.DOCTOR_REPORT}
                        className="navLinkX "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Doctor</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.lab?.reportOrder === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.LAB_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Lab</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.pharmacy?.orderReporting === 1 &&
                    < li >
                      <NavLink
                        to={ROUTES.ORDER_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Pharmacy</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.insurance?.insureReport === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.INSURANCE_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Insurance</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.pharmacy?.reportPhlebotomist === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.PHLEBOTOMIST_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>Phlebotomist</span>
                      </NavLink>
                    </li>
                  }
                  {/* {userAuth?.doctor?.report === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.USER_DOCTOR_BOOKING_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>User Doctor Booking</span>
                      </NavLink>
                    </li>
                  }
                  {
                    userAuth?.lab?.reportOrder === 1 &&
                    <li>
                      <NavLink
                        to={ROUTES.USER_LAB_BOOKING_REPORT}
                        className="navLinkK "
                        activeclassname="active"
                      >
                        <i className="bi bi-plus-lg" />
                        <span>User Lab Booking</span>
                      </NavLink>
                    </li>
                  } */}
                </ul>
              </li>
            }

          </ul>
        </div >
      </aside >
    </>
  );
};
