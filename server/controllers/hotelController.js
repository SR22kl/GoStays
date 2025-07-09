import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Check if the user has already registered a hotel
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.status(400).json({
        success: false,
        message: "User has already registered a hotel",
      });
    }

    await Hotel.create({ name, address, contact, owner, city });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.status(200).json({ success: true, message: "Your Hotel registered Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
