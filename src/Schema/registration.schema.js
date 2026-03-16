import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    Razorpay_amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Amount must be greater than 0",
      },
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    selectedFee: {
  title:              { type: String, required: true },
  category:           { type: String, required: true },
  value:              { type: Number, required: true },
  convenience_price:  { type: Number, required: true },
  total:              { type: Number, required: true },
  discountApplied:    { type: Number, default: 0 },
  membershipFee:      { type: Number, default: 0 },
  couponCode:         { type: String, default: null },
  membershipSelected: { type: Boolean, default: false },
  finalTotal:         { type: Number },
},
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    certificate_name: {
      type: String,
      required: true,
      trim: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    presentation_Category: {
      type: String,
      required: true,
    },
    presentation_Type: {
      type: String,
      required: true,
    },
    participant_category: {
      type: String,
      required: true,
    },
    Terms_and_Conditions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", participantSchema);

export default Registration;

// import mongoose from "mongoose";
// import { type } from "os";

// const registrationSchema = new mongoose.Schema({
//   Title: {
//     type: String,
//     required: true,
//   },
//   First_Name: {
//     type: String,
//     required: true,
//   },
//   Last_Name: {
//     type: String,
//     required: true,
//   },
//   Certificate_Name: {
//     type: String,
//     required: true,
//   },
//   Date_Of_Birth: {
//     type: Date,
//     required: true,
//   },
//   Nationality: {
//     type: String,
//     required: true,
//   },
//   Department: {
//     type: String,
//     required: true,
//   },
//   Institution: {
//     type: String,
//     required: true,
//   },
//   Mobile_Number: {
//     type: String,
//     required: true,
//   },
//   Email: {
//     type: String,
//     required: true,
//   },
//   Participant_Category: {
//     type: String,
//     required: true,
//   },
//   Presentation_Category: {
//     type: String,
//     required: true,
//   },
//   Presentation_Type: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//   },
//   order_id: {
//     type: String,
//   },
//   selectedFee: {
//     category: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     Title: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//   },
//   Razorpay_Payment_Details: {
//     type: Object,
//   },
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// export default Registration;
