import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="border-t p-8 mt-16 bg-gray-100">
        <div
          className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-500"
        >
          {/* Socials Column */}
          <div data-aos="fade-up">
            <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem]">
              Socials
            </h1>
            <div className="flex flex-col space-y-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black opacity-80 hover:text-yellow-600"
              >
                <FaFacebook size={24} className="mr-2" /> Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black opacity-80 hover:text-yellow-600"
              >
                <FaInstagram size={24} className="mr-2" /> Instagram
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black opacity-80 hover:text-yellow-600"
              >
                <FaTiktok size={24} className="mr-2" /> TikTok
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black opacity-80 hover:text-yellow-600"
              >
                <FaYoutube size={24} className="mr-2" /> YouTube
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:mx-auto mx-0 space-y-2" data-aos="fade-up">
            <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem]">
              Links
            </h1>
            <Link href="/" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Home
            </Link>
            <Link href="/menu" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Menu
            </Link>
            <Link href="/#about" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              About Us
            </Link>
            <Link href="/#contact" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Contact Us
            </Link>
          </div>

          {/* About Column */}
          <div className="md:mx-auto mx-0 space-y-2" data-aos="fade-up">
            <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem]">
              About
            </h1>
            <Link href="https://en.wikipedia.org/wiki/Hajj" target="_blank" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Hajj
            </Link>
            <Link href="https://en.wikipedia.org/wiki/Umrah" target="_blank" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Ummrah
            </Link>
            <Link href="https://en.wikipedia.org/wiki/Ethiopia" target="_blank" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Ethiopia
            </Link>
            <Link href="https://en.wikipedia.org/wiki/Africa" target="_blank" className="block text-black opacity-80 text-[15px] cursor-pointer hover:text-yellow-600">
              Africa
            </Link>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          &copy; All rights reserved, 2024 Abdelaziz E.
        </div>
      </footer>
    </div>
  );
}
