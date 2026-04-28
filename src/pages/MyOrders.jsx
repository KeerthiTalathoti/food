import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, QrCode, Clock, MapPin, CheckCircle2, X } from 'lucide-react';

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - replace with actual order data
  const orders = [
    {
      id: 'WN-12345',
      date: '2024-01-15',
      time: '12:30 PM',
      status: 'Active',
      items: [
        { name: 'Chicken Biryani', qty: 1, price: 120 },
        { name: 'Butter Chicken', qty: 2, price: 150 }
      ],
      total: 420,
      pickupSlot: '1:00 PM - 1:30 PM'
    },
    {
      id: 'WN-12346',
      date: '2024-01-14',
      time: '1:00 PM',
      status: 'Completed',
      items: [
        { name: 'Paneer Tikka', qty: 1, price: 100 }
      ],
      total: 100,
      pickupSlot: '1:30 PM - 2:00 PM'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-emerald-600 bg-emerald-100';
      case 'Completed': return 'text-blue-600 bg-blue-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <History className="text-emerald-600" size={40} />
              My Orders
            </h1>
            <p className="text-slate-500 mt-2">Track your orders and access QR tokens</p>
          </header>

          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <QrCode size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Order #{order.id}</h3>
                      <p className="text-slate-500 flex items-center gap-2">
                        <Clock size={16} /> {order.date} at {order.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-2xl font-black text-emerald-600">₹{order.total}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      <span className="text-sm">Pickup: {order.pickupSlot}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn-secondary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
                <History size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h3>
              <p className="text-slate-500">Your order history will appear here once you place your first order.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <QrCode size={32} className="text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Order #{selectedOrder.id}</h2>
                  <p className="text-slate-500">{selectedOrder.date} at {selectedOrder.time}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">Order Items</h3>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">Qty: {item.qty}</p>
                      </div>
                      <span className="font-bold text-emerald-600">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-emerald-600">₹{selectedOrder.total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} />
                    <span className="text-sm">Pickup Slot: {selectedOrder.pickupSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={16} />
                    <span className="text-sm">Status: {selectedOrder.status}</span>
                  </div>
                </div>

                {selectedOrder.status === 'Active' && (
                  <div className="pt-4">
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                      <QrCode size={48} className="text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-emerald-800">Show this QR code at pickup counter</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;