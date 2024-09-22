import mongoose, { model, models, Schema } from 'mongoose';

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema({
    itemName: { type: String, required: true },
    description: { type: String, },
    price: { type: String,  },
    image: { type: String, },
    category: {type: mongoose.Types.ObjectId},
    sizes: {type: [ExtraPriceSchema]},
    ingridients: {type: [ExtraPriceSchema]}

}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

// export default Category;
