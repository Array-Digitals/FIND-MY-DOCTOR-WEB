import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../utils/routes'
import Abocal from "../../assets/images/Pharmacy/abocal.png"
import { useState } from 'react'
import { useEffect } from 'react'
import { ProductFunction } from '../Pharmacy/productFunctions'
import { baseUrl } from '../../services/baseUrl'
import { imageUrl } from '../../services/baseUrl'
export const ProductItem = ({ productObject }) => {
    const objectOfProduct = productObject;
    const { calculatePercentage } = ProductFunction();
    // console.log(objectOfProduct, "object")
    // const baseUrl = "http://fmd.arraydigitals.com"
    const [newPrice, setNewPrice] = useState()
    useEffect(() => {
        calculatePercentage(objectOfProduct.price, objectOfProduct.discounted_price, setNewPrice);
    }, [productObject.id])
    const productNamesSet = new Set((productObject?.name || '').split(','));
   
    return (
        <>

            <div className="col-lg-3 col-xxl-3 productItem productItemContainer">
                <Link to={`${ROUTING.PRODUCT_ITEM}/${productObject.id}`} className="card" draggable={false} >
                    <img loading="lazy" src={`${imageUrl}/${productObject?.featured_img}`}  alt='' />
                    <div className="card-body">
                        <div className="rating">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <span key={index}>
                                        <i className={`bi ${index <= productObject.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                                    </span>
                                ))}
                            </div>
                            <div className="review">
                                <p>{productObject.rating} Rating</p>
                            </div>
                        </div>
                        <h6 className="card-title">{productNamesSet || (productObject?.name)}</h6>
                        <p className="card-text">{productObject?.brand_name}</p>
                        <div className="pricing">
                            <p className='price'>{productObject?.discounted_price > 0 ? newPrice : productObject?.price} PKR</p>
                            {productObject?.discounted_price > 0 &&
                                <small><strike>{productObject?.price}</strike></small>
                            }
                        </div>
                        {productObject?.discounted_price > 0 &&
                            <div className="sale">
                                <p>Sale</p>
                            </div>
                        }
                    </div>
                </Link>
            </div>
        </>
    )
}
