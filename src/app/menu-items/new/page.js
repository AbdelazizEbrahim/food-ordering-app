'use client'


import { useProfile } from "@/app/components/useProfile";
import { useState } from "react";
import Image from "next/image";
import UserTabs from "@/app/components/layout/userTabs";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/libs/firebase';
import toast from 'react-hot-toast';
import Link from "next/link";
import Left from "@/app/components/icons/left";

export default function NewMenuItem(){
    
    const {loading, data} = useProfile();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // To track the uploaded image URL
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [load, setLoad] = useState(false);
    const [price, setPrice] = useState('');
    const [menuItemId, setMenuItemId] = useState(''); // Track menu item ID for updating

    // Check if the profile is loading
    if (loading) {
        return 'Loading users data ....';
    }

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        console.log('File selected: ', file);
        if (file) {
            setImage(file); 
            handleUpload(file); 
        } else {
            console.log('No file selected');
        }
    }

    async function handleUpload(file) {
        setLoad(true);
        const uploadPromise = new Promise(async (resolve, reject) => {
            console.log("Image received: ", file);

            if (!file) {
                console.log("No file provided for upload.");
                reject(new Error("No file provided"));
                return;
            }

            try {
                const fileRef = ref(storage, `images/${file.name}`);
                const uploadTask = await uploadBytesResumable(fileRef, file);
                const downloadUrl = await getDownloadURL(uploadTask.ref);

                console.log("Download URL received: ", downloadUrl);

                // await updateMenuItem(downloadUrl);
                setImageUrl(downloadUrl);
                setLoad(false);
                resolve(); // Resolve the promise
            } catch (error) {
                console.error("Error during file upload: ", error);
                reject(error);
            }
        });

        await toast.promise(uploadPromise, {
            loading: "Uploading ...",
            success: "Upload completed!",
            error: "Upload error"
        });
    }

    async function handleSubmit(event) {
        setLoad(true);
        event.preventDefault();

        const image = imageUrl;
        const data = { itemName, description, price, image };

        console.log('data to inserted: ', data);

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            setLoad(false);
            if (response.ok) {
                const result = await response.json();
                setMenuItemId(result._id); 
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving menu item...',
            success: 'Menu item saved!',
            error: 'Error saving menu item'
        });

        setItemName('');
        setImageUrl('');
        setPrice('');
        setDescription('');
    }

    // const userImage = imageUrl || '/user.png'; // Show the uploaded image or a placeholder

    if(loading){
        return 'Loading User data ....'
    }
    if(!data.admin){
        return 'You are not an admin'
    }

    return (
        <section className="mt-8">
        <UserTabs isAdmin={true} />
        <div className="max-w-md mx-auto mt-8">
            <Link href={'/menu-items'} className="button">
               <Left/>
               <span>Show all menu items</span>
            </Link>
        </div>
        <form className="mt-8 max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="flex gap-4 items-start">
                <div>
                <div className="p-2 rounded-lg relative">
                {imageUrl ? (
                    <Image
                        className="rounded-lg w-full h-full mb-1"
                        src={imageUrl}
                        width={300}
                        height={300}
                        alt="avatar"
                    />
                ) : (
                    <div className="w-full h-full mb-1 flex items-center justify-center border border-gray-300 rounded-lg p-6 bg-gray-300">
                        <span className="text-gray-700">Insert Image</span>
                    </div>
                )}
                
                <label>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <span className="block border border-gray-300 rounded-lg px-8 text-center cursor-pointer py-2">
                        Upload Image
                    </span>
                </label>
            </div>

                </div>
                <div className="grow">
                    <label>Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <button
                        type="submit"
                        className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg ${load ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={load} // Disable the button if load is true
                    >
                        Save
                    </button>

                </div>
            </div>
        </form>
    </section>
    )
}



