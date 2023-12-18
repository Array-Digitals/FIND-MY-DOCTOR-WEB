import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import DoctorService from '../../../services/doctorService';
import TokenService from '../../../services/tokenService';
import DashboardService from '../../../services/dashboard';

export const Dashboard = () => {
  const { getDoctorSingle } = DoctorService();
  const { getStorageData, getDoctorData,  } = TokenService();
  const [doctorData, setDoctorData] = useState({});
  const { getTotalPatients, getRemainingPatients, getCuredPatient, getTotalEarning } = DashboardService()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const userType = getStorageData();
    getDoctorSingle(userType?.id).then((res) => {
      const response = res?.data?.data[0]
      setDoctorData(localStorage.setItem("doctorProfile", JSON.stringify(response || null)));
      setUserId(response)
    }).catch((error) => {
      console.log(error)
    }, [doctorData])

  }, [doctorData])

  // console.log(userId.id, 'userIddd');
  useEffect(() => {
    console.log(userId.id, 'oddd');
  }, [userId])

  const [totalPatient, setTotalPatient] = useState([])
  const [totalPatientCount, setTotalPatientCount] = useState('')

  const [remainingPatient, setRemainingPatient] = useState([])
  const [remainingCount, setRemainingCount] = useState([])


  const [curedPatient, setCuredPatient] = useState([])
  const [curedCount, setCuredCount] = useState([])

  const [totalEarning, setTotalEarning] = useState([])

  const fetchTotalPatients = (userID) => {
    if (userID) {

      getTotalPatients(userID).then((res) => {
        const response = res.data.data;
        setTotalPatient(response.map((item) => item.total_patients));
        const sumTotalPatients = response.reduce((acc, item) => acc + item.total_patients, 0);
        setTotalPatientCount(sumTotalPatients);
        console.log(response, 'totalPatient');
      }).catch((error) => {
        console.log(error, 'error');
      });
    }
  };

  const fetchRemainingPatient = (userID) => {
    if (userID) {

      getRemainingPatients(userID).then((res) => {
        const response = res.data.data;
        console.log(response, 'responsePatient');
        setRemainingPatient(response.map((item) => item.total_patients));
        const sumTotalPatients = response.reduce((acc, item) => acc + item.total_patients, 0);
        setRemainingCount(sumTotalPatients);
        // console.log(res.data.data, 'responseRemaing');
      }).catch((res) => {
        console.log(res, 'error');
      })
    }
  }
  const fetchCuredPatients = (userID) => {
    if (userID) {

      getCuredPatient(userID).then((res) => {
        const response = res.data.data;
        // console.log(response, 'responsePatient');
        setCuredPatient(response.map((item) => item.total_patients));
        const sumTotalPatients = response.reduce((acc, item) => acc + item.total_patients, 0);
        setCuredCount(sumTotalPatients);

      }).catch((res) => {
        console.log(res, 'error');
      })
    }
  }
  const fetchTotalEarning = (userID) => {

    if (userID) {

      getTotalEarning(userID).then((res) => {
        const formattedData = formatChartData(res.data.data);
        setTotalEarning(formattedData)
        // console.log(formattedData, 'responseEarning');
      }).catch((res) => {
        console.log(res, 'error');
      })
    }
  }



  const formatChartData = (data) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize an array with zero values for each month
    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      total_Earnings: 0,
      month_of_year: monthNames[index],
    }));

    // Update the values based on the API response
    data.forEach((entry) => {
      const monthIndex = parseInt(entry.month_of_year.split("-")[1], 10) - 1;
      monthlyData[monthIndex].total_Earnings = entry.total_Earnings;
    });

    return monthlyData;
  };



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
    series: [{
      data: totalPatient
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
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
  const Line2 = {
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
    series: [{
      data: remainingPatient
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
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
  const Line3 = {
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
    series: [{
      data: curedPatient || [0]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
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
  const LineChart = {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    colors: ['#ff0000'],
    series: [
      {
        name: 'Insurance A',
        data: totalEarning.map((entry) => entry.total_Earnings),
      },

    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  useEffect(() => {
    fetchTotalPatients(userId.id);
    fetchRemainingPatient(userId.id);
    fetchCuredPatients(userId.id);
    fetchTotalEarning(userId.id);
  }, [userId, doctorData])
  return (
    <>
      <section className='mainSection'>
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
                            <p>Total Patients</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{totalPatientCount}</p>
                              <p>Patients</p>
                            </div>
                            {
                              userId &&
                              <ReactApexChart options={Line1} series={Line1?.series} type="line" />
                            }
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
                            <p> Patients Remaining</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{remainingCount}</p>
                              <p>Remaining</p>
                            </div>
                            {
                              userId &&
                              <ReactApexChart options={Line2} series={Line2?.series} type="line" />
                            }
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
                            <p> Patients Cured</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{curedCount}</p>
                              <p>Cured</p>
                            </div>
                            {
                              userId &&
                              <ReactApexChart options={Line3} series={Line3?.series} type="line" />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Earning</p>
                            <small>Yearly</small>
                          </div>
                        </div>
                      </div>
                      {/* {
                        userId && */}
                      <ReactApexChart options={LineChart} series={LineChart?.series} type="line" height={350} />
                      {/* } */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
