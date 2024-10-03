'use client';

import { useEffect, useState } from 'react';

const ThankYouPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Extract order_id from the URL
    const params = new URLSearchParams(window.location.search);
    const order_id = params.get('order_id');

    if (order_id) {
      setOrderId(order_id);
      console.log("Order ID:", order_id);
      setTimeout(() => {
        updateOrderToPaid(order_id);
      }, 2000);
    } else {
      console.log("Waiting for order_id to be available...");
    }
  }, []); 

  const updateOrderToPaid = async (order_id) => {
    try {
      console.log("Updating order status to paid...");
      const response = await fetch(`/api/orderUpdate?_id=${order_id}`, { // Passing _id as a query param
        method: 'PUT',
        body: JSON.stringify({ paid: true }), // Only 'paid' in the body
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        window.location.href = `orders/` + order_id.toString() + '?clear-cart=1'; 
      } else {
        throw new Error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      setPaymentStatus('failed');
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {paymentStatus === 'pending' && (
        <div className="text-center">
          <div className="loader"></div> 
          <h1 className="text-4xl font-bold mt-6">Payment Pending...</h1>
          <p className="mt-4 text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      )}
      {paymentStatus === 'failed' && (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>
          <p className="mt-4 text-gray-600">There was an issue with your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
