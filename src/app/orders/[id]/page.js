'use client';

import Trash from "@/components/icons/Trash";
import Image from "next/image";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/addressInputs";
import SectionHeaders from "@/components/layout/sectionheaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

// CartProduct Component
function CartProduct({ product, onRemove }) {
  console.log("product : ", product);
  return (
    <div className="flex items-center gap-2 border-b grow py-4" data-aos="fade-up"> {/* Add AOS animation here */}
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

export default function OrderPage() {
  const [order, setOrder] = useState({});
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  
  let subtotal = 0;
  if (order.cartProducts) {
    for (const p of order.cartProducts) {
      subtotal += cartProductPrice(p);
    }
  }

  const deliveryFee = 50;  
  const total = subtotal + deliveryFee;  

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
    fetchingOrder();
  }, []);

  function fetchingOrder() {
    setLoadingOrder(true);
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
  
    if (id) {
      const controller = new AbortController();
      fetch(`/api/orderUpdate?_id=` + id, { signal: controller.signal })
        .then(res => res.json())
        .then(orderData => {
          console.log("order data: ", orderData);
          setOrder(orderData);
          setLoadingOrder(false);
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Fetch error:', error);
          }
        });
  
      return () => {
        controller.abort();
      };
    }
  }
  

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="my-4">
          <p>Thank you for your order</p>
          <p>We will call you when your order is on the way</p>
        </div>
      </div>
      {loadingOrder && (
        <div>Loading order ...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts?.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              <div>
                Subtotal: 
                <span className="text-black font-bold inline-block w-16">Br. {subtotal}</span>
              </div>
              <div>
                Delivery: 
                <span className="text-black font-bold inline-block w-16">Br. {deliveryFee}</span>
              </div>
              <div>
                Total: 
                <span className="text-black font-bold inline-block w-16">Br. {total}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg" data-aos="fade-up"> {/* Add AOS animation here */}
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
