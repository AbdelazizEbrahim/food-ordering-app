'use client';

import { useEffect, useState } from "react";
import { useProfile } from "../../components/useProfile";
import UserTabs from "../../components/layout/userTabs";
import Link from "next/link";
import Right from "../../components/icons/right";
import Image from "next/image";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const {loading, data} = useProfile();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Adjust the duration for animation
  }, []);

  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(menuItems => setMenuItems(menuItems))
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  if (loading) {
    return 'Loading Menu items list ....';
  }
  
  if (!data.admin) {
    return 'You are not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8" data-aos="fade-down">
        <Link 
          href={'/menu-items/new'} 
          className="button flex">
          Create new menu item 
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8" data-aos="fade-up">Edit Menu Item: </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link 
              key={item._id}
              className="rounded-lg p-4 bg-gray-200 flex flex-col items-center" 
              href={`/menu-items/edit/${item._id}`}
              data-aos="zoom-in" // AOS animation
            >
              <div className="flex justify-center mb-4">
                <Image 
                  className='rounded-md object-cover'
                  src={item.image} 
                  alt={item.itemName} 
                  width={150} 
                  height={150} 
                  style={{ width: '180px', height: '180px' }}
                />
              </div>

              <div className="text-center font-semibold">
                {item.itemName}
              </div>
              <div className="mt-2">
                <p className='text-gray-500 text-sm line-clamp-3'>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
