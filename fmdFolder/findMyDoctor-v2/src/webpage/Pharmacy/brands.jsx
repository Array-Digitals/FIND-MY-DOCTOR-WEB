import React, { useContext, useEffect, useState } from 'react'
import Abocal from "../../assets/images/Pharmacy/abocal.png"
import Abocran from "../../assets/images/Pharmacy/Abocran.png"
import Acefyl from "../../assets/images/Pharmacy/acefyl.png"
import Acefyl2 from "../../assets/images/Pharmacy/aceful2.png"
import Agp from '../../assets/images/Pharmacy/agp.png'
import Slider from "react-slick";
import { categoryIdContext } from '../../context/contextFile'
import PharmacyBuy from '../../services/pharmacy'
import { ROUTING } from '../BookLab/labImports'
import { ProductItem } from '../Component/productItem'

 const Brands = () => {
    const imageUrl = "http://fmd.arraydigitals.com"
    const brandContextValue = useContext(categoryIdContext);
    const [selectedBrandId, setSelectedBrandId] = useState(null)
    const [isAllBrand, setIsAllBrand] = useState(false);

    const [allBrands, setAllBrands] = useState([])

    const { getBrand, getBrandProduct } = PharmacyBuy();

    useEffect(() => {

        getBrand().then((res) => {
            setAllBrands(res?.data?.data)
            console.log(res?.data?.data, 'responsee');
            setIsAllBrand(true);
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const [singleBrandData, setSingleBrandData] = useState([])

    useEffect(() => {

        // console.log(selectedBrandId || brandContextValue || allBrands[0]?.id, 'dddddddddddd');
        getBrandProduct(selectedBrandId || brandContextValue || allBrands[0]?.id)
            .then((res) => {
                setSingleBrandData(res?.data?.data)
                console.log(res.data.data, 'asdd');
            }).catch((res) => {
                console.log(res, 'error');
            })

    }, [selectedBrandId, isAllBrand])


    const [settings, setSettings] = useState({
        dots: false,

        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        // prevArrow: <button type="button" className="slick-prev">Previous</button>,
        // nextArrow: <button type="button" className="slick-next">Next</button>,
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
            <div className="brands">
                <div className="container">
                    <div className="productMain">
                        <div className="mainHeading">
                            <p> <span>Brands</span></p>
                        </div>
                        <div className="categoryCarousel brandCarousel">

                            <div className="carousel">
                                <Slider {...settings}>

                                    {
                                        allBrands?.map((item, keyId) => {
                                            // console.log(item, 'asddddd');
                                            return (
                                                <div key={keyId} className='carouselItem relativeCarouselItem'>
                                                    <button to={ROUTING.BRANDS}
                                                        //  style={{ backgroundImage: `url(${imageUrl}/${item?.image})` }}
                                                        onClick={() => setSelectedBrandId(item.id)}
                                                        draggable="false" className="inner" >
                                                        <img loading="lazy" className='carouselItemImage' src={`${imageUrl}/${item?.logo}`} alt="reload page" />
                                                        {/* <span>{item?.name}</span> */}
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
                                        singleBrandData?.map((item, keyId) => {
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
export default Brands
