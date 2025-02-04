import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//  CONTROLLER FUNCTIONS :-

// LOGIN USER:-
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Get email and password from the request body

  try {
    // Find user by email address in Database
    const user = await userModel.findOne({ email });

    // Check if User exists in the Database
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Check if user password matches the stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // Generate token if password matches
    const token = createToken(user._id); // Assuming createToken is implemented correctly
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred during login" });
  }
};

// Create a web token and send that token using the response to the user, Local storage
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is not defined in .env file");
    return null;
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// REGISTER USER :-
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Check for a strong password and length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save new user in Database
    const user = await newUser.save();

    // Create the token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error occurred during registration" });
  }
};

export { loginUser, registerUser };
