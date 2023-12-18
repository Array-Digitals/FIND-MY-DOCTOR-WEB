import React, { useContext, useEffect, useState } from 'react'
import Abocal from "../../assets/images/Pharmacy/abocal.png"
import Abocran from "../../assets/images/Pharmacy/Abocran.png"
import Acefyl from "../../assets/images/Pharmacy/acefyl.png"
import Acefyl2 from "../../assets/images/Pharmacy/aceful2.png"
import Slider from "react-slick";
import { Link, useFetcher } from 'react-router-dom'
import { categoryIdContext } from '../../context/contextFile'
import { ROUTING } from '../BookLab/labImports'
import PharmacyBuy from '../../services/pharmacy'
import { ProductItem } from '../Component/productItem'
// import { ProductItem } from './ProductItem'
import { imageUrl } from '../../services/baseUrl'

 const OurCategories = () => {

    const { getCategory, getCategoryProduct } = PharmacyBuy();

    const categoryContextValue = useContext(categoryIdContext);
    // let imageUrl = "http://fmd.arraydigitals.com/"

    // useEffect(() => {
    //     console.log(categoryContextValue, 'ddddffffff');
    // }, [categoryContextValue])
    const [allCategories, setAllCategories] = useState([])
    const [isAllCategory, setIsAllCategory] = useState(false);

    useEffect(() => {
        getCategory().then((res) => {
            setAllCategories(res?.data?.data)
            setIsAllCategory(true)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [singleCategoryData, setSingleCategoryData] = useState([])
    
    useEffect(() => {

        getCategoryProduct(selectedCategoryId || categoryContextValue || allCategories[0]?.id)
            .then((res) => {
                setSingleCategoryData(res?.data?.data)
                console.log(res.data.data, 'asdd');
            }).catch((res) => {
                console.log(res, 'error');
            })

    }, [selectedCategoryId, isAllCategory])

    const [settings, setSettings] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    return (
        <>
            <div className="ourCategories">
                <div className="container">
                    <div className="productMain">
                        <div className="mainHeading">
                            <p>Our <span>Categories</span></p>
                        </div>
                        <div className="categoryCarousel brandCarousel">

                            <div className="carousel">
                                <Slider {...settings}>
                                    {
                                        allCategories?.map((item, keyId) => {
                                            return (
                                                <div key={keyId} className='carouselItem relativeCarouselItem'>
                                                    <button to={ROUTING.OUR_CATEGORIES} onClick={() => setSelectedCategoryId(item.id)}
                                                        // onClick={}
                                                        draggable="false" className="inner" >
                                                        <img loading="lazy" className='carouselItemImage' src={`${imageUrl}/${item?.image}`} alt="reload page" />
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>


                        </div>
                        <div className="bestSellerBody">
                            <div className="productItems">
                                <div className="row g-3">
                                    {
                                        singleCategoryData?.map((item, keyId) => {
                                            return (
                                                <ProductItem key={keyId} productObject={item} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default OurCategories
