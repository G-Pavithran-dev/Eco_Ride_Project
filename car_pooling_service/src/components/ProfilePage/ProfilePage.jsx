import { useDispatch, useSelector } from 'react-redux'
import { Separator } from '../ui/separator'
import { useEffect } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import { Rating } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import TimelineIcon from '@mui/icons-material/Timeline'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button, buttonVariants } from '../ui/button'
import { setIsLogin } from '../Store/Reducer'
import Cookies from 'js-cookie'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const data = useSelector((state) => state.loginReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('the store data in profile is ', data)
  }, [data])
  console.log(data)

  const handleClick = () => {
    console.log('clicked')
  }

  const handleLogout = () => {
    dispatch(setIsLogin(false))
    Cookies.remove('userdata')
    navigate('/passangerSignIn')
  }
  return (
    <>
      <section className="w-screen h-[91.3vh] flex flex-row ">
        <section className="w-1/3 flex flex-col p-10 items-center shadow-lg rounded-lg shadow-accent-foreground m-4">
          <img
            src="/images/eco-ride-high-resolution-logo-black-transparent.png"
            className="m-4 w-56 h-56"
          />
          <Separator className="border" />
          Recent Ride
          <Separator className="border" />
          <div className="m-4"></div>
        </section>
        <section className="w-2/3 my-4 mr-3 flex flex-col shadow-md shadow-accent-foreground rounded-lg">
          <section className="h-1/3 flex flex-col justify-around spa p-2 pl-4">
            <section className="flex flex-row items-center justify-between w-full">
              <section className="w-1/3 flex flex-row items-center">
                <h1 className="text-3xl font-semibold">
                  {data.firstName} {data.lastName}
                </h1>
                {data.verified ? (
                  <h1 className="text-md font-medium ml-3 text-green-700 flex items-center">
                    <VerifiedIcon color="success" fontSize="small" /> Verified
                  </h1>
                ) : (
                  <h1 className="text-md font-medium ml-3 text-red-700 flex items-center">
                    <NewReleasesIcon color="error" fontSize="small" /> Not yet
                    verified
                  </h1>
                )}
              </section>
              {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="self-end">Update Profile</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Edit your profile information
                    </AlertDialogTitle>
                    <form></form>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently update
                      your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>
                      Update
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
              <Button
                className="self-end bg-red-600 font-bold hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </section>
            <h1 className="font-semibold">
              <SportsMotorsportsIcon /> PILOT
            </h1>
            <section className="text-sm font-semibold h-1/3 text-muted-foreground flex flex-col justify-around">
              RATING
              <section className="flex flex-row items-center">
                <Rating defaultValue={3.5} precision={0.5} readOnly />
                <h1 className="text-md font-bold text-secondary-foreground">
                  3153
                </h1>
              </section>
            </section>
            <section className="grid grid-cols-4 p-2"></section>
          </section>
          <Tabs
            defaultValue="account"
            className="w-full h-2/3 pl-4 p-2 bg-primary-foreground overflow-y-hidden"
          >
            <TabsList className="bg-primary-foreground">
              <TabsTrigger
                value="timeline"
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:rounded-b-none"
              >
                <TimelineIcon /> Histroy
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:rounded-b-none"
              >
                <PersonIcon /> Account
              </TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="timeline" className="h-5/6">
              <section className="flex flex-row items-center">
                <h1 className="text-xl font-normal">Your Ride History </h1>
              </section>
            </TabsContent>
            <TabsContent
              value="account"
              className="flex flex-col justify-around p-2 h-5/6"
            >
              <h1 className="text-sm font-semibold text-muted-foreground">
                CONTACT
              </h1>
              <section className="grid grid-cols-3 w-1/3 items-center justify-items-start">
                <h1 className="font-bold">Email: </h1>
                <h1 className="font-medium col-span-2">{data.email}</h1>
                <h1 className="font-bold my-4">Phone: </h1>
                <h1 className="font-medium col-span-2">{data.phoneNumber}</h1>
              </section>
              <h1 className="text-sm font-semibold text-muted-foreground">
                ACADEMICS
              </h1>
              <section className="grid grid-cols-3 w-1/3 items-center justify-items-start">
                <h1 className="font-bold">Year: </h1>
                <h1 className="font-medium col-span-2">{data.yearOfStudy}</h1>
                <h1 className="font-bold my-4">Department: </h1>
                <h1 className="font-medium col-span-2">{data.department}</h1>
              </section>
              <h1 className="text-sm font-semibold text-muted-foreground">
                OTHER
              </h1>
              <section className="grid grid-cols-3 w-1/3 items-center justify-items-start">
                <h1 className="font-bold">License: </h1>
                <h1 className="font-medium col-span-2 italic">
                  {data.licenseId ? data.licenseId : 'License Not Yet Uploaded'}
                </h1>
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </>
  )
}
