import Trash from "./icons/Trash";
import Image from "next/image";
import { CartContext, cartProductPrice } from "@/components/AppContext";

export default function CartProduct({ product, onRemove }) {
    console.log("product : ", product);
  return (
    <div className="flex items-center gap-2 border-b grow py-4">
      <div className="w-24">
        <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.itemName || 'Product image'}
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold text-lg">{product.itemName}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                Extra {extra.name}: Br.{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">Br. {cartProductPrice(product)}</div>
      <div className="ml-2">
        {onRemove ? (
          <button className="p-2" type="button" onClick={onRemove}>
            <Trash />
          </button>
        ) : null}
      </div>
    </div>
  );
}
