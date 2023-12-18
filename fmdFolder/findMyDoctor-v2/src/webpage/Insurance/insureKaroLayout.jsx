import React, { useState } from 'react'
import { InsureKaro } from './insureKaro'
import { Outlet, useMatch } from 'react-router-dom';
import Slider from 'react-slick'
import banner1 from '../../assets/images/banners/desktopBanner/InsBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/InsBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/InsBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/insBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/insBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/insBan3.jpg'
import { BannerService } from '../BookLab/labImports';
import { imageUrl } from '../BookLab/labImports';
import { useEffect } from 'react';


 const InsureKaroLayout = () => {

    const isMatch = useMatch("/:children");
    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    })



    const { getBanners } = BannerService();
    const [bannersDesk, setDeskBanners] = useState([])
    const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 13 : 12);

    useEffect(() => {
        const handleResize = () => {
            setBannerType(window.innerWidth >= 991 ? 13 : 12);
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
        // console.log(bannerType, 'bannerrr');
        try {
            const bannerResponse = await getBanners(bannerType);
            const responseData = bannerResponse.data.data;
            setDeskBanners(responseData);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };



    return (
        <React.Fragment>
            <main >
                <div className="insurance mainServiceContainer">
                    <section className="insuranceBanner">
                        <Slider {...settings}>
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
                    <React.Fragment>

                        {!!isMatch ? <InsureKaro /> : <Outlet />}
                    </React.Fragment>


                </div>
            </main >
        </React.Fragment>
    )
}

export default InsureKaroLayout;