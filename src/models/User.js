import { model, models, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    image: { type: String},
    phone: { type: String},
    streetAddress: { type: String},
    postalCode: { type: String},
    city: { type: String},
    country: { type: String},
    admin: {type: Boolean, default: false},
    password: {
        type: String,
        required: false,
        validate: {
            validator: (pass) => {
                // Only validate if the password is provided
                if (pass && pass.length < 5) {
                    throw new Error('Password must be at least 5 characters long');
                }
                return true;
            },
            message: 'Password must be at least 5 characters long'
        }
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const user = this;
    // Hash password only if it is provided and modified
    if (user.isModified('password') && user.password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = models.User || model('User', UserSchema);

export default User;
