import React, { useEffect, useRef, useState } from 'react'
import self from '../../assets/images/BookDoctor/self.png'
// import { LoginPopup } from '../Component/loginPopup'
import confirmTestImg from '../../assets/images/bookLab/confirmTest.png'
import family from '../../assets/images/BookDoctor/family.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import visaMaster from '../../assets/images/visaAndMasterCard.png'
import TimePicker from 'react-time-picker';
import { Greeting } from '../Component/greeting'
import BookLabAPI from '../../services/BookLab'
import TokenService from '../../services/token.service'
import { SignupPopup } from '../Component/RegisterPopup'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../utils/routes'
import UserData from '../../services/userData'
import { AddBeneficiary } from '../Component/addBeneficiary'
import testImg1 from '../../assets/images/bookLab/tests/img1.png'
import testImg2 from '../../assets/images/bookLab/tests/img2.jpg'
import testImg3 from '../../assets/images/bookLab/tests/img3.png'
import testImg4 from '../../assets/images/bookLab/tests/img4.png'
import testImg5 from '../../assets/images/bookLab/tests/img5.jpg'
import testImg6 from '../../assets/images/bookLab/tests/img6.png'
import testImg7 from '../../assets/images/bookLab/tests/img7.jpg'
import testImg8 from '../../assets/images/bookLab/tests/img8.png'
import banner1 from '../../assets/images/banners/desktopBanner/LabBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/LabBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/LabBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/labBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/labBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/labBan3.jpg'
import BannerService from '../../services/bannerService';
import { imageUrl } from '../../services/baseUrl';
// import LabService from './labService';


export {
  BannerService,
  imageUrl,
  React,
  useState,
  // LoginPopup,
  confirmTestImg,
  DatePicker,
  visaMaster,
  useEffect,
  useRef,
  Greeting,
  BookLabAPI,
  TokenService,
  SignupPopup,
  Link,
  ROUTING,
  self,
  UserData,
  AddBeneficiary,
  Slider,
  TimePicker,
  family,
  testImg1,
  testImg2,
  testImg3,
  testImg4,
  testImg5,
  testImg6,
  testImg7,
  testImg8,
  MobBanner1,
  MobBanner2,
  MobBanner3,
  banner1,
  banner2,
  banner3,
};

