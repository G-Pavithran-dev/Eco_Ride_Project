import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Moon, Sun } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '../ThemeProvider'

const Navbar = () => {
  const { setTheme } = useTheme()

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{
          backgroundColor: 'white',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-around',
          lineHeight: '1rem',
        }}
      >
        <Link to="/" className="logo">
          <p className="font-serif text-2xl font-bold text-gray-800 uppercase tracking-wide m-0 p-2">
            Eco Ride
          </p>
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
            width: '15%',
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
                <Typography sx={{ fontWeight: '550' }} className="text-primary">
                  SignUp
                </Typography>
              </Link>
            </HoverCardContent>
          </HoverCard>
          {/* <- */}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
