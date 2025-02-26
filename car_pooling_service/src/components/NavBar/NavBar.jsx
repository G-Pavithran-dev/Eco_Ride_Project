import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Moon, Sun } from 'lucide-react'
import { useSelector } from 'react-redux'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '../ThemeProvider'

const Navbar = () => {
  const { setTheme } = useTheme()
  const loginData = useSelector((state) => state.loginDataReducer)
  const data = useSelector((state) => state.loginReducer)

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{
          backgroundColor: 'white',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-around',
          lineHeight: '0.5rem',
        }}
      >
        <Link to="/" className="logo">
          <img
            src="/images/eco-ride.png"
            style={{ width: '6.5rem', height: '2rem' }}
          />
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '20%',
            marginLeft: '8%',
            marginRight: '8%',
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '20%',
          }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button className="  text-white font-bold py-2 px-4 rounded">
                Your Rides
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-40 bg-white p-4 rounded-lg shadow-lg">
              <Link
                to="/PilotsRideHistory"
                className="block mb-2 hover:bg-blue-100 p-2  rounded"
              >
                <Typography
                  sx={{ fontWeight: '550' }}
                  className="text-primary mb-4"
                >
                  As Pilot
                </Typography>
              </Link>
              <div className="border-t border-primary my-2"></div>
              <Link
                to="/passengerRideHistory"
                className="block hover:bg-blue-100 p-2 rounded"
              >
                <Typography sx={{ fontWeight: '550' }} className="text-primary">
                  As Passenger
                </Typography>
              </Link>
            </HoverCardContent>
          </HoverCard>

          {!loginData.isLoggedIn ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="  text-white font-bold py-2 px-4 rounded">
                  Get Started
                </Button>
              </HoverCardTrigger>

              <HoverCardContent className="w-40 bg-white p-4 rounded-lg shadow-lg">
                <Link
                  to="/passangerSignin"
                  className="block mb-2 hover:bg-blue-100 p-2  rounded"
                >
                  <Typography
                    sx={{ fontWeight: '550' }}
                    className="text-primary mb-4"
                  >
                    Login
                  </Typography>
                </Link>

                <div className="border-t border-primary my-2"></div>
                <Link
                  to="/passangerSignup"
                  className="block hover:bg-blue-100 p-2 rounded"
                >
                  <Typography
                    sx={{ fontWeight: '550' }}
                    className="text-primary"
                  >
                    SignUp
                  </Typography>
                </Link>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link to="/profile">
              <Avatar>
                <AvatarFallback className="bg-black text-white font-semibold">
                  {data.firstName[0]}
                  {data.lastName}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {loginData.isLoggedIn && (
            
          )} */}
          {/* <- */}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
