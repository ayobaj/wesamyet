import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import 'swiper/css/bundle';
import {Navigation} from "swiper/modules";
import { FaBed, FaMapLocationDot } from "react-icons/fa6";
import { FaNairaSign } from "react-icons/fa6";
import { MdOutlineBathroom } from "react-icons/md";
import { IoCarSportSharp } from "react-icons/io5";
import { MdChair } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";










const Listing = () => {

    SwiperCore.use([Navigation]);

    const [listing, setListing] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const params = useParams();

    const {currentUser} = useSelector((state) => state.user)

    const[contact, setContact] = useState(false);

    useEffect(()=>{

        const fetchListing = async () => {

            try{

                setLoading(true);

                const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/listing/get/${params.listingId}`);

                const data = await res.json();

                if(data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setListing(data);
                setLoading(false);
                setError(false);

            } catch (error) {

                setError(true);
                setLoading(false);

            }
            
        };

        fetchListing()
    }, [params.listingId])


return (
    <div className="">

        {loading && <p className="text-center my-7 text-3xl">Loading...</p>}

        {error && <p className="text-center my-7 text-3xl text-red-600">Error!!!</p>}

        {listing && !loading && !error &&  <>
            
            <Swiper navigation>
                {
                    listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div className="h-[450px] w-screen" style={{background: `url(${url})`, backgroundSize: 'cover',  backgroundPosition: 'center', }} ></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="flex flex-col max-w-4xl mx-auto p-3 my-6 gap-4">
                <p className='text-2xl font-semibold flex items-center'>
                    {listing.name} - <FaNairaSign/>{''}
                    {listing.offer
                    ? listing.discountPrice.toLocaleString('en-NG')
                    : listing.regularPrice.toLocaleString('en-NG')}
                    {listing.type === 'rent' && ' / month'}
                </p>

                <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                <FaMapLocationDot className='text-green-700 text-xl' />
                {listing.address}
                </p>

                <div className='flex gap-4'>

                <p className='bg-red-900 w-full max-w-[200px] text-white text-center py-4  px-4 rounded-md'>
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>

                {listing.offer && (
                    <p className=' bg-green-900 w-full max-w-[200px] text-white flex rounded-md items-center pl-10'>
                        <FaNairaSign className=""/> {' '}
                        {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-NG')} OFF
                    </p>
                )}


            </div>

                <p className="text-slate-800"> <span className="font-semibold text-black"> Description - {''} </span> {listing.description}</p>

                <ul className="flex items-center space-x-3 sm:space-x-6 font-semibold text-sm text-blue-700 flex-wrap">
                    <li className=" flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="text-lg"/>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                    </li>

                    <li className=" flex items-center gap-1 whitespace-nowrap">
                    <MdOutlineBathroom className="text-lg"/>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
                    </li>

                    <li className=" flex items-center gap-1 whitespace-nowrap">
                    <IoCarSportSharp className="text-lg"/>
                    {listing.parking === true ? 'Parking Spot' : 'No Parking Spot'}
                    </li>

                    <li className=" flex items-center gap-1 whitespace-nowrap">
                    <MdChair className="text-lg"/>
                    {listing.furnished ? 'Furnished' : 'Not Furnished'}
                    </li>

                </ul>



                {currentUser &&  listing.userRef !== currentUser._id && !contact &&  (

                    <button onClick={()=> setContact(true)} className=" gap-5 justify-center uppercase bg-green-700 flex items-center text-white rounded-lg p-3 hover:shadow-md">
                        contact Owner <IoIosSend/>
                    </button>
                )}


                {contact && <Contact listing={listing}/> }


            </div>


        </>}

    </div>
)
}

export default Listing;
