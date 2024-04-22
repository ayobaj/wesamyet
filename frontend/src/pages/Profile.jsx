import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'
import { app } from "../fireBase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart } from "../Redux/User/userSlice";


    const Profile = () => {

        const fileReference = useRef(null) 

        const {currentUser, loading, error} = useSelector((state) => state.user)

        const [file, setFile] = useState(undefined)

        const [filePercent, setFilePercent] = useState(0);

        const [fileUploadError, setFileUploadError] = useState(false);

        const [formData, setFormData] = useState({});

        const [updateSuccess, setUpdateSuccess] = useState(false)

        const dispatch = useDispatch()

        console.log(filePercent)

        console.log(fileUploadError)


        


        useEffect(()=>{
            if(file) {
                handleFileUpload(file)
            }
        }, [file]);

        const handleFileUpload = (file) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercent(Math.round(progress));
            }, (error) => {
                setFileUploadError(true);
                console.log(error);
            }, () => {
                // This callback is called when the upload is complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
        
        const handleChange = (e) => {
            setFormData({...formData, [e.target.id]: e.target.value})
        }

        //Submission of form data to the backend

        const handleSubmit = async (e) => {

            e.preventDefault();

            try{
                dispatch(updateUserStart());

                const res = await fetch(`/backend/user/update/${currentUser._id}`,{

                    method: 'POST',

                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json()

                if(data.success === false) {
                    dispatch(updateUserFailure(data.message))
                }

                dispatch(updateUserSuccess(data));

                setUpdateSuccess(true)

            }catch(error){
                dispatch(updateUserFailure(error.message))
            }
        }

        // function to handle user delete
        const handleDelete = async () => {
            try{
                dispatch(deleteUserStart());

                const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
                    method: 'DELETE',
                });

                const data = await res.json();

                if(data.success === false) {
                    dispatch(deleteUserFailure(data.message));

                    return;
                }

                dispatch(deleteUserSuccess(data));

            } catch(error) {
                dispatch(deleteUserFailure(error.message))
            }
        }

        //function to handle Signout

        const handleSignOut = async () => {
            try {
                dispatch(signOutStart());

                const res = await fetch('/backend/authenticate/signout');
        
                const data = await res.json();
        
                if (data.success === false) {
                    dispatch(deleteUserFailure(data.message));
                    return;
                }
                dispatch(deleteUserSuccess(data))
            } catch (error) {
                dispatch(deleteUserFailure(error.message));
            }
        };
        
    return (
        <div className="max-w-lg mx-auto">

            <h1 className="text-3xl font-semibold text-center my-6"></h1>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

                <input type="file" ref={fileReference} hidden accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>

                <img onClick={()=>fileReference.current.click()} className="self-center mt-2 rounded-full h-24 w-24 object-cover cursor-pointer" 
                src={formData.avatar || currentUser.avatar } alt="profile"/>

                <p className=" self-center text-sm">
                    {fileUploadError ? (
                        <span className="text-red-700">Image Upload Error (image size less than 2mb)</span>
                    ) : filePercent > 0 && filePercent < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
                    ) : filePercent === 100 ? (
                        <span className="text-green-700">Image Upload Successful !</span>
                    ) : null}
                </p>

                <input onChange={handleChange} defaultValue = {currentUser.username} placeholder="username" type="text" className="border p-3 rounded-lg focus:outline-none" id="username"/>

                <input onChange={handleChange} defaultValue = {currentUser.email} placeholder="email" type="email" className="border p-3 rounded-lg focus:outline-none" id="email"/>
                
                <input onChange={handleChange} defaultValue = {currentUser.password} placeholder="password" type="password" className="border p-3 rounded-lg focus:outline-none " id="password"/>

                <button className="bg-purple-400 text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-86">{loading ? 'loading' : 'update'}</button>

            </form>

            <div className=" flex justify-between mt-5">
                <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
                <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
            </div>

            <p className="mt-5 text-red-700">{error ? error : ''}</p>

            <p className="mt-5 text-red-700">{ updateSuccess ? ' Update Successful !' : ''}</p>
        </div>
    )
    }

export default Profile
