'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/libs/firebase';
import toast from "react-hot-toast";
import { useProfile } from "../useProfile";
import AddressInputs from "./addressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const {data: loggedInUserData} = useProfile();

  function handleAddressChange(propName, value){
    console.log('name and value',  propName, value)
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  useEffect(() => {
    if (user && !isInitialized) {
      console.log("user data: ", user);
      setUserName(user.name || '');
      setImageUrl(user.image || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setAdmin(user.admin || false);
      setStreetAddress(user.streetAddress || '');
      setPostalCode(user.postalCode || '');
      setCity(user.city || '');
      setCountry(user.country || '');
      setIsInitialized(true); // Prevent further updates
    }
  }, [user, isInitialized]);

  const handleFileChange = (ev) => {
    setLoading(true);
    const file = ev.target.files[0];
    if (file) {
      setImage(file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const fileRef = ref(storage, `images/${file.name}`);
        const uploadTask = await uploadBytesResumable(fileRef, file);
        const downloadUrl = await getDownloadURL(uploadTask.ref);
        setImageUrl(downloadUrl); 
        resolve();
        setLoading(false);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading image...",
      success: "Image uploaded successfully!",
      error: "Error uploading image",
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const updatedData = {
      _id: user?._id || undefined,  // Include the _id if it's available
      name: userName,
      image: imageUrl,
      phone,
      streetAddress,
      city,
      postalCode,
      country,
      admin,
    };
    console.log("returned data:", updatedData);

    onSave(ev, updatedData);  
  };

  return (
    <div className="md:flex gap-4 items-start">
      <div className="flex-shrink-0 p-2 rounded-lg relative max-w-[120px]">
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={imageUrl || '/user.png'}
          width={120}
          height={120}
          alt="avatar"
        />
        <label>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="block border border-gray-300 rounded-lg px-4 text-center cursor-pointer mt-2">
            Edit
          </span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="grow">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              disabled
              value={email}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <AddressInputs
            addressProps={{phone, streetAddress, postalCode, city, country}}
            setAddressProps={handleAddressChange}
          />

          {/* <div>
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex gap-2">
            <div>
              <label>Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div> */}
          {loggedInUserData.admin && (
            <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb">
                <input id="adminCb" type="checkbox" className="" value={'1'}
                    checked={admin}
                    onClick={ev => setAdmin(ev.target.checked)}/>
                <span> Admin </span>
              </label>
          </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
