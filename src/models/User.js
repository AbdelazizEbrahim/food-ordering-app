import { model, models, Schema } from 'mongoose'
import bcrypt from 'bcrypt'


const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (pass) => {
                if (!pass?.length || pass.length < 5) {
                    throw new Error('Password must be at least 5 characters long');
                }
                return true;
            },
            message: 'Password must be at least 5 characters long'
        }
    }
}, { timestamps: true });

UserSchema.post('validate', function(user){
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})

const User = models.User || model('User', UserSchema);

export default User;
