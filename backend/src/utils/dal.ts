const mongoose = require('mongoose')
import { userSchema } from "../models/User-Model";
import { vacationSchema } from "../models/Vacation-Model";

export const mangooseConnection = mongoose.connect('mongodb+srv://adirpoliti:RsveLODUOQ52kHo2@vacations.al16hwc.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

export const User = mongoose.model('users', userSchema);
export const Vacation = mongoose.model('vacations', vacationSchema);
