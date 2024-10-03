import { model, models, Schema } from 'mongoose';

const orderSchema = new Schema({
    userEmail: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    cartProducts: { type: Object, required: true },
    paid: { type: Boolean, default: false },
}, { timestamps: true });

const Order = models.Order || model("Order", orderSchema);

export default Order;
