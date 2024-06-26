import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../fireBase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 8000000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });

    const [imageUploadError, setImageUploadError] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const {currentUser} = useSelector(state => state.user)

    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listingId = params.listingId;
                const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/backend/listing/get/${listingId}`);
                const data = await res.json();
                
                if (data.success === false) {
                    setError(data.message);
                } else {
                    setFormData(data);
                }
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchListing();
    }, [params.listingId]);
    

    const handleImageUpload = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 8) {
            setUploading(true);
            setImageUploadError(false);

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises)
                .then((urls) => {
                    setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch(() => {
                    setImageUploadError('Image upload failed (2mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('7 images max per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            ); 
        });
    };

    const handleRemoveImage = (index) => {

        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });

    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }
    
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }
    
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {

            if(formData.imageUrls.length < 1) return setError('You must upload more than one image');

            if(+ formData.regularPrice < + formData.discountPrice) return setError('DiscountPrice must be Lower than Regular Price')

            setLoading(true);
            setError(false);
    
            const res = await fetch(`${import.meta.env.VITE_ENVIRONMENT}/backend/listing/edit/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
    
            const data = await res.json();
    
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            } 
            
            navigate(`/listing/${data._id}`)

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    

    return (
        <div className="p-3 max-w-4xl mx-auto">

            <h1 className="text-3xl font-semibold text-center my-7"> Edit Listing</h1>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">

                <div className="flex flex-col space-y-4 flex-1">

                    <input
                        onChange={handleChange}
                        value={formData.name}
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength="50"
                        minLength="4"
                        required
                    />

                    <textarea
                        onChange={handleChange}
                        value={formData.description}
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="description"
                        required
                    />

                    <input
                        onChange={handleChange}
                        value={formData.address}
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address"
                        required
                    />

                    <div className="options flex gap-5 flex-wrap">

                        <div className="flex space-x-2">

                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>

                        </div>

                        <div className="flex space-x-2">

                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.parking}
                            />

                            <span>Parking Spot</span>

                        </div>

                        <div className="flex space-x-2">

                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>

                        </div>

                        <div className="flex space-x-2">

                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />

                            <span>Sell</span>

                        </div>
                        <div className="flex space-x-2">

                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.offer}
                            />

                            <span>Offer</span>

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-6">

                        <div className="flex items-center space-x-2">

                            <input
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="50"
                                className="p-3 border rounded-lg"
                                required
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />

                            <p>Bedroom</p>

                        </div>

                        <div className="flex items-center space-x-2">

                            <input
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="50"
                                className="p-3 border rounded-lg"
                                required
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />

                            <p>Bathroom</p>

                        </div>

                        <div className="flex items-center space-x-2">

                            <input
                                type="number"
                                id="regularPrice"
                                min="800000"
                                max="100000000"
                                className="p-3 border rounded-lg"
                                required
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />

                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs">(#/ Month)</span>
                            </div>

                        </div>
                        {formData.offer && (                        <div className="flex items-center space-x-2">

                        <input
                            type="number"
                            id="discountPrice"
                            min="0"
                            max="100000000"
                            className="p-3 border rounded-lg"
                            required
                            onChange={handleChange}
                            value={formData.discountPrice}
                        />

                        <div className="flex flex-col items-center">
                            <p>Discounted Price</p>
                            <span className="text-xs">(#/ Month)</span>
                        </div>

                        </div>
                        ) }

                    </div>

                </div>

                <div className="flex flex-col flex-1 gap-4">

                    <p className="font-semibold">
                        Images:<span className="font-normal ml-2">Cover Image</span>
                    </p>

                    <div className="flex space-x-4">

                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            type="file"
                            id="images"
                            className="p-3 border-slate-200 w-full"
                            accept="image/*"
                            multiple
                        />

                        <button
                            disabled={uploading}
                            onClick={handleImageUpload}
                            type="button"
                            className="text-white bg-purple-600 border-green-600 rounded-sm uppercase hover:shadow-lg disabled:opacity-80 p-3 "
                        >
                            {uploading ? 'Uploading...' : 'Upload'}

                        </button>

                    </div>

                    <p className="text-red-700">{imageUploadError && imageUploadError}</p>

                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (

                            <div key={index} className="flex justify-between p-3 border items-center">

                                <img src={url} alt="listing image" className="w-[80px] h-[60px] object-cover rounded-sm" />

                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    type="button"
                                    className="text-red-700 p-3 rounded-lg uppercase hover:opacity-70"
                                >
                                    Delete
                                </button>

                            </div>
                        ) 
                        )}

                    <button disabled={loading || uploading} className="p-3 bg-slate-400 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 ">{loading ? 'editing...' : 'edit listing'}</button>

                    {error && <p className="text-red-700">{error}</p> }
                </div>
            </form>
        </div>
    );
};

export default EditListing;
