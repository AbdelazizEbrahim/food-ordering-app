'use client'

import Image from "next/image";
import MenuItem from "../menu/menuItem";
import SectionHeaders from "./sectionheaders";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1200, // Customize animation duration (in ms)
            once: true,     // Trigger animation only once
        });

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

    return (
        <section>
            <div className='text-center mb-4' data-aos="fade-up" data-aos-delay="300">
                <SectionHeaders 
                  subHeader='Check out'
                  mainHeader='Best Sellers'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' data-aos="fade-up" data-aos-delay="400">
              {bestSellers?.length > 0 && bestSellers.map((item, index) => (
                    <div key={item._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                        <MenuItem {...item} />
                    </div>
                ))}
            </div>
        </section>
    );
}
