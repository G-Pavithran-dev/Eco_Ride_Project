import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Navbar from '../NavBar/NavBar'
import route from './routedot.png'
import car from './Car.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import './PublishedRideHistory.css'
// import {Tabs} from '../ui/tabs'
import image1 from './image1.png'
import image2 from './image2.png'
import image3 from './image3.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
const PublishedRideHistory = () => {
  const logindata = useSelector((state) => state.loginReducer)
  const [upcomingRideHistory, setUpcomingRideHistory] = useState([])
  const [onGoingRideHistory, setOnGoingRideHistory] = useState([])
  const [onCompletedRideHistory, setCompletedRideHistory] = useState([])
  useEffect(() => {
    console.log(upcomingRideHistory)
  }, [upcomingRideHistory])

  const getall = () => {
    console.log('login data email is ', logindata.email)
    axios
      .get(
        `http://${
          import.meta.env.VITE_LOCAL_URL
        }/app/userRideHistory/getByUser/${logindata.email}/upcoming`
      )
      .then((res) => {
        setUpcomingRideHistory(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(
        `http://${
          import.meta.env.VITE_LOCAL_URL
        }/app/userRideHistory/getByUser/${logindata.email}/ongoing`
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
        }/app/userRideHistory/getByUser/${logindata.email}/completed`
      )
      .then((res) => {
        setCompletedRideHistory(res.data)
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
                          {ride.bookRide.locationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.bookRide.locationFirstName}{' '}
                        </Typography>

                        <img
                          src={route}
                          style={{ height: '48%', alignContent: 'center' }}
                          alt="Route"
                        />
                        <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                          {' '}
                          {ride.bookRide.goingLocationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.bookRide.goingLocationFirstName}
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
                            {ride.bookRide.name}
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
                            {ride.bookRide.email}
                          </Typography>
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.bookRide.phone}
                          </Typography>
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: 'White',
                          width: '70%',
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
                            {ride.bookRide.carNumber}
                          </Typography>
                        </div>
                      </div>

                      <div style={{ marginTop: '3%', width: '85%' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Typography
                            sx={{
                              lineHeight: '2rem',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                            }}
                          >
                            Ride has been completed
                          </Typography>
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
              {onGoingRideHistory && onGoingRideHistory.length > 0 ? (
                onGoingRideHistory.map((ride) => (
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
                          {ride.bookRide.locationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.bookRide.locationFirstName}{' '}
                        </Typography>

                        <img
                          src={route}
                          style={{ height: '48%', alignContent: 'center' }}
                          alt="Route"
                        />
                        <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                          {' '}
                          {ride.bookRide.goingLocationFirstName ===
                          'Sri Krishna College of Engineering and Technology'
                            ? 'SKCET'
                            : ride.bookRide.goingLocationFirstName}
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
                            {ride.bookRide.name}
                          </Typography>
                          {/* <Typography
                            sx={{
                              lineHeight: '1.2rem',
                              marginTop: '5%',
                              fontSize: '0.9rem',
                            }}
                          >
                            {ride.bookRide.department}
                          </Typography> */}
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.bookRide.email}
                          </Typography>
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.bookRide.phone}
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
                            {ride.bookRide.carNumber}
                          </Typography>
                        </div>
                      </div>

                      <div style={{ marginTop: '3%', width: '65%' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Button
                            className="w-auto text-sm"
                          >
                            Ride is Ongoing
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Divider />
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
              {upcomingRideHistory && upcomingRideHistory.length > 0 ? (
                upcomingRideHistory.map((ride) => (
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
                        <Typography variant="h5">
                          <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                            {ride.bookRide.locationFirstName ===
                            'Sri Krishna College of Engineering and Technology'
                              ? 'SKCET'
                              : ride.bookRide.locationFirstName}{' '}
                          </Typography>
                        </Typography>
                        <img
                          src={route}
                          style={{ height: '48%', alignContent: 'center' }}
                          alt="Route"
                        />
                        <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                          <Typography variant="h5" sx={{ fontSize: '0.8rem' }}>
                            {' '}
                            {ride.bookRide.goingLocationFirstName ===
                            'Sri Krishna College of Engineering and Technology'
                              ? 'SKCET'
                              : ride.bookRide.goingLocationFirstName}
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
                            {ride.bookRide.name}
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
                            {ride.bookRide.email}
                          </Typography>
                          <Typography
                            sx={{ lineHeight: '2rem', fontSize: '0.9rem' }}
                          >
                            {ride.bookRide.phone}
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
                            {ride.bookRide.carNumber}
                          </Typography>
                        </div>
                      </div>

                      <div style={{ marginTop: '3%', width: '65%' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Button
                            className="w-[55%] text-sm"
                            onClick={() => {
                              axios
                                .delete(
                                  `http://${
                                    import.meta.env.VITE_LOCAL_URL
                                  }/app/deleteRide/${logindata.email}/${
                                    ride.bookRide.id
                                  }`
                                )
                                .then(() => {
                                  getall()
                                })
                              axios.put(
                                `http://${
                                  import.meta.env.VITE_LOCAL_URL
                                }/app/bookride/updateseatsAvailable/onCancelation/${
                                  ride.bookRide.id
                                }`
                              )
                            }}
                          >
                            Cancel Ride
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Divider />
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

export default PublishedRideHistory
