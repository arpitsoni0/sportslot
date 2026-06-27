import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  venueId:   { type: Number, required: true, index: true },
  userId:    { type: Number, required: true },
  userName:  { type: String, required: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  title:     { type: String, maxlength: 120 },
  text:      { type: String, required: true, maxlength: 1000 },
  helpful:   { type: Number, default: 0 },
  ownerReply: {
    text:      String,
    repliedAt: Date,
  },
}, { timestamps: true });

reviewSchema.index({ venueId: 1, createdAt: -1 });
reviewSchema.index({ venueId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
