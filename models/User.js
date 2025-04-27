import mongoose from "mongoose";
import crypto from "crypto";
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
		},
		passwordResetToken: String,
		passwordResetTokenExpiry: Date,
});

// Add method to generate password reset token//
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
	 // Hash the token and save it to the database
	this.passwordResetToken = crypto
	.createHash('sha256')
	.update(resetToken)
	.digest('hex')
  
	// Set the token expiry time
  this.passwordResetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;