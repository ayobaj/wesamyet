import { Link } from 'react-router-dom';
import { FaMapLocation } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { FaNairaSign } from 'react-icons/fa6';



export default function ListingCard({ listing }) {
return (
<div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[280px] sm:w-[260px] mx-auto'>
    <Link to={`/listing/${listing._id}`}>
    <img
        src={
        listing.imageUrls[0]
        }
        alt='listing cover'
        className='h-[220px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
    />
    <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>
        {listing.name}
        </p>
        <div className='flex items-center gap-1'>
        <FaMapLocation className='h-4 w-4 text-green-700' />
        <p className='text-sm text-gray-600 truncate w-full'>
            {listing.address}
        </p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2 truncate'>
        {listing.description}
        </p>
        <p className='text-slate-500 mt-2 font-semibold flex items-center '>
        <FaNairaSign/>
        {listing.offer
            ? listing.discountPrice.toLocaleString('en-NG')
            : listing.regularPrice.toLocaleString('en-NG')}
        {listing.type === 'rent' && ' / month'}
        </p>
        <div className='text-slate-700 flex gap-4'>
        <div className='font-bold text-xs'>
            {listing.bedrooms > 1
            ? `${listing.bedrooms} beds `
            : `${listing.bedrooms} bed `}
        </div>
        <div className='font-bold text-xs'>
            {listing.bathrooms > 1
            ? `${listing.bathrooms} baths `
            : `${listing.bathrooms} bath `}
        </div>
        </div>
    </div>
    </Link>
</div>
);
}

ListingCard.propTypes = {
    listing: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        offer: PropTypes.bool.isRequired,
        regularPrice: PropTypes.number.isRequired,
        discountPrice: PropTypes.number.isRequired,
        imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        address: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bedrooms: PropTypes.number.isRequired,
        bathrooms: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};
