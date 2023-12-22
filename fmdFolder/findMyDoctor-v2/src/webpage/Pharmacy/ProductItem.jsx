import React, { useEffect, useState, useRef } from 'react'
import acefyl from '../../assets/images/Pharmacy/acefyl22.png'
import { Link, useParams } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import TokenService from "../../services/token.service";
import PharmacyBuy from '../../services/pharmacy';
import { ProductFunction } from './productFunctions';
import { LoginPopup } from '../Component/loginPopup';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '../Component/loader';
import { SignupPopup } from '../Component/RegisterPopup';
import { baseUrl } from '../../services/baseUrl';
import { imageUrl } from '../../services/baseUrl';


const ProductItem = () => {
    const { productItemId } = useParams();
    // const baseUrl = "http://fmd.arraydigitals.com"
    const { calculatePercentage, formatDate, setCartItem } = ProductFunction();
    const { getToken, rememberGet } = TokenService();
    const [showToast, setShowToast] = useState(false);
    const { getSingleProduct } = PharmacyBuy();
    const [productData, setProductData] = useState({});
    const [mgfDate, setMfgDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [newPrice, setNewPrice] = useState("");
    const [radioDescription, setRadioDescription] = useState("option1");
    const handleRadioChange = (event) => {
        setRadioDescription(event.target.value);
    };

    const myDialogRef1 = useRef(null);
    const myDialogRef = useRef(null);
    const triggerLoginPopup1 = () => {
        if (myDialogRef1.current) {
            myDialogRef1.current.showModal();
        }
    };

    const counter = (e) => {
        e.preventDefault();
        if (count === productData.quantity) {
            setCount(count)
        } else {

            setCount(count + 1);
        }
    }
    const decreaseCounter = e => {
        e.preventDefault();

        if (count > 1) {
            setCount(count - 1);
        }
        else {
            setCount(count)
        }
    }


    useEffect(() => {
        if (productItemId) {
            getSingleProduct(productItemId).then((res) => {
                const mfgDate = formatDate(res.data.data.manufacture_date)
                setMfgDate(mfgDate)
                setProductData(res.data.data);
                console.log(res.data.data, 'resasdas');
            }).catch((res) => {
                console.log(res, 'error');
            })
        }
    }, [productItemId])

    useEffect(() => {
        if (productData) {
            calculatePercentage(productData.price, productData.discounted_price, setNewPrice)
        }
    }, [productData.id])


    const AddToCart = (e) => {
        e.preventDefault();
        if (productData.quantity == 0) {
            toast.error('Product is out of stock')
            return
        }

        setIsLoading(true);
        if (getToken(rememberGet())) {
            const cartFields = { quantity: count, itemId: productItemId };
            setIsLoading(true);
            setTimeout(() => {
                setCartItem(cartFields);
                setIsLoading(false);
                setShowToast(true)
            }, 1000);
        } else {
            triggerLoginPopup1();
            setIsLoading(false);

        }

    }

    useEffect(() => {
        if (showToast) {
            toast.success("Item added to cart");
            setShowToast(false);
        }
    }, [showToast])

    return (
        <>
            <div className='productItem'>
                {getToken(rememberGet()) &&
                    <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                }

                <div className="container">
                    <div className="productMain">
                        <div className="container">
                            {
                                isLoading
                                    ?
                                    <Loader />
                                    :
                                    <div className="row g-5">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="center">
                                            <div className="itemImageMain">
                                                <div className='itemImageInner outOfStockParent'>
                                                    {
                                                        productData.quantity == 0 &&
                                                        <p className='outOfStock'>Out of Stock</p>
                                                    }
                                                    <img loading="lazy" src={`${imageUrl}/${productData.featured_img}`} alt="reload page" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="AboutItem">
                                                {
                                                    (productData.discounted_price || productData.discounted_price === '0') &&
                                                    <div className="sale"> <p>Sale Off</p> </div>
                                                }
                                                <div className="productName">{productData.name}</div>
                                                <div className="rating">
                                                    <div className="stars">
                                                        {/* <span> <i className="bi bi-star-fill "></i></span>
                                                <span> <i className="bi bi-star-fill "></i></span>
                                                <span> <i className="bi bi-star-fill "></i></span>
                                                <span> <i className="bi bi-star-fill "></i></span>
                                                <span> <i className="bi bi-star "></i></span> */}
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <span key={index}>
                                                                <i className={`bi ${index <= productData.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="review">
                                                        <p>{productData.rating} Reviews</p>
                                                    </div>
                                                </div>
                                                <div className="pricing">
                                                    <p>{(productData.discounted_price || productData.discounted_price === '0') ? newPrice : productData.price} PKR</p>
                                                    <div className="saves">
                                                        {
                                                            (productData.discounted_price || productData.discounted_price === '0') &&
                                                            <React.Fragment>
                                                                < span > {productData.discounted_price} % off</span><small> <strike> {productData.price} PKR</strike></small>
                                                            </React.Fragment>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='summary'>{productData.title}</div>
                                                <div className='addition'>
                                                    <div className="counter">
                                                        <div className="counterNumber">
                                                            <p className="number">{count}</p>
                                                            {/* {console.log(count, 'counttt')} */}
                                                        </div>

                                                        <div className="counterButtons">
                                                            <button onClick={counter} ><i className="bi bi-caret-up"></i></button>
                                                            <button onClick={decreaseCounter} ><i className="bi bi-caret-down"></i></button>
                                                        </div>

                                                    </div>
                                                    <div className="addToCartButton">
                                                        <Link onClick={AddToCart} ><i className="bi bi-cart2"></i> Add To Cart</Link>
                                                    </div>
                                                    {/* <div className="favoriteButton">
                                                <button><i className="bi bi-heart"></i></button>
                                            </div> */}
                                                </div>
                                                <div className="itemInfo">
                                                    <div className="firstCol">
                                                        <p>Brand: <span>{productData.brand_name}</span> </p>
                                                        {/* <p>MFG: <span>{mgfDate}</span> </p> */}
                                                        {/* <p>LIFE: <span>1 Year 20 Days</span>  </p> */}
                                                    </div>
                                                    <div className="secondCol">
                                                        <p>item Weight: <span>{productData.weight}</span> </p>
                                                        {/* <p>Quantity: <span>{productData.quantity}</span> </p> */}
                                                        {/* <p>Tags: <span>Lorem lypsum.</span> </p>
                                                <p>Stock: <span>8 Items in Stock</span> </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mainItemInfo">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <div className="switchButton">
                                                        <div className="radioButton">
                                                            <input type="radio" name='itemDescriptionRadio' id='radioDescId' value="option1" checked={radioDescription === "option1"} onChange={handleRadioChange} />
                                                            <label htmlFor='radioDescId'>Description</label>
                                                        </div>
                                                        {/* <div className="radioButton">
                                                    <input type="radio" name='itemDescriptionRadio' id='radioAdditionId' />
                                                    <label htmlFor='radioAdditionId'>Additional Info</label>
                                                </div> */}
                                                        <div className="radioButton">
                                                            <input type="radio" name='itemDescriptionRadio' id='radioVendorId' value="option2" checked={radioDescription === "option2"} onChange={handleRadioChange} />
                                                            <label htmlFor='radioVendorId'>Vendor</label>
                                                        </div>
                                                        <div className="radioButton">
                                                            <input type="radio" name='itemDescriptionRadio' id='radioReviewId' value="option3" checked={radioDescription === "option3"} onChange={handleRadioChange} />
                                                            <label htmlFor='radioReviewId'>Review</label>
                                                        </div>
                                                    </div>
                                                    {
                                                        radioDescription === "option1" &&
                                                        <div className="switchTabs">
                                                            <div className="description firstDiv">

                                                                <div className="paragraph">
                                                                    {/* <div>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus placeat, ex cupiditate natus veniam molestias fugiat id asperiores voluptas cum commodi minima temporibus beatae reiciendis quibusdam! Doloribus perferendis minus repellat sapiente dignissimos perspiciatis mollitia, nam quasi totam autem beatae repudiandae!
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div>
                                                            <hr />
                                                            <p>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti nemo minima cumque maiores a architecto nostrum incidunt, aspernatur nesciunt repellendus deleniti. Eaque, veniam qui aspernatur possimus pariatur repellat velit nam labore cumque doloribus asperiores, at expedita esse, corporis quod?
                                                            </p> */}
                                                                    {
                                                                        productData.description
                                                                    }
                                                                </div>
                                                                <div className="paragraph">
                                                                    <p className='heading'>Package & Delivery</p>
                                                                    <hr />
                                                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestias fugit officia numquam dolorum vitae rerum illum eligendi recusandae ab reprehenderit amet repudiandae quod, quibusdam repellendus fuga aperiam magnam ipsum nulla non iure similique autem sequi! Veniam inventore exercitationem distinctio voluptates! Soluta aut placeat officia expedita cumque, molestias totam explicabo voluptate non quasi nulla nobis? Itaque error esse voluptatum consectetur.</p> */}
                                                                    {
                                                                        productData.package_delivery
                                                                    }
                                                                </div>
                                                                <div className="paragraph">
                                                                    <p className='heading'> Suggest Use</p>

                                                                    {/* <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div> */}
                                                                    {
                                                                        productData.suggest_use
                                                                    }
                                                                </div>
                                                                <div className="paragraph">
                                                                    <p className='heading'>Other Ingredients</p>
                                                                    {
                                                                        productData.ingredients
                                                                    }
                                                                    {/* <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div> */}

                                                                </div>
                                                                <div className="paragraph">
                                                                    <p className='heading' >Warnings</p>
                                                                    {
                                                                        productData.warning
                                                                    }

                                                                    {/* <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div> */}

                                                                </div>
                                                            </div>
                                                            {/* <div className="description">
                                                        <div className="paragraph">
                                                            <div>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus placeat, ex cupiditate natus veniam molestias fugiat id asperiores voluptas cum commodi minima temporibus beatae reiciendis quibusdam! Doloribus perferendis minus repellat sapiente dignissimos perspiciatis mollitia, nam quasi totam autem beatae repudiandae!
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div>
                                                            <hr />
                                                            <p>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti nemo minima cumque maiores a architecto nostrum incidunt, aspernatur nesciunt repellendus deleniti. Eaque, veniam qui aspernatur possimus pariatur repellat velit nam labore cumque doloribus asperiores, at expedita esse, corporis quod?
                                                            </p>
                                                        </div>
                                                        <div className="paragraph">
                                                            <p className='heading'>Package & Delivery</p>
                                                            <hr />
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestias fugit officia numquam dolorum vitae rerum illum eligendi recusandae ab reprehenderit amet repudiandae quod, quibusdam repellendus fuga aperiam magnam ipsum nulla non iure similique autem sequi! Veniam inventore exercitationem distinctio voluptates! Soluta aut placeat officia expedita cumque, molestias totam explicabo voluptate non quasi nulla nobis? Itaque error esse voluptatum consectetur.</p>
                                                        </div>
                                                        <div className="paragraph">
                                                            <p className='heading'> Suggest Use</p>

                                                            <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                        <div className="paragraph">
                                                            <p className='heading'>Other Ingredients</p>

                                                            <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                        <div className="paragraph">
                                                            <p className='heading' >Warnings</p>

                                                            <div>
                                                                <ul>
                                                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
                                                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi?</li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div> */}
                                                        </div>
                                                    }
                                                    {radioDescription === "option2" &&
                                                        <div className="switchTabs">
                                                            <div className="description firstDiv">
                                                                <div className="paragraph">
                                                                    <p className='heading'>Vendor</p>
                                                                    <hr />
                                                                    {productData.brand_name}
                                                                    {/*                                                        
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestias fugit officia numquam dolorum vitae rerum illum eligendi recusandae ab reprehenderit amet repudiandae quod, quibusdam repellendus fuga aperiam magnam ipsum nulla non iure similique autem sequi! Veniam inventore exercitationem distinctio voluptates! Soluta aut placeat officia expedita cumque, molestias totam explicabo voluptate non quasi nulla nobis? Itaque error esse voluptatum consectetur.</p>
                                                        */}
                                                                </div>


                                                            </div>
                                                        </div>
                                                    }
                                                    {radioDescription === "option3" &&
                                                        <div className="switchTabs">
                                                            <div class="list-group">
                                                                {
                                                                    productData.reviews.map((item, keyId) => {
                                                                        console.log(item, 'itemmm');
                                                                        return (
                                                                            <a key={keyId} class="list-group-item list-group-item-action" aria-current="true">
                                                                                <div class="d-flex w-100 justify-content-between">
                                                                                    <p class="mb-1">{item.name} - {item.email}</p>
                                                                                    {/* <small>3 days ago</small> */}
                                                                                </div>
                                                                                <div className="rating">
                                                                                    <div className="stars">
                                                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                                                            <span key={index}>
                                                                                                <i className={`bi ${index <= item.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                                                                                            </span>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                                <p class="mb-1">{item.review_comment}</p>
                                                                            </a>

                                                                        )
                                                                    })

                                                                }
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }

                            <LoginPopup myDialogRef1={myDialogRef1} />
                            <SignupPopup myDialogRef={myDialogRef} />


                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductItem