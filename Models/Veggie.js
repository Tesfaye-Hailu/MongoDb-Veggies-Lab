const mongoose = require('mongoose')



const veggieSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true, min: 0},
        canEat: Boolean
    },
    {timestamps: true}
);

const Veggie = mongoose.model('Veggie', veggieSchema);

module.exports = Veggie;