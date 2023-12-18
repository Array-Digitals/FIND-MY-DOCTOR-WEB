import React, { useState } from 'react'
import self from '../../assets/images/BookDoctor/self.png'
import parent from '../../assets/images/BookDoctor/parents.png'
import wife from '../../assets/images/BookDoctor/wife.png'
import { Outlet, useMatch } from 'react-router-dom'
import BuyingFor  from './Buyer'
import Slider from "react-slick";
import banner1 from '../../assets/images/banners/desktopBanner/PharmBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/PharmBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/PharmBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/pharmBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/pharmBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/pharmBan3.jpg'
import { BannerService } from '../BookLab/labImports'
import { imageUrl } from '../BookLab/labImports'
import { useEffect } from 'react'
import { Loader } from '../Component/loader'

 const Pharmacy = ({ isForBeneficiary }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMatch = useMatch("/:children");
  const [settings1, setSettings1] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  })



  const { getBanners } = BannerService();
  const [bannersDesk, setDeskBanners] = useState([])
  const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 15 : 20);

  useEffect(() => {
    const handleResize = () => {
      setBannerType(window.innerWidth >= 991 ? 15 : 20);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [bannerType]);

  const fetchData = async () => {
    try {
      const bannerResponse = await getBanners(bannerType);
      const responseData = bannerResponse.data.data;
      setDeskBanners(responseData);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <main >
      {
        isLoading ?
          <Loader />
          :
          <div className="pharmacy mainServiceContainer" >
            <section className="pharmacyBanner">
              <Slider {...settings1}>
                {
                  bannersDesk.map((item, keyId) => {
                    let desktopImage = `${imageUrl}/${item.image}`
                    return (
                      <div className="banner" key={keyId}>
                        <div className="bannerInner">
                          <img loading="lazy" src={desktopImage} alt="reload page" />
                        </div>
                      </div>
                    )
                  })
                }
              </Slider>



            </section>
            <div className="switchDiv" >

              {!!isMatch ? <BuyingFor isForBeneficiary={isForBeneficiary} /> : <Outlet />}
            </div>

          </div>
      }

    </main >
  )
}

export default Pharmacy