/* eslint-disable react/jsx-key */
'use client' 
import { CartContext, cartProductPrice } from "@/components/AppContext"
import Trash from "@/components/icons/Trash"
import AddressInputs from "@/components/layout/addressInputs"
import SectionHeaders from "@/components/layout/sectionheaders"
import { useProfile } from "@/components/useProfile"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"

export default function CartPage(){
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data: profileData} = useProfile();

    useEffect(() => {
        if(profileData?.city){
            const {phone, streetAddress, city, postalCode, country} = profileData;
            const addressFromProfile = {
                phone, 
                streetAddress, 
                city, 
                postalCode, 
                country
            }
            setAddress(addressFromProfile);
        }
    }, [profileData])

    let total = 0;
    for ( const p of cartProducts) {
        total += cartProductPrice(p);
    }

    function handleAddressChange (propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]:value}));
    }
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders/>
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No product in your cart list</div>
                    )}
                    {cartProducts.length > 0 && cartProducts.map((product, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="flex items-center gap-2 border-b grow py-4" >
                            <div className="w-24">
                                <Image width={100} height={100} src={product.image} alt={''}/>
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
                                {product.ingridients?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map(extra => (
                                            <div>Extra {extra.name}: Br.{extra.price}</div>
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
                                    onClick={() => removeCartProduct(index)}>
                                    <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-2 text-right pr-16">
                        <span className="text-gray-500">
                           Subtotal:     
                        </span>
                        <span className="text-lg font-semibold pl-2">
                            Br. {total} 
                        </span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <label>Address</label>
                        <AddressInputs
                          addressProps={address}
                          setAddressProps={handleAddressChange}
                        />
                        <button type="submit">Pay ${total}</button>
                    </form>
                </div>
            </div>
            
        </section>
    )
}



