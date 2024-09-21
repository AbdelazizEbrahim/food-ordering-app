'use client'

import UserTabs from "../components/layout/userTabs"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useProfile } from "../components/useProfile";
import toast from "react-hot-toast";


export default function CategoriesPage (){
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminInfoLoading, setAdminInfoLoading ] = useState(true);
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);

    const session = useSession();

    const [CategoryName, setCategoryName] = useState('')
    const {loading: profileLoading, data:profileData} = useProfile();


    useEffect(() => {
        fetchCategory();
    }, [])

    // function fetchCategory() {
    //     fetch('/api/category').then(res =>{ res.json().then (categories => {
    //         console.log("categories: ", categories)
    //         setCategories(categories);
    //       });
    //     });
    // }

    function fetchCategory() {
        fetch('/api/category')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(categories => {
                console.log("categories: ", categories);
                setCategories(categories);
            })
            .catch(error => {
                console.error("Error fetching categories: ", error);
            });
    }    

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        console.log("new name: ", CategoryName);
        
        const data = {
            name: CategoryName,
            ...(editCategory && { _id: editCategory._id }) // Use spread operator for conditional properties
        };
    
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/category', {
                method: editCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // Send data directly
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log("response: ", response);
                console.log("data: ", responseData);
                fetchCategory(); 
                setCategoryName(''); 
                setEditCategory(null);
                resolve();
            } else {
                reject();
            }
        });
    
        await toast.promise(creationPromise, {
            loading: "Processing category ...",
            success: editCategory ? 'Category Updated' : 'Category Created',
            error: "Failed to process category",
        });
    }
    
    
    // if(profileLoading){
    //     return 'Loading admin info ...'
    // }
    // if(!profileData.admin){
    //     return 'Not an admin'
    // }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label> 
                            {editCategory ? 'Update Category' : 'New Categories Name'}
                            {editCategory && (
                                <> : <b>{editCategory.name}</b> </>
                            )}
                        </label>
                        <input 
                          type="text"
                          placeholder="Category Name"
                          value={CategoryName}
                          onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button 
                            type="submit" className="border border-primary">
                            {editCategory? "Update": "Create"}
                            </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500"> Edit Category: </h2>
                {categories.length > 0 && categories.map(c => (
                    // eslint-disable-next-line react/jsx-key
                    <button 
                        onClick={() => {
                            setEditCategory(c);
                            setCategoryName(c.name);
                        }} 
                        className="rounded-xl p-2 px-4 
                        flex gap-1 cursor-pointer mb-1">
                    <span>{c.name}</span>
                    </button>
                ))}
            </div>

        </section>
    )
}


