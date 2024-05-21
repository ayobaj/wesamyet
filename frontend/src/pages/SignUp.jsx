import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import bgimg from "../assets/bgimg.jpg"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

    const [formData, setFormData] = useState({});

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

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
            setLoading(true)

        const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/backend/authenticate/signup`,

        {

            method: 'POST',

            headers: {
                'content-Type': 'application/json',
            },

            body: JSON.stringify(formData),

        });

        const data = await res.json();

        console.log(data);
        
        if(data.success === true){
            setLoading(false);
            toast.success(data.message);
            navigate('/sign-in');

        } else if (data.success == false){
            setLoading(false);
            setError(data.message);
            toast.error(data.message);
        }

        

        } catch(error){
            setLoading(false);
            setError(error.message);
            toast.error(error.message)
        }


    }


    return (
        <div className="min-h-screen bg-green-200">

            <div className="p-3 max-w-lg mx-auto pt md:pt-[px]">
            <h1 className="text-3xl md:text-[35px]  font-bold text-center my-6 text-green-700 uppercase">Sign Up</h1>


        <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <p>Username</p>
                <input type="text" placeholder="username" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="username"/>
            </div>

            <div className="flex flex-col">
            <p>Email</p>
            <input type="email" placeholder="email" onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none" id="email"/>
            </div>

            <div className="flex flex-col">
                <p>Password</p>
                <input type="password" placeholder="password" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="password"/>
            </div>

            <button disabled={loading} className=" hover:bg-orange-300 bg-orange-400 text-white p-3 rounded-lg uppercase  
            " >{loading ? 'loading...' : 'sign up'}</button>

            <OAuth/>
        </form>

        <div className="flex gap-2 mt-5 items-center" >

            <p className="">Have an account?</p>
            <Link to={"/sign-in"}>
                <span className="text-green-600 ">Sign in</span>
            </Link>
            
        </div>
    </div>

        {<ToastContainer/>}

    </div>
    )
    }

export default SignUp
