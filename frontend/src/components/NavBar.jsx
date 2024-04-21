import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import {useSelector} from 'react-redux';

const NavBar = () => {

    const {currentUser} = useSelector(state => state.user)

    return (
    <div className="bg-slate-200 shadow-md ">

        <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">

            <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex-wrap">
                <span className="text-purple-800">Wesam</span>
                <span className="text-purple-400">Yet</span>
            </h1>
            </Link>

            <form className="bg-slate-100 p-3 rounded-md flex items-center">

                <input type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder="Search..."/>
                <IoSearchSharp className="text-black"/>

            </form>

            <ul className=" flex space-x-4">

                <Link to="/">
                <li className="hidden sm:inline text-purple-400 font-bold hover:underline">Home</li>
                </Link>

                <Link to="/about">
                <li className="hidden sm:inline text-purple-400 font-bold hover:underline">About</li>
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
