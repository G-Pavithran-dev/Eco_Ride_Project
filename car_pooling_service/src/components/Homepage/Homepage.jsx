import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextTransition, { presets } from 'react-text-transition'
import Swal from 'sweetalert2'
import Footer from '../Footer/Footer'
import './Homepage.css'

const TEXTS = ['For', 'By', 'Of']
const Homepage = () => {
  const logindata = useSelector((state) => state.loginDataReducer)
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState({
    container: false,
    section1: false,
    section2: false,
    about: false,
    whyUse: false,
  })

  const containerRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const aboutRef = useRef(null)
  const whyUseRef = useRef(null)

  const handleCreateRide = () => {
    if (logindata.isLoggedIn) {
      navigate('/createRide')
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Login to create Ride!',
      })
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 2000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    if (section1Ref.current) observer.observe(section1Ref.current)
    if (section2Ref.current) observer.observe(section2Ref.current)
    if (aboutRef.current) observer.observe(aboutRef.current)
    if (whyUseRef.current) observer.observe(whyUseRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
      if (section1Ref.current) observer.unobserve(section1Ref.current)
      if (section2Ref.current) observer.unobserve(section2Ref.current)
      if (aboutRef.current) observer.unobserve(aboutRef.current)
      if (whyUseRef.current) observer.unobserve(whyUseRef.current)
    }
  }, [])

  return (
    <div>
      <motion.div
        ref={containerRef}
        id="container"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isVisible.container ? 1 : 0,
          y: isVisible.container ? 0 : 50,
        }}
        transition={{ duration: 0.5 }}
        className="container-home"
      >
        <div className="text-container">
          <div
            className="line1"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <h1 style={{ fontSize: '3rem' }}>Car Pooling Service </h1>
            &nbsp;&nbsp;
            <h1 style={{ fontSize: '3rem' }}>
              <TextTransition springConfig={presets.wobbly}>
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </h1>
            &nbsp;&nbsp;
            <h1 style={{ fontSize: '3rem' }}> Skcetians</h1>
          </div>
          <div className="line2">
            <h1>
              The Car Pooling Service for SKCETians is a convenient platform
              designed to connect students and staff of SKCET for shared rides,
              promoting cost-effective and eco-friendly commuting
            </h1>
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'flex' }}>
        <motion.div
          ref={section1Ref}
          id="section1"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isVisible.section1 ? 1 : 0,
            y: isVisible.section1 ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          className="w-[50dvw]"
          style={{
            backgroundColor: 'rgba(178, 243, 178,0)',
            height: '70dvh',
            width: '50dvw',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <div
            style={{
              marginLeft: '16%',
              display: 'flex',
              flexDirection: 'column',
              marginRight: '5%',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '1.3rem',
                padding: '0rem',
              }}
            >
              <h2 className="font-bold">For </h2>
              <h1 className="bg-background font-bold text-4xl">Pilot</h1>
            </div>
            <h4
              className="text-2xl"
              style={{
                fontWeight: '500',
                fontSize: '125%',
                alignContent: 'center',
                alignItems: 'center',
                paddingBottom: '6%',
              }}
            >
              Publish your ride and allow fellow commuters to join. Share the
              journey and expenses, making commuting more cost-effective.
            </h4>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black',
                width: '25%',
              }}
              onClick={handleCreateRide}
            >
              Create Ride
            </Button>
          </div>
        </motion.div>

        <motion.div
          ref={section2Ref}
          id="section2"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isVisible.section2 ? 1 : 0,
            y: isVisible.section2 ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          style={{
            alignContent: 'center',
            width: '50dvw',
            height: '70dvh',
            backgroundColor: 'rgba(178, 243, 178,0.3)',
          }}
          // className="bg bg-gradient-to-tr from-white to-green-500 w-[50dvw] h-[70dvh] items-center content-center"
        >
          <div
            style={{
              marginLeft: '16%',
              display: 'flex',
              flexDirection: 'column',
              marginRight: '5%',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '1.3rem',
                gap: 'vh',
                padding: '0rem',
              }}
            >
              <h2 className="font-bold">For </h2>
              <div className=" font-bold text-4xl text-foreground">
                Passenger
              </div>
            </div>
            <h4
              className="text-2xl"
              style={{
                fontWeight: '500',
                fontSize: '125%',
                alignContent: 'center',
                alignItems: 'center',
                paddingBottom: '6%',
              }}
            >
              Join rides with friendly drivers, enjoy a comfortable journey, and
              share the costs. Experience convenient and affordable commuting.
            </h4>

            <Button
              variant="contained"
              sx={{
                width: '25%',
                backgroundColor: 'black',
                marginTop: '1%',
              }}
              onClick={() => navigate('/bookRide')}
            >
              Book ride
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={aboutRef}
        id="about"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isVisible.about ? 1 : 0,
          y: isVisible.about ? 0 : 50,
        }}
        transition={{ duration: 0.5 }}
        className="about"
        style={{ marginTop: '5%', paddingLeft: '5%' }}
      >
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Why use Car-La-Selvom ?
        </h2>
        <div
          className="useService"
          ref={whyUseRef}
          id="whyUse"
          style={{ paddingTop: '5%' }}
        >
          <div className="use1">
            <h2 className="ml-6">Easy Connect for Rides</h2>
          </div>
          <div className="use2">
            <h2>Comfortable ride</h2>
          </div>
          <div className="use3">
            <h2>Share expenses</h2>
          </div>
          <div className="use4">
            <h3>Eco-Friendly</h3>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={whyUseRef}
        id="whyUse"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isVisible.whyUse ? 1 : 0,
          y: isVisible.whyUse ? 0 : 50,
        }}
        transition={{ duration: 0.5 }}
        className="mt-24"
        // className="h-[40vh] bg-gradient-to-r from-blue-500 to-purple-600 flex w-full justify-between mt-5 p-6 rounded-lg shadow-xl"
      >
        <Footer />
      </motion.div>
    </div>
  )
}

export default Homepage
