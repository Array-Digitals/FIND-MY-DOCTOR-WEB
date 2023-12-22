import React, { useState, useEffect } from 'react'
import AdminService from '../../../services/adminApi';
import GeneratePassword from '../../../services/generatePassword';
import pharmacyService from '../../../services/pharmacy';
import { useParams } from 'react-router';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import profilePic from '../../../assets/images/guy.png'
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';


export const ProductUpdateForm = () => {
    let { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const { generatePassword } = GeneratePassword();
    const { brandGet, categoriesGet, productUpdate, getSingleProduct, getSingleBrand, getSingleCategory } = pharmacyService();
    const [password, setPassword] = useState('')
    const [featured_img, setProductImage] = useState()
    const [brandState, setBrandState] = useState([])
    const [categoryState, setCategoryState] = useState([])
    const [activity, setSetActivityState] = useState();
    const [is_featured, setfeatured] = useState();
    const [updatedProduct, setUpdatedProduct] = useState({})
    // const [productData, setProductData] = useState({})

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdatedProduct({ ...updatedProduct, [name]: value })
    }
    const submitProductImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProductImage(reader.result);
        };
    }
    const [singleBrand, setSingleBrand] = useState({})
    const [singleCat, setSingleCat] = useState({})

    const submitForm = (e) => {
        e.preventDefault();
        const ProductRegister = { ...updatedProduct, id: productId, featured_img, activity, is_featured }
        if (!ProductRegister.hasOwnProperty('brand')) {
            ProductRegister.brand = `${singleBrand.id}`;
        }
        // Check if 'Category' property is present, if not, set it to 'singleCat.id'
        if (!ProductRegister.hasOwnProperty('category')) {
            ProductRegister.category = `${singleCat.id}`;
        }
        const {brand_id, cat_id, ...data}  = ProductRegister;

        console.log(data, 'productRegistered');
        setIsLoading(true)
        productUpdate(ProductRegister).then((res) => {
            toast.success('Product Updated')
            console.log(res)
            fetchData();
        }).catch((err) => {
            toast.success('Update Failed')
            console.log(err, "Product Register Error")
        }).finally(() => {
            setIsLoading(false)
        })
    }
 
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        getSingleProduct(productId).then((res) => {
            // console.log(res?.data?.data, 'res');
            const { featured_img, is_featured, activity, reviews, rating, brand_name, cat_name, ...apiDataWithoutFeatures } = res?.data?.data;
            setUpdatedProduct(apiDataWithoutFeatures);
            setSetActivityState(activity);
            setfeatured(is_featured);
            console.log(res?.data?.data, 'dataa response');

            getSingleBrand(res?.data?.data?.brand_id).then((res) => {
                // console.log(res?.data?.data[0], 'responseBranddd');
                setSingleBrand(res?.data?.data[0])
            }).catch((res) => {
                console.log(res, 'error');
            })

            getSingleCategory(res?.data?.data?.cat_id).then((res) => {
                // console.log(res?.data.data[0], 'response Cateeee');
                setSingleCat(res?.data?.data[0])
            }).catch((res) => {
                console.log(res, 'error');
            })

        }).catch((err) => {
            console.log(err, 'error');
        })
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
    }

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
                <div className="container">
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
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Update Product
                            </p>
                        </div>
                        <div className="card cardForm">
                            {
                                isLoading ?
                                    <Loader /> :
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
                                                        <input type="text" id='doctorName' placeholder={updatedProduct?.name} name='name' onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorEmail">Product Description</label>
                                                        <input type="text" id='doctorEmail' name='description' placeholder={updatedProduct?.description} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Title</label>
                                                        <input type="text" id='doctorName' name='title' placeholder={updatedProduct?.title} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Weight</label>
                                                        <input type="text" id='doctorName' name='weight' placeholder={updatedProduct?.weight} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Manufacture Date</label>
                                                        <input type="date" id='doctorName' name='manufacture_date' max={getMaxDate()} placeholder={updatedProduct?.manufacture_date} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Expiry Date</label>
                                                        <input type="date" id='doctorName' name='expiry_date' min={getMinDate()} placeholder={updatedProduct?.expiry_date} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorPhone">Product Image</label>
                                                        <input type="file" className='form-control' id='doctorPhone' placeholder={updatedProduct?.featured_img} name='featured_img' onChange={submitProductImage} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorPhone">Product Quantity</label>
                                                        <input type="number" id='doctorPhone' name='quantity' placeholder={updatedProduct?.quantity} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Brand</label>
                                                        <select name="brand" id="" onChange={getLoginInput}>
                                                            <option value={singleBrand?.id}>{singleBrand?.name}</option>

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
                                                            <option value={singleCat?.id}>{singleCat?.name}</option>
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
                                                        <input type="text" name='tags' id='doctorName' placeholder={updatedProduct?.tags} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Price</label>
                                                        <input type="text" id='doctorName' name='price' placeholder={updatedProduct?.price} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Batch Number</label>
                                                        <input type="text" id='doctorName' name='batch_number' placeholder={updatedProduct?.batch_number} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Product Discount</label>
                                                        <input type="text" id='doctorName' name='discounted_price' placeholder={updatedProduct?.discounted_price} onChange={getLoginInput} />
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
                                                        <input type="text" id='doctorName' name='package_delivery' placeholder={updatedProduct?.package_delivery} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Suggest Use</label>
                                                        <input type="text" id='doctorName' name='suggest_use' placeholder={updatedProduct?.suggest_use} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Other Ingredients</label>
                                                        <input type="text" id='doctorName' name='ingredients' placeholder={updatedProduct?.ingredients} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Warning</label>
                                                        <input type="text" id='doctorName' name='warning' placeholder={updatedProduct?.warning} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Dosage</label>
                                                        <input type="text" id='doctorName' name='dosage' placeholder={updatedProduct?.dosage} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">
                                                    <div className="fields">
                                                        <label htmlFor="productActive" className='toggleLabel'>Activity</label>
                                                        <div className="toggleButton">
                                                            <label className="switch">
                                                                <input type="checkbox" checked={activity === 0} onChange={(e) => { setSetActivityState(e.target.checked ? 0 : 1) }} />
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
