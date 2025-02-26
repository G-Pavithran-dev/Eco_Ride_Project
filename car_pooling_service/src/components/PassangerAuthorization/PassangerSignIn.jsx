import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Alert, Snackbar } from '@mui/material'
import SignInImage from '../../assets/images/interview_svg.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import '../../../src/index.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setIsLogin, setLogin } from '../Store/Reducer'
import Cookies from 'js-cookie'

export default function PassangerSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [userDetails, setUserDetails] = React.useState({})
  const vertical = 'top'
  const horizontal = 'right'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .get(`http://${import.meta.env.VITE_LOCAL_URL}/api/ecoride/login`, {
        params: {
          email: email,
          password: password,
        },
      })
      .then((Response) => {
        console.log(Response.status)
        Cookies.set('userdata', JSON.stringify(Response.data), {
          expires: 0.25,
        }) // expires in 6 hours
        setUserDetails(Response.data)
        dispatch(setLogin(Response.data))
        dispatch(setIsLogin(true))
        navigate('/')
      })
      .catch((error) => {
        console.error('There is an error in Singin ', error)
        setOpen(true)
      })
  }

  return (
    <div className="slide-in-from-corner h-[80vh] w-screen flex items-center justify-center">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error Invalid crendentials. Please try again!
        </Alert>
      </Snackbar>
      <div className="mx-auto flex justify-evenly items-center p-4 gap-28">
        <div className="">
          <img className="w-[25rem] h-[27rem]" src={SignInImage} alt="" />
        </div>
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="@skcet.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/passangerSignUp" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
