import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './style.css';
import { Layout } from './Main/layout';
import { Sidebar } from './Main/Component/sidebar';
import { Dashboard } from './Main/WebPage/dashboard/dashboard';
import { Appointment } from './Main/WebPage/appointment/appointment'
import { ROUTES } from './utils/Routes';
import { TotalProfile } from './Main/WebPage/doctorReport/totalProfile';
import { Sales } from './Main/WebPage/doctorReport/sales';
import { Profile } from './Main/WebPage/doctorProfile/profile';
import { Login } from './Main/WebPage/login';
import TokenService from './services/tokenService';
import { AppointmentDetails } from './Main/WebPage/appointment/appointmentDetails';
import DoctorService from './services/doctorService';
import { Faqs } from './Main/WebPage/FAQS/faqs';
import { TermsAndCondition } from './Main/WebPage/termsCondition/termsAndCondition';
import ScrollToTop from './Main/Component/scrollComponent';
import Reviews from './Main/WebPage/reviews/reviews';
// import { Page404 } from './Main/Component/page404';

export const SidebarContext = createContext({ sideBar: false, setSideBar: () => { } })

function App() {
  //for sideBar and top header functionality
  const [sideBar, setsideBar] = useState(false);
  const getSideBarPos = (value) => {
    setsideBar(!value);
  }
  const { getStorageData, getToken, clearToken, getDoctorData } = TokenService();
  const token = getToken();
  const userType = getStorageData();


  return (
    <>
      {token && userType.type ?
        <SidebarContext.Provider value={{ sideBar: sideBar, setSideBar: setsideBar }}>
          <Sidebar />
          <div className={sideBar ? 'AppFull' : 'App'}>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.HOMEPAGE} element={<Dashboard />} />
                <Route path={ROUTES.APPOINTMENT} element={<Appointment />} />
                <Route path={ROUTES.TOTALPROFIT} element={< TotalProfile />} />
                <Route path={ROUTES.SALES} element={< Sales />} />
                <Route path={ROUTES.PROFILE} element={< Profile />} />
                <Route path={ROUTES.FAQS} element={< Faqs />} />
                <Route path={ROUTES.TERMS} element={< TermsAndCondition />} />
                <Route path={ROUTES.REVIEWS} element={< Reviews />} />
                <Route path={`${ROUTES.APPOINTMENT_DETAILS}/:detailsId`} element={<AppointmentDetails />} />
              </Route>
            </Routes>
          </div>
        </SidebarContext.Provider>
        :
        <Routes><Route path={ROUTES.HOMEPAGE} element={<Login />} /></Routes>

      }

    </>
  );
}

export default App;
