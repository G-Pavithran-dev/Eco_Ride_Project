import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'
import BookRide from './components/BookRide/BookRide'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import Homepage from './components/Homepage/Homepage'
import SignInSide from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import CreateRide from './components/CreateRide/CreateRide'
import Navbar from './components/NavBar/NavBar'
import ProfilePage from './components/ProfilePage/ProfilePage'

import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import SuccessSignIn from './components/SignIn/SuccessSignin'
import PublishedRideHistory from './components/PublishedRideHistory/PublishedRideHistory'
import PilotsRideHistory from './components/PilotsRideHistory/PilotsRideHistory.jsx'

import PassangerSignIn from './components/PassangerAuthorization/PassangerSignIn'
import PassangerSignUp from './components/PassangerAuthorization/PassangerSignUp'
import RiderSignUp from './components/RiderAuthorization/RiderSignUp'
import Footer from './components/Footer/Footer.jsx'
import Map from './components/Map/Map.jsx'
import MyModal from './components/DialogueBox/Dialogue.jsx'
// import GetStarted from './components/getStartedPage/GetStarted';
import RideAssistant from './components/CHAT_BOT/EcoRideAsst.jsx'
const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <AnimatedRoutes />
        <Routes>
          <Route path="/passangerSignUp" element={<PassangerSignUp />} />
          <Route path="/passangerSignIn" element={<PassangerSignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Homepage />
            </PageWrapper>
          }
        />
        <Route
          path="/dialogue"
          element={
            <PageWrapper>
              <MyModal />
            </PageWrapper>
          }
        />
        <Route
          path="/RiderSignIn"
          element={
            <PageWrapper>
              <RiderSignUp />
            </PageWrapper>
          }
        />
        <Route
          path="/map"
          element={
            <PageWrapper>
              <Map />
            </PageWrapper>
          }
        />

        <Route
          path="/createRide"
          element={
            <PageWrapper>
              <CreateRide />
            </PageWrapper>
          }
        />
        <Route
          path="/bookRide"
          element={
            <PageWrapper>
              <BookRide />
            </PageWrapper>
          }
        />
        <Route
          path="/loginSuccess"
          element={
            <PageWrapper>
              <SuccessSignIn />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <SignUp />
            </PageWrapper>
          }
        />
        <Route
          path="/signin"
          element={
            <PageWrapper>
              <SignInSide />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <ProfilePage />
            </PageWrapper>
          }
        />
        <Route
          path="/footer"
          element={
            <PageWrapper>
              <Footer />
            </PageWrapper>
          }
        />
        <Route
          path="/passengerRideHistory"
          element={
            <PageWrapper>
              <PublishedRideHistory />
            </PageWrapper>
          }
        />
        <Route
          path="/PilotsRideHistory"
          element={
            <PageWrapper>
              <PilotsRideHistory />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
