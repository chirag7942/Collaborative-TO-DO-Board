import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//function to register a user on our app and database afer hashing its password:-

export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //checking if user already existed with this mail id or not:-
    if (existingUser) return res.status(400).json({ message: "Email already exists" });
 
    //hashing the user's password:-
    const hashedPassword = await bcrypt.hash(password, 10);

    //registering user in our database.
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });

  } 
  
  catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

//function to login a user on our app and providing a token in cookie for login in future.
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
 
    //finding if user already registered on our app :-
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //if user already existed, we'll check its password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
 
    //providing token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true }).json({ user: { id: user._id, name: user.name } });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};


