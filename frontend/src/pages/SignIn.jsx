import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../Redux/User/userSlice";
import OAuth from "../components/OAuth";
import bgimg from "../assets/bgimg.jpg";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignIn = () => {

    const [formData, setFormData] = useState({});

    const {loading} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, // keeps previous data so it is not lost

            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault(); // prevents default behaviour of a form

        try{
            dispatch(signInStart());

        const res = await fetch('/backend/authenticate/signin',

        {

            method: 'POST',

            headers: {
                'content-Type': 'application/json',
            },

            body: JSON.stringify(formData),

        });

        const data = await res.json();

        console.log(data);

        if(data.success === true) {
            dispatch(signInSuccess(data));
            toast.success(data.message);
            navigate('/');

        } else if (data.success === false){
            dispatch(signInFailure(data.message));
            toast.error(data.message);
            return;
        }
        

        } catch(error){
            dispatch(signInFailure(error.message));
        }


    }


    return (

        <div className="  h-screen " style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>

            <div className="p-3 max-w-lg mx-auto pt-16 md:pt-[100px]">

            <h1 className="text-3xl md:text-[50px] font-bold text-center my-6 text-white uppercase " >Sign In</h1>


                <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>

                    <input type="text" placeholder="username" onChange={handleChange}
                    className="border p-3 rounded-lg focus:outline-none" id="username"/>

                    <input type="password" placeholder="password" onChange={handleChange}
                    className="border p-3 rounded-lg focus:outline-none" id="password"/>

                    <button disabled={loading} className=" hover:bg-orange-300 bg-orange-400 text-white p-3 rounded-lg uppercase 
                    " >{loading ? 'loading...' : 'sign in'}</button>

                    <OAuth/>
                </form>

                <div className="flex gap-2 mt-5 items-center" >

                    <p className="text-white font-bold ">No account?</p>
                    <Link to={"/sign-up"}>
                        <span className="text-green-400 font-bold">Sign up</span>
                    </Link>
                </div>


            </div>

            {<ToastContainer/>}

        </div>
        )
        }

export default SignIn;
