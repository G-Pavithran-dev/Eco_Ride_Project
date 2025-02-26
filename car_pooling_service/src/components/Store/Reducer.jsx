import { createSlice } from "@reduxjs/toolkit";

// Initial state for login slice
const initialState = {
  department: "",
  email: "",
  encodedImage: null,
  firstName: "",
  lastName: "",
  licenceId: null,
  password: "",
  phoneNumber: "",
  registerNumber: null,
  verificationCode: null,
  verified: false,
  yearOfStudy: "",
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.department = action.payload.department;
      state.email = action.payload.email;
      state.encodedImage = action.payload.encodedImage;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.licenceId = action.payload.licenceId;
      state.password = action.payload.password;
      state.phoneNumber = action.payload.phoneNumber;
      state.registerNumber = action.payload.registerNumber;
      state.verificationCode = action.payload.verificationCode;
      state.verified = action.payload.verified;
      state.yearOfStudy = action.payload.yearOfStudy;
    },
  },
});

// Initial state for selectedId slice
const initialidState = {
  idSelected: 1,
};

const selectedIdSlice = createSlice({
  name: "selectedid",
  initialState: initialidState,
  reducers: {
    setIdselected: (state, action) => {
      state.idSelected = action.payload;
    },
  },
});

// Initial state for ride data slice
const initialRideState = {
  rides: [],
};

const rideDataSlice = createSlice({
  name: "ridedatafromstore",
  initialState: initialRideState,
  reducers: {
    setRides: (state, action) => {
      state.rides = action.payload;
    },
  },
});

const initialLoginState = {
  isLoggedIn: false,
}

const loginSlice = createSlice({
  name: "logindata",
  initialState: initialLoginState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLogout: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  }
})

// Export actions and reducers
export const { setIdselected } = selectedIdSlice.actions;
export const { setLogin } = slice.actions;
export const { setRides } = rideDataSlice.actions;
export const { setIsLogin, setLogout } = loginSlice.actions;

export default {
  Loginslice: slice.reducer,
  selectedIdslice: selectedIdSlice.reducer,
  rideDataSlice: rideDataSlice.reducer,
  IsLoginSlice: loginSlice.reducer,
};