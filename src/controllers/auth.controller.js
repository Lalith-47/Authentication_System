import User from "../models/User.js";
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials missing" });
    }
    const status = await User.findOne({ email });
    if (status) {
      return res.status(400).json({ message: "User exist" });
    }
    const person = new User({ email, password });
    await person.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ err: err.message, message: "Invalid credentials" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials missing" });
    }
    const data = await User.findOne({ email });
    if (data) {
      const status = await data.comparePassword(password);
      if (status) {
        req.session.userId = data._id;
        return res.status(200).json({ message: "Logged in" });
      } else {
        return res.status(401).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ err: err.message, message: "Invalid credentials" });
  }
};
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logged out" });
  });
};
