import mongoose, { model, models, Schema } from 'mongoose';

const MenuItemSchema = new Schema({
    itemName: { type: String, required: true },
    description: { type: String, },
    price: { type: String,  },
    image: { type: String, },

}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

// export default Category;
