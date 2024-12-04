import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    dishID: {
        type: String,
        required: true,
        unique: true,
    },
    dishName: {
        type: String,
        required: true,
    },
    options: [{
        required: true,
    }],
    dishImage: {
        type: String,
        required: true,
    },
    cuisineType_Origin: {
        type: String,
        enum: ['Italian', 'Indian', 'Japanese', 'Chinese', 'Mexican', 'American', 'All'],
        required: true,
    },
    cuisineType_Time: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'All Day'],
        required: true,
    },
    cuisineType_Dietary: {
        type: String,
        enum: ['Vegetarian', 'Vegan', 'Pescetarian', 'Dairy-Free', 'Egg-Free', 'Nut-Free', 'Soy-Free', 'Fish-Free', 'Shellfish-Free', 'Gluten-Free', 'Alcohol-Free', 'Caffeine-Free', 'Paleo', 'Keto', 'Raw', 'Kosher', 'Halal'],
        required: true,
    },
    cuisineType_Course: {
        type: String,
        enum: ['Appetizer', 'Side', 'Main Course', 'Dessert', 'Beverage'],
        required: true,
    },
})

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;