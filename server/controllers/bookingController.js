import transporter from "../config/nodeMailer.js";
import Booking from "../models/bookingModel.js";
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import stripe from "stripe";

// Filter function to check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const booking = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = booking.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
  }
};

//Check Room availbility
export const checkAvailabilityApi = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.status(200).json({
      success: true,
      message: "Room Availability checked",
      isAvailable,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room, guests } = req.body;
    const user = req.user._id;

    //Before Booking check room availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Room is not available" });
    }
    //Get totalPrice from Room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    //Calculate totalPrice based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;

    //Create Booking
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Confirmation!",
      html: `
      <h1>Your Booking Confirmation Details</h1>
      <p>Dear ${req.user.username}</p>
      <p>Thank you for booking with us! Here are your booking details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li> 
        <li><strong>Location:</strong> ${roomData.hotel.address}</li>
        <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
        <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${
        booking.totalPrice
      }/Night</li>
      <p>If you need to make any changes, feel free to cantact us.</p>
      <p>Best Regards,<br/>GoStays Team!</p>
      </ul>

      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Booking Created Successfully!",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "User Bookings fetched", bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Booking details for hotel dashboard
export const getHotelBookingsDetails = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Hotel Bookings fetched", bookings });

    //Total Bookings
    const totalBookings = bookings.length;

    //Total Revenue
    let totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      message: "Hotel Bookings Details fetched",
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch booking deatils" });
  }
};

//Stripe payment
export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room).populate("hotel");
    const totalPrice = booking.totalPrice;
    const { origin } = req.headers; //FE URL

    const stripeInstance = new stripe(process.env.TRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: process.env.CURRENCY || "usd",
          product_data: {
            name: roomData.hotel.name,
          },
          unit_amount: totalPrice * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];
    // Create a checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
