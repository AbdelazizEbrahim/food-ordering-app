'use client'

import Image from "next/image"
import MenuItem from "../menu/menuItem"
import SectionHeaders from "./sectionheaders"
import { useState, useEffect } from "react"

export default function HomeMenu(){
    const [bestSellers, setBestSellers] = useState([])
    useEffect(() => {
        fetch('/api/menu-items')
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to fetch menu items');
            }
            return res.json();
          })
          .then(MenuItems => {
            setBestSellers(MenuItems.slice(-3)); // Get the last 3 items
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      }, []);

      console.log("best sellers: ", bestSellers);
      

    return(
        <section className=''>
            <div className='absolute left-0 ring-0 w-full justify-center'>
                <div className='absolute left-0 -top-[50px] text-left -z-10'>
                    <Image src={'/salad.jpg'} width={109} height={189} alt={'sallad'}/>
                </div>
                <div className='absolute -top-[70px] right-0 -z-a0'>
                    <Image src={'/salad.jpg'} alt={"sallad"} width={109} height={189}/>
                </div>
            </div>

            <div className='text-center mb-4'>
            <SectionHeaders 
            subHeader={'Check out'}
            mainHeader={'Best Sellers'}
            />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item}/>
                ))}
            </div>

        </section>
    )
}