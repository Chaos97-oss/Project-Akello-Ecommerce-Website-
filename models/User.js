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
		orderOtp: {
			type: String,
		},
		orderOtpExpiry: {
			type: Date,
		},
		orderOtpVerified: {
			type: Boolean,
			default: false,
		},
		passwordResetToken: String,
		passwordResetTokenExpiry: Date,
});

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token and save it to the database
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expiration (optional but good practice)
  this.passwordResetExpire = Date.now() + 60 * 60 * 1000; // expires in 1 hour
  
  return resetToken; // reset password tested and fixed
};


const User = mongoose.model("User", userSchema);

export default User;