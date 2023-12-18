import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../utils/routes'
import acefyl from '../../assets/images/Pharmacy/acefyl22.png'
import { ProductFunction } from './productFunctions'
import { useEffect } from 'react'
import { useState } from 'react'
import { Pharmacy } from './pharmacy'
import PharmacyBuy from '../../services/pharmacy'
import emptyCart from '../../assets/images/Pharmacy/emptyCart.png'
import { LoginPopup } from '../Component/loginPopup'
import { ReviewPopup } from '../Component/reviewPopup'
import { TokenService } from '../BookLab/labImports'
import { imageUrl } from '../BookLab/labImports'

const Cart = () => {
    // {(productData.discounted_price || productData.discounted_price === '0') ? newPrice : productData.price}
    const { getCartItem, clearCartItem, calculatePercentage } = ProductFunction();
    const { getStorageData } = TokenService();
    const [userData, setUserData] = useState(getStorageData())
    const [cartItems, setCartItems] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const { getSingleProduct } = PharmacyBuy();
    const [totalPrice, setTotalPrice] = useState(0);
    const myDialogRef1 = useRef(null);
    const triggerLoginPopup1 = () => {
        if (myDialogRef1.current) {
            myDialogRef1.current.showModal();
        }
    };

    const handleStorageChange = () => {
        setCartItems(getCartItem());
    };

    useEffect(() => {
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const updatedCartProducts = [];
        let totalPrice = 0;
        // console.log(cartItems, 'carttt');
        Promise.all(
            cartItems.map((obj) =>
                getSingleProduct(obj.itemId)
                    .then((res) => {
                        // console.log(obj, 'objjj');
                        // console.log('runnn');
                        const productData = res.data.data;
                        // console.log(productData, 'producttt');
                        // console.log('run');
                        const setNewPrice = (newPrice) => {
                            const totalItemPrice = newPrice * obj.quantity
                            updatedCartProducts.push({ ...productData, newPrice });
                            totalPrice += totalItemPrice;
                            // console.log('updateddddd');
                        };
                        calculatePercentage(productData?.price, productData?.discounted_price, setNewPrice);
                        // const totalItemPrice = updatedCartProducts.newPrice * obj.quantity; 
                    })
                    .catch((err) => {
                        console.log(err, 'error');
                    })
            )
        ).then(() => {
            setTotalPrice(totalPrice);
            setCartProducts(updatedCartProducts);
        });
    }, [cartItems]);

    const removeItem = (event, id) => {
        event.preventDefault();
        clearCartItem(id);
        setCartItems(getCartItem());
    }

    const [testProps, setTestProps] = useState({})
    const reviewDialog = useRef(null);
    const popupTrigger = (e, id) => {
        e.preventDefault();
        setTestProps({ ...userData, productId: id })
        console.log(id, 'di');
        if (reviewDialog.current) {
            reviewDialog.current.showModal();
        }
    };


    return (
        <>
            <div className="cart">
                <div className="container">
                    <div className="productMain">
                        <div className="mainHeading">
                            <p><span>Order</span>Now?</p>
                        </div>
                        <div className="cartBody">
                            <div className="cardInner">
                                {cartItems.length === 0 ?
                                    <img loading="lazy" src={emptyCart} alt="reload page" />
                                    :
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="heading">
                                                <p className='yourOrder'>
                                                    Your Order
                                                </p>
                                                <p className='total'>Total <span>{totalPrice} PKR</span> </p>
                                            </div>
                                            <hr />
                                            <ul className="list-group">
                                                {cartProducts?.map((item, keyId) => {
                                                    // Find the corresponding cart item based on the item ID
                                                    // console.log(item, 'itemsss');
                                                    const itemIdString = String(item.id);
                                                    const cartItem = cartItems.find((cart) => cart.itemId === itemIdString);
                                                    const totalItemPrice = cartItem ? cartItem.quantity * item.newPrice : 0;
                                                    return (
                                                        <li className="list-group-item" key={keyId}>
                                                            <div className="row g-3 listMain">
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" align="center">
                                                                    <div className="image">
                                                                        <img loading="lazy" src={`${imageUrl}/${item.featured_img}`} alt="reload page" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                                                                    <div className="middle">
                                                                        <p>{item.name}</p>
                                                                        <div className="rating">
                                                                            <div className="stars">
                                                                                {[1, 2, 3, 4, 5].map((index) => (
                                                                                    <span key={index}>
                                                                                        <i className={`bi ${index <= item.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <div className="review">
                                                                                <p>{item.rating ? item.rating : 0}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
                                                                    <div className="middle">
                                                                        <button className='themeButton2' onClick={(e) => popupTrigger(e, item.id)}>Review</button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1" align="center">
                                                                    <div className="quantity">
                                                                        <button onClick={(event) => removeItem(event, item.id)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1" align="center">
                                                                    <div className="quantity">
                                                                        x{cartItem ? cartItem.quantity : 0}
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2" align="center">
                                                                    <div className="price">
                                                                        {totalItemPrice} PKR
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            {
                                                cartProducts.length > 0 &&
                                                <div className='cartFlexButton'>
                                                    <div className="buttonDiv">
                                                        <Link to={ROUTING.CHECKOUT} onClick={() => triggerLoginPopup1()}>Order Now</Link>
                                                    </div>
                                                    <div className="buttonDiv">
                                                        <Link to={ROUTING.OURPRODUCTS} >Add More</Link>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div >

            <LoginPopup myDialogRef1={myDialogRef1} />
            <ReviewPopup reviewRef={reviewDialog} reviewType={"products"} testProps={testProps} />

        </>
    )
}
export default Cart
