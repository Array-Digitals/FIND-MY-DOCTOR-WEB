import React, { useState } from 'react'
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import { ProductItem } from '../Component/productItem';
import PharmacyBuy from '../../services/pharmacy';
import { useEffect } from 'react';
import banner1 from '../../assets/images/banners/desktopBanner/pharmDiscDesk1.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/pharmDiscDesk2.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/pharmDiscDesk3.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/pharmDiscMob1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/pharmDiscMob2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/pharmDiscMob3.jpg'
import pharmBanner from '../../assets/images/Pharmacy/pharmacy22.jpg'
import { BannerService } from '../BookLab/labImports';
import { imageUrl } from '../../services/baseUrl';
 const OurProducts = ({ getIdFromProduct }) => {

  // let imageUrl = "http://fmd.arraydigitals.com/"


  const [settings, setSettings] = useState({
    dots: false,

    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
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

  const [settings1, setSettings1] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  const [allCategories, setAllCategories] = useState([])
  const [allBrands, setAllBrands] = useState([])
  const [bestSellerBrand, setBestSellerBrand] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const { getFrequentlyBought, getCategory, getBrand, getProductByBrand, getSearchProduct } = PharmacyBuy();

  const handleInput = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    getCategory().then((res) => {
      setAllCategories(res?.data?.data)
      // console.log(res, "categoryDataa");
    }).catch((err) => {
      console.log(err)
    })

    getBrand().then((res) => {
      setAllBrands(res?.data?.data)
    }).catch((err) => {
      console.log(err)
    })

    getProductByBrand().then((res) => {
      setBestSellerBrand(res?.data?.data)
    }).catch((err) => {
      console.log(err)
    })
    getFrequentlyBought().then((res) => {
      // console.log(res?.data.data, 'hehe');
      // console.log(res.data.data, "brandsDatacccc");
      if (res?.data) {
        // Convert the object values into an array
        const dataArray = Object.values(res.data.data);

        // Now, dataArray is an array of objects
        // console.log(dataArray, 'asddddd');

        setFrequentlyBought(dataArray);
      }
    }).catch((err) => {
      console.log(err)
    })


  }, [])

  const [searchedProduct, setSearchProduct] = useState([])
  const [searchText, setSearchText] = useState('');
  // const [isSearchItem, setIsSearchItem] = useState(false);
  useEffect(() => {
    getSearchProduct(searchText).then((res) => {
      setSearchProduct(res?.data?.data)
      console.log(res.data.data, 'procuas');
      // setIsSearchItem(true)
    })
  }, [searchText])

  const onSearchItem = (e) => {
    e.preventDefault();
  }




  // useEffect(() => {
  //   console.log(frequentlyBought, 'FREQQQ');
  // }, [frequentlyBought])
  // console.log(allBrands, "allBrands");
  // console.log(allCategories, "allcategories");
  const [settings2, setSettings2] = useState({
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1,
  });

  const navigate = useNavigate();


  const selectedIdNavigate = (e, id, option) => {
    e.preventDefault()
    getIdFromProduct(id)
    if (option === 'category') {
      navigate(ROUTING.OUR_CATEGORIES)
    }
    else {

      navigate(ROUTING.BRANDS)
    }
  }


  const { getBanners } = BannerService();
  const [bannersDesk, setDeskBanners] = useState([])
  const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 16 : 21);

  useEffect(() => {
    const handleResize = () => {
      setBannerType(window.innerWidth >= 991 ? 16 : 21);
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
    }
  };


  return (
    <>
      <div className="ourProducts">
        <div className="container">
          <div className="productMain">
            <div className="mainHeading">
              <p>Our <span>Products</span></p>
              <hr />
            </div>

            <div className="OurProductsBanner">
              <Slider {...settings2}>
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
            </div>

            <div className="productBody">
              <div className="categoryCarousel brandCarousel">
                <div className="startHeading startHeading2">
                  {/* <p></p> */}
                  <div className="subHeaderIcon ">
                    <div className="search-box">
                      <button className="btn-search" onClick={onSearchItem}> <i className="bi bi-search"></i></button>
                      <input type="text" className={`input-search ${searchText ? 'focused' : ''}`} placeholder="Type to Search..." onChange={(e) => { setSearchText(e.target.value) }} />
                    </div>
                    {
                      searchedProduct?.length ?
                        <div className="itemSearchDiv">
                          <ul>
                            {
                              searchedProduct.map((item, keyId) => {
                                // console.log(searchedProduct.length, 'xxxxxxxx');
                                // console.log(item.id, 'ddd');
                                return (
                                  <li key={keyId}>
                                    <Link to={`${ROUTING.PRODUCT_ITEM}/${item.id}`} draggable={false}>
                                      <span>
                                        <img loading="lazy" className='searchedProductImg' src={`${imageUrl}/${item?.featured_img}`} alt="reload page" />
                                      </span>
                                      <span> {item.name} </span>
                                    </Link>
                                  </li>

                                )
                              })
                            }
                          </ul>
                        </div>
                        :
                        <React.Fragment />

                    }
                  </div>
                </div>
                <div className="startHeading">
                  <p>Categories</p>
                  <div className="subHeaderIcon">
                    <div className="viewButton">
                      <Link to={ROUTING.OUR_CATEGORIES}>View All</Link>
                    </div>

                  </div>
                </div>
                <hr />
                <div className="carousel">
                  <Slider {...settings}>
                    {
                      allCategories?.slice(-10)?.map((item, keyId) => {
                        // console.log(item, 'asdddd');
                        return (
                          <div key={keyId} className='carouselItem relativeCarouselItem'>
                            <button to={ROUTING.OUR_CATEGORIES}
                              draggable="false" className="inner" onClick={(e) => { selectedIdNavigate(e, item.id, 'category') }}>
                              <img loading="lazy" className='carouselItemImage' src={`${imageUrl}/${item?.image}`} alt="reload page" />
                            </button>
                          </div>
                        )
                      })
                    }
                  </Slider>
                </div>

              </div>
              <div className="bestSeller">
                <div className="startHeading">
                  <p>Best Seller</p>
                  {/* <div className='viewButton'>
                    <Link to={ROUTING.BESTSELLER}>View All</Link>
                  </div> */}
                </div>
                <hr />
                <div className="productItems">
                  <div className="row">

                    <Slider {...settings1}>
                      {
                        bestSellerBrand?.slice(-10)?.map((item, keyId) => {
                          return (
                            <ProductItem key={keyId} productObject={item} />
                          )
                        })
                      }
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="categoryCarousel brandCarousel">

                <div className="startHeading">
                  <p>Brands</p>
                  <div className="subHeaderIcon">
                    {/* <div className="search-box">
                      <button className="btn-search" onClick={(e)=>{e.preventDefault()}}> <i className="bi bi-search"></i></button>
                      <input type="text" className="input-search" placeholder="Type to Search..." />
                    </div> */}
                    <div className="viewButton">
                      <Link to={ROUTING.BRANDS}>View All</Link>
                    </div>

                  </div>
                </div>
                <hr />
                <div className="carousel">
                  <Slider {...settings}>
                    {
                      allBrands?.slice(-10)?.map((item, keyId) => {
                        // console.log(item, 'asddddd');
                        return (
                          <div key={keyId} className='carouselItem relativeCarouselItem'>
                            <button to={ROUTING.OUR_CATEGORIES}
                              //  style={{ backgroundImage: `url(${imageUrl}/${item?.image})` }}
                              onClick={(e) => { selectedIdNavigate(e, item.id, 'brand') }}
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
              <div className="bestSeller">
                <div className="startHeading">
                  <p>Frequently Bought</p>
                  {/* <div className='viewButton'>
                    <Link to={ROUTING.FREQUENTLY_BOUGHT}>View All</Link>
                  </div> */}
                </div>
                <hr />
                <div className="productItems">
                  <div className="row">
                    <Slider {...settings1}>
                      {
                        frequentlyBought?.slice(-10)?.map((item, keyId) => {

                          console.log(item, 'ddddddddddAAAAAAAA');
                          return (

                            <ProductItem key={keyId} productObject={item} />

                          )
                        })
                      }
                    </Slider>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default OurProducts
