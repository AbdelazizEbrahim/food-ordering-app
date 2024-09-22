
import { useState } from "react";
import Plus from "../icons/Plus"
import Trash from "../icons/Trash"
import ChevronUp from "../icons/ChevronUp";
import ChevronDown from "../icons/ChevronDown";


export default function MenuItemPriceProps ({name, addLabel, props, setProps}) {

    const [isOpen, setIsOpen] = useState(false);

    function addProps(){
        setProps(oldProps => {
            return [...oldProps, {name: '', price: 0}];
        });
    }

    console.log("add label: ", addLabel);

    function removeSize(indexToRemove){
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    function editSize(ev, index, prop){
        const newValue = ev.target.value;
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps;
        })
    }

    return(
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
              type="button"
              onClick={() => setIsOpen(prev => !prev)}
              className="inline-flex p-1 border-0 justify-start"
            > 
             {isOpen && (
               <ChevronUp/>
              )}
              {!isOpen && (
                <ChevronDown/>
              )}
              <span>{name}</span>
              <span>({props?.length})</span>
              </button>
            <div className={isOpen ? 'block' : 'hidden'}>
            {props?.length > 0 && props.map((size, index) => (
            <div key={index} className="flex gap-2 items-end"> {/* Add a unique key here */}
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="Size Name"
                        value={size.name}
                        onChange={ev => editSize(ev, index, 'name')}
                    />
                </div>
                <div>
                    <label>Extra Prices</label>
                    <input 
                        type="number" 
                        placeholder="Extra Price"
                        value={size.price}
                        onChange={ev => editSize(ev, index, 'price')}
                    />
                </div>
                <div>
                    <button type="button"
                            onClick={() => removeSize(index)}
                            className = "bg-white mb-2 px-2">
                        <Trash/>
                    </button>
                </div>
            </div>
        ))}
        <button
            type="button"
            onClick={addProps}
            className="bg-white items-center"
        > 
            <Plus className="w-4 h-4"/>
            <span>{addLabel} </span>
        </button>
            </div>
    </div>
    )
}