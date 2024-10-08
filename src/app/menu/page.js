/* eslint-disable react/jsx-key */
'use client'

import SectionHeaders from "../../components/layout/sectionheaders"
import { useEffect, useState } from "react"
import MenuItem from "../../components/menu/menuItem";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/layout/footer";

export default function MenuPage(){
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1200, 
            once: true,    
          });

        fetch('/api/category').then(res => {
            res.json().then(categories => setCategories(categories))
        });

        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, []);

    return(
       <>
            <section className="mt-8">
                {categories?.length > 0 && categories.map(c => (
                    <div key={c._id}>
                        <div className="text-center" data-aos="fade-right" data-aos-delay='200'>
                            <SectionHeaders mainHeader={c.name}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-12 "data-aos='fade-right' data-aos-delay='500'>
                            {menuItems?.filter(item => item.category === c._id).map(item => (
                                <MenuItem  key={item._id} {...item}/>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        <Footer/>
       </>
    )

}



