import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dashboardService from '../../../services/dashboardService';
import { Loader } from '../../Component/loader';

export const Dashboard = () => {
  const { getTotalData, getTotalUser, getTotalProducts, getTotalClients, getTotalBookings, getTotalInsurance } = dashboardService();


  const [totalDataState, setTotalDataState] = useState({})
  const [totalUserState, setTotalUserState] = useState({})
  const [totalProductState, setTotalProductState] = useState({})
  const [totalClientState, setTotalClientState] = useState({})
  const [totalBookingState, setTotalBookingState] = useState({})

  const [doctorClients, setDoctorClients] = useState([])
  // console.log(doctorClients, 'doctoo')
  const [labClients, setLabClients] = useState([])
  const [pharmacyClients, setPharmachClients] = useState([])

  const [totalDoctor, setTotalDoctor] = useState([])
  const [totalLab, setTotalLab] = useState([])
  const [totalPharmacy, setTotalPharmacy] = useState([])

  const [totalProviderState, setTotalProviderState] = useState({})
  const [insuranceValue, setInsuranceValues] = useState([])


  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchTotalData(),
          fetchTotalUsers(),
          fetchTotalProduct(),
          fetchTotalClient(),
          fetchTotalBooking(),
          fetchTotalInsurance(),
        ]);
        // setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('workedddd');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  const fetchTotalData = () => {
    getTotalData().then((res) => {
      setTotalDataState(res?.data?.data[0])
      // console.log(res.data.data[0], 'response');
    }).catch((res) => {
      console.log(res, 'error');
    })
  }
  const fetchTotalUsers = () => {
    getTotalUser().then((res) => {
      setTotalUserState(res?.data?.data[0])
      // console.log(res.data.data[0], 'responseddd');
    }).catch((res) => {
      console.log(res, 'error');
    })
  }
  const fetchTotalProduct = () => {
    getTotalProducts().then((res) => {
      setTotalProductState(res?.data?.data[0])
      console.log(res.data.data[0], 'response');
    }).catch((res) => {
      console.log(res, 'error');
    })
  }
  const fetchTotalClient = () => {
    getTotalClients().then((res) => {
      setTotalClientState(res?.data?.data[0])
      // console.log(res.data.data[0], 'responseClients');
    }).catch((res) => {
      console.log(res, 'error');
    })
  }


  const fetchTotalBooking = () => {
    getTotalBookings().then((res) => {
      const response = res?.data?.data

      setDoctorClients(response.map((item) => item.doctors_client))
      setLabClients(response.map((item) => item.labs_client))
      setPharmachClients(response.map((item) => item.Pharmacy_client))

    }).catch((res) => {
      console.log(res, 'error');
    })
  }

  const fetchTotalInsurance = () => {
    getTotalInsurance().then((res) => {
      const response = res?.data?.data;
      setInsuranceValues(response.map((item) => item.insurance_booking))
      setTotalProviderState(response.map((item) => item.fullname))
    }).catch((res) => {
      console.log(res, 'error');
    })
  }

  const Line1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{ data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21] }],
    stroke: { curve: 'smooth' },
    markers: { size: 0 },
    grid: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20
      }
    },
    colors: ['#e92b2b'],
    tooltip: {
      x: {
        show: false
      },
    }
  }
  const chartOptions = {
    series: [totalUserState?.Total_Users] || [0],
    labels: ['Total'],
    chart: {
      type: 'donut',
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
      },
    },
    colors: ['#eb6363', '#e92b2b'],
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const donutchart1 = {
    series: [totalProductState?.Total_Products ? totalProductState?.Total_Products : 0],
    labels: ['Total Products'],
    chart: {
      type: 'donut',
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
      },
    },
    colors: ['#eb6363', '#e92b2b'],
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const areaChart1 = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      sparkline: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0,
    },
    xaxis: {
      show: false,
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    colors: ['#eb6363'],

    subtitle: {
      text: 'Total Doctor Bookings',
      offsetX: 30,
      style: {
        fontSize: '14px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    title: {
      text: `${(doctorClients?.reduce((accum, current) => {
        return accum + current;
      }, 0))}` || '0',
      offsetX: 30,
      style: {
        fontSize: '24px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    series: [
      {
        name: 'Total Doctor Bookings',
        data: doctorClients
      }
    ]
  };
  const areaChart2 = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      sparkline: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0,
    },
    xaxis: {
      show: false,
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    colors: ['#eb6363'],

    subtitle: {
      text: 'Total Lab Bookings',
      offsetX: 30,
      style: {
        fontSize: '14px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    title: {
      text: `${(labClients?.reduce((accum, current) => {
        return accum + current;
      }, 0))}` || '0',
      offsetX: 30,
      style: {
        fontSize: '24px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    series: [
      {
        name: 'Total Lab Bookings',
        data: labClients
      }
    ]
  };
  const areaChart3 = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      sparkline: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },

    fill: {
      opacity: 0,
    },
    xaxis: {
      show: false,
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    colors: ['#eb6363'],

    subtitle: {
      text: 'Total Product Sales',
      offsetX: 30,
      style: {
        fontSize: '14px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    title: {
      text: `${(pharmacyClients?.reduce((accum, current) => {
        return accum + current;
      }, 0))}` || '0',
      offsetX: 30,
      style: {
        fontSize: '24px',
        // cssClass: 'apexcharts-yaxis-title'
      }
    },
    series: [
      {
        name: 'Total Lab Bookings',
        data: pharmacyClients ? pharmacyClients : [0]
      }
    ]
  };
  const barChart = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Series 1',
        data: [totalClientState?.doctors_client, totalClientState?.labs_client, totalClientState?.Pharmacy_client] || [0],
      }
    ],
    colors: ['#eb6363', '#e92b2b'],
    xaxis: {
      categories: ['Doctors', 'Labs', 'Pharmacy',]
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };
  const insuranceBarChart = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Series 1',
        data: insuranceValue ? insuranceValue : [0]
      }
    ],
    colors: ['#eb6363', '#e92b2b'],
    xaxis: {
      categories: totalProviderState ? totalProviderState : [0]
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };


  return (
    <>
      <section className='mainSection'>
        {
          isLoading ?
            <Loader />
            :
            <div className="container">
              <div className="mainSectionWrapper">
                <div className="heading">
                  <p>
                    Dashboard
                  </p>
                </div>
                <div className="card cardForm">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Doctors</p>
                                <small>Current</small>
                              </div>
                              <div className="box box1">
                                <div className="details">
                                  <p className='category'>{totalDataState?.total_doctors}</p>
                                  <p>Doctors</p>
                                </div>
                                <ReactApexChart options={Line1} series={Line1?.series} type="line" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Brand</p>
                                <small>Current</small>
                              </div>
                              <div className="box box1">
                                <div className="details">
                                  <p className='category'>{totalDataState?.total_brands}</p>
                                  <p>Brands</p>
                                </div>
                                <ReactApexChart options={Line1} series={Line1?.series} type="line" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Lab</p>
                                <small>Current</small>
                              </div>
                              <div className="box box1">
                                <div className="details">
                                  <p className='category'>{totalDataState?.total_labs}</p>
                                  <p>Labs</p>
                                </div>
                                <ReactApexChart options={Line1} series={Line1?.series} type="line" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Users</p>
                                <small>Current</small>
                              </div>
                              {totalUserState.Active_Users && (
                                <ReactApexChart options={chartOptions} series={chartOptions?.series} type="donut" height={300} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Products</p>
                                <small>Current</small>
                              </div>
                              {
                                totalProductState.Total_Products &&
                                <ReactApexChart options={donutchart1} series={donutchart1?.series} type="donut" height={300} />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Clients</p>
                                <small>Current</small>
                              </div>
                              {
                                (totalClientState.doctorClients || totalClientState.labs_client || totalClientState.Pharmacy_client) &&
                                <ReactApexChart options={barChart} series={barChart?.series} type="bar" height={245} />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Total Doctor Bookings</p>
                                <small>Monthly</small>
                              </div>
                            </div>
                          </div>
                          <ReactApexChart options={areaChart1} series={areaChart1?.series} type="area" height={255} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Total Lab Bookings</p>
                                <small>Monthly</small>
                              </div>
                            </div>
                          </div>
                          <ReactApexChart options={areaChart2} series={areaChart2?.series} type="area" height={255} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Total Product Sales</p>
                                <small>Monthly</small>
                              </div>
                            </div>
                          </div>
                          <ReactApexChart options={areaChart3} series={areaChart3?.series} type="area" height={255} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 ">
                        <div className="card">
                          <div className="card-body">
                            <div className="chart">
                              <div className="chartHeading">
                                <p>Insurance</p>
                                <small>Yearly</small>
                              </div>
                            </div>
                          </div>
                          {insuranceValue.length > 0 &&
                            < ReactApexChart options={insuranceBarChart} series={insuranceBarChart?.series} type="bar" height={350} />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }

      </section>
    </>
  )
}
