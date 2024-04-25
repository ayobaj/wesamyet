import { Link, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import {useSelector} from 'react-redux';
import { useEffect, useState } from "react";

const NavBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const {currentUser} = useSelector(state => state.user);

    const navigate = useNavigate();

    

    const handleSubmit = (e) => {

        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);

        urlParams.set('searchTerm', searchTerm);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const searchTermFromUrl = urlParams.get('searchTerm');

        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    

    return (
    <div className=" shadow-md ">

        <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">

            <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex-wrap">
                <span className="text-orange-500">Wesam</span>
                <span className="text-green-700">Yet</span>
            </h1>
            </Link>

            <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-md flex items-center">

                <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder="Search..."/>
                
                <button>
                <IoSearchSharp className="text-black"/>
                </button>

            </form>

            <ul className=" flex space-x-4">

                <Link to="/">
                <li className="hidden sm:inline text-orange-400 font-bold hover:bg-orange-400 hover:text-white border-2 p-3 rounded-2xl ">Home</li>
                </Link>

                <Link to="/about">
                <li className="hidden sm:inline text-orange-400 font-bold hover:bg-orange-400 hover:text-white border-2 p-3 rounded-2xl">About</li>
                </Link>

                <Link to="/profile">
                    {currentUser ? (<img className="rounded-full w-7  object-coverh-7" src={currentUser.avatar} alt="profile"/>) : (<li className=" sm:inline text-purple-400 font-bold hover:underline">{''}Sign in</li>)}
                </Link>

            </ul>

        </div>

    </div>
    )
}

export default NavBar
