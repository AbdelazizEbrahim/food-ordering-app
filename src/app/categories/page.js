'use client'

import UserTabs from "../components/layout/userTabs"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useProfile } from "../components/useProfile";


export default function CategoriesPage (){
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminInfoLoading, setAdminInfoLoading ] = useState(true);

    const session = useSession();

    const [newCategoryName, setNewCategoryName] = useState('')
    const {loading: profileLoading, data:profileData} = useProfile();

    function handleNewCategorySubmit(ev){
        ev.preventDefault();
        fetch('/api/categories', {
            method: "POST",
            
            body: JSON.stringify({name: newCategoryName});
        })
    }
    
    if(profileLoading){
        return 'Loading admin info ...'
    }
    if(!profileData.admin){
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label> New Categories Name</label>
                        <input 
                          type="text"
                          placeholder="Category Name"
                          onchange={ev => setNewCategoryName(ev.target.value)}
                          value={newCategoryName}
                        />
                    </div>
                    <div className="pb-2">
                        <button type="submit" className="border border-primary">Create</button>
                    </div>
                </div>
            </form>
        </section>
    )
}


