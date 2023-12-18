import React, { useState, useEffect ,  lazy, Suspense } from "react";
import "./styles/style.css";
import "./styles/responsive.css";
import { Layout } from "./webpage/layout";
import { userLoggedIn, categoryIdContext, userBeneFiciary } from './context/contextFile.jsx'
import TokenService from "./services/token.service";
import ScrollToTop from "./webpage/Component/scrollToTop";
import { FireBaseNotification } from "./webpage/Component/fireBaseNotification";
// import { Page404 } from "./webpage/Component/page404";
import { Loader } from "./webpage/Component/loader.jsx";
import { Route, Routes } from "react-router-dom";
import { ROUTING } from "./utils/routes.js";



const HomePage = lazy(() => import("./webpage/homePage/homePage.jsx"));
const BookDoctor = lazy(() => import("./webpage/BookDoctor/bookDoctor"));
const BookLab = lazy(() => import("./webpage/BookLab/bookLab"));
const Insure = lazy(() => import("./webpage/Insurance/insure"));
const Pharmacy = lazy(() => import("./webpage/Pharmacy/pharmacy"));
const OurProducts = lazy(() => import("./webpage/Pharmacy/ourProducts"));
const BestSeller = lazy(() => import("./webpage/Pharmacy/bestSeller"));
const FrequentlyBought = lazy(() => import("./webpage/Pharmacy/frequentlyBought"));
const OurCategories = lazy(() => import("./webpage/Pharmacy/ourCategories"));
const Brands = lazy(() => import("./webpage/Pharmacy/brands"));
const ProductItem = lazy(() => import("./webpage/Pharmacy/ProductItem"));
const Cart = lazy(() => import("./webpage/Pharmacy/cart"));
const CheckOut = lazy(() => import("./webpage/Pharmacy/checkOut"));
const Login = lazy(() => import("./webpage/Registration/login"));
const Signup = lazy(() => import("./webpage/Registration/signup"));
const Contact = lazy(() => import("./webpage/ContactUs/contact"));
const Aboutus = lazy(() => import("./webpage/aboutUs/aboutus"));
const ProfileLayout = lazy(() => import("./webpage/profile/profileLayout"));
const Myprofile = lazy(() => import("./webpage/profile/profilePages/myprofile"));
const Beneficiary = lazy(() => import("./webpage/profile/profilePages/Beneficiary"));
const Reports = lazy(() => import("./webpage/profile/profilePages/reports"));
const MyInsurance = lazy(() => import("./webpage/profile/profilePages/insurance"));
const Billing = lazy(() => import("./webpage/profile/profilePages/billing"));
const Payment = lazy(() => import("./webpage/profile/profilePages/payment"));
const Logout = lazy(() => import("./webpage/profile/profilePages/logout"));
const Prescibtion = lazy(() => import("./webpage/profile/profilePages/prescibtion"));
const PrivacyPolicy = lazy(() => import("./webpage/Policies/privacyPolicy"));
const ShippingPolicy = lazy(() => import("./webpage/Policies/shippingPolicy"));
const ReturnPolicy = lazy(() => import("./webpage/Policies/returnPolicy"));
const Faqs = lazy(() => import("./webpage/Policies/faqs"));
const ChangePassword = lazy(() => import("./webpage/profile/profilePages/changePassword"));
const ForgetPassword = lazy(() => import("./webpage/Registration/forgetPassword"));
const DigitalRoshan = lazy(() => import("./webpage/Insurance/digitalRoshan"));
const OrderUser = lazy(() => import("./webpage/profile/profilePages/ordersUser"));
const InsureKaroLayout = lazy(() => import("./webpage/Insurance/insureKaroLayout"));
const SehatCard = lazy(() => import("./webpage/Insurance/sehatCard"));
const TermsOfUse = lazy(() => import("./webpage/Policies/termsOfUse"));
const LabBookingDetails = lazy(() => import("./webpage/profile/profilePages/labBookingDetails"));
const Page404 = lazy(() => import("./webpage/Component/page404"));
const Blogs = lazy(() => import("./webpage/Blogs/blogs"));
const DoctorBookingDetails = lazy(() => import("./webpage/profile/profilePages/doctorBookingDetails"));
const NewPassword = lazy(() => import("./webpage/Registration/newPassword"));

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const loggedFunc = (data) => {
    setIsUserLoggedIn(data)
  }
  const { getToken, getStorageData, rememberSet, rememberGet } = TokenService();
  const [userToken, setUserToken] = useState();
  const [idFromProduct, setIdFromProduct] = useState(null);

  useEffect(() => {
    if (rememberGet()) {
      setUserToken(getToken(rememberGet()))
    }
    else {
      setUserToken(getToken())

    }
  })
  const getIdFromProduct = (data) => {
    setIdFromProduct(data)
  }

  const [idFromBene, setIdFromBene] = useState('');
  const isForBeneficiary = (data) => {
    setIdFromBene(data)
  }

//doc
  return (
    <div className="App">

      <FireBaseNotification />
      <ScrollToTop />
      <userLoggedIn.Provider value={isUserLoggedIn}>
        <categoryIdContext.Provider value={idFromProduct}>
          <userBeneFiciary.Provider value={idFromBene}>
            <Suspense fallback={<Loader/>}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path={ROUTING.HOMEPAGE} element={<HomePage />} />
                  <Route path={ROUTING.BOOK_DOCTOR} element={<BookDoctor />} />
                  <Route path={ROUTING.BOOK_LAB} element={<BookLab />} />
                  <Route path={ROUTING.INSURE_KARO} element={<InsureKaroLayout />} >
                    <Route path={ROUTING.INSURANCE} element={<Insure />} />
                    <Route path={ROUTING.DIGITAL_ROSHAN} element={<DigitalRoshan />} />
                    <Route path={ROUTING.SEHAT_CARD} element={<SehatCard />} />
                  </Route>
                  <Route path={ROUTING.PHARMACY} element={<Pharmacy isForBeneficiary={isForBeneficiary} />}>
                    {/* <Route path={ROUTING.BUYINGFOR} element={<BuyingFor  />} /> */}
                    <Route path={ROUTING.OURPRODUCTS} element={<OurProducts getIdFromProduct={getIdFromProduct} />} />
                    <Route path={ROUTING.BESTSELLER} element={<BestSeller />} />
                    <Route path={ROUTING.BESTSELLER} element={<BestSeller />} />
                    <Route path={ROUTING.FREQUENTLY_BOUGHT} element={<FrequentlyBought />} />
                    <Route path={ROUTING.OUR_CATEGORIES} element={<OurCategories />} />
                    <Route path={ROUTING.BRANDS} element={<Brands />} />
                    <Route path={`${ROUTING.PRODUCT_ITEM}/:productItemId`} element={<ProductItem />} />
                    <Route path={ROUTING.CART} element={<Cart />} />
                    {
                      userToken &&
                      <Route path={ROUTING.CHECKOUT} element={<CheckOut />} />
                    }
                  </Route>
                  <Route key="contact" path={ROUTING.CONTACT} element={<Contact />} />
                  <Route path={ROUTING.ABOUTUS} element={<Aboutus />} />
                  {
                    userToken &&
                    <>
                      <Route path={ROUTING.PROFILE} element={<ProfileLayout />}>
                        <Route path={ROUTING.MYPROFILE} element={<Myprofile />} />
                        <Route path={ROUTING.BENEFICIARY} element={<Beneficiary />} />
                        <Route path={`${ROUTING.BENEFICIARY}/:beneficiaryId`} element={<Beneficiary />} />
                        <Route path={ROUTING.PRESCIPTION} element={<Prescibtion />} />
                        <Route path={ROUTING.REPORT} element={<Reports />} />
                        <Route path={ROUTING.ORDERS} element={<OrderUser />} />
                        <Route path={ROUTING.MY_INSURANCE} element={<MyInsurance />} />
                        <Route path={ROUTING.BILLING} element={<Billing />} />
                        <Route path={ROUTING.PAYMENT} element={<Payment />} />
                        <Route path={ROUTING.LOGOUT} element={<Logout />} />
                      </Route>
                      <Route path={`${ROUTING.LAB_BOOKING}/:BookingId`} element={< LabBookingDetails />} />
                      <Route path={`${ROUTING.DOCTOR_BOOKING}/:DoctorBookingId`} element={< DoctorBookingDetails />} />
                    </>
                  }

                  <Route path={ROUTING.LOGIN} element={<Login isLogin={loggedFunc} />} />
                  <Route path={ROUTING.BLOGS} element={<Blogs />}></Route>
                  <Route path={ROUTING.SIGNUP} element={<Signup />} />
                  <Route path={ROUTING.PRIVACY_POLICY} element={<PrivacyPolicy />} />
                  <Route path={ROUTING.SHIPPING_POLICY} element={<ShippingPolicy />} />
                  <Route path={ROUTING.RETURN_POLICY} element={<ReturnPolicy />} />
                  <Route path={ROUTING.TERMS_OF_USE} element={<TermsOfUse />} />
                  <Route path={ROUTING.FAQS} element={<Faqs />} />
                  <Route path={ROUTING.PASSWORD} element={<ChangePassword />} />
                  <Route path={ROUTING.FORGET_PASSWORD} element={<ForgetPassword />} />
                  <Route path={`${ROUTING.CHANGE_PASSWORD}`} element={<NewPassword />} />
                  <Route path='/*' element={<Page404 />} />
                </Route>
              </Routes>
            </Suspense>
          </userBeneFiciary.Provider>
        </categoryIdContext.Provider>
      </userLoggedIn.Provider>

    </div>
  );
}

export default App;
