const mongoose = require('mongoose');



const notificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    category: { type: String, enum: ['system', 'activity', 'informational'], required: true },
    type: { type: String,  },
    title: { type: String},
    message: { type: String,},
    delivery: {
        type: [String],
        required: true,
    },
});

module.exports  = mongoose.model('Notification', notificationSchema);

