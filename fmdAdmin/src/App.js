import React, { useState, useEffect, useLayoutEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import './style.css';
import { Layout } from './Main/layout';
import { Sidebar } from './Main/Component/sidebar';
import { DoctorForm } from './Main/WebPage/Doctors/DoctorForm';
import { Dashboard } from './Main/WebPage/dashboard/dashboard';
import { ROUTES } from './utils/Routes';
import { LabForm } from './Main/WebPage/Labs/labForm';
import { PharmacyForm } from './Main/WebPage/pharmacy/pharmacyForm';
import { ManageDoctor } from './Main/WebPage/Doctors/manageDoctor';
import { ManageLab } from './Main/WebPage/Labs/manageLab';
import { ManagePharmacy } from './Main/WebPage/pharmacy/managePharmacy';
import { ProductForm } from './Main/WebPage/pharmacy/productForm';
import { BrandForm } from './Main/WebPage/pharmacy/brandForm';
import { CategoryForm } from './Main/WebPage/pharmacy/CategoryForm';
import { Profile } from './Main/WebPage/profile/profile';
import { UserForm } from './Main/WebPage/user/userForm';
import { ManageUser } from './Main/WebPage/user/manageUser';
import { InsurancePackage } from './Main/WebPage/Insurance/InsurancePackage';
import { InsuranceProvider } from './Main/WebPage/Insurance/InsuranceProvider';
import { ManageInsurancePackage } from './Main/WebPage/Insurance/manageInsurancePackage';
import { ManageInsuranceProvider } from './Main/WebPage/Insurance/manageInsuranceProvider';
import { AddTest } from './Main/WebPage/Labs/addTestForm';
import { AddTestLabForm } from './Main/WebPage/Labs/addTestLabForm';
import { Consultation } from './Main/WebPage/Doctors/consultation';
import { Login } from './Main/WebPage/login';
import TokenService from './services/tokenService';
import { Page404 } from './Main/Component/page404';
import { AddAssitant } from './Main/WebPage/Labs/AddLabAssitant';
import { SpecilistCategory } from './Main/WebPage/Doctors/SpeclistCategory';
import { DoctorTypeCategory } from './Main/WebPage/Doctors/doctorType';
import { DoctorFormUpdate } from './Main/WebPage/Doctors/DoctorFormUpdate';
import { LabUpdate } from './Main/WebPage/Labs/labUpdateForm';
import { Cities } from './Main/WebPage/Services/cities';
import { ProductUpdateForm } from './Main/WebPage/pharmacy/productUpdateForm';
import { OrderTracking } from './Main/WebPage/pharmacy/orderTracking';
import { AllOrders } from './Main/WebPage/pharmacy/allOrders';
import AllLabTests from './Main/WebPage/Labs/allTests';
import { LabCurrentOrders } from './Main/WebPage/Labs/labCurerntOrders';
import { LabHistoryOrders } from './Main/WebPage/Labs/labHistoryOrders';
import { AssignTest } from './Main/WebPage/Labs/assignToTest';
import { LabBookingDetails } from './Main/WebPage/Labs/LabBookingDetails';
import { DoctorReport } from './Main/WebPage/adminReports/DoctorReport';
import { LabReport } from './Main/WebPage/adminReports/labReport';
import { OrderReport } from './Main/WebPage/adminReports/OrderReport';
import { InsuranceReport } from './Main/WebPage/adminReports/InsuranceReport';
import { LabortionistReport } from './Main/WebPage/adminReports/LabortionistReport';
import { UserLabBookingReport } from './Main/WebPage/adminReports/userLabBookingReport';
import { UserDoctorBookingReport } from './Main/WebPage/adminReports/userDoctorBookingReport';
import { PromoCode } from './Main/WebPage/Services/promoCode';
import { Banners } from './Main/WebPage/Services/banners';
import { PushNotification } from './Main/WebPage/Services/pushNotification';
import { PopupService } from './Main/WebPage/Services/popup';
import ScrollToTop from './Main/Component/scrollComponent';
import { ManageCategory } from './Main/WebPage/pharmacy/manageCategory';
import { ManageBrand } from './Main/WebPage/pharmacy/manageBrand';
// import { UpdateDoctorType } from './Main/WebPage/Doctors/updateDoctorType';
import { DoctorBooking } from './Main/WebPage/Doctors/doctorBooking';
import { HistoryDoctorBooking } from './Main/WebPage/Doctors/historyAllBooking';
import { BookingDetails } from './Main/WebPage/Doctors/bookingDetails';
import { AssignDoctor } from './Main/WebPage/Doctors/assignDoctor';
import { UpdateSpecilistCategory } from './Main/WebPage/Doctors/SpeclistCategoryUpdate';
import { UpdateDoctorTypeCategory } from './Main/WebPage/Doctors/updateDoctorSpecialityType';
import { BookingDetailsAll } from './Main/WebPage/Doctors/bookingDetailsAll';
import { UpdateBrandForm } from './Main/WebPage/pharmacy/updateBrand';
import { UpdateCategoryForm } from './Main/WebPage/pharmacy/updateCategory';
import { UpdateInsurancePackage } from './Main/WebPage/Insurance/updateInsurancePackage';
import { InsuranceProviderUpdate } from './Main/WebPage/Insurance/InsuranceProviderUpdate';
import { AllInsuranceBooking } from './Main/WebPage/Insurance/allInsuranceBookings';
import { InsuranceProviderBooking } from './Main/WebPage/Insurance/providerInsuranceBookings';
import { UserUpdateForm } from './Main/WebPage/user/userUpdateForm';
import { NewsLetter } from './Main/WebPage/Services/newsLetter';
import { ContactUsForm } from './Main/WebPage/Services/contactUsForm';

export const SidebarContext = createContext({ sideBar: false, setSideBar: () => { } })

function App() {
  //for sideBar and top header functionality
  const [sideBar, setsideBar] = useState(false);
  const { getStorageData, getToken } = TokenService();
  const getSideBarPos = (value) => {
    setsideBar(!value);
  }
  const token = getToken();
  const userType = getStorageData();
  // console.log(userType, 'userTypeeee');

  // const { getStorageData } = TokenService();
  // const [userAdminData, setUserAdminData] = useState(getStorageData());


  // const [userAdminData, setUserAdminData] = useState(getStorageData());
  const [userAuth, setUserAuth] = useState({});

  // console.log(userAuth, 'authhh');

  useLayoutEffect(() => {
    if (token && userType.type) {
      setUserAuth(JSON.parse(getStorageData().access.permissions))
    }
  }, [userType?.type])

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
    // console.log(userAuth, 'usadad');
  }, [userAuth]);






  return (
    <>
      {token && userType.type ?
        <SidebarContext.Provider value={{ sideBar: sideBar, setSideBar: setsideBar }}>
          <Sidebar />
          <div className={sideBar ? 'AppFull' : 'App'}>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.PROFILE} element={<Profile />} />
                <Route path={ROUTES.HOMEPAGE} element={<Dashboard />} />
                {isUserAuth.doctor === 1 && (
                  <>
                    {userAuth.doctor.add === 1 &&
                      <>
                        <Route path={ROUTES.DOCTOR_FORM} element={<DoctorForm />} />
                        <Route path={ROUTES.DOCTOR_TYPE} element={< DoctorTypeCategory />} />
                        <Route path={ROUTES.SPECIALIST} element={< SpecilistCategory />} />
                      </>
                    }
                    {userAuth.doctor.manage === 1 &&
                      <>
                        <Route path={`${ROUTES.DOCTOR_UPDATE_FORM}/:docId`} element={<DoctorFormUpdate />} />
                        <Route path={ROUTES.DOCTOR_MANAGE} element={<ManageDoctor />} />
                        <Route path={ROUTES.HISTORY_DOCTOR_BOOKING} element={<HistoryDoctorBooking />} />
                        <Route path={`${ROUTES.CATEGORY_DOCTOR_UPDATE}/:categoryId`} element={< UpdateDoctorTypeCategory />} />
                        <Route path={`${ROUTES.SPECIALIST_DOCTOR_UPDATE}/:specialistId`} element={< UpdateSpecilistCategory />} />

                        <Route path={ROUTES.DOCTOR_BOOKING} element={<DoctorBooking />} />
                        <Route path={`${ROUTES.DOCTOR_BOOKING_DETAILS}/:doctorBookingId`} element={< BookingDetails />} />
                        <Route path={`${ROUTES.DOCTOR_BOOKING_DETAIL}/:doctorBookingId`} element={< BookingDetailsAll />} />
                      </>
                    }
                    {userAuth.doctor.assign === 1 &&
                      <Route path={ROUTES.ASSIGN_DOCTOR} element={<AssignDoctor />} />
                    }

                    {/* <Route path={`${ROUTES.UPDATE_DOCTOR_TYPE}/:physicalCategoryId`} element={< UpdateDoctorType  />} /> */}
                  </>
                )}
                {isUserAuth.lab === 1 && (
                  <>
                    {userAuth.doctor.add === 1 &&
                      <>
                        <Route path={ROUTES.LAB_FORM} element={<LabForm />} />
                        <Route path={ROUTES.LAB_ASISTANT} element={<AddAssitant />} />
                      </>
                    }
                    {userAuth.lab.addTest === 1 &&
                      <>
                        <Route path={ROUTES.TEST_FORM} element={<AddTest />} />
                        <Route path={ROUTES.TEST_TO_LAB} element={<AddTestLabForm />} />
                      </>
                    }
                    {userAuth.lab.assign === 1 &&
                      <Route path={ROUTES.ASSIGN_TEST} element={<AssignTest />} />
                    }
                    {
                      userAuth.lab.manageOrder === 1 &&
                      <>
                        <Route path={`${ROUTES.LAB_BOOKING}/:BookingId`} element={< LabBookingDetails />} />
                        <Route path={`${ROUTES.CURRENT_ORDERS_LAB}/:LabPersonalId`} element={<LabCurrentOrders />} />
                        <Route path={`${ROUTES.HISTORY_ORDERS_LAB}/:LabPersonalId`} element={<LabHistoryOrders />} />
                        <Route path={ROUTES.ALL_TEST} element={<AllLabTests />} />
                      </>
                    }
                    {
                      userAuth.lab.manage === 1 &&
                      <>
                        <Route path={`${ROUTES.UPDATE_LAB_FORM}/:labId`} element={<LabUpdate />} />
                        <Route path={ROUTES.LAB_MANAGE} element={<ManageLab />} />
                      </>
                    }
                  </>
                )}
                {isUserAuth.pharmacy === 1 && (
                  <>
                    {userAuth.pharmacy.add === 1 && (
                      <>
                        <Route path={ROUTES.PRODUCT_FORM} element={< ProductForm />} />
                        <Route path={ROUTES.BRAND_FORM} element={< BrandForm />} />
                        <Route path={ROUTES.CATEGORY_FORM} element={< CategoryForm />} />
                      </>
                    )}
                    {userAuth.pharmacy.manage === 1 && (
                      <>
                        <Route path={ROUTES.PHARMACY_MANAGE} element={<ManagePharmacy />} />
                        <Route path={ROUTES.BRAND_MANAGE} element={< ManageBrand />} />
                        <Route path={ROUTES.CATEGORY_MANAGE} element={< ManageCategory />} />

                        <Route path={`${ROUTES.BRAND_UPDATE}/:brandId`} element={< UpdateBrandForm />} />
                        <Route path={`${ROUTES.CATEGORY_UPDATE}/:categoryId`} element={< UpdateCategoryForm />} />
                        <Route path={`${ROUTES.PRODUCT_UPDATE_FORM}/:productId`} element={< ProductUpdateForm />} />
                      </>
                    )}
                    {userAuth.pharmacy.track === 1 && (
                      <Route path={ROUTES.PRODUCT_TRACKING} element={< OrderTracking />} />
                    )}
                    {userAuth.pharmacy.allOrder === 1 && (
                      <Route path={ROUTES.ALL_ORDERS} element={<AllOrders />}></Route>
                    )}
                  </>
                )}
                {isUserAuth.insurance === 1 && (
                  <>
                    {
                      userAuth.insurance.addPkg === 1 &&
                      <Route path={ROUTES.INSURANCE_PACKAGE_FORM} element={< InsurancePackage />} />
                    }
                    {
                      userAuth.insurance.addProv === 1 &&
                      <Route path={ROUTES.INSURANCE_PROVIDER_FORM} element={< InsuranceProvider />} />
                    }
                    {
                      userAuth.insurance.managePkg === 1 &&
                      <>
                        <Route path={ROUTES.INSURANCE_PACKAGE_MANAGE} element={< ManageInsurancePackage />} />
                        <Route path={`${ROUTES.UPDATE_INSURANCE_PACKAGE}/:packageId`} element={< UpdateInsurancePackage />} />
                      </>
                    }
                    {
                      userAuth.insurance.manageProv === 1 &&
                      <>
                        <Route path={ROUTES.INSURANCE_PROVIDER_MANAGE} element={< ManageInsuranceProvider />} />
                        <Route path={`${ROUTES.UPDATE_INSURANCE_PROVIDER}/:providerId`} element={< InsuranceProviderUpdate />} />
                      </>
                    }
                    {
                      userAuth.insurance.manageBooking === 1 &&
                      <Route path={ROUTES.ALL_INSURANCE_BOOKING} element={< AllInsuranceBooking />} />
                    }
                    {
                      userAuth.insurance.insureBooking === 1 &&
                      <Route path={ROUTES.INSURANCE_PROVIDER_BOOKING} element={< InsuranceProviderBooking />} />
                    }
                  </>
                )}
                {isUserAuth.admin === 1 && (
                  <>
                    {
                      userAuth.admin.add === 1 &&
                      <Route path={ROUTES.USER_FORM} element={< UserForm />} />
                    }
                    {
                      userAuth.admin.manage === 1 &&
                      <>
                        <Route path={ROUTES.USER_MANAGE} element={< ManageUser />} />
                        <Route path={`${ROUTES.USER_UPDATE_FORM}/:adminId`} element={< UserUpdateForm />} />
                      </>
                    }
                    {
                      userAuth.admin.manage === 1 &&
                      <>
                        <Route path={ROUTES.CITY} element={< Cities />} />
                        <Route path={ROUTES.NEWS_LETTER} element={< NewsLetter />} />
                        <Route path={ROUTES.PROMO_CODE} element={< PromoCode />} />
                        <Route path={ROUTES.CONATCT_US} element={< ContactUsForm />} />
                        <Route path={ROUTES.BANNERS} element={<Banners />} />
                        <Route path={ROUTES.PUSH_NOTIFICATION} element={<PushNotification />} />
                        <Route path={ROUTES.ADD_POPUP} element={<PopupService />} />
                      </>
                    }

                  </>
                )}
                {userAuth?.doctor?.report === 1 &&
                  <>
                    <Route path={ROUTES.DOCTOR_REPORT} element={<DoctorReport />} />
                    <Route path={ROUTES.USER_DOCTOR_BOOKING_REPORT} element={<UserDoctorBookingReport />} />
                  </>
                }
                {userAuth?.lab?.reportOrder === 1 &&
                  <>
                    <Route path={ROUTES.LAB_REPORT} element={<LabReport />} />
                    <Route path={ROUTES.USER_LAB_BOOKING_REPORT} element={<UserLabBookingReport />} />
                  </>
                }
                {
                  userAuth?.insurance?.insureReport === 1 &&
                  <Route path={ROUTES.INSURANCE_REPORT} element={<InsuranceReport />} />
                }
                {
                  userAuth?.pharmacy?.orderReporting === 1 &&
                  <Route path={ROUTES.ORDER_REPORT} element={<OrderReport />} />
                }
                {
                  userAuth?.lab?.reportPhlebotomist === 1 &&
                  <Route path={ROUTES.PHLEBOTOMIST_REPORT} element={<LabortionistReport />} />
                }
                <Route path='/*' element={<Page404 />}></Route>
              </Route>
            </Routes>
          </div>
        </SidebarContext.Provider>
        :
        <Routes>
          <Route path={ROUTES.HOMEPAGE} element={<Login />} />
          <Route path='/*' element={<Page404 />}></Route>
        </Routes>
      }

    </>
  );
}

export default App;
