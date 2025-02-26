import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from '@mui/material'
import Navbar from '../NavBar/NavBar'
import route from './Route2.png'
import routedot from './routedot.png'
import car from './Car.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import man from './man.png'

// import {Tabs} from '../ui/tabs'
import image1 from './image1.png'
import image2 from './image2.png'
import image3 from './image3.png'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
const PilotsRideHistory = () => {
  const logindata = useSelector((state) => state.loginReducer)
  const [upcomingRideHistory, setUpcomingRideHistory] = useState([])
  const [onGoingRideHistory, setOnGoingRideHistory] = useState([])
  const [onCompletedRideHistory, setCompletedRideHistory] = useState([])

  const [DriverRides, setDriverRides] = useState([])
  const data = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      dropLocation: 'Location A',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      dropLocation: 'Location B',
    },
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      dropLocation: 'Location A',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      dropLocation: 'Location B',
    },
    // Add more data as needed
  ]

  const getall = () => {
    console.log('hello')
    axios
      .get(
        `http://${import.meta.env.VITE_LOCAL_URL}/app/bookride/Driver/${
          logindata.email
        }`
      )
      .then((res) => {
        console.log('jdjdj', res.data)
        setDriverRides(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(
        `http://${
          import.meta.env.VITE_LOCAL_URL
        }/app/userRideHistory/getDriverByemail/${logindata.email}/upcoming`
      )
      .then((res) => {
        console.log('Drivers history upcominPassengers', res.data)
        setUpcomingRideHistory(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(
        `http://${
          import.meta.env.VITE_LOCAL_URL
        }/app/userRideHistory/getDriverByemail/${logindata.email}/ongoing`
      )
      .then((res) => {
        setOnGoingRideHistory(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(
        `http://${
          import.meta.env.VITE_LOCAL_URL
        }/app/userRideHistory/getAllRideID/completed/${logindata.email}`
      )
      .then((res) => {
        axios
          .post(
            `http://${
              import.meta.env.VITE_LOCAL_URL
            }/app/bookRide/getALLRide/Byid`,
            res.data
          )
          .then((response) => {
            console.log('rwstyaujklskdjhgeeyujhneduj', response.data)
            setCompletedRideHistory(response.data)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getall()
  }, [logindata])
  return (
    <div
      style={{
        backgroundColor: ' #f6f6f6',
        paddingTop: '4vh',
        minHeight: '91dvh',
      }}
    >
      <div
        style={{
          Top: '0%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '0%',
          width: '100%',
          paddingBottom: '2%',
        }}
      >
        <div style={{ width: '80%', backgroundColor: 'white', height: '90%' }}>
          <Tabs defaultValue="UpComing" className="w-[100%]  justify-center">
            <TabsList className="grid grid-cols-3 w-[100%] h-[8dvh] bg-gray-200">
              <TabsTrigger value="Completed" className="text-lg ">
                Completed
              </TabsTrigger>
              <TabsTrigger value="OnGoing" className="text-lg">
                OnGoing
              </TabsTrigger>
              <TabsTrigger value="UpComing" className="text-lg">
                UpComing
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="Completed"
              className="overflow-y-scroll h-[70dvh]"
            >
              {onCompletedRideHistory && onCompletedRideHistory.length > 0 ? (
                onCompletedRideHistory.map((ride) => (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '2vh',
                      flexDirection: 'column',
                      fontSize: '0.7rem',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'White',
                          width: '80%',
                          height: '23vh',
                          padding: '1vh',
                          paddingLeft: '7%',
                        }}
                      >
                        <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                          {ride.leaving}
                        </Typography>
                        <img
                          src={routedot}
                          style={{
                            height: '48%',
                            alignContent: 'center',
                            padding: '1%',
                          }}
                          alt="Route"
                        />
                        <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                          <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                            {' '}
                            {ride.going ===
                            'Sri Krishna College of Engineering and Technology Sri Krishna College Road, Kovaipudur, Madukkarai - 641105, TN, India'
                              ? 'SKCET'
                              : ride.going}
                          </Typography>
                        </Typography>
                      </div>

                      <div
                        style={{
                          width: '100%',
                          padding: '1vh',
                          position: 'relative',
                          top: '1vh',
                        }}
                      >
                        <div
                          style={{
                            height: '23dvh',
                            position: 'absolute',
                            bottom: '0%',
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{ fontSize: '1.3rem', fontWeight: '600' }}
                          >
                            {ride.name}
                          </Typography>
                          <Typography
                            sx={{
                              lineHeight: '1.2rem',
                              marginTop: '5%',
                              fontSize: '0.9rem',
                            }}
                          >
                            B-tech IT
                          </Typography>
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.email}
                          </Typography>
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.phone}
                          </Typography>
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: 'White',
                          width: '100%',
                          height: '23dvh',
                          padding: '1vh',
                        }}
                      >
                        <div
                          style={{
                            height: '23dvh',
                            position: 'absolute',
                            bottom: '0%',
                          }}
                        >
                          <img
                            src={car}
                            style={{ height: '55%', alignContent: 'center' }}
                            alt="Car"
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              paddingLeft: '15%',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                            }}
                          >
                            {ride.carNumber}
                          </Typography>
                        </div>
                      </div>

                      <div style={{ marginTop: '3%', width: '65%' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Button>Completed Successfully</Button>
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </div>
                  // style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[100%]">
                  <img src={image2} className="h-[35vh] w-[vh]"></img>
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="OnGoing"
              className="overflow-y-scroll h-[70dvh]"
            >
              {DriverRides &&
              DriverRides.length > 0 &&
              onGoingRideHistory.length > 0 ? (
                DriverRides.map((ride) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <h1 style={{ fontSize: '5vh', textAlign: 'center' }}>
                      Mon 23 JUL
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={route}
                        style={{
                          width: '60%',
                          marginTop: '7%',
                          marginBottom: '3%',
                          paddingLeft: '10%',
                          paddingRight: '10%',
                        }}
                      ></img>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Typography variant="h5">
                          {ride.locationFirstName ===
                          'Sri Krishna College of Engineering and Technology Sri Krishna College Road, Kovaipudur, Madukkarai - 641105, TN, India'
                            ? 'SKCET'
                            : ride.locationFirstName}{' '}
                        </Typography>
                        <Typography variant="h5">
                          {' '}
                          {ride.goingLocationFirstName ===
                          'Sri Krishna College of Engineering and Technology Sri Krishna College Road, Kovaipudur, Madukkarai - 641105, TN, India'
                            ? 'SKCET'
                            : ride.goingLocationFirstName}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',

                          paddingTop: '1%',
                        }}
                      >
                        <Typography
                          color="primary"
                          variant="h6"
                          sx={{ fontSize: '110%' }}
                        >
                          {ride.startTime}
                        </Typography>
                        <Typography
                          color="primary"
                          variant="h6"
                          sx={{ fontSize: '110%' }}
                        >
                          {ride.endTime}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ marginTop: '4%' }}>
                      <Divider sx={{ paddingTop: '3%' }}></Divider>
                    </div>
                    <div style={{ paddingTop: '4%' }}>
                      <h1
                        style={{
                          paddingBottom: '5dvh',
                          textAlign: 'center',
                          fontSize: '200%',
                          fontWeight: '600',
                        }}
                      >
                        Car Info
                      </h1>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignContent: 'center',
                        }}
                      >
                        <img style={{ height: '18dvh' }} src={car}></img>
                        <div>
                          <Typography variant="h4">{ride.carNumber}</Typography>
                          <Typography variant="h6">{ride.carName}</Typography>
                          <Typography
                            color="primary"
                            variant="h6"
                            sx={{ fontSize: '110%' }}
                          >
                            {ride.avilableSeats} seats available
                          </Typography>
                        </div>
                      </div>
                      <Divider sx={{ paddingTop: '3%' }}></Divider>
                      <div style={{ paddingBottom: '0%' }}>
                        <h1
                          style={{
                            paddingBottom: '2dvh',
                            paddingTop: '3dvh',
                            textAlign: 'center',
                            fontSize: '200%',
                            fontWeight: '500',
                          }}
                        >
                          Passengers
                        </h1>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          paddingBottom: '8%',
                        }}
                      >
                        <TableContainer sx={{ width: '80%' }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Email
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Department
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Drop Location
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {onGoingRideHistory.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {row.userDetails.firstName}{' '}
                                    {row.userDetails.lastName}
                                  </TableCell>
                                  <TableCell>{row.userDetails.email}</TableCell>
                                  <TableCell>
                                    {row.userDetails.department}
                                  </TableCell>
                                  <TableCell>{row.bookRide.going}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div style={{ paddingTop: '5%' }}>
                          <Button
                            onClick={() => {
                              axios
                                .put(
                                  `http://${
                                    import.meta.env.VITE_LOCAL_URL
                                  }/app/updateRide/ById/${
                                    DriverRides[0].id
                                  }/completed`
                                )
                                .then(() => {
                                  getall()
                                })
                            }}
                          >
                            Complete Ride
                          </Button>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  // style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[100%]">
                  <img src={image3} className="h-[35vh] w-[50vh]"></img>
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="UpComing"
              className="overflow-y-scroll h-[70dvh]"
            >
              {DriverRides &&
              DriverRides.length > 0 &&
              upcomingRideHistory.length > 0 ? (
                DriverRides.map((ride) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <h1 style={{ fontSize: '5vh', textAlign: 'center' }}>
                      Mon 23 JUL
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={route}
                        style={{
                          width: '60%',
                          marginTop: '7%',
                          marginBottom: '3%',
                          paddingLeft: '10%',
                          paddingRight: '10%',
                        }}
                      ></img>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Typography variant="h5">
                          {ride.locationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.locationFirstName}{' '}
                        </Typography>
                        <Typography variant="h5">
                          {' '}
                          {ride.goingLocationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.goingLocationFirstName}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',

                          paddingTop: '1%',
                        }}
                      >
                        <Typography
                          color="primary"
                          variant="h6"
                          sx={{ fontSize: '110%' }}
                        >
                          {ride.startTime}
                        </Typography>
                        <Typography
                          color="primary"
                          variant="h6"
                          sx={{ fontSize: '110%' }}
                        >
                          {ride.endTime}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ marginTop: '4%' }}>
                      <Divider sx={{ paddingTop: '3%' }}></Divider>
                    </div>
                    <div style={{ paddingTop: '4%' }}>
                      <h1
                        style={{
                          paddingBottom: '5dvh',
                          textAlign: 'center',
                          fontSize: '200%',
                          fontWeight: '600',
                        }}
                      >
                        Car Info
                      </h1>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignContent: 'center',
                        }}
                      >
                        <img style={{ height: '18dvh' }} src={car}></img>
                        <div>
                          <Typography variant="h4">{ride.carNumber}</Typography>
                          <Typography variant="h6">{ride.carName}</Typography>
                          <Typography
                            color="primary"
                            variant="h6"
                            sx={{ fontSize: '110%' }}
                          >
                            {ride.avilableSeats} seats available
                          </Typography>
                        </div>
                      </div>
                      <Divider sx={{ paddingTop: '3%' }}></Divider>
                      <div style={{ paddingBottom: '0%' }}>
                        <h1
                          style={{
                            paddingBottom: '2dvh',
                            paddingTop: '3dvh',
                            textAlign: 'center',
                            fontSize: '200%',
                            fontWeight: '500',
                          }}
                        >
                          Passengers
                        </h1>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          paddingBottom: '8%',
                        }}
                      >
                        <TableContainer sx={{ width: '80%' }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Email
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Department
                                </TableCell>
                                <TableCell sx={{ fontWeight: '700' }}>
                                  Drop Location
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {upcomingRideHistory.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {row.userDetails.firstName}{' '}
                                    {row.userDetails.lastName}
                                  </TableCell>
                                  <TableCell>{row.userDetails.email}</TableCell>
                                  <TableCell>
                                    {row.userDetails.department}
                                  </TableCell>
                                  <TableCell>{row.bookRide.going}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div style={{ paddingTop: '5%' }}>
                          <Button
                            onClick={() => {
                              axios
                                .put(
                                  `http://${
                                    import.meta.env.VITE_LOCAL_URL
                                  }/app/updateRide/ById/${
                                    DriverRides[0].id
                                  }/ongoing`
                                )
                                .then(() => {
                                  getall()
                                })
                            }}
                          >
                            Start Ride
                          </Button>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  // style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[100%]">
                  <img src={image1} className="h-[35vh] w-[50vh]"></img>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default PilotsRideHistory
