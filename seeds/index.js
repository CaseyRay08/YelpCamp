const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1/yelpcamp', {  
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
     await Campground.deleteMany({});
     
    for (let i = 0; i < 300; i++) {
        const ranNum = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            author: '6333105ccf4136ac92fce370',
            location: `${cities[ranNum].city}, ${cities[ranNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[ranNum].longitude,
                    cities[ranNum].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djul5a2sz/image/upload/v1664659478/YelpCamp/bxyr2bjqssd55seinum6.jpg',
                    filename: 'YelpCamp/bxyr2bjqssd55seinum6'
                },
                {
                    url: 'https://res.cloudinary.com/djul5a2sz/image/upload/v1664648430/YelpCamp/z4i0xcxonvmjo0yq0okp.jpg',
                    filename: 'YelpCamp/z4i0xcxonvmjo0yq0okp'
                },
                // {
                //     url: 'https://res.cloudinary.com/djul5a2sz/image/upload/v1664639939/YelpCamp/qnfy1dqkqhsjnaxthi2q.jpg',
                //     filename: 'YelpCamp/qnfy1dqkqhsjnaxthi2q'
                // },
                // {
                //     url: 'https://res.cloudinary.com/djul5a2sz/image/upload/v1664639939/YelpCamp/hm6sgxv7mwjcxwdckl6m.jpg',
                //     filename: 'YelpCamp/hm6sgxv7mwjcxwdckl6m'
                // }
            ]
        })
        await camp.save();
    }
}

seedDB();
//.then(() => {
    //mongoose.connection.close();
//})
