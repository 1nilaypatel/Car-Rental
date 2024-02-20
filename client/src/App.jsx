import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AgencySignUp, CreateListing, Home, SignIn, SignUp, UpdateListing, UserSignUp, ViewBookedCars } from './pages';
import { Appbar, PrivateRoute } from './components';

export default function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/sign-in"} element={<SignIn />} />
        <Route path={"/user-sign-up"} element={<UserSignUp />} />
        <Route path={"/agency-sign-up"} element={<AgencySignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path={"/view-booked-cars/:agencyId"} element={<ViewBookedCars />} />
          <Route path={"/create-listing"} element={<CreateListing />} />
          <Route path={"/update-listing/:listingId"} element={<UpdateListing />} />
        </Route>
      </Routes>
    </Router>
  )
}
