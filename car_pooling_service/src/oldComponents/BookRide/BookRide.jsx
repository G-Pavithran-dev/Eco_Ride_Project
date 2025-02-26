import { Button, Divider, Paper, Typography } from '@mui/material'
import NavBar from '../NavBar/NavBar'
import './BookRide.css'
import routepng from './Route2.png'
import routepngblue from './route-blue.png'
import routepngred from './route-red.png'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FilterListIcon from '@mui/icons-material/FilterList'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import RidePaper from './RidePaper'
import car from './car.png'
import man from './man.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
const BookRide = () => {
  const arr = ['1', '2', , '2', '3', '4', '5', '6']

  const [rideData, setRideData] = useState([
    {
      id: null,
      name: '',
      phone: '',
      email: '',
      leaving: '',
      going: '',
      availableSeats: 0,
      price: 0.0,
      carName: '',
      carNumber: '',
      date: '',
      startTime: '',
      endTime: '',
    },
  ])
  useEffect(() => {
    console.log('ride data', rideData)
  }, [rideData])
  useEffect(() => {
    console.log('clickid is ' + localStorage.getItem('clickid'))
  }, [localStorage.getItem('clickid')])
  useEffect(() => {
    localStorage.setItem('clickid', 0)
    axios
      .get(`http://${import.meta.env.VITE_LOCAL_URL}/app/bookride/getallrides`)
      .then((res) => {
        console.log(res.data)
        setRideData(res.data)
      })
  }, [])
  return (
    <div>
      <div className="sortingContainer">
        <div className="containerItems">
          <button
            style={{
              padding: '0.7vh',
              borderRadius: '10vh',
              fontSize: '75%',
              backgroundColor: 'white',
              display: 'flex',
              border: '1.5px solid lightgrey',
              paddingLeft: '1%',
              paddingRight: '1%',
            }}
          >
            <Typography>Sort by</Typography>
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          </button>
          <button
            style={{
              padding: '0.7vh',
              paddingLeft: '1%',
              paddingRight: '1%',
              borderRadius: '10vh',
              fontSize: '75%',
              backgroundColor: 'white',
              display: 'flex',
              border: '1.5px solid lightgrey',
            }}
          >
            <Typography>Filter</Typography>
            <FilterListIcon style={{ paddingLeft: '4%' }}></FilterListIcon>
          </button>
          <button
            style={{
              padding: '0.7vh',
              borderRadius: '10vh',
              fontSize: '75%',
              backgroundColor: 'white',
              display: 'flex',
              border: '1.5px solid lightgrey',
              paddingLeft: '1%',
              paddingRight: '1%',
            }}
          >
            <Typography>Sort by</Typography>
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          </button>
        </div>
        <Divider></Divider>
      </div>
      <div className="content">
        <div className="ride-papers">
          {rideData.map((data) => {
            return <RidePaper value={data} />
          })}
        </div>

        <div
          className="ride-content"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '60%' }}
          >
            <h1 style={{ fontSize: '5vh', textAlign: 'center' }}>Mon 23 JUL</h1>
            <img
              src={routepng}
              style={{
                width: '80%',
                marginTop: '10%',
                paddingLeft: '10%',
                paddingRight: '10%',
              }}
            ></img>
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
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h5">Coimbatore</Typography>
                <Typography variant="h5">SKCET</Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',

                  paddingTop: '3%',
                }}
              >
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontSize: '110%' }}
                >
                  8.00 AM
                </Typography>
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontSize: '110%' }}
                >
                  9.00 AM
                </Typography>
              </div>
            </div>
            <div style={{ marginTop: '4%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0vh',
                }}
              >
                <Typography
                  sx={{
                    padding: '2%',
                    fontSize: '115%',
                    alignContent: 'center',
                  }}
                >
                  Price per person{' '}
                </Typography>
                <Typography
                  sx={{
                    padding: '2%',
                    fontSize: '4vh',
                    alignContent: 'center',
                  }}
                >
                  Rs.800{' '}
                </Typography>
              </div>
              <Divider sx={{ paddingTop: '3%' }}></Divider>
            </div>
            <div style={{ paddingTop: '4%' }}>
              <h1 style={{ paddingBottom: '5dvh', textAlign: 'center' }}>
                Car Info
              </h1>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                }}
              >
                <img style={{ height: '18dvh' }} src={car}></img>
                <div>
                  <Typography variant="h4">TN 38 L 9247</Typography>
                  <Typography variant="h6">Tata Tiago</Typography>
                  <Typography
                    color="primary"
                    variant="h6"
                    sx={{ fontSize: '110%' }}
                  >
                    4 seats available
                  </Typography>
                </div>
              </div>
              <Divider sx={{ paddingTop: '3%' }}></Divider>
              <div style={{ paddingBottom: '4%' }}>
                <h1
                  style={{
                    paddingBottom: '4dvh',
                    paddingTop: '3dvh',
                    textAlign: 'center',
                  }}
                >
                  Driver Profile
                </h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '35%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img src={man} style={{ height: '22vh' }}></img>
                </div>
                <div>
                  <Typography variant="h4">LogeshKumar</Typography>
                  <Typography variant="h6">Male</Typography>
                  <Typography variant="h6">Btech IT</Typography>
                  <Typography variant="h6" sx={{ fontSize: '115%' }}>
                    727722euit096@skcet.ac.in
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: '10%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '2dvh',
                paddingBottom: '5dvh',
              }}
            >
              <Button variant="contained">Book Ride</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BookRide
