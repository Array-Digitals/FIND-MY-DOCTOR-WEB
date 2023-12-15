import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import reportImageLogo from '../../../assets/images/Repot.svg'
import reportServices from '../../../services/reportingService';

export const OrderReport = () => {
    const { PharmacyStatsReport } = reportServices()
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    console.log(data, 'dataaa');
    const fetchData = () => {
        PharmacyStatsReport('accept').then((res) => {
            const responseData = res.data.data
            // console.log(responseData, 'responseaccpet');
            responseData.forEach((item) => {
                const amounts = item.amount.split(',').map(parseFloat);
                const totalAmount = amounts.reduce((acc, value) => acc + value, 0);
                item.totalAmount = totalAmount;
            });



            setData(responseData)
        }).catch((res) => {
            console.log(res, 'error');
        })
        PharmacyStatsReport('reject').then((res) => {
            const responseData = res.data.data
            console.log(responseData, 'responseaccpet');
            responseData.forEach((item) => {
                const amounts = item.amount.split(',').map(parseFloat);
                const totalAmount = amounts.reduce((acc, value) => acc + value, 0);
                item.totalAmount = totalAmount;
            });
            setData2(responseData)
        }).catch((res) => {
            console.log(res.response, 'error');
        })

    }

    useEffect(() => {
        fetchData()
    }, [])

    // Physical Doctor ALL data 
    // const data = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

    // Physical Doctor ALL data 
    // const data2 = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

    // related to pagination and search of physcial doctor
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };
    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.filter((item) => {
        const itemName = String(item.booking_id)
        if (searchTerm === '') {
            return item;
        } else if (
            itemName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    // related to pagination and search of physcial doctor
    const [searchTerm2, setSearchTerm2] = useState('');
    const [pageNumber2, setPageNumber2] = useState(0);
    const handlePageClick2 = (data2) => {
        const selectedPage2 = data2.selected;
        setPageNumber2(selectedPage2);
    };
    const itemsPerPage2 = 8;
    const startIndex2 = pageNumber2 * itemsPerPage2;
    const endIndex2 = startIndex2 + itemsPerPage2;
    const pageCount2 = Math.ceil(data2.length / itemsPerPage2);
    const currentItems2 = data2.filter((item) => {
        const itemName = String(item.booking_id)
        if (searchTerm2 === '') {
            return item;
        } else if (
            itemName.toLowerCase().includes(searchTerm2.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex2, endIndex2);
    const handleSearch2 = (event) => {
        setSearchTerm2(event.target.value);
        setPageNumber2(0);
    };


    // Modal open and close 
    const openProductModal = () => {
        const myDialog = document.getElementById('productOrderModalId');
        myDialog.showModal();
    };
    const closeProductModal = () => {
        const myDialog = document.getElementById('productOrderModalId');
        myDialog.close();
    };
    const rejectedProductModalOpen = () => {
        const myDialog = document.getElementById('rejectedProductModalId');
        myDialog.showModal();
    };
    const rejectedProductModalClose = () => {
        const myDialog = document.getElementById('rejectedProductModalId');
        myDialog.close();
    };

    function DateFormater(inputDate) {
        const originalDate = new Date(inputDate);
        const day = String(originalDate.getDate()).padStart(2, '0');
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1
        const year = originalDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={reportImageLogo} alt="" />
                            <p>
                                Orders Report
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Accepted Orders
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Order ID</th>
                                                <th scope="col">Order Date</th>
                                                {/* <th scope="col">Order Time</th> */}
                                                {/* <th scope="col">Order City</th> */}
                                                <th scope="col">Total Pricing</th>
                                                <th scope="col">Order Accepted Date</th>
                                                {/* <th scope="col">Order Dispatched Date</th>
                                                <th scope="col">Order Delivered Date</th> */}
                                                <th scope="col">Order Products</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                const formatedDate = DateFormater(item.accepted_time)
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.booking_id}</td>
                                                        <td>{item?.date_time}</td>
                                                        {/* <td>{item?.city}</td> */}
                                                        {/* <td>{item?.Qualification}</td> */}
                                                        {/* <td>{item?.city}</td> */}
                                                        <td>{item?.totalAmount}</td>
                                                        <td>{formatedDate}</td>
                                                        <td>{item?.product_name}</td>
                                                        {/* <td>{item?.pending_Order}</td> */}
                                                        {/* <td><button onClick={openProductModal}>View Products</button></td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>


                        <div className="card cardForm lowerCardTable">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Declined Orders
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch2} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Order ID</th>
                                                <th scope="col">Order Date</th>
                                                {/* <th scope="col">Order Time</th> */}
                                                {/* <th scope="col">Order City</th> */}
                                                <th scope="col">Total Pricing</th>
                                                <th scope="col">Order Rejected Date</th>
                                                <th scope="col">Order Products</th>
                                                <th scope="col">Rejection Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems2.map((item, keyid) => {
                                                const formatedDate = DateFormater(item.accepted_time)
                                                console.log(item, 'itemmm');
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.booking_id}</td>
                                                        <td>{item?.date_time}</td>
                                                        {/* <td>{item?.city}</td> */}
                                                        {/* <td>{item?.Qualification}</td> */}
                                                        {/* <td>{item?.city}</td> */}
                                                        <td>{item?.totalAmount}</td>
                                                        <td>{formatedDate}</td>
                                                        <td>{item?.product_name}</td>
                                                        <td>{item?.rejection_reason}</td>
                                                        {/* <td><button onClick={openProductModal}>View Products</button></td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount2}
                                    onPageChange={handlePageClick2}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>

                        <dialog id='productOrderModalId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closeProductModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Products
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Product Id: 1</p>
                                            <p>Product Name: name</p>
                                            <p>Product Price: 1000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                        <dialog id='rejectedProductModalId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={rejectedProductModalClose}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Reason
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit porro est quibusdam officia quis. Quasi laudantium expedita soluta esse quas odit voluptas doloremque officia repellat molestiae. Enim dolores dignissimos obcaecati fugiat dolorum, quam officia. Eligendi odit dolor ullam, laboriosam mollitia architecto libero, aliquam dolorem, veniam modi quo doloremque numquam officiis earum corrupti error voluptatem asperiores sequi. Nihil maiores minus quam non sint perferendis exercitationem consectetur nemo cum dolor cumque fugit ratione est nobis, assumenda, facere unde corrupti, dicta iure modi suscipit quae labore quos libero? Similique dignissimos officia unde assumenda, velit itaque dolor neque ratione sed eius quaerat enim nisi est maiores laudantium facilis? Veniam in, hic dolor itaque sit repudiandae magni cumque optio? Quam porro iusto dolorem, nesciunt consequuntur expedita. Fugit illum tempore velit deleniti placeat molestias omnis asperiores et dolores aliquid ab beatae ad iste eveniet maxime, dignissimos fuga maiores amet hic aspernatur. Velit optio sunt, eaque debitis dolores soluta ut. Veniam deserunt eveniet ipsa cumque ex ratione iste at placeat voluptatum, corporis sequi, laboriosam, sint quibusdam! Sit doloribus unde, odio dolores aut quod provident similique, ipsam cupiditate est ullam. Itaque quos aliquid dolorum nihil vitae tempora illo animi neque odio ipsum, ratione aspernatur id aperiam corrupti dolore natus eveniet, alias quasi rem officia. Esse quasi excepturi molestiae sed perferendis, dolor, optio ducimus inventore suscipit repudiandae odit ipsam placeat, eum recusandae temporibus nostrum vitae distinctio! Consequuntur ratione voluptatem odio obcaecati fuga earum minima! Minus, praesentium maxime inventore amet mollitia suscipit omnis incidunt veritatis aut provident facere ea, consequatur soluta dolores quos porro sequi error dolorum? Esse temporibus odit cumque nesciunt explicabo nemo at adipisci placeat. Expedita quisquam blanditiis veniam quae, provident suscipit! Voluptatem accusantium impedit quae ut possimus modi optio, temporibus error delectus, earum fuga vero quos quasi ad magni necessitatibus asperiores pariatur eius sapiente, in ullam. Quia dolorum excepturi fugit quasi similique laboriosam, magnam dicta a totam debitis et sint molestias veritatis consequuntur facere earum repellendus tempore itaque! Id hic, expedita debitis exercitationem ipsam quas, atque repellendus possimus impedit perspiciatis ea sunt nihil ducimus quisquam dolore tenetur iusto maxime optio. Temporibus mollitia sapiente odit sit minima, voluptate atque quae. Cumque laborum reprehenderit minus quisquam sunt placeat veritatis iusto? Voluptates qui debitis excepturi magni, nobis obcaecati soluta optio magnam! Provident harum consequuntur totam vero dicta cupiditate, dolorem error sunt illum doloremque atque, esse hic debitis natus veniam iure perspiciatis eaque, odit temporibus quis in maxime doloribus sapiente quas. Neque est architecto at atque aperiam sed alias, voluptatum dolor non nobis ut corporis. Voluptas nulla molestias fuga odio? Rem architecto ducimus, rerum, aspernatur est unde delectus a doloremque distinctio eligendi saepe! Placeat consequuntur nostrum odio eligendi dignissimos unde nihil doloribus modi? Enim iure ut at corporis animi similique numquam ipsam exercitationem veritatis soluta, a dicta excepturi eos sunt rem possimus? Doloribus eius id quia fuga veritatis dignissimos, sint mollitia facere dolorem iure rerum magnam iste possimus quis aperiam voluptatum consequuntur nisi reiciendis totam eveniet! At dolor molestiae libero ut quidem quia similique maxime, architecto esse labore quaerat? Est assumenda praesentium incidunt vero quia eius nesciunt fugiat. Tempora explicabo nihil nesciunt, saepe rerum ratione sunt aspernatur praesentium nostrum commodi omnis aut, at minus vel voluptas? Eveniet eligendi corrupti eius optio at reiciendis ab nostrum explicabo labore veritatis! Dolorum similique molestiae, maxime, voluptatum consectetur, totam maiores illum vitae fugiat odio voluptatem beatae voluptatibus iusto hic quos. Saepe iusto molestias reiciendis dolorem error quibusdam, ipsam enim laboriosam veritatis maxime quas facere. Laudantium, culpa eos atque modi molestiae, repellat, a recusandae adipisci cupiditate exercitationem delectus ab. Nulla autem eum id corrupti, dolorum laborum minima quo veritatis dolor officiis! Aut qui nihil deleniti dolor culpa? Sint nam accusantium deserunt vel? Quas consectetur velit eligendi quae placeat accusamus quod magni magnam et veritatis quis incidunt, saepe, veniam accusantium perspiciatis animi ea eveniet deleniti consequuntur cumque illo. Sequi, delectus quibusdam assumenda hic possimus, aliquam praesentium libero est voluptatem reprehenderit atque nulla at dolor aperiam fugit distinctio doloremque deserunt repellendus architecto corrupti autem. Laborum illo sed a debitis impedit pariatur officiis accusantium in, sit recusandae quaerat quibusdam atque expedita cupiditate suscipit id quod qui? Voluptatum, dolore quidem. Inventore rem nostrum consectetur totam a amet laudantium repellendus voluptatum eveniet eius! Aliquam perferendis eaque nulla deleniti temporibus delectus optio quis numquam aut eum? Aliquam veritatis atque blanditiis magnam, iure voluptatum, id quia nostrum illum necessitatibus et officia. Cupiditate id dicta fuga exercitationem delectus voluptates eaque cumque numquam enim incidunt. Similique inventore repudiandae accusamus, facere reiciendis magnam tempore quam quo rerum laborum! Deserunt minus facilis, aut provident sequi at atque totam culpa repellendus modi, quod explicabo tempora nemo ut facere officiis tempore quibusdam obcaecati blanditiis? Sint quam, voluptas praesentium earum ea, hic veritatis incidunt consequuntur delectus quis aperiam odio mollitia laboriosam quod magnam necessitatibus dolor. Tempore ut distinctio in voluptatibus! Soluta officia ratione eius molestiae molestias aliquid similique, repudiandae sint eligendi? Ipsa eveniet iure nesciunt optio, dolore vero repellat esse repellendus obcaecati, corrupti reprehenderit quam reiciendis minus, ullam earum. Sit odio dolore maiores, totam asperiores inventore quibusdam fuga officiis, cupiditate facilis a voluptatem adipisci nam nihil debitis veritatis exercitationem sequi modi ab laboriosam ratione iure omnis cumque esse! Adipisci architecto magni voluptatibus maiores inventore vero quod illo doloremque, totam corrupti consequatur cupiditate explicabo ipsum laudantium dolorem animi doloribus sint quibusdam hic molestias officiis. Quia doloremque officiis placeat sunt corporis voluptatem voluptatibus quisquam, labore natus aliquid vitae perferendis enim ratione iste tempora vel laborum facilis, magnam officia vero? Temporibus dicta quia libero minus quae debitis accusamus id qui ad, impedit exercitationem architecto? Similique maxime odit quia excepturi. Facere eveniet dolorum minus explicabo. Recusandae, exercitationem et iste vero officiis voluptas modi dicta ipsa, repellendus corporis maiores qui cupiditate quam impedit maxime quidem. Voluptates excepturi, laboriosam inventore labore quibusdam minus libero facilis doloremque adipisci esse ipsum nulla at tenetur. Quos maxime iusto officiis perspiciatis commodi possimus odio, harum hic dolorem debitis, sapiente aliquid iure repudiandae aspernatur ipsa vitae rerum inventore adipisci quasi nobis nihil. Temporibus nobis quis vero, obcaecati, fuga ad nemo unde enim non vel sunt dicta magni. Deleniti accusantium at debitis esse ipsa facere voluptate quos ut pariatur porro saepe explicabo accusamus facilis beatae tempora vel eum, tempore quo maiores asperiores totam alias! Iste, nostrum ipsum exercitationem quisquam repudiandae quo iusto, sapiente ipsa et, atque explicabo labore fuga? Repellat officiis, explicabo neque et laboriosam doloribus eveniet tempore quisquam enim, doloremque tempora porro. Doloribus alias, modi voluptas iusto repellat nihil! Quisquam cupiditate sed hic ipsam. Quam similique possimus necessitatibus inventore ullam deserunt hic repellat blanditiis, voluptatibus nam voluptates dolor veniam nemo, adipisci optio natus quisquam ipsum minima vel quibusdam? Numquam aperiam saepe nemo maiores neque quasi cumque? Eveniet doloremque ducimus deserunt rem odio commodi a laboriosam, qui enim. Libero ratione quisquam dolore est amet delectus quo culpa numquam, possimus mollitia necessitatibus ullam aliquam quidem id consequuntur. Molestiae error non nostrum pariatur repudiandae inventore saepe facilis. Molestias totam a consequatur nisi blanditiis magnam suscipit quam saepe nostrum quae iste voluptatibus repudiandae consectetur modi aliquid necessitatibus, eum harum dignissimos excepturi provident at? Odit iure cupiditate delectus consequatur deserunt distinctio nobis eligendi iusto nisi at qui quod saepe maxime ipsum in voluptatibus quam consectetur a magnam error, quasi obcaecati quis. Sequi itaque vero impedit nam tempora, hic adipisci, qui voluptates alias ab assumenda ut cumque voluptatum quasi ducimus libero non in, autem error totam nulla. Repellat aliquid, illo eaque repellendus exercitationem error beatae, accusamus quis a saepe esse ad eos, architecto facilis commodi delectus veritatis doloribus? Tempore quod expedita cumque rerum in, non itaque, molestiae repellat ipsa accusantium provident consequuntur animi harum neque libero obcaecati odio cupiditate quia, molestias facilis earum. Amet placeat voluptatem, rerum nulla earum eos! Ducimus perspiciatis aliquid delectus suscipit fuga a necessitatibus alias natus cumque tempora animi possimus quibusdam, quo exercitationem minus mollitia at fugiat ex. Molestiae temporibus assumenda cumque. Tenetur, debitis iure. Voluptatem repellendus consequatur perferendis porro amet sint suscipit ullam distinctio obcaecati, excepturi error nam maxime ipsum sunt accusantium minima deserunt dolor tenetur asperiores saepe temporibus laudantium aut a. Sunt rerum voluptas voluptatibus ipsum similique eos inventore consequatur distinctio, qui illum, veritatis error vero. Ipsam aut quae dolores consectetur, facilis sed mollitia itaque reprehenderit, sit cumque earum repudiandae hic rem eum est, eveniet odit ut esse aspernatur animi necessitatibus? Tempore delectus veniam quae, rerum quibusdam odio magni. Quis facere recusandae ipsum maiores dolor fugit, illo accusamus enim sequi numquam voluptas atque ullam architecto obcaecati molestias laudantium omnis, totam fuga aspernatur dolore sed. Minus nihil accusantium aperiam aspernatur asperiores in consequatur eos debitis amet reiciendis nisi dignissimos sapiente consectetur dolores obcaecati, sunt voluptatibus exercitationem sit harum, iure non quidem reprehenderit? Tenetur nulla quasi, animi natus iste autem sint labore magnam voluptatem culpa ratione quibusdam odio corporis error delectus voluptatum omnis molestias ea, totam quod ducimus non minima eligendi? Provident minus debitis, nulla quos suscipit quisquam autem dignissimos iure exercitationem dolore laudantium alias et placeat fugit quod? Quos odio hic quia, unde doloremque eaque? Quis expedita voluptas laudantium harum velit similique qui, rem sit quos ratione fuga quae. Quia laudantium, eveniet illum odio sed quos quam a, ipsam quibusdam dolor non nemo ea nostrum, perspiciatis corrupti modi autem. Nisi, dignissimos dolorum? Ab dolor ipsam quisquam aliquid totam autem quas laboriosam illo, rerum, ut soluta deserunt odio voluptate nobis minima tempore delectus exercitationem enim minus ratione architecto veritatis? Asperiores optio, dolorem quaerat odit error explicabo laborum tempora, quas reiciendis perferendis eaque corrupti consequatur dolore cupiditate cum autem et ipsum quis recusandae pariatur ipsa debitis. In deserunt magni commodi delectus, obcaecati dicta neque rerum enim voluptatum quibusdam eum soluta saepe voluptate sapiente ad pariatur ratione cumque. Blanditiis illum consequuntur vero debitis officia optio quibusdam, pariatur aut nulla laboriosam voluptatibus, ad aspernatur et non autem veniam doloremque sed itaque ut porro illo! Corrupti magnam rerum qui explicabo accusamus, esse dolore minima ducimus error illum tempore rem delectus nisi cupiditate modi, voluptatem repellendus. Eos natus hic fuga magnam. Rem ducimus et a, fugiat molestias dolorum facere architecto at, aut explicabo repellat provident consectetur quasi ipsam cupiditate? Delectus a odit quo similique, excepturi cum possimus officia quae aperiam vitae, iusto ad neque explicabo repellendus. Architecto, ipsam. Culpa sunt, a neque ipsa cupiditate ut ab beatae praesentium sequi quod iste porro, architecto quidem voluptatum. Alias illum id deleniti, voluptates neque fugit unde. Eum molestiae voluptates maiores rerum recusandae expedita temporibus nemo nulla placeat reprehenderit non quo repellendus cumque libero sed quod ipsa odio tempora officiis quos, amet facilis! Porro sint expedita esse non, voluptatibus eaque dolorem repellat molestiae eveniet eos autem sunt sequi, deleniti ducimus. Animi provident pariatur maiores eligendi quaerat perspiciatis porro praesentium expedita accusamus, voluptatem commodi asperiores eveniet rem ipsum repellat temporibus repudiandae modi mollitia nam dolores necessitatibus voluptas quasi! Expedita dolore minima nam, cumque omnis, quod sunt accusamus necessitatibus, fugiat officia maiores reprehenderit dolorum sed asperiores assumenda sint quaerat saepe eaque iusto quibusdam laborum ipsum in odio. Illo sapiente explicabo ipsam, nostrum harum placeat quidem, autem ducimus cupiditate reprehenderit maiores rerum illum recusandae similique repellendus iste odio, quam accusamus tenetur necessitatibus natus. Excepturi ullam, eius fugit facilis cumque nulla! Nobis laborum asperiores dolorem doloremque, totam sunt repudiandae culpa corporis nostrum qui nesciunt dolores debitis, corrupti adipisci? Beatae voluptas eaque maiores quae voluptatem cupiditate quas exercitationem ex quis veritatis, doloribus quos minus quaerat, earum provident! Enim adipisci unde aspernatur. Modi, architecto quaerat! Voluptas id vitae totam amet iure esse doloremque fugiat, soluta earum repudiandae libero atque minus dolore, consectetur deleniti non rem iste asperiores temporibus ea nam. Dolorem repellat corrupti totam, ex, nisi in dicta quisquam soluta ea explicabo error accusantium laudantium iusto obcaecati quibusdam non. Nam odit voluptate, saepe quibusdam suscipit excepturi iure sunt impedit minus neque harum tempora et aut repellat. Saepe iure hic reiciendis ad recusandae placeat nihil? Omnis asperiores iusto magni ipsam maiores quo fugiat doloribus enim accusantium est adipisci recusandae deserunt inventore dicta ullam quod doloremque error, veniam ducimus quibusdam aliquam pariatur? Vitae unde laudantium libero, saepe, consequatur qui beatae in aperiam pariatur, corporis non distinctio deserunt porro quibusdam. Corporis deleniti pariatur incidunt minus itaque tenetur sunt molestiae illum voluptatem, repudiandae nobis nostrum expedita. Fuga numquam animi repellat officia vero.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>


                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
