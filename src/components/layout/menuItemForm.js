'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/libs/firebase';
import toast from 'react-hot-toast';
import MenuItemPriceProps from "./menuItemPriceProps";

export default function MenuItemsForm({ onSubmit, menuItem }) {
    console.log("menu item to updateeee: ", menuItem);
    
    const [image1, setImage] = useState(null);
    const [load, setLoad] = useState(false);
    const [image, setImage1] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [sizes, setSizes] = useState([]);
    const [ingridients, setIngridients] = useState([]);
    const [category, setCategory] = useState(menuItem?.category || ''); // Assign category from menuItem
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories
        fetch('/api/category').then(res => {
            res.json().then(categories => {
                setCategories(categories);
                console.log("Fetched categories:", categories); // Debug categories
            });
        });

        // Set menu item details if menuItem is provided
        if (menuItem) {
            setItemName(menuItem.itemName || '');
            setIngridients(menuItem?.ingridients || []);
            setSizes(menuItem?.sizes || []);
            setImage1(menuItem.image || '');
            setPrice(menuItem.price || '');
            setDescription(menuItem.description || '');
            
            // Ensure category ID is set correctly
            if (menuItem?.category) {
                setCategory(menuItem.category); // Assign category if it's not null
            } else {
                setCategory(''); // Reset category if it's null
            }
            console.log("Category ID from menuItem:", menuItem?.category); // Debug category ID
        }
    }, [menuItem]);

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        if (file) {
            setImage(file); 
            handleUpload(file); 
        }
    }

    async function handleUpload(file) {
        setLoad(true);
        const uploadPromise = new Promise(async (resolve, reject) => {
            try {
                const fileRef = ref(storage, `images/${file.name}`);
                const uploadTask = await uploadBytesResumable(fileRef, file);
                const downloadUrl = await getDownloadURL(uploadTask.ref);
                setImage1(downloadUrl);
                setLoad(false);
                resolve(); 
            } catch (error) {
                setLoad(false);
                reject(error);
            }
        });

        await toast.promise(uploadPromise, {
            loading: "Uploading ...",
            success: "Upload completed!",
            error: "Upload error"
        });
    }

    return (
        <form className="mt-8 max-w-2xl mx-auto" onSubmit={ev => {
            ev.preventDefault();
            console.log("Submitting category ID:", category); // Debug category before submission
            onSubmit(ev, {
                image, itemName, description, price, sizes, ingridients, category, // Pass category correctly
            });
        }}>
            <div className="grid md:flex gap-4 items-start">
                <div data-aos="fade-right"> {/* AOS animation */}
                    <div className="p-2 rounded-lg relative">
                        {image ? (
                            <Image
                                className="rounded-lg w-full h-full mb-1"
                                src={image}
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
                                disabled={load} // Disable the input when uploading
                            />
                            <span className={`block border border-gray-300 rounded-lg px-8 text-center cursor-pointer py-2 ${load ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                Edit Image
                            </span>
                        </label>
                    </div>
                </div>
                <div className="grow" data-aos="fade-left"> {/* AOS animation */}
                    <label>Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                        rows="3"    // Number of visible rows
                        cols="3"    // Number of visible columns
                    ></textarea>

                    <label>Category</label>
                    <select value={category} onChange={ev => {
                        setCategory(ev.target.value);
                        console.log("Selected category ID:", ev.target.value); // Log selected category
                    }}>
                        <option value="" disabled>Select a category</option>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <MenuItemPriceProps 
                        name={"Sizes"} 
                        addLabel={"Add item size"}
                        props={sizes} 
                        setProps={setSizes}
                    />
                    <MenuItemPriceProps 
                        name={"Ingridients"} 
                        addLabel={"Add ingredient"}  
                        props={ingridients} 
                        setProps={setIngridients}
                    />
                    <button
                        type="submit"
                        className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg ${load ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={load} // Disable the button when uploading or saving
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
