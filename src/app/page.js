import Link from "next/link";
import Header from "./components/layout/header";
import Hero from "./components/layout/hero";
import HomeMenu from "./components/layout/homeMenu";
import SectionHeaders from "./components/layout/sectionheaders";

export default function Home() {
  return (
     <div>
      <Hero />
      <HomeMenu />
      <section className='text-center my-16'>
      <SectionHeaders 
            subHeader={'Our Story'}
            mainHeader={'About'}
            />
          <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
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
      <section className='text-center my-8'>
        <SectionHeaders
         subHeader={"Don\'t hesitate"}
         mainHeader={'Contact Us'}
         />
         <div className='mt-8'>
          <a className='text-4xl underline text-gray-500'
          href='tel:+25175805980'>
            +251 975 805 980
          </a>
         </div>
      </section>
     </div>
  );
}
