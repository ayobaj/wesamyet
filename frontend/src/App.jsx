import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";


const App = () => {
  return (
    <div className="font-tiltneon backgroundcolor h-screen">
      <NavBar/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/listing/:listingId" element={<Listing/>}/>
        <Route path="/search" element={<Search/>}/>
        

        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
        </Route>

      </Routes>
    </div>
  ) 
}

export default App
