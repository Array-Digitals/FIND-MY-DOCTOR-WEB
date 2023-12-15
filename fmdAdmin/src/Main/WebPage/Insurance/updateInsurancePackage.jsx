import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { useRef } from 'react';
import { useParams } from 'react-router';
import { Loader } from '../../Component/loader';
import { toast, ToastContainer } from 'react-toastify';

export const UpdateInsurancePackage = () => {

    // const { testRegister } = AdminService();
    let { packageId } = useParams();
    const { insurancePlanPost, insurancePlanUpdate, insurancePlanSingleGet, insuranceProviderGetAll } = insuranceService();
    const [testData, setTestData] = useState({})
    const [newFeatures, setFeatures] = useState([])
    const [addDesc, setAddDesc] = useState([1]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData();
    }, [packageId])

    const fetchData = () => {
        insurancePlanSingleGet(packageId).then((res) => {
            // console.log(res.data.data[0], 'response');
            const parsedJson = JSON.parse(res?.data?.data[0].features)
            const packageFeature = parsedJson;
            const { features, provider_name, ...packageData } = res?.data?.data[0];

            console.log(res?.data?.data[0], 'kknkn');
            setTestData(packageData)
            setFeatures(packageFeature)

            // setAddDesc(Array(packageFeature.length).fill(''));

            setAddDesc(packageFeature.map((feature, index) => ({
                featureKey: feature.featureKey,
                featureValue: feature.featureValue
            })));
        }).catch((error) => {
            console.log(error, 'error');
        })
    }

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.type === 'select-one') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedValue = selectedOption.value;
            setTestData({ ...testData, [name]: selectedValue });
        } else {
            setTestData({ ...testData, [name]: value });
        }
    }

    const getFeatureInput = (e, keyid) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;
        const updatedFeatures = [...newFeatures];
        const existingFeature = updatedFeatures.find((feature) => feature.keyid === keyid);

        if (existingFeature) {
            existingFeature[name] = value;
        } else {
            const newFeature = { keyid, [name]: value };
            updatedFeatures.push(newFeature);
        }
        setFeatures(updatedFeatures);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const features = JSON.stringify(newFeatures);
        const testSubmit = { ...testData, features, id: packageId }
        // console.log(testSubmit, 'dafwff')
        setIsLoading(true)
        insurancePlanUpdate(testSubmit).then((res) => {
            console.log(res)
            toast.success("Package Updated")
            fetchData();
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    function handleAddMoreClick(e) {
        e.preventDefault();
        if (addDesc.length <= 8) {
            setAddDesc([...addDesc, ""]);
        }
        else {
            setAddDesc(addDesc);
        }
    }

    const handleServiceDelete = () => {
        if (addDesc.length > 0) {
            const updatedFeatures = [...newFeatures];
            const updatedAddDesc = [...addDesc];

            updatedFeatures.pop(); // Remove the last feature
            updatedAddDesc.pop(); // Remove the last description

            setFeatures(updatedFeatures);
            setAddDesc(updatedAddDesc);
        }
    }


    return (
        <React.Fragment>
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
                            <img src={insurancePicLogo} alt="" />
                            <p>
                                Insurance Package
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                {
                                    isLoading
                                        ?
                                        <Loader />
                                        :
                                        <form className="additionForm" onSubmit={formSubmit}>
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Package Name</label>
                                                        <input type="text" id='doctorName' name='name' placeholder={testData.name} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        {
                                                            console.log(testData.for_parents, 'kansfjasf')
                                                        }
                                                        <label htmlFor="doctorName">Package For</label>
                                                        <select name="for_parents" onChange={getLoginInput} >
                                                            <option value="1" selected={testData.for_parents == "1"}>Parent</option>
                                                            <option value="0" selected={testData.for_parents == "0"}>Children</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Annual Cost</label>
                                                        <input type="text" id='doctorName' name='annual_cost' placeholder={testData.annual_cost} onChange={getLoginInput} />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">

                                                        {addDesc?.map((item, keyid) => (
                                                            <div key={keyid}>
                                                                <div className="packages">
                                                                    <div className="package1">
                                                                        <label htmlFor="doctorName">Package Features {keyid + 1} </label>
                                                                        <input type="text" id='doctorName' name='featureKey' placeholder={item.featureKey} onChange={(e) => getFeatureInput(e, keyid)} />
                                                                    </div>
                                                                    <div className="package2">
                                                                        <label htmlFor="doctorName">Pricing</label>
                                                                        <input type="text" name='featureValue' placeholder={item.featureValue} onChange={(e) => getFeatureInput(e, keyid)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <div className='addMoreButton'>
                                                        {addDesc.length > 1 && (
                                                            <button onClick={handleServiceDelete}>remove</button>
                                                        )}
                                                        {addDesc.length <= 8 &&
                                                            <button onClick={handleAddMoreClick}>add more</button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type='Submit' >Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
