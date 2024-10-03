/* eslint-disable react/jsx-key */
'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/addressInputs";
import SectionHeaders from "@/components/layout/sectionheaders";
import { useProfile } from "@/components/useProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      console.log("profile data: ", profileData);
      const { name, phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        name,
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    console.log("check out data: ", address, cartProducts);
  
    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json(); 
          console.log("response dataa: ", data);
          window.location = data.checkout_url; 
          resolve(); 
        } else {
          reject();
        }
      }).catch((error) => {
        console.error("Fetch error:", error);
        reject();
      });
    });
  
    await toast.promise(promise, {
      loading: 'Preparing Your Payment...',
      success: 'Redirecting To Payment',
      error: 'Failed, Please Try again',
    });
  }
  

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No product in your cart list</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex items-center gap-2 border-b grow py-4">
                <div className="w-24">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={''}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold text-lg">
                    {product.itemName}
                  </h3>
                  {product.size && (
                    <div className="text-sm">
                      Size:
                      <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div>
                          Extra {extra.name}: Br.{extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  Br. {cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2  pr-16 flex justify-end font-semibold items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total: <br />
            </div>
            <div className="font-semibold pl-2 text-right">
              Br. {subtotal} <br />
              Br. 50 <br />
              {subtotal + 50} <br />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay Br. {subtotal + 50}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
