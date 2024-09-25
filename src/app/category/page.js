'use client'

import UserTabs from "../components/layout/userTabs"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useProfile } from "../components/useProfile";
import toast from "react-hot-toast";
import DeleteButton from "../components/DeleteButton";


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

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/category?_id='+_id, {
            method: 'DELETE',
          });
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        fetchCategory();
      }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        console.log("new name: ", CategoryName);
        
        const data = {
            name: CategoryName,
            ...(editCategory && { _id: editCategory._id }) 
        };
    
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/category', {
                method: editCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), 
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
    
    
    if(profileLoading){
        return 'Loading category information ...'
    }
    if(!profileData.admin){
        return 'You are Not an admin'
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
          <UserTabs isAdmin={true} />
          <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
              <div className="grow">
                <label>
                  {editCategory ? 'Update category' : 'New category name'}
                  {editCategory && (
                    <>: <b>{editCategory.name}</b></>
                  )}
                </label>
                <input type="text"
                       value={CategoryName}
                       onChange={ev => setCategoryName(ev.target.value)}
                />
              </div>
              <div className="pb-2 flex gap-2">
                <button className="border border-primary" type="submit">
                  {editCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditCategory(null);
                    setCategoryName('');
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div>
            <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
            {categories?.length > 0 && categories.map(c => (
              <div
                key={c._id}
                className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                <div className="grow">
                  {c.name}
                </div>
                <div className="flex gap-1">
                  <button type="button"
                          onClick={() => {
                            setEditCategory(c);
                            setCategoryName(c.name);
                          }}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    label="Delete"
                    onDelete={() => handleDeleteClick(c._id)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      );
}

