const mongoose = require('mongoose')
import { userSchema } from "../4-models/User-Model";

export const mangooseConnection = mongoose.connect('mongodb+srv://adirpoliti:RsveLODUOQ52kHo2@vacations.al16hwc.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
export const User = mongoose.model('users', userSchema);
