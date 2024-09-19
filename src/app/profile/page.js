'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '@/libs/firebase';
import UserTabs from '../components/layout/userTabs';
import toast from "react-hot-toast";


export default function ProfilePage() {
    const { data: session, status } = useSession();    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState(null);
    const [profileUpdated, setProfileUpdated] = useState(false); 
    const [phone, setPhone ] = useState('');
    const [streetAdress, setStreetAdress ] = useState('');
    const [postalCode, setPostalCode ] = useState('');
    const [city, setCity ] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState('');




    // let imageUrl = " ";

 useEffect(() => {
    if (status === 'authenticated') {
        console.log("Setting image URL and name");
        setUserName(session.user.name);
        setImageUrl(session.user.image);

        fetch('/api/profile')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); 
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); 
                    console.log("user data: ", data);
                    setPhone(data.phone);
                    setStreetAdress(data.streetAdress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
}, [status, session, profileUpdated]);

    // useEffect(() => {
    //     if (profileUpdated) {
    //         if (status === 'authenticated') {
    //             setUserName(session.user.name);
    //             setImageUrl(session.user.image); 
    //         }            
    //         setProfileUpdated(false); 
    //     }
    // }, [profileUpdated, session.user.image, session.user.name, status]);

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        console.log('file: ', file);
        if (file) {
            console.log('File selected:', file.name);
            setImage(file);
            handleUpload(file);
        } else {
            console.log('No file selected');
        }
    }

    async function handleUpload(file) {
        // Create a promise to track the upload process
        const uploadPromise = new Promise(async (resolve, reject) => {
            console.log("Step 1: Image received: ", file);
    
            if (!file) {
                console.log("No file provided for upload.");
                reject(new Error("No file provided"));
                return;
            }
    
            try {
                console.log("Step 2: Preparing Firebase reference...");
                const fileRef = ref(storage, `images/${file.name}`);
    
                console.log("Step 3: Starting file upload...");
                const uploadTask = await uploadBytesResumable(fileRef, file);
    
                console.log("Step 4: File uploaded successfully. Fetching download URL...");
                const downloadUrl = await getDownloadURL(uploadTask.ref);
    
                console.log("Step 5: Download URL received: ", downloadUrl);
                setImageUrl(downloadUrl); // Update the image URL in the state
    
                // Call handleProfileUpdate automatically after getting the download URL
                console.log("Step 6: Automatically updating profile after image upload...");
                await handleProfileUpdate(null, downloadUrl);
    
                // Resolve the promise since everything succeeded
                resolve();
            } catch (error) {
                console.error("Error during file upload: ", error);
                reject(error); // Reject the promise if an error occurs
            }
        });
    
        // Handle the promise with a toast notification
        await toast.promise(uploadPromise, {
            loading: "Uploading ...",
            success: "Upload completed!",
            error: "Upload error"
        });
    }
    

async function handleProfileUpdate(ev, uploadUrl) {
    if (ev) ev.preventDefault();

    let imageUrlToUpdate = uploadUrl || imageUrl;

    console.log('Updating profile with name:', userName, 'and image URL:', imageUrlToUpdate);

    const savingPromise = new Promise (async (resolve, reject) => {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: userName, 
                image: imageUrlToUpdate,
                phone,
                streetAdress,
                postalCode,
                city,
                country
             }),
        }); 
        setProfileUpdated(true);
        if (response.ok) {
            resolve();
        } else {
            reject();
        }
    } )
    await toast.promise(savingPromise, {
        loading: 'Saving...',
        success: 'Profile saved!',
        error: 'Error',
      });   
      
}

    if (status === 'loading') {
        return 'Loading ... ';
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    const userImage = session.user.image || '/user.png'; 

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative">
                            <Image
                                className="rounded-lg w-full h-full mb-1"
                                src={userImage}
                                width={300}
                                height={300}
                                alt="avatar"
                            />
                            <label>
                                <input
                                    type='file'
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <span className="block border border-gray-300 rounded-lg px-8 text-center cursor-pointer">
                                    Edit
                                </span>
                            </label>
                        </div>
                    </div>
                    <form onSubmit={handleProfileUpdate} className="grow">
                        <label>First and last name</label>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            disabled
                            value={session.user.email}
                        />
                         <label>Phone</label>
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                        />
                         <label>Street Address</label>
                        <input
                            type="text"
                            placeholder="Street address"
                            value={streetAdress}
                            onChange={ev => setStreetAdress(ev.target.value)}
                        />
                        <div className='flex gap-2'>
                          <div>
                            <label>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Postal code"
                                value={postalCode}
                                onChange={ev => setPostalCode(ev.target.value)}
                            /> 
                          </div>
                          <div>
                            <label>City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={ev => setCity(ev.target.value)}
                                />
                          </div>
                        </div>
                        <label>Country</label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
