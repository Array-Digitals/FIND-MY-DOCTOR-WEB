import React, { useLayoutEffect, useEffect, useContext } from 'react'
import { ProductFunction } from './productFunctions'
import { useNavigate } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import TokenService from '../../services/token.service';
import PharmacyBuy from '../../services/pharmacy';
import { useState } from 'react';
import visaMaster from '../../assets/images/visaAndMasterCard.png'
import { userBeneFiciary } from '../../context/contextFile';
import { Greeting } from '../Component/greeting';
import { ToastContainer, toast } from 'react-toastify';
// import { ProductFunction } from './productFunctions'

 const CheckOut = () => {

    const isBeneficiaryValue = useContext(userBeneFiciary);
    console.log(isBeneficiaryValue, 'ddddddd');
    const { postPharmaBooking } = PharmacyBuy();
    const { getStorageData, rememberGet } = TokenService();
    const { getCartItem } = ProductFunction();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    // const cartItem = getCartItem();
    const [userData, setUserData] = useState('');
    const { clearAllCartItems } = ProductFunction()


    const dateFormating = () => {



        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    const [pharmData, setPharamData] = useState({
        promo: 1,
        promo_code: '',
        address: '',
        payment_method: '1',
        beneficiary: isBeneficiaryValue === 'yes' ? 'yes' : 'no',
    })

    useLayoutEffect(() => {
        const item = getCartItem();
        setCartItems(item);
        if (item.length === 0 || item === '') {
            navigate(ROUTING.CART)
        }
        setUserData(getStorageData(rememberGet()));
    }, [])

    // useEffect(() => {
    //     console.log(pharmData.payment_method, 'payment');
    // }, [pharmData.payment_method])

    const getInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setPharamData({ ...pharmData, [fieldName]: fieldValue })
    }

    const [processBooked, setProcessBooked] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const date_time = dateFormating();
        const med = cartItems.map(item => ({ id: item.itemId, qty: item.quantity }));
        const med_for = userData.id;
        const recepient = userData.id;
        const pharmacyData = { ...pharmData, med_for, recepient, med, date_time }
        console.log(pharmacyData, 'pharmacyData');
        postPharmaBooking(pharmacyData).then((res) => {
            console.log(res, 'response');
            console.log(res.status, 'statusss');
            if (res.status === 203) {
                toast.error("Promo not Valid")
            }
            else {

                clearAllCartItems();
                setProcessBooked(true)
            }
        }).catch((err) => console.log(err, 'err'))
    }


    return (
        <>
            <div className="checkOut">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {
                    processBooked ?

                        <div className="switchDiv">
                            <section>
                                <div className="container">
                                    <div className="mainBody">
                                        <Greeting />
                                    </div>
                                </div>
                            </section>
                        </div>
                        
                        :

                        <div className="switchDiv" >
                            <section>
                                <div className="container">
                                    <div className="mainBody">
                                        <div className="mainBodyHeading">
                                            <h1>
                                                Details <span>Confirmation</span>
                                            </h1>
                                        </div>
                                        <div className="mainBodyInner">
                                            <form className="bookingConfirmationFormOuter" onSubmit={onFormSubmit}>

                                                <div className="bookingConfirmationForm">

                                                    <div className="bookingFormFields">
                                                        <label htmlFor=""> Reciept </label>
                                                        <p>{userData?.fullname}</p>
                                                    </div>
                                                    <div className="bookingFormFields">
                                                        <label htmlFor=""> Address </label>
                                                        <input type="text" name='address' placeholder='Enter Address' onChange={getInput} required />
                                                    </div>
                                                    <div className="bookingFormFields">
                                                        <label htmlFor=""> Payment Method </label>
                                                        <select name="payment_method" id="" onChange={getInput} >
                                                            <option value="1">Cash </option>
                                                            <option value="2">Online Transfer </option>
                                                        </select>
                                                    </div>
                                                    <div className="bookingFormFields">
                                                        <label htmlFor=""> Promo Code </label>
                                                        <input type="text" name='promo_code' placeholder='Enter Promo Code' onChange={getInput} />
                                                    </div>
                                                    {pharmData?.payment_method === '2' &&
                                                        <div className="bookingFormFields cardNumberDiv">
                                                            <label htmlFor=""> Card Name </label>
                                                            <input type="number" placeholder='Enter Card Name...' />
                                                        </div>
                                                    }
                                                    {pharmData?.payment_method === '2' &&
                                                        <div className="bookingFormFields cardNumberDiv">
                                                            <label htmlFor=""> Card Number </label>
                                                            <input type="number" placeholder='Enter Card Number...' />
                                                            <img loading="lazy" className='cardNumberImg' src={visaMaster} alt="reload page" />
                                                        </div>
                                                    }
                                                    {pharmData?.payment_method === '2' &&
                                                        <div className="bookingFormFields">
                                                            <label htmlFor=""> CVV </label>
                                                            <input type="number" placeholder='Enter Cvv...' />
                                                        </div>
                                                    }
                                                    {pharmData?.payment_method === '2' &&
                                                        <div className="bookingFormFields">
                                                            <label htmlFor=""> Expiration </label>
                                                            <input type="date" />
                                                        </div>
                                                    }


                                                </div>
                                                <div className='bookingConfirmButton '>
                                                    <button className="done" type='submit'>
                                                        Done
                                                    </button>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                }

            </div>
        </>
    )
}
export default CheckOut