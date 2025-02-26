import {
  Button,
  Paper,
  TextField,
  Box,
  Autocomplete,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import '../CreateRide/RideCard.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RideCard = () => {
  const [status, setStatus] = useState('')

  const [leaving, setLeaving] = useState('')
  const [going, setGoing] = useState('')
  const [availableSeats, setSeats] = useState('')
  const [price, setPrice] = useState('')
  const [carName, setCarName] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [name] = useState('Sadasivam')
  const [email] = useState('727722euit131@skcet.ac.in')
  const [phNo] = useState('8667455968')
  const [errors, setErrors] = useState({})
  const [input, setInptut] = useState('')

  const [suggestions, setSuggestions] = useState([
    { label: 'Marudhamalai Temple' },
    { label: 'VOC Park and Zoo' },
    { label: 'Siruvani Waterfalls' },
    { label: 'Gedee Car Museum' },
    { label: 'Perur Pateeswarar Temple' },
    { label: 'Adiyogi Shiva Statue' },
    { label: 'TNAU Botanical Garden' },
    { label: 'Brookefields Mall' },
    { label: 'Kovai Kondattam Amusement Park' },
    { label: 'Black Thunder Water Park' },
  ])

  const [api, setApi] = useState([])
  const [textFieldValue, setTextFieldValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {}

    if (!leaving) newErrors.leaving = 'This field is required'
    if (!going) newErrors.going = 'This field is required'
    if (!availableSeats) newErrors.availableSeats = 'This field is required'
    if (!price) newErrors.price = 'This field is required'
    if (!carName) newErrors.carName = 'This field is required'
    if (!date) newErrors.date = 'This field is required'
    if (!startTime) newErrors.startTime = 'This field is required'
    if (!endTime) newErrors.endTime = 'This field is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const rideDetails = {
        name,
        email,
        phNo,
        leaving,
        going,
        availableSeats,
        price,
        carName,
        date,
        startTime,
        endTime,
      }
      axios
        .post(
          `http://${import.meta.env.VITE_LOCAL_URL}/app/createride`,
          rideDetails
        )
        .then((response) => {
          setStatus('success')

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Ride details submitted successfully!',
          })
        })
        .catch((error) => {
          console.error(
            'There was an error submitting the ride details:',
            error
          )
          setStatus('error')
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error submitting the ride details.',
          })
        })
    }
  }
  console.log(textFieldValue)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Paper
        className="paper-comp"
        elevation={5}
        sx={{
          borderRadius: '20px',
          height: 'auto',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px',

          backgroundColor: 'white',
          overflow: 'auto',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          component="form"
          sx={{ flexGrow: 1 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="check">CheckField</label>
              <input
                type="text"
                value={textFieldValue}
                id="check"
                onChange={(e, value) => {
                  setTextFieldValue(value)
                }}
              />
              <Autocomplete
                id="outlined-leaving"
                options={suggestions}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Leaving From"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.leaving}
                    helperText={errors.leaving}
                  />
                )}
                value={leaving ? { label: leaving } : null}
                onChange={(event, newValue) => {
                  if (newValue && typeof newValue === 'object') {
                    setLeaving(newValue.label)
                  } else {
                    const newLabel = newValue || ''
                    setLeaving(newLabel)
                    if (
                      !suggestions.some((option) => option.label === newLabel)
                    ) {
                      setSuggestions([...suggestions, { label: newLabel }])
                    }
                  }
                }}
                freeSolo
                onInputChange={(event, newInputValue) => {
                  if (
                    newInputValue &&
                    !suggestions.some(
                      (option) => option.label === newInputValue
                    )
                  ) {
                    setSuggestions([...suggestions, { label: newInputValue }])
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="outlined-going"
                options={suggestions}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Going To"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.going}
                    helperText={errors.going}
                  />
                )}
                value={going ? { label: going } : null}
                onChange={(event, newValue) => {
                  if (newValue && typeof newValue === 'object') {
                    setGoing(newValue.label)
                  } else {
                    const newLabel = newValue || ''
                    setGoing(newLabel)
                    if (
                      !suggestions.some((option) => option.label === newLabel)
                    ) {
                      setSuggestions([...suggestions, { label: newLabel }])
                    }
                  }
                }}
                freeSolo
                onInputChange={(event, newInputValue) => {
                  if (
                    newInputValue &&
                    !suggestions.some(
                      (option) => option.label === newInputValue
                    )
                  ) {
                    setSuggestions([...suggestions, { label: newInputValue }])
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-availableSeats"
                label="Available availableSeats"
                type="number"
                value={availableSeats}
                onChange={(e) => setSeats(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.availableSeats}
                helperText={errors.availableSeats}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-price"
                label="Price Per Person"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-name"
                label="Car Name"
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.carName}
                helperText={errors.carName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-date"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-start-time"
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.startTime}
                helperText={errors.startTime}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-end-time"
                label="End Time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.endTime}
                helperText={errors.endTime}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'centers',
            }}
          >
            Create Ride
          </Button>
        </Box>
      </Paper>
      {status === 'success' &&
        setTimeout(() => {
          navigate('/passengerRideHistory')
        }, 2000)}
      ;
    </motion.div>
  )
}

export default RideCard
