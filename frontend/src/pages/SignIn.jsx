import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../Redux/User/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {

    const [formData, setFormData] = useState({});

    const {loading, error} = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

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

        if(data.success === false) {
            
            dispatch(signInFailure(data.message));
            return;
        }
        
        dispatch(signInSuccess(data));
        
        navigate('/');
        

        } catch(error){
            dispatch(signInFailure(error.message));
        }


    }


    return (
        <div className=" p-3 max-w-lg mx-auto ">

            <h1 className="text-3xl font-semibold text-center my-6 text-purple-800">Sign In</h1>


            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>

                <input type="text" placeholder="username" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="username"/>

                <input type="password" placeholder="password" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="password"/>

                <button disabled={loading} className="bg-purple-400 text-white p-3 rounded-lg uppercase 
                hover:opacity-80 disabled:opacity-80" >{loading ? 'loading...' : 'sign in'}</button>

                <OAuth/>
            </form>

            <div className="flex gap-2 mt-5" >

                <p>No account?</p>
                <Link to={"/sign-up"}>
                    <span className="text-purple-800 hover:underline">Sign up</span>
                </Link>
                
            </div>

            {error && <p className="text-red-900 mt-5">{error}</p>}

        </div>
    )
    }

export default SignIn;
