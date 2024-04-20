import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


const SignUp = () => {

    const [formData, setFormData] = useState({});

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

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
            setLoading(true)

        const res = await fetch('/backend/authenticate/signup',

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
            
            setLoading(false);
            setError(data.message);
            return;
        }
        
        setLoading(false);
        setError(null);
        navigate('/sign-in');
        

        } catch(error){
            setLoading(false);
            setError(error.message);
        }


    }


    return (
        <div className=" p-3 max-w-lg mx-auto ">

            <h1 className="text-3xl font-semibold text-center my-6 text-purple-800">Sign Up</h1>


            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>

                <input type="text" placeholder="username" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="username"/>

                <input type="email" placeholder="email" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="email"/>

                <input type="password" placeholder="password" onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none" id="password"/>

                <button disabled={loading} className="bg-purple-400 text-white p-3 rounded-lg uppercase 
                hover:opacity-80 disabled:opacity-80" >{loading ? 'loading...' : 'sign up'}</button>

                <OAuth/>
            </form>

            <div className="flex gap-2 mt-5" >

                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className="text-purple-800 hover:underline">Sign in</span>
                </Link>
                
            </div>

            {error && <p className="text-red-900 mt-5">{error}</p>}

        </div>
    )
    }

export default SignUp
