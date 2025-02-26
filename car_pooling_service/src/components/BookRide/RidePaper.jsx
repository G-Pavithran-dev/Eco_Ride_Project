import { Paper, Typography } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import './RidePaper.css';
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import {setIdselected} from '../Store/Reducer'
import { useDispatch, useSelector } from "react-redux";

const RidePaper=(props)=>{
    console.log(props);
    const dispatch=useDispatch();
    const [click,setClick]=useState(false);
    const [border,setBorder]=useState("white");
    const selectedid=useSelector(state=>state.selectedIdReducer);
    const passLongitude=localStorage.getItem("passLongitude");
    const passLatitude=localStorage.getItem("passLati");
    const passLocation=localStorage.getItem("passLocation");

    useEffect(()=>{
        if(click && selectedid===props.value.id)
        {
            setBorder("#1976d2");
        }
        else{
            setBorder("white");

        }
    },[selectedid])

    function haversine(lat1, lon1, lat2, lon2) {
        // Convert latitude and longitude from degrees to radians
        const toRadians = (degree) => degree * (Math.PI / 180);
        
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);
    
        // Haversine formula
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        // Earth's radius in kilometers
        const R = 6371;
        const distance = R * c;
    
        return distance;
    }
   
    // const distance = haversine(props.value.leavingFromLatitude,props.value.leavingFromLongitude, passLatitude, passLongitude);
    // console.log(`The distance is ${distance.toFixed(2)} km`);
    // console.log(props.value.leavingFromLatitude,props.value.leavingFromLongitude, passLatitude, passLongitude);
    








    
    return (
      <Paper
        className="paper"
        elevation={1}
        sx={{
          padding: '3%',
          backgroundColor: 'white',
          width: '75%',
          position: 'relative',
          borderRadius: '0.5vh',
          paddingRight: '5%',
          height: '25dvh',
          marginBottom: '2%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: `3px solid ${border}`,
        }}
        onClick={() => {
          setClick(!click)
          localStorage.setItem('clickid', props.value.id)
          dispatch(setIdselected(props.value.id))
        }}
      >
        <div style={{ display: 'flex', gap: '5%' }}>
          <DirectionsCarIcon color="primary"></DirectionsCarIcon>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'auto auto auto',
              justifyContent: 'space-between',
            }}
          >
            <Typography className="truncate" variant="h6">
              {props.value.locationFirstName ===
              'Sri Krishna College of Engineering and Technology'
                ? 'SKCET'
                : props.value.locationFirstName}
            </Typography>
            <Typography variant="h6">--------</Typography>
            <Typography className="truncate" variant="h6">
              {props.value.goingLocationFirstName ===
              'Sri Krishna College of Engineering and Technology'
                ? 'SKCET'
                : props.value.goingLocationFirstName}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: '' }}>
              {props.value.startTime}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '' }}></Typography>
            <Typography variant="h6" sx={{ fontSize: '' }}>
              {props.value.endTime}
            </Typography>
            {/* <Typography variant="h6" sx={{fontSize:"95%"}}>{props.value.distance} km away from you </Typography> */}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            paddingLeft: '12%',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: '5dvh',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '90%', fontWeight: '500' }}>
            <span style={{ fontWeight: 750, fontSize: '1rem' }}>
              {props.value.distance}
            </span>{' '}
            km away
          </Typography>
          <Typography color="primary" variant="h5" sx={{}}>
            Rs.{props.value.price}
          </Typography>
        </div>
      </Paper>
    )
}
export default RidePaper;