import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../fireBase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/authenticate/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(
                    {username: result.user.displayName, 
                    email: result.user.email,
                    photo: result.user.photoURL})
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log('Google Sign in failed!', error);
        }
    };


    return (
        <button onClick={handleGoogleClick} type="button" className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-85">
            Continue with Google
        </button>
    );
};

export default OAuth;
