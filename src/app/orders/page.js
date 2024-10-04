'use client'

import UserTabs from "@/components/layout/userTabs";
import { useProfile } from "@/components/useProfile";
import dbTimeToHuman from "@/libs/dataAndTime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const { loading, data: profile } = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        setOrderLoading(true);
        fetch('/api/orderUpdate')
        .then(res => res.json())
        .then(orders => {
            console.log(orders);
            setOrders(orders.reverse());
        });
        setOrderLoading(false);
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile?.admin} />
            {orderLoading && (
                <div>Loading Orders ....</div>
            )}
            <div className="mt-8">
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                            <div className={`${order.paid ? 'bg-green-500' : 'bg-red-500'} p-2 rounded-md text-center w-24 text-white`}>
                                    {order.paid ? 'Paid' : 'Not Paid'}
                             </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                   <div className="grow">{order.userEmail}</div>
                                   <div className="text-gray-500  text-sm">{dbTimeToHuman(order.createdAt)}</div>
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {order.cartProducts.map(p => p.itemName).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <Link href={"/orders/" + order._id} className="button">
                               Show More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
