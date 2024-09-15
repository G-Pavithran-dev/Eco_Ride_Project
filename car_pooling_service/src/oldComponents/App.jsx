import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookRide from "../components/BookRide/BookRide";
import Homepage from "../oldComponents/HomePage/HomePage";
import SignInSide from "../oldComponents/SignIn/SignIn";
import SignUp from "../oldComponents/SignUp/SignUp";
import CreateRide from "../oldComponents/CreateRide/CreateRide";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import Navbar from "../oldComponents/Navbar/Navbar";
import Dummy from "../components/Dummy";
import SuccessSignIn from "../oldComponents/SignIn/SuccessSignin";
import Sample from "./CreateRide/Sample";
import RideAssistant from "./CHAT_BOT/EcoRideAsst";

const App = () => {
  return (
    <Router>
      <Navbar />
      <RideAssistant />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createRide" element={<CreateRide />} />
        <Route path="/bookRide" element={<BookRide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="/loginSuccess" element={<SuccessSignIn />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </Router>
  );
};

export default App;
