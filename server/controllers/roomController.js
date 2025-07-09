import Hotel from "../models/hotelModel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/roomModel.js";

//Api to create new room for hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel not found" });
    }

    //Upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);

      return response.secure_url;
    });
    // wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.status(200).json({ success: true, message: "Room created", room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to get all room
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All Rooms Data fetched Successfully",
      rooms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    res.status(200).json({ success: true, message: "Rooms fetched", rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to toggle availability for a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res
      .status(200)
      .json({ success: true, message: "Room availability updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
