'use client'

import Hero from "../components/layout/hero";
import HomeMenu from "../components/layout/homeMenu";
import SectionHeaders from "../components/layout/sectionheaders";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/layout/footer";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true,    
    });
  }, []);

  return (
    <div className="overflow-y-hidden">
      <Hero />
      <HomeMenu />

      <section className="text-center my-16" id="about" data-aos="fade-up">
        <SectionHeaders
          subHeader="Our Story"
          mainHeader="About"
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Reprehenderit ipsum commodo commodo eu mollit cupidatat 
            mollit officia esse cupidatat sunt deserunt. Fugiat nostrud nisi 
            consequat anim tempor magna laboris nisi non irure eiusmod id. Eu reprehenderit magna pariatur ullamco.
          </p>
          <p>
            Reprehenderit ipsum commodo commodo eu mollit cupidatat 
            mollit officia esse cupidatat sunt deserunt. Fugiat nostrud nisi 
            consequat anim tempor magna laboris nisi non irure eiusmod id. Eu reprehenderit magna pariatur ullamco.
          </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact" data-aos="fade-up">
        <SectionHeaders
          subHeader="Don't hesitate"
          mainHeader="Contact Us"
        />
        <div className="mt-8 text-gray-500">
          <p><strong>Call: :</strong> +251 900 000 000</p>
          <p><strong>Address:</strong> Near Betel Mosque, Addis Ababa, Ethiopia</p>
          <p><strong>Email:</strong> contact@example.com</p>
          <p><strong>Working Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM</p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
