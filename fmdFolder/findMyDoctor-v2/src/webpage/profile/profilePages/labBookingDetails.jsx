import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
// import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "../../BookLab/labImports";
// import { UploadFile } from '../../Component/uploadFile';
import Slider from "../../BookLab/labImports";
import banner1 from "../../../assets/images/banners/desktopBanner/profileBanDesk.jpg";
import MobBanner1 from "../../../assets/images/banners/desktopBanner/profileBanDesk.jpg";
import { ReviewPopup } from "../../Component/reviewPopup";
import { imageUrl } from "../../../services/baseUrl";

 const LabBookingDetails = () => {
    let { BookingId } = useParams();
    // let baseUrl = "http://fmd.arraydigitals.com";
    // const { labBookingDetails, getAllAssitant, postAssignBooking } = AdminService();
    const { LabBookingDetails } = UserData();
    const navigate = useNavigate();
    const [testBooking, setTestBooking] = useState(null);
    const [allTests, setAllTests] = useState([]);
    // const [isLabAssitant, setIsLabAssistant] = useState([]);
    // const [selectedLabAssitant, setSelectedLabAssistant] = useState();

    // const [popupData, setPopupData] = useState({
    //     booking: "",
    //     test_id: "",
    // });

    useEffect(() => {
        LabBookingDetails(BookingId)
            .then((res) => {
                console.log(res, "booking Details");
                setTestBooking(res?.data?.data);
                setAllTests(res?.data?.data?.tests);
            })
            .catch((res) => {
                console.log(res);
            });
    }, [allTests, testBooking]);

    const reviewDialog = useRef(null);
    const popupTrigger = () => {
        if (reviewDialog.current) {
            reviewDialog.current.showModal();
        }
    };

    return (
        <React.Fragment>
            <main>
                <div className="profileMain">
                    <section className="profileBanner">
                        <div className="banner">
                            <div className="bannerInner">
                                <picture>
                                    <source
                                        srcSet={banner1}
                                        media="(min-width: 991px)"
                                    />
                                    <img loading="lazy" src={MobBanner1} alt="reload page" />
                                </picture>
                            </div>
                        </div>
                    </section>
                    <section className="mainSection">
                        <div className="container">
                            <div className="mainSectionWrapper">
                                <div className="card cardForm cardMargin">
                                    <div className="card-body">
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
                                        <div className="appointmentDetails ">
                                            {!testBooking ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <React.Fragment>
                                                    <div className="mainBody">
                                                        <div className="mainBodyHeading2">
                                                            <button
                                                                className="navigateBackButton"
                                                                onClick={() => {
                                                                    navigate(
                                                                        -1
                                                                    );
                                                                }}
                                                            >
                                                                <i className="ri-arrow-left-line"></i>
                                                            </button>

                                                            <p>Lab Details</p>
                                                        </div>
                                                        <div className="orderDetailsWrapper">
                                                            <div className="mainBodySection">
                                                                <div className="subHeading">
                                                                    Order ID:
                                                                    <span>

                                                                        {
                                                                            testBooking.id
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="subHeading">
                                                                    Name:
                                                                    <span>

                                                                        {
                                                                            testBooking.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="subHeading">
                                                                    Amount:
                                                                    <span>

                                                                        {
                                                                            testBooking.amount
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="subHeading">
                                                                    For
                                                                    Beneficiary:
                                                                    <span>

                                                                        {
                                                                            testBooking.is_beneficiary
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="subHeading">
                                                                    Status:
                                                                    <span>

                                                                        {
                                                                            testBooking.b_status
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="subHeading">
                                                                    <span>

                                                                       <button className="themeButton" onClick={popupTrigger}>Give Review</button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <img loading="lazy"
                                                                src="data:image/png;base64,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"
                                                                alt="reload page"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mainBodys">
                                                        <div className="mainBodyHeading2">
                                                            <p>Tests</p>
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        {/* <td>
                                                                            lab Id
                                                                        </td> */}
                                                                        <td>
                                                                            lab Name
                                                                        </td>
                                                                        <td>
                                                                            Test Id
                                                                        </td>
                                                                        <td>
                                                                            Test Name
                                                                        </td>
                                                                        <td>
                                                                            Test Price
                                                                        </td>
                                                                        <td>Test Report</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {allTests.map(
                                                                        (item, keyId) => (
                                                                            <tr>
                                                                                {/* <td>{item.lab_id}</td> */}
                                                                                <td>{item.lab_name}</td>
                                                                                <td>{item.test_id}</td>
                                                                                <td>{item.test_name}</td>
                                                                                <td>{item.test_price}</td>
                                                                                <td className="buttonOuter">
                                                                                    {item.test_report === null ?
                                                                                        <p>
                                                                                            Report Not Uploaded
                                                                                        </p>

                                                                                        :
                                                                                        <a href={`${imageUrl}/${item.test_report}`} target="_blank" >
                                                                                            View
                                                                                            File
                                                                                        </a>

                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* <ReviewPopup reviewRef={reviewDialog} reviewType={"labs"} orderId={testBooking?.id} testName={testBooking?.name} phoneNumber={testBooking?.phone}/> */}
                <ReviewPopup reviewRef={reviewDialog} reviewType={"labs"} testProps={testBooking}/>
            </main>
        </React.Fragment>
    );
};
export default LabBookingDetails
