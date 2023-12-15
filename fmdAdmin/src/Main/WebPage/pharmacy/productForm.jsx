import React, { useState, useEffect } from 'react'
import AdminService from '../../../services/adminApi';
import GeneratePassword from '../../../services/generatePassword';
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import profilePic from '../../../assets/images/guy.png';
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';

export const ProductForm = () => {
    const { generatePassword } = GeneratePassword();
    const { brandGet, categoriesGet, productPost } = pharmacyService();
    const [password, setPassword] = useState('')
    const [featured_img, setProductImage] = useState()
    const [brandState, setBrandState] = useState([])
    const [categoryState, setCategoryState] = useState([])
    const [activity, setSetActivityState] = useState("0");
    const [is_featured, setfeatured] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [productData, setProductData] = useState({
        name: "",
        title: "",
        price: 0,
        discounted_price: 0,
        brand: "",
        category: "",
        description: "",
        quantity: "",
        weight: "",
        manufacture_date: "",
        expiry_date: "",
        tags: "",
        batch_number: "",
        package_delivery: "",
        suggest_use: "",
        ingredients: "",
        warning: "",
        dosage: "",
        seller: 1,

    })

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductData({ ...productData, [name]: value })
    }
    const submitProductImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProductImage(reader.result);
        };
    }

    const submitForm = (e) => {
        e.preventDefault();
        const ProductRegister = { ...productData, featured_img, activity, is_featured }
        console.log(ProductRegister, "productRegisterData");
        setIsLoading(true)

        productPost(ProductRegister).then((res) => {
            console.log(res)
            toast.success("Product Added");
        }).catch((err) => {
            console.log(err, "Product Register Error")
        }).finally(() => {
            setIsLoading(false)
        })
    }
    useEffect(() => {
        brandGet().then((res) => {
            setBrandState(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
        categoriesGet().then((res) => {
            setCategoryState(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
    }, [])

    function getMaxDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1; 
        let day = today.getDate();
    
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
    
        return `${year}-${month}-${day}`;
    }

    function getMinDate() {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Add 1 day to get the minimum future date
        const year = today.getFullYear();
        let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
        let day = today.getDate();
      
        // Pad month and day with leading zeros if needed
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
      
        return `${year}-${month}-${day}`;
      }


    return (
        <>
            <section className='mainSection'>
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
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Add Product
                            </p>
                        </div>
                        <div className="card cardForm">
                            {
                                isLoading ?
                                    <Loader />
                                    :
                                    <div className="card-body">

                                        <form className="additionForm" onSubmit={submitForm}>
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img
                                                                src={featured_img ? featured_img : profilePic}
                                                                alt=""
                                                                className="profileImage"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Name</label>
                                                        <input type="text" id='doctorName' placeholder='Enter Name...' name='name' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorEmail">Product Description</label>
                                                        <input type="text" id='doctorEmail' name='description' placeholder='Enter Description...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Title</label>
                                                        <input type="text" id='doctorName' name='title' placeholder='Enter Title...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Weight</label>
                                                        <input type="text" id='doctorName' name='weight' placeholder='Enter Weight...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Manufacture Date</label>
                                                        <input type="date" id='doctorName' max={getMaxDate()} name='manufacture_date' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Expiry Date</label>
                                                        <input type="date" id='doctorName' name='expiry_date' min={getMinDate()} onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorPhone">Product Image</label>
                                                        <input type="file" className='form-control' id='doctorPhone' name='featured_img' onChange={submitProductImage} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorPhone">Product Quantity</label>
                                                        <input type="number" id='doctorPhone' name='quantity' placeholder='Enter Quantity...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Brand</label>
                                                        <select name="brand" id="" onChange={getLoginInput}>
                                                            <option value="">Select a Brand</option>
                                                            {brandState.map((item, keyId) => {
                                                                return (
                                                                    <option key={keyId} value={item?.id}>{item?.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Category</label>
                                                        <select name="category" id="" onChange={getLoginInput}>
                                                            <option value="">Select a Category</option>
                                                            {
                                                                categoryState.map((item, keyId) => {
                                                                    return (
                                                                        <option key={keyId} value={item?.id}>{item?.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Tag</label>
                                                        <input type="text" name='tags' id='doctorName' placeholder='Enter Product Tag...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Price</label>
                                                        <input type="text" id='doctorName' name='price' placeholder='Enter Price...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Batch Number</label>
                                                        <input type="text" id='doctorName' name='batch_number' placeholder='Enter Batch Number...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Discount</label>
                                                        <input type="text" id='doctorName' name='discounted_price' placeholder='Enter Discount...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">Quantity</label>
                                                <input type="text" id='doctorName' name='quantity' placeholder='Enter quantity...' onChange={getLoginInput} />
                                            </div>
                                        </div> */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Package and Delivery</label>
                                                        <input type="text" id='doctorName' name='package_delivery' placeholder='Enter Package & Delivery...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Suggest Use</label>
                                                        <input type="text" id='doctorName' name='suggest_use' placeholder='Enter Suggested Use...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Ingredients</label>
                                                        <input type="text" id='doctorName' name='ingredients' placeholder='Enter Ingredients...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Warning</label>
                                                        <input type="text" id='doctorName' name='warning' placeholder='Enter Warning...' onChange={getLoginInput} required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Dosage</label>
                                                        <input type="text" id='doctorName' name='dosage' placeholder='Enter Dosage...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">
                                                    <div className="fields">
                                                        <label htmlFor="productActive" className='toggleLabel'>Active</label>
                                                        <div className="toggleButton">
                                                            <label className="switch">
                                                                <input type="checkbox" checked={activity === "0"} onChange={(e) => { setSetActivityState(e.target.checked ? "0" : "1") }} />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">
                                                    <div className="fields">
                                                        <label htmlFor="productActive" className='toggleLabel'>Featured</label>
                                                        <div className="toggleButton">
                                                            <label className="switch">
                                                                <input type="checkbox" checked={is_featured === 1} onChange={(e) => { setfeatured(e.target.checked ? 1 : 0) }} />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type='Submit'>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
