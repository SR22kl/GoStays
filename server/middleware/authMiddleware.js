import User from "../models/userModel.js";

//Middleware to chck if user is autheticated or not
export const authMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    // console.log(userId);

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "valid token not found" });
    } else {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User is not authenticated" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
