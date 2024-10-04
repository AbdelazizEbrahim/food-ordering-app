import Right from "../icons/right";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true,     
    });
  }, []);

  return (
    <section className="hero mt-4 mx-16 md:mt-4">
      <div className="py-8 md:py-12">
        <h1 
          className="text-4xl font-semibold" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          Everything<br />
          is better<br />
          with a&nbsp;
          <span className="text-primary">
            Chicken
          </span>
        </h1>
        <p 
          className="my-6 text-gray-500 text-sm" 
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          Chicken is the missing piece that makes every day complete, a simple yet delicious joy in life
        </p>
        <div 
          className="flex gap-4 text-sm whitespace-nowrap" 
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          <Link href='/menu'>
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
          </Link>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div 
        className="relative hidden md:block" 
        data-aos="fade-left" 
        data-aos-delay="400"
      >
        <Image src={'/chicken.png'} layout={'fill'} objectFit={'contain'} alt={'chicken'} />
      </div>
    </section>
  );
}
