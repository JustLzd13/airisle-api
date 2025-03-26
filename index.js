// [Dependencies and Modules] 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// //[Routes] 
const airlineRoutes = require("./routes/airline.js");
const bookingRoutes = require("./routes/booking.js");
const flightRoutes = require("./routes/flight.js");
const paymentRoutes = require("./routes/payment.js");
const ticketRoutes = require("./routes/ticket.js");
const userRoutes = require("./routes/user.js");

require('dotenv').config();


const app = express();

app.use(express.json());


const corsOptions = {
    origin: ['http://localhost:8000','http://localhost:3000', 'http://localhost:4000', 'https://airline-frontend-sideproject529-lozada.vercel.app'], 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));




mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open',()=> console.log('Now Connected to MongoDB Atlas.'));

app.use("/airline", airlineRoutes);
app.use("/booking", bookingRoutes);
app.use("/flight", flightRoutes);
app.use("/payment", paymentRoutes);
app.use("/ticket", ticketRoutes);
app.use("/users", userRoutes);



if(require.main === module){
    app.listen( process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT }`)
    });
}

module.exports = { app, mongoose };