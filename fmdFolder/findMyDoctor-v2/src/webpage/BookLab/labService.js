import {
    useState, useEffect, useRef,
    BookLabAPI, TokenService, UserData,
    testImg1, testImg2, testImg3, testImg4, testImg5, testImg6, testImg7, testImg8,
    BannerService

} from './labImports.js';
import { baseUrl } from '../../services/baseUrl.js';

const LabService = () => {
    const [isLoading, setIsLoading] = useState(true);

    //CAROUSEL SETTINGS
    const [settings, setSettings] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    const [settings1, setSettings1] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    const { getBeneficiary } = UserData();
    const { getToken, getStorageData, rememberGet } = TokenService()
    const { getCities, getLabByCity, getTestByLab, labBookingAPI } = BookLabAPI();
    const myDialogRef = useRef(null);


    // Login and Signup Popup Triggers  for user
    const myDialogRef1 = useRef(null);
    const triggerLoginPopup1 = () => {
        if (myDialogRef1.current) {
            myDialogRef1.current.showModal();
        }
    };

    const myDialogRef3 = useRef(null);
    const triggerBenePopup3 = () => {
        if (myDialogRef3.current) {
            myDialogRef3.current.showModal();
        }
    };

    //Switching Between Forms
    const [currentStep, setCurrentStep] = useState(1);
    const handleStepBack = (e) => {
        e.preventDefault();
        console.log(currentStep, 'steps');
        if (currentStep === 3) {
            setTestType([]);
            if (selectRefLabTest.current !== null) {
                selectRefLabTest.current.selectedIndex = 0;
            }
            setIsVisible(false);
            // console.log('2');
        }

        setCurrentStep((prevStep) => prevStep - 1);


    };
    const handleStepNext = (e) => {
        e.preventDefault();
        if (currentStep === 4 && getToken(rememberGet())) {
            setCurrentStep((prevStep) => prevStep + 1);
            setRecipentName(getStorageData(rememberGet())?.fullname);
            console.log(reciepentName, "receieptname");
        } else if (currentStep !== 4) {
            setCurrentStep((prevStep) => prevStep + 1);
        } else {
            triggerLoginPopup1();
        }
    };


    // Base URL TO USE IT IN THE IMAGES 
    // const baseUrl = "http://fmd.arraydigitals.com"

    //REF IS USING IN WHILE SELECTING LAB TEST TO PUT SELECT TAG TO ITS DEFAULT POSITION
    const selectRefLabTest = useRef(null);

    //CALENDAR AND DATE TIME GETTING
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [startDate, setStartDate] = useState(tomorrow);
    // date and time input Select
    const formatDate = date => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    };
    const BookingDate = formatDate(startDate)
    const [labTime, setLabTime] = useState('00:00');



    // IF THE USER SELECTS LAB, SHOW HIM ITS TESTS
    const [isVisible, setIsVisible] = useState(false);
    const visibleLabTest = () => {
        setIsVisible(true);
    };

    // ARRAY OF THE TEST USER SELECTING
    const [testType, setTestType] = useState([]);

    //CALCULATING TOTAL AMOUNT OF THE TESTS
    let totalAmount = 0;
    testType.forEach((item) => {
        totalAmount += parseFloat(item?.test_amount);
    });

    // LAB TESTS ON CHANGE FUNCTION WHICH IS GETTING ARRAY OF TEST
    const handleSelect = (event) => {
        console.log('workinggg');
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.value;
        const fullname = selectedOption.getAttribute('data-fullname');
        const test_amount = selectedOption.getAttribute('data-test_amount');
        const test_name = selectedOption.innerText;

        if (id) {
            if (!testType.some((item) => item.id === id)) {
                setTestType([...testType, { id, fullname, test_amount, test_name }]);
                const updatedBookLabPost = {
                    ...bookLabPost,
                    tests: [...bookLabPost.tests, { id }],
                };
                setBookLabPost(updatedBookLabPost);
            }
        }
    };

    //REMOVING ITEMS FROM TESTS ARRAY
    const handleRemove = (item) => {
        const newValues = testType.filter(val => val !== item);
        setTestType(newValues);
    }


    // Required STATES FOR API'S
    const [reciepentName, setRecipentName] = useState();
    const [isBeneficiary, setisBeneficiary] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [cityLabs, setCityLabs] = useState();

    const [getLabTest, setGetLabTest] = useState([]);
    const [allBeneficiary, setAllBeneficiary] = useState([]);
    const [beneSession, setBeneSession] = useState();
    const [beneOption, setBeneOption] = useState(false);
    const [selectedBene, setSelectedBene] = useState();
    const [registeredBene, setRegisteredBene] = useState();
    const [bookLabPost, setBookLabPost] = useState({
        // promo: "1",
        type: null,
        lab_id: null,
        tests: []
    });
    const [labBookingPayment, setLabBookingPayment] = useState({
        payment_method: '1',
        promo_code: '',
        card: '',
        cvv: '',
        expirty: '',
    })
    const getInputPayment = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLabBookingPayment({ ...labBookingPayment, [name]: value })
    }

    // console.log(cityLabs, '');
    const handleRegisteredBeneChange = (value) => {
        setRegisteredBene(value);
    };
    const [processBooked, setProcessBooked] = useState(0);

    //form Submition Function
    const formSubmit = e => {
        e.preventDefault();
        let test_for;
        let recepient = getStorageData(rememberGet())?.id;
        const date_time = BookingDate + " " + labTime;
        let beneficiary = isBeneficiary;
        if (isBeneficiary === 'yes') {
            if (selectedBene) {
                test_for = selectedBene;
            }
            else {
                test_for = registeredBene;
            }
        }
        else {
            test_for = getStorageData(rememberGet())?.id;
        }

        const { payment_method, promo_code } = labBookingPayment;
        const BookLabVar = { ...bookLabPost, test_for, beneficiary, date_time, recepient, payment_method, promo_code }

        setIsLoading(true)
        console.log(BookLabVar, 'booklabbb');
        labBookingAPI(BookLabVar).then((res) => {
            if (res.status === 203) {
                console.log(res, 'responseee');
                setLabBookingPayment(prevState => ({
                    ...prevState,
                    promo_code: ''
                }));
                setProcessBooked(processBooked + 1)
            }
            else {
                setCurrentStep((prevStep) => prevStep + 1);
            }
        }).catch((res) => {
            console.log(res);
        }).finally(() => {
            setIsLoading(false)
        })


    }

    // Function for user to check if he's login or not, if he's login, and choose beneficiary state will pass Yes else No, if he's not login, it will show popup to him
    const getTestFor = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "LabBookedFor" && value === "self") {
            setisBeneficiary("no");
            setBeneOption(false)
        } else {
            console.log("beneficiary selected")
            //is user Logged in?
            if (getToken(rememberGet())) {

                setBeneOption(true);
                if (selectedBene) {
                    setisBeneficiary('yes');
                }
                else {
                    setisBeneficiary('');
                }
            }
            else {
                if (beneSession) {
                    console.log('user not Logged In beneficiary exist');
                    setisBeneficiary('yes');
                }
                else {
                    console.log('user not Logged In beneficiary not exist');
                    triggerBenePopup3();
                    setisBeneficiary('');

                }
            }
        }
    };

    const handleDataBenePopup = (data) => {
        if (data) {
            setisBeneficiary('yes');
        }
    };

    //Getting cities Values from input Field
    const getCityInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setSelectedCity({ ...selectedCity, [name]: value })
    }

    const onChangeBeneficiary = e => {
        setSelectedBene(e.target.value)
        setisBeneficiary('yes');
    }

    useEffect(() => {
        setBeneSession(localStorage.getItem("temporaryBeneficiary"))
    }, [beneSession, isBeneficiary])

    useEffect(() => {
        if (getToken(rememberGet())) {
            getBeneficiary().then((res) => {
                setAllBeneficiary(res?.data?.data);
            }).catch((err) => {
                console.log('error', err);
            })
        }
    }, [])
    useEffect(() => {
        getCities().then((res) => {
            setCities(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
    }, [])

    useEffect(() => {
        if (selectedCity) {
            getLabByCity(selectedCity?.location).then((res) => {
                setCityLabs(res?.data?.data)
            }).catch((err) => {
                console.log(err?.data?.data)
            })
        }
    }, [selectedCity])

    useEffect(() => {
        if (bookLabPost?.lab_id) {
            // console.log(bookLabPost?.lab_id, 'WORKINGGGGG');
            getTestByLab(bookLabPost?.lab_id)?.then((res) => {
                setGetLabTest(res?.data?.data)
                // console.log(res?.data?.data, " LAB TESTSSS");
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }, [bookLabPost?.lab_id]);

    // Hardcoded images for tests
    const testImages = () => {
        const imageUrls = [
            testImg1, testImg2, testImg3, testImg4, testImg5, testImg6, testImg7, testImg8
        ];
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
    }


    //Banners Work
    const { getBanners } = BannerService();

    const [bannersDesk, setDeskBanners] = useState([])
    const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 14 : 18);

    useEffect(() => {
        const handleResize = () => {
            setBannerType(window.innerWidth >= 991 ? 14 : 18);
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
        console.log(bannerType, 'bannerrr');
        try {
            const bannerResponse = await getBanners(bannerType);
            const responseData = bannerResponse.data.data;
            setDeskBanners(responseData);
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setIsLoading(false)
        }
    };




    return { processBooked, bannersDesk, isLoading, settings, settings1, formSubmit, currentStep, getTestFor, beneOption, allBeneficiary, handleStepNext, handleStepBack, isBeneficiary, currentStep, getCityInput, cities, selectedCity, currentStep, cityLabs, setBookLabPost, visibleLabTest, baseUrl, isVisible, handleSelect, selectRefLabTest, getLabTest, testType, handleRemove, onChangeBeneficiary, startDate, tomorrow, setStartDate, setLabTime, reciepentName, BookingDate, labTime, totalAmount, getInputPayment, labBookingPayment, myDialogRef, myDialogRef1, myDialogRef3, handleRegisteredBeneChange, handleDataBenePopup }
}

export default LabService