import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js"; 


const signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, isAdmin } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ 
				message: "Please provide all required fields", 
			});
		}
		if (isAdmin && (!req.user || !req.user.isAdmin)) {
			return res.status(403).json({ message: "Only admins can create another admin" });
		}		
		
		// Check if the email already exists in the database
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		if (password.length < 8) {
			return res.status(400).json({ message: "Password must be at least 8 characters" });
		} 

		// if (User.password != req.param.match) {
		// 	return res.status(400).json({message: "must have characters, numbers or specialkays"})
		// }
		// Create a new user
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			isAdmin: isAdmin || false
		});		
		
		
		//Send Welcome Email;
		await sendEmail({
			to: newUser.email,
			subject: "Welcome to PROJECT AKELLO!",
			html: `<p>Welcome To <strong>PROJECT AKELLO</strong>, ${newUser.firstName}! 🎉<br/>
						 We're excited to have you on board. Feel free to explore and enjoy our services!</p>`
		});
		// Generate a JWT token
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});console.log(token);
		

		// Send the token and user data in the response

		res.status(201).json({
			token,
			user: {
				_id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
			},
		}); 			console.log(user);
	} catch (error) {
		console.error("Server Error:", error); // Log the full error object
		res.status(500).json({ message: "Server Error" });
	}
}
export const protect = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized, token failed" });
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403).json({ message: "Access denied - Admins only" });
	}
};

export default signUp;