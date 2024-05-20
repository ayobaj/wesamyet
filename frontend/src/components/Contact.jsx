import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/backend/user/${listing.userRef}`);
                const data = await res.json();
                setOwner(data);
            } catch(error) {
                console.log(error);
            }
        };
    
        fetchOwner(); 
    }, [listing.userRef]);

    return (
        <div>
            {owner && (
                <div className="flex flex-col gap-2 ">
                    <p>Contact <span className="font-semibold">{owner.username}</span> for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
                    <textarea 
                        value={message} 
                        onChange={onChange} 
                        name="message" 
                        id="message" 
                        rows="2"
                        className="border p-3 rounded-lg w-full"
                        placeholder="Enter Message Here...."
                    />

                    <Link to={`mailto: ${owner.email} ? subject = Regarding ${listing.name}&body=${message}`}
                    className="bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:shadow-md"> Send Message
                    </Link>

                    
                </div>
            )}
        </div>
    );
};




Contact.propTypes = {
    listing: PropTypes.shape({
        userRef: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default Contact;
