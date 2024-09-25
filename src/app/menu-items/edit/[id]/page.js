'use client'


import { useProfile } from "@/app/components/useProfile";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import UserTabs from "@/app/components/layout/userTabs";
import toast from 'react-hot-toast';
import Link from "next/link";
import Left from "@/app/components/icons/left";
import { useParams } from "next/navigation";
import MenuItemsForm from "@/app/components/layout/menuItemForm";
import DeleteButton from "@/app/components/DeleteButton";

export default function EditMenuPage(){
    const {id} = useParams();
    const router = useRouter();
    const {loading, data} = useProfile();
    const [load, setLoad] = useState(false);
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(items => {
            const item = items?.find(i => i._id === id);
            setMenuItem(item);
          });
        })
      }, []);
    
    

    // if (loading) {
    //     return 'Loading users data ....';
    // }

    // function handleFileChange(ev) {
    //     const file = ev.target.files[0];
    //     console.log('File selected: ', file);
    //     if (file) {
    //         setImage(file); 
    //         handleUpload(file); 
    //     } else {
    //         console.log('No file selected');
    //     }
    // }

    // async function handleUpload(file) {
    //     setLoad(true);
    //     const uploadPromise = new Promise(async (resolve, reject) => {
    //         console.log("Image received: ", file);

    //         if (!file) {
    //             console.log("No file provided for upload.");
    //             reject(new Error("No file provided"));
    //             return;
    //         }

    //         try {
    //             const fileRef = ref(storage, `images/${file.name}`);
    //             const uploadTask = await uploadBytesResumable(fileRef, file);
    //             const downloadUrl = await getDownloadURL(uploadTask.ref);

    //             console.log("Download URL received: ", downloadUrl);

    //             // await updateMenuItem(downloadUrl);
    //             setImageUrl(downloadUrl);
    //             setLoad(false);
    //             resolve(); // Resolve the promise
    //         } catch (error) {
    //             console.error("Error during file upload: ", error);
    //             reject(error);
    //         }
    //     });

    //     await toast.promise(uploadPromise, {
    //         loading: "Uploading ...",
    //         success: "Upload completed!",
    //         error: "Upload error"
    //     });
    // }

    async function handleDeleteClick() {    
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
    
            if (res.ok) {
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
    
        router.push('/menu-items'); 
    }

    async function handleSubmit(event, data) {
        event.preventDefault();
        setLoad(true);    
        data = { ...data, _id: id };
        
        console.log('Data to be sent to the API: ', data);
        
        try {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
    
            setLoad(false);
    
            if (response.ok) {
                const result = await response.json();
                console.log('Menu item saved successfully: ', result);
                
                toast.success('Menu item saved!');
    
                router.push('/menu-items'); 
            } else {
                console.log('Error saving menu item: ', response.statusText);
                toast.error('Error saving menu item');
            }
        } catch (error) {
            console.error('Unexpected error: ', error);
            toast.error('Unexpected error');
            setLoad(false);
        }
    
    }
    

    // const userImage = imageUrl || '/user.png'; // Show the uploaded image or a placeholder

    if(loading){
        return 'Loading menu item edit form ....'
    }
    if(!data.admin){
        return 'You are not an admin'
    }

    return (
        <section className="mt-8">
        <UserTabs isAdmin={true} />
        <div className="max-w-2xl mx-auto mt-8">
            <Link href={'/menu-items'} className="button">
               <Left/>
               <span>Show all menu items</span>
            </Link>
        </div>
        <MenuItemsForm 
            onSubmit={handleSubmit} 
            menuItem={menuItem} 
        />
         <div className="max-w-md mx-auto mt-2">
            <div className="max-w-xs ml-auto pl-4">
            <DeleteButton
                label="Delete this menu item"
                onDelete={handleDeleteClick}
            />
            </div>
        </div>
    </section>
    )
}