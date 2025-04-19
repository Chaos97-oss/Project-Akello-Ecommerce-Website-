import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide a first name"],
  	},
	lastName: {
		type: String,
		required: [true, "Please provide a last name"],
  	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: [8, "Password must be at least 8 characters"],
		// match: [
		//   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
		//   "Password must contain at least one digit, one lowercase, one uppercase, and one special character",
		// ],
	  },
	orders: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
	  }],
	createdAt: {
		type: Date,
		default: Date.now,
	  },
	updatedAt: {
		type: Date,
		default: Date.now,
	  },
		isAdmin: {
			type: Boolean,
			default: false         // If not provided, this defaults to false
		}
});

const User = mongoose.model("User", userSchema);

export default User;