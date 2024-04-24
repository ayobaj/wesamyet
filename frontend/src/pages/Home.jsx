import { Link } from "react-router-dom";
import bgimg from '../assets/bgimg.jpg';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import ListingCard from '../components/ListingCard'




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
        <div className="bg-white h-screen md:object-cover" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
            {/* top */}
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl ">
                <h1 className="text-blue-700 font-bold text-3xl lg:text-6xl">
                    Discover Your Dream <br/>
                    <span className="text-orange-800">Property</span> Today!
                </h1>
                <div className=" text-xs sm:text-sm ">
                    Wesamyet is the best property site to acquire your dream property.
                    <br/>
                    We have property that will meet needs
                </div>
                <Link className="text-xs sm:text-sm text-blue-700 font-bold hover:underline " to={"/search"}>
                    Explore dream property....
                </Link>
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

                                <div className="flex flex-wrap gap-4 ">

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

                                <div className="flex flex-wrap gap-4 ">

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

                                <div className="flex flex-wrap gap-4 ">

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
