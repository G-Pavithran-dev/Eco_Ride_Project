import {
  // Button,
  Dialog,
  Divider,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material'
import { Button } from '@/components/ui/button'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material'
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
import { useDispatch, useSelector } from 'react-redux'
import { setIdselected } from '../Store/Reducer'
import { Link, useNavigate } from 'react-router-dom'

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          color: 'black',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
        },
      },
    },
  },
})
const BookRide = () => {
  const passLongitude = localStorage.getItem('passLongitude')
  const passLatitude = localStorage.getItem('passLati')
  // const passLocation = localStorage.getItem("passLocation");
  const dispatch = useDispatch()
  const selectedid = useSelector((state) => state.selectedIdReducer)
  const [opendilog, setOpendilog] = useState(false)
  const nav = useNavigate()
  const f = () => {
    axios
      .get(`http://${import.meta.env.VITE_LOCAL_URL}/app/bookride/getallrides`)
      .then((res) => {
        console.log('all rides are from book ride ', res.data)
        const updatedRidesData = res.data.map((ride) => {
          const distance = haversine(
            ride.leavingFromLatitude,
            ride.leavingFromLongitude,
            passLatitude,
            passLongitude
          )
          console.log(`The distance is ${distance.toFixed(2)} km`)
          console.log(
            ride.leavingFromLatitude,
            ride.leavingFromLongitude,
            passLatitude,
            passLongitude
          )

          return {
            ...ride,
            distance: distance.toFixed(2), // Update the distance property
          }
        })
        console.log(updatedRidesData)
        setRideData(updatedRidesData)
        setAllRideData(updatedRidesData)
        dispatch(setIdselected(1))
      })
  }
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
  const op = () => {
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    console.log('op')
    rideData.map((ride) => {
      const distance = haversine(
        ride.leavingFromLatitude,
        ride.leavingFromLongitude,
        passLatitude,
        passLongitude
      )
      console.log(
        ride.leavingFromLatitude,
        ride.leavingFromLongitude,
        passLatitude,
        passLongitude
      )
      console.log(`The distance is ${distance.toFixed(2)} km`)

      return {
        ...ride,
        distance: distance.toFixed(2),
      }
    })
  }
  useEffect(() => {
    op()
  }, [rideData])
  useEffect(() => {
    f()
  }, [])

  const [leavingFromFilters, setLeavingFromFilters] = useState([])
  const [goingToFilters, setGoingToFilters] = useState([])
  let [isOpen, setIsOpen] = useState(true)
  const [passengerLocation, setPassengerLocation] = useState('')
  const [passLatitud, setPassLatitude] = useState()
  const [passLongitud, setPassLongitude] = useState()
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (passengerLocation !== '') {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${passengerLocation}&format=json&apiKey=7150d3d1879642babb4e29c827ae645b`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          const newSuggestions = result.results.map((item) => ({
            label: `${item.address_line1} ${item.address_line2}`,
            value: item,
          }))
          setSuggestions(newSuggestions)
        })
        .catch((error) => console.log('error', error))
    }
  }, [passengerLocation])

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleLeavingFromcheckbox = (event) => {
    const value = event.target.value
    setLeavingFromFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }
  useEffect(() => {
    localStorage.setItem('passLati', passLatitud)
    localStorage.setItem('passLongitude', passLongitud)
    localStorage.setItem('passengerLocation', passengerLocation)
    op()
  }, [passLatitud, passLongitud])

  const handleGoingTocheckbox = (event) => {
    const value = event.target.value
    setGoingToFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }
  const logindata = useSelector((state) => state.loginReducer)
  console.log(`localhost`)
  const handleBookRide = () => {
    if (logindata.email === '') {
      alert('please login first')
    } else {
      axios
        .put(
          `http://${
            import.meta.env.VITE_LOCAL_URL
          }/app/bookride/updateRideCompletionStatus/${selectedRideData.id}`
        )
        .then()
        .catch((err) => {
          console.log(err)
        })
      axios
        .post(
          `http://${import.meta.env.VITE_LOCAL_URL}/app/userRideHistory/${
            logindata.email
          }/${selectedRideData.id}`
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log('error occured in posting a booking ride', error)
        })
      console.log('Ride Booked with Driver Id : ', selectedRideData.id)
      console.log('Ride Booked By ', logindata.email)
      f()
      nav('/passengerRideHistory')
    }
  }
  const [AllrideData, setAllRideData] = useState([
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
  const [selectedRideData, setSelectedRideData] = useState({
    id: null,
    name: 'log',
    phone: '8610528048',
    email: '727722euit096',
    leaving: 'Bk pudur',
    going: 'adnkcjhnsd',
    availableSeats: 0,
    price: 0.0,
    carName: 'ducsd',
    carNumber: 'djdj',
    date: 'djdjd',
    startTime: 'jdjd',
    endTime: 'jdj',
  })

  const handleFilterChanges = (e) => {
    console.log('hello this is filter handle func')
    try {
      if (leavingFromFilters.length == 0 && goingToFilters.length == 0) {
      } else {
        const res = axios.post(
          `http://${import.meta.env.VITE_LOCAL_URL}/app/bookride/filter`,
          [leavingFromFilters, goingToFilters]
        )
        res.then((res) => {
          setRideData(res.data)

          console.log('react data', res.data)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (degree) => degree * (Math.PI / 180)

    lat1 = toRadians(lat1)
    lon1 = toRadians(lon1)
    lat2 = toRadians(lat2)
    lon2 = toRadians(lon2)

    // Haversine formula
    const dLat = lat2 - lat1
    const dLon = lon2 - lon1
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    // Earth's radius in kilometers
    const R = 6371
    const distance = R * c

    return distance
  }

  useEffect(() => {
    console.log('the store selected id is ', selectedid.idSelected)
    try {
      const response = axios.get(
        `http://${import.meta.env.VITE_LOCAL_URL}/app/bookride/selectedValue/${
          selectedid.idSelected
        }`
      )
      response.then((res) => {
        console.log(res.data)
        setSelectedRideData(res.data)
      })
    } catch (err) {
      console.log('error in fetching selected value', err)
    }
  }, [selectedid.idSelected])

  return (
    <div>
      <div className="sortingContainer">
        <div className="containerItems">
          <button className="py-[0.7vh] rounded-[10vh] text-[75%] bg-white flex border border-gray-300 pl-4 pr-4 md:py-2 md:text-sm">
            <Typography
              onClick={() => {
                const sorted = [...rideData].sort(
                  (a, b) => a.distance - b.distance
                )
                setRideData(sorted)
              }}
            >
              Sort
            </Typography>
            {/* <KeyboardArrowDownIcon /> */}
          </button>

          <button className="filterButton">
            <Typography
              onClick={() => {
                setOpendilog(!opendilog)
              }}
            >
              Filter
            </Typography>
            <Dialog open={opendilog}>
              <div className="p-4">
                <label className="font-medium">Leaving From: </label>
                <div className="grid justify-center p-[3vh] gap-[1vh] grid-cols-[auto_auto_auto] w-max">
                  {AllrideData.map((data) => (
                    <div>
                      <Checkbox
                        value={data.leaving}
                        checked={leavingFromFilters.includes(data.leaving)}
                        onChange={handleLeavingFromcheckbox}
                      />
                      <label>
                        {data.locationFirstName ===
                        'Sri Krishna College of Engineering and Technology'
                          ? 'SKCET'
                          : data.locationFirstName}
                      </label>
                    </div>
                  ))}
                </div>
                <label className="font-medium">Going To: </label>
                <div className="grid justify-center p-[3vh] gap-[1vh] grid-cols-[auto_auto_auto] w-max">
                  {AllrideData.map((data) => (
                    <div>
                      <Checkbox
                        value={data.going}
                        checked={goingToFilters.includes(data.going)}
                        onChange={handleGoingTocheckbox}
                      />
                      <label>
                        {data.goingLocationFirstName ===
                        'Sri Krishna College of Engineering and Technology'
                          ? 'SKCET'
                          : data.goingLocationFirstName}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  className="h-5 mt-7 p-5"
                  onClick={() => {
                    setOpendilog(false)
                    console.log(goingToFilters)
                    console.log(leavingFromFilters)
                    handleFilterChanges()
                  }}
                >
                  Apply filters
                </Button>
              </div>
            </Dialog>
            <FilterListIcon className="p-1" />
          </button>

          <Button
            onClick={open}
            className="py-2 px-4 text-sm font-medium text-white rounded-md bg-black"
          >
            Change your location
          </Button>

          <Dialog
            open={isOpen}
            onClose={close}
            className="rounded-lg"
            maxWidth="xs"
            fullWidth={true}
          >
            <DialogTitle className="text-base/7 font-medium text-primary">
              Current Location:
            </DialogTitle>
            <DialogContent className="bg-secondary p-6">
              <p className="mt-2 text-sm/6 text-primary mr-4" id="location">
                Enter your Current Location:{' '}
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    options={suggestions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(e) => setPassengerLocation(e.target.value)}
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setPassengerLocation(newValue.label)
                        setPassLatitude(newValue.value.lat)
                        setPassLongitude(newValue.value.lon)
                      }
                    }}
                  />
                </ThemeProvider>
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                style={{ backgroundColor: 'black' }}
                className="inline-flex items-center gap-2 py-1.5 px-3 text-sm/6 font-semibold text-white"
                onClick={() => {
                  close()
                  op()
                  f()
                }}
              >
                Got it, thanks!
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider />
      </div>

      <div className="content text-black">
        <div className="ride-papers">
          {rideData.map((data) => {
            return <RidePaper value={data} />
          })}
        </div>

        <div className="ride-content flex flex-col md:flex-row justify-around">
          {selectedRideData ? (
            <div className="flex flex-col w-[100%] md:w-[60%]">
              <h1 className="text-[1.5rem] md:text-[2.3rem] text-center">
                Mon 23 JUL
              </h1>
              <img
                src={routepng}
                className="w-[100%] mt-[5%] md:mt-[10%] pl-[10%] pr-[10%]"
              />
              <div className="flex flex-col justify-between pt-[2%]">
                <div className="flex justify-between">
                  <Typography variant="h5">
                    {selectedRideData.locationFirstName}
                  </Typography>
                  <Typography variant="h5">
                    {selectedRideData.goingLocationFirstName ===
                    'Sri Krishna College of Engineering and Technology'
                      ? 'SKCET'
                      : selectedRideData.goingLocationFirstName}
                  </Typography>
                </div>
                <div className="flex justify-between pt-[3%]">
                  <Typography
                    color="primary"
                    variant="h6"
                    className="font-[110%]"
                    sx={{ fontSize: '110%' }}
                  >
                    {selectedRideData.startTime}
                  </Typography>
                  <Typography
                    color="primary"
                    variant="h6"
                    sx={{ fontSize: '110%' }}
                  >
                    {selectedRideData.endTime}
                  </Typography>
                </div>
              </div>
              <div className="mt-[4%]">
                <div className="flex justify-between">
                  <Typography sx={{ padding: '2%', fontSize: '115%' }}>
                    Price per person
                  </Typography>
                  <Typography sx={{ padding: '2%', fontSize: '4vh' }}>
                    Rs.{selectedRideData.price}
                  </Typography>
                </div>
                <Divider sx={{ paddingTop: '3%' }} />
              </div>

              <div className="mt-[4%]">
                <h1 className="text-center text-[155%] pb-[5dvh]">Car Info</h1>
                <div className="flex justify-between">
                  <img style={{ height: '18dvh' }} src={car} />
                  <div>
                    <Typography variant="h4">
                      {selectedRideData.carNumber}
                    </Typography>
                    <Typography variant="h6">
                      {selectedRideData.carName}
                    </Typography>
                    <Typography
                      color="primary"
                      variant="h6"
                      sx={{ fontSize: '110%' }}
                    >
                      {selectedRideData.availableSeats} seats available
                    </Typography>
                  </div>
                </div>
                <Divider sx={{ paddingTop: '3%' }} />
              </div>

              <div className="mt-[4%]">
                <h1 className="text-center text-[155%]">Driver Profile</h1>
                <div className="flex justify-between items-center">
                  <div className="w-[35%] flex justify-center">
                    <img src={man} style={{ height: '22vh' }} />
                  </div>
                  <div>
                    <Typography variant="h4">
                      {selectedRideData.name}
                    </Typography>
                    <Typography variant="h6">Male</Typography>
                    <Typography variant="h6">Btech IT</Typography>
                    <Typography variant="h6" sx={{ fontSize: '115%' }}>
                      {selectedRideData.email}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mt-[10%] flex justify-center">
                <Button onClick={handleBookRide}>Book Ride</Button>
                <Link to="/map">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: 'black',
                      marginLeft: '10px',
                      color: 'white',
                    }}
                  >
                    More Details
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
export default BookRide
