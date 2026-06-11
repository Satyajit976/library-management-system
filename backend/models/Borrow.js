import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    borrowDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

export default Borrow;