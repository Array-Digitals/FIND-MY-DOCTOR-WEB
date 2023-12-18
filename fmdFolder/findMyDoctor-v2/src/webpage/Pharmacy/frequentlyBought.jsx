import React from 'react'
import Abocal from "../../assets/images/Pharmacy/abocal.png"
import Abocran from "../../assets/images/Pharmacy/Abocran.png"
import Acefyl from "../../assets/images/Pharmacy/acefyl.png"
import Acefyl2 from "../../assets/images/Pharmacy/aceful2.png"

 const FrequentlyBought = () => {
    return (
        <>
            <div className="frequentlyBought">
                {/* <div className="container">
                    <div className="productMain">
                        <div className="mainHeading">
                            <p>Frequently <span>Bought</span></p>
                        </div>
                        <div className="bestSellerBody">
                            <div className="productItems">
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocal} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocal Tab</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocran} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocran Sachet</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Cough Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl2} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Respiratory Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocal} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocal Tab</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocran} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocran Sachet</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Cough Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl2} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Respiratory Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocal} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocal Tab</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Abocran} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Abocran Sachet</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Cough Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <a href='#' className="card" >
                                            <img loading="lazy" src={Acefyl2} />
                                            <div className="card-body">
                                                <div className="rating">
                                                    <div className="stars">
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star-fill "></i></span>
                                                        <span> <i className="bi bi-star "></i></span>
                                                    </div>
                                                    <div className="review">
                                                        <p>2 Reviews</p>
                                                    </div>
                                                </div>
                                                <h6 className="card-title">Acefyl Respiratory Syrup</h6>
                                                <p className="card-text">ABBOTT LABORATORIES</p>
                                                <div className="pricing">
                                                    <p className='price'>169.0 PKR</p>
                                                    <small><strike>197.00 PKR</strike></small>
                                                </div>
                                                <div className="sale">
                                                    <p>Sale</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}
            </div>
        </>
    )
}
export default FrequentlyBought
