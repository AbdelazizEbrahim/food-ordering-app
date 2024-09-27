import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./menuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
    const [popUp, setPopUp] = useState(false);
    const { image, itemName, description, price, sizes, ingridients } = menuItem;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);

    const { addToCart } = useContext(CartContext);

    function handleAddToCartButtonClick() {
       const hasOptions = sizes.length > 0 || ingridients.length > 0;
       if (hasOptions && !popUp ) {
        setPopUp(true);
        return;
       }
       addToCart(menuItem, selectedSize, selectedExtras);
       console.log("selected sizzzzz: ", selectedSize);
       setPopUp(false);
       toast.success("Added to cart!");
    }

    function handleExtraThingClick(ev, ingridient) {
        const checked = ev.target.checked;

        if (checked) {
            setSelectedExtras(prev => [...prev, ingridient]);
        } else {
            setSelectedExtras(prev => prev.filter(e => e.name !== ingridient.name));
        }
    }

    let selectedPrice = Number(price); 
    if (selectedSize) {
        console.log('selected size: ', selectedSize);
        selectedPrice += Number(selectedSize.price); 
    }
    if (selectedExtras.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += Number(extra.price); 
        }
    }

    return (
        <>
            {popUp && (
                <div 
                     onClick={() => setPopUp(false)}
                     className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div
                        onClick={ev => ev.stopPropagation()} 
                        className="my-8 bg-white p-2 rounded-lg max-w-md ">
                        <div className="overflow-y-scroll p-2 " style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image 
                                src={image} 
                                alt={itemName} 
                                width={200} height={200} 
                                className="mx-auto" 
                            />
                            <h2 className="text-lg font-bold text-center">{itemName}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pick Your Size</h3>
                                    {sizes.map(size => (
                                        <label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input 
                                                type="radio" 
                                                onChange={() => setSelectedSize(size)} 
                                                checked={selectedSize?.name === size.name} 
                                                name="size" 
                                            />
                                            {size.name} + ${size.price}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {ingridients?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {ingridients.map(ingridient => (
                                        <label key={ingridient._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input 
                                                type="checkbox" 
                                                onChange={(ev) => handleExtraThingClick(ev, ingridient)} 
                                                name="ingridient" 
                                            />
                                            {ingridient.name} + ${ingridient.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="primary sticky buttom-2" type="button" onClick={ handleAddToCartButtonClick}>
                            Add to cart ${selectedPrice.toFixed(2)} 
                        </button>
                        <button className="mt-2" onClick={() => setPopUp(false)} >Cancel</button>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}
