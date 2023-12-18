import { useRef, useState, useEffect, TokenService, UserData, BookDoctorAPI, BannerService, imageUrl } from './doctorImport.js'
const DoctorService = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { getConsultation, getSingleDoctor, getSpecilities, getDoctorType, getSpecilitiesDoctor, getAllDoctor, doctorBookingApi, onlineDoctorTimeAPI } = BookDoctorAPI();


    const [onlineDoctorState, setOnlineDoctorState] = useState([])



    //login and beneficiary Service
    const [reciepentName, setRecipentName] = useState('');
    const { getToken, getStorageData, rememberGet } = TokenService();
    const [beneSession, setBeneSession] = useState();
    const [isBeneficiary, setisBeneficiary] = useState("");
    const myDialogRef = useRef(null);
    const [beneOption, setBeneOption] = useState(false);
    const [allBeneficiary, setAllBeneficiary] = useState([]);
    const [selectedBene, setSelectedBene] = useState('');
    const [registeredBene, setRegisteredBene] = useState('');


    const { getBeneficiary } = UserData();

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
    const handleDataBenePopup = (data) => {
        if (data) {
            setisBeneficiary('yes');
        }
    };
    const handleRegisteredBeneChange = (value) => {
        setRegisteredBene(value);
    };
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

    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    })




    //FORM STEPPERS
    const [currentStep, setCurrentStep] = useState(1);
    const handleStepBack = (e) => {
        e.preventDefault();
        setCurrentStep((prevStep) => prevStep - 1);
        if (doctorBooking.type === '6' && currentStep === 5) {
            setCurrentStep(2);
        }
        else if (doctorBooking.type === '1' && currentStep === 8) {
            setCurrentStep(4);
        }
    };

    const handleStepNext = (e) => {
        e.preventDefault();
        if (doctorBooking.type === '6' && currentStep === 2) {
            setCurrentStep(4);
        }

        const physicalBooking = doctorBooking.type === '1' && currentStep === 4
        if (physicalBooking && getToken(rememberGet())) {
            setCurrentStep(8);
            setRecipentName(getStorageData(rememberGet())?.fullname);
        }
        else if (!physicalBooking) {
            if (currentStep === 7 && getToken(rememberGet())) {
                setCurrentStep((prevStep) => prevStep + 1);
                setRecipentName(getStorageData(rememberGet())?.fullname);
            }
            else if (currentStep !== 7) {
                setCurrentStep((prevStep) => prevStep + 1);
            }
            else {
                triggerLoginPopup1();
            }
        }
        else {
            triggerLoginPopup1();
        }
    };




    const [doctorBooking, setDoctorBooking] = useState(
        {
            // foruser: "",
            type: 0,
            onlineDoctorTime: '',
            consultation_type: "",
            doctorType: "",
            // specialist_category: "",
            bookedDoctorId: "",
            // recipient: "",
            payment_method: 1,
            cardNumber: "",
            promo: 1,
            promo_code: ''
        }
    )
    const [paymentState, setPaymentState] = useState({
        payment_method: 1
    })

    const [doctorDays, setDoctorDays] = useState('');

    const parseDisabledDays = (disabledDaysString) => {
        return disabledDaysString?.split(",")?.map((day) => day?.trim()?.toLowerCase());
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    const isDisabledDay = (date, disabledDays) => {
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return disabledDays.includes(dayName.toLowerCase());
    };
    const disabledDays = parseDisabledDays(doctorDays);

    // console.log(isWeekday(), 'weekData')
    // console.log(isDisabledDay(), 'disabledaysss')

    useEffect(() => {
        if (doctorBooking.bookedDoctorId) {

            getSingleDoctor(doctorBooking.bookedDoctorId).then((res) => {
                // console.log(doctorBooking.bookedDoctorId, 'iddd');
                // console.log('single doctor', res.data.data[0].availability)
                setDoctorDays(res.data.data[0].availability)
            }).catch((res) => {
                console.log(res, 'error');
            })
        }
        // console.log( doctorBooking.bookedDoctorId, 'booked');
    }, [doctorBooking.bookedDoctorId])





    // DOCTOR TIME AND DATE FUNCTIONALITY
    const [onSiteTime, setOnSiteTime] = useState('00:00');
    // const [selectedTime, setSelectedTime] = useState(''); // Add this state

    const [time, setTime] = useState({
        start: "",
        end: ""
    })
    const [timeSlots, setTimeSlots] = useState([]);

    //CALENDAR AND DATE TIME GETTING
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [bookDate, setBookDate] = useState(tomorrow);
    const [physicalDocDate, setPhysicalDocDate] = useState(tomorrow);


    //  const [startDate, setStartDate] = useState(tomorrow);
    //Date Formating
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const BookingOnlineDate = formatDate(bookDate)
    const BookingOnsiteDate = formatDate(physicalDocDate)

    // console.log(onlineDoctorState, 'onlineddd');
    // useEffect(() => {
    //     console.log(timeSlots, 'onlineTime');
    //     console.log(BookingOnlineDate, 'onlineDate');
    //     console.log(onSiteTime, 'onSiteTime');
    //     console.log(BookingOnsiteDate, 'onsiteDate');
    // }, [BookingOnlineDate, BookingOnsiteDate, timeSlots, onSiteTime])


    //get the time from api and format it before pushing it into the state
    // console.log(timeSlots, 'timeSlotss');
    const [appointedTime, setAppointedTime] = useState([])
    // console.log(BookingOnlineDate, 'onlineDateeee');
    // console.log(appointedTime, 'appointt');
    const bookedOnlineDocId = doctorBooking.bookedDoctorId
    useEffect(() => {
        // const data = { id: onlineDoctorState[0]?.id, date: BookingOnlineDate };
        const data = { id: bookedOnlineDocId, date: BookingOnlineDate };
        console.log(data, 'dataaaa');
        onlineDoctorTimeAPI(data)
            .then((res) => {
                console.log(res.data.data, 'responseee');
                const formattedAppointedTime = res?.data?.data.map(timeSlot => {
                    return {
                        booked_slots_date: timeSlot.booked_slots_date,
                        booked_slots_time: formatTime(timeSlot.booked_slots_time)
                    };
                });
                // console.log(res?.data?.data, 'TimeResponseeee');
                setAppointedTime(formattedAppointedTime);
                // console.log(res?.data?.data, 'physical Doc ');
            })
            .catch((res) => {
                console.log(res, 'onlineDoc');
            });
    }, [bookedOnlineDocId, BookingOnlineDate]);

    function formatTime(time) {
        const parts = time.split(':');
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);

        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${amPm}`;
    }
    useEffect(() => {
        const startTime = new Date(`2000-01-01 ${time.start}`);
        const endTime = new Date(`2000-01-01 ${time.end}`);
        const slots = [];

        let currentTime = new Date(startTime);
        while (currentTime < endTime) {
            const timeSlot = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            slots.push(timeSlot);

            currentTime.setMinutes(currentTime.getMinutes() + 15);
        }

        // Add the last time slot
        const lastTimeSlot = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        slots.push(lastTimeSlot);

        setTimeSlots(slots);
    }, [time]);





    // let imageUrl = "http://fmd.arraydigitals.com"
    const [specialities, setSpecialities] = useState()
    const [doctorType, setDoctorType] = useState()
    // const [allDoctor, setAllDoctor] = useState([])
    // const [physicalDoctorState, setPhysicalDoctorState] = useState([])

    // useEffect(() => {
    //     // console.log(onlineDoctorState, 'onlineDoctotsss');
    //     console.log(doctorType, 'onlineDoctotsss');
    // }, [doctorType])

    // const [docSingleSpeciality, setDocSingleSpeciality] = useState(
    //     {
    //         specailist_category: ""
    //     }
    // )




    //get Input from Form
    const getInput = (e, start_time, end_time) => {
        const name = e.target.name;
        const value = e.target.value;
        setDoctorBooking({ ...doctorBooking, [name]: value })
        setTime({ start: start_time, end: end_time });

        // setDocSingleSpeciality({ specailist_category: itemSpeciality })
    }
    // console.log(docSingleSpeciality.specailist_category, "specasdasdasda");

    const [selectedTime, setSelectedTime] = useState('');

    const [processBooked, setProcessBooked] = useState(0);
    //Form Submition after Taking Input
    const formSubmit = (e) => {
        e.preventDefault();
        let foruser;
        let recepient = getStorageData(rememberGet())?.id;
        let beneficiary = isBeneficiary;
        if (isBeneficiary === 'yes') {
            if (selectedBene) {
                foruser = selectedBene;
            }
            else {
                foruser = registeredBene;
            }
        }
        else {
            foruser = getStorageData(rememberGet())?.id;
        }

        let date_time;
        let booked_doctor;
        let promo_code = doctorBooking.promo_code
        let consultation_type;
        const onSiteDoctorTime = formatTime(onSiteTime);
        if (doctorBooking.type === '6') {
            consultation_type = doctorBooking.specialist_category;
            date_time = BookingOnlineDate + ' ' + selectedTime;
            booked_doctor = doctorBooking.bookedDoctorId;

        }
        else if (doctorBooking.type === '1') {
            consultation_type = doctorBooking.consultation_type;
            date_time = BookingOnsiteDate + ' ' + onSiteDoctorTime
            booked_doctor = null;
        }

        let type = doctorBooking.type;

        const BookDoctorVar = { ...paymentState, promo_code, booked_doctor, type, recepient, is_beneficiary: beneficiary, foruser, date_time, consultation_type }
        console.log(BookDoctorVar);
        setIsLoading(true);
        doctorBookingApi(BookDoctorVar).then((res) => {
            console.log(res, 'responseee');

            if (res.status === 203) {
                setProcessBooked(processBooked + 1)
                setDoctorBooking(prevState => ({
                    ...prevState,
                    promo_code: ''
                }));
                promo_code = ""
                console.log(doctorBooking, 'bookinggg');
            }
            else {
                setCurrentStep(9);
            }
        }).catch((res) => {
            console.log(res, 'responseError');
        }).finally(() => {
            setIsLoading(false)

        })
    }

    useEffect(() => {
        getSpecilities().then((res) => {
            setSpecialities(res?.data?.data)
        }).catch((err) => {
            console.log(err.message)
        })
        getDoctorType().then((res) => {
            setDoctorType(res?.data?.data)

        }).catch((err) => {
            console.log(err.message)
        })

        // console.log(doctorBooking.specialist_category, 'ykId');
        //Getting All doctor and setting them according to type physical and Online

    }, [])
    useEffect(() => {
        // console.log(doctorBooking.specialist_category, 'iddddd');
        getSpecilitiesDoctor(doctorBooking.specialist_category).then((res) => {
            console.log(res?.data?.data, 'ukData');
            setOnlineDoctorState(res?.data?.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [doctorBooking.specialist_category])





    //Banners Work
    const { getBanners } = BannerService();

    const [bannersDesk, setDeskBanners] = useState([])
    const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 8 : 19);

    useEffect(() => {
        const handleResize = () => {
            setBannerType(window.innerWidth >= 991 ? 8 : 19);
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

    // console.log(filterDisabledDays(), 'disableeeed');
    return { disabledDays, isWeekday, isDisabledDay, processBooked, bannersDesk, isLoading, reciepentName, selectedTime, setSelectedTime, BookingOnsiteDate, BookingOnlineDate, imageUrl, specialities, doctorType, getInput, formSubmit, onSiteTime, setOnSiteTime, onlineDoctorState, setOnlineDoctorState, setTime, bookDate, setBookDate, physicalDocDate, setPhysicalDocDate, tomorrow, timeSlots, appointedTime, allBeneficiary, currentStep, handleStepBack, handleStepNext, setDoctorBooking, doctorBooking, beneOption, settings, isBeneficiary, myDialogRef3, onChangeBeneficiary, getTestFor, handleRegisteredBeneChange, handleDataBenePopup, myDialogRef, myDialogRef1 }
}

export default DoctorService;