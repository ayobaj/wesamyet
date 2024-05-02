import { Link } from "react-router-dom";
import home from '../assets/home.jpeg';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import ListingCard from '../components/ListingCard';
import { FaArrowDown } from "react-icons/fa";





const Home = () => {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    SwiperCore.use([Navigation])

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/backend/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const res = await fetch('/backend/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/backend/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []); 

    console.log(saleListings);

    return (
        <div >
            {/* top */}
            <div className="flex flex-col gap-6 p-28 px-3 h-screen" style={{ backgroundImage: `url(${home})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                <h1 className="text-white font-bold text-3xl lg:text-6xl lg:mx-auto">
                    Discover Your Dream <br/>
                    <span className="text-orange-400 lg:ml-[70px]">Property</span> Today!
                </h1>
                <div className=" text-xs text-white sm:text-sm lg:mx-auto ">
                    Wesamyet is the best property site to acquire your dream property.
                    <br/>
                    <span className="lg:ml-[70px]">We have the property that will meet needs</span>
                </div>
                <Link className="lg:mx-auto p-3 rounded-lg w-fit text-xs sm:text-sm text-white font-bold hover:shadow-lg hover:bg-orange-300 bg-orange-400 " to={"/search"}>
                    Explore dream property
                </Link>
                <div className="self-center text-[50px] mt-[50px]">
                    <FaArrowDown className="text-white "/>
                </div>
            </div>


            {/* swiper */}

            <Swiper navigation>
                {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
                    <SwiperSlide key={listing._id}>
                        <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover", height: "500px" }}></div>
                    </SwiperSlide>
                ))}
            </Swiper>

        
            {/* listing */}

            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                    {
                        offerListings && offerListings.length > 0 && (
                            <div className="">
                                <div className="my-3">
                                    <h2 className="text-2xl font-semibold text-blue-700 ">Recent Offers</h2>
                                    <Link className="text-sm hover:underline  " to={"/search?offer=true"}>
                                        Discover more offers...
                                    </Link>
                                </div>

                                <div className="flex flex-wrap ml-12 gap-4 lg:ml-1">

                                    {
                                        offerListings.map((listing) => (
                                            <ListingCard listing={listing} key={listing._id}/>
                                        ))
                                    }

                                </div>
                            </div>
                        )
                    }
                    {
                        rentListings && rentListings.length > 0 && (
                            <div className="">
                                <div className="my-3">
                                    <h2 className="text-2xl font-semibold text-blue-700 ">Recent rent offers</h2>
                                    <Link className="text-sm hover:underline  " to={"/search?type=rent"}>
                                        Discover more rent offers...
                                    </Link>
                                </div>

                                <div className="flex flex-wrap ml-12 gap-4 lg:ml-1">

                                    {
                                        rentListings.map((listing) => (
                                            <ListingCard listing={listing} key={listing._id}/>
                                        ))
                                    }

                                </div>
                            </div>
                        )
                    }

                    {
                        saleListings && saleListings.length > 0 && (
                            <div className="">
                                <div className="my-3">
                                    <h2 className="text-2xl font-semibold text-blue-700 ">Recent sale Offers</h2>
                                    <Link className="text-sm hover:underline  " to={"/search?type=sale"}>
                                        Discover more sale offers...
                                    </Link>
                                </div>

                                <div className="flex flex-wrap ml-12 gap-4 lg:ml-1 ">

                                    {
                                        saleListings.map((listing) => (
                                            <ListingCard listing={listing} key={listing._id}/>
                                        ))
                                    }

                                </div>
                            </div>
                        )
                    }
            </div>
        </div>
    );
};

export default Home;
