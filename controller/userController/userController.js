// import express from "express";
import User from "../../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

		console.log(req.body);
		
        const user = await User.create({
            firstName,
						lastName,
            email,
            password,
        });
		console.log(user);
		
		
        res.status(201).json({ user });
    } catch (error) {
		console.error("Server Error:", error); // Log the full error object
		res.status(500).json({ message: "Server Error" });
	}
};

// Get all users
export const getUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({ users });
	} catch (error) {
		console.error("Server Error:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

// Get a single user
export const getUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await User.findById(userId).populate({
      path: "orders",
      populate: { path: "products.product", select: "-__v" }, // deep populate
      select: "-__v",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Update a user
export const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, password } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Only update if fields are provided in req.body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
		
		// Do not allow email updates
		if (req.body.email && req.body.email !== user.email) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Handle password update — hash if needed depending on your model logic
    if (password) {
      user.password = password; // will be hashed automatically if you have a pre-save hook
    }

		await user.save();

		res.status(200).json({ user });
	} catch (error) {
		console.error("Server Error:", error);
		res.status(500).json({ message: "Server Error" });
	}	
}

// Delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



//  if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
// 				const userId = req.params; // Assuming the user ID is passed as a route parameter