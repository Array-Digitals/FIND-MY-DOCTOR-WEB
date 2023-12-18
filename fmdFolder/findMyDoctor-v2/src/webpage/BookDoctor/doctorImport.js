import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom/dist'
import self from '../../assets/images/BookDoctor/self.png'
import visaMaster from '../../assets/images/visaAndMasterCard.png'
import online from '../../assets/images/BookDoctor/online.png'
import physical from '../../assets/images/BookDoctor/physical.png'
import family from '../../assets/images/BookDoctor/family.png'
import verified from '../../assets/images/BookDoctor/verified.png'
import DatePicker from "react-datepicker";
import { Greeting } from '../Component/greeting';
import BookDoctorAPI from '../../services/bookDoctor'
import { ROUTING } from '../../utils/routes'
import { LoginPopup } from '../Component/loginPopup'
import { AddBeneficiary } from '../Component/addBeneficiary'
import { SignupPopup } from '../Component/RegisterPopup'
import TokenService from '../../services/token.service'
import TimePicker from 'react-time-picker';
import UserData from '../../services/userData'
import Slider from 'react-slick'
import banner1 from '../../assets/images/banners/desktopBanner/DocBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/DocBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/DocBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/docBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/docBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/docBan3.jpg'
import BannerService from '../../services/bannerService';
import { imageUrl } from '../../services/baseUrl';

export{
    BannerService,imageUrl,  React, useRef, useState, useEffect, Link, TimePicker, Greeting, LoginPopup, AddBeneficiary, SignupPopup , self, visaMaster, online, physical, family, verified, DatePicker, BookDoctorAPI, TokenService, ROUTING, UserData, Slider, banner1, banner2, banner3, MobBanner1, MobBanner2, MobBanner3
};

