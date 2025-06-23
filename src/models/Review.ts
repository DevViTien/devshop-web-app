import mongoose, { Document, Schema, Model } from "mongoose";

// Interface cho Review document
export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;

  // Relationships
  template: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId; // Must have purchased to review

  // Review content
  rating: number; // 1-5 stars
  title?: string;
  content: string;

  // Review metadata
  pros?: string[];
  cons?: string[];

  // Helpful votes
  helpfulVotes: {
    helpful: number;
    notHelpful: number;
    voters: mongoose.Types.ObjectId[]; // Users who voted
  };

  // Moderation
  status: "pending" | "approved" | "rejected" | "flagged";
  moderationNotes?: string;
  flagReasons?: Array<{
    reason: "spam" | "inappropriate" | "fake" | "offensive" | "other";
    reportedBy: mongoose.Types.ObjectId;
    reportedAt: Date;
    description?: string;
  }>;

  // Response from seller
  sellerResponse?: {
    content: string;
    respondedAt: Date;
    isEdited: boolean;
    editedAt?: Date;
  };

  // Edit history
  isEdited: boolean;
  editHistory?: Array<{
    content: string;
    editedAt: Date;
    reason?: string;
  }>;

  // Verification
  isVerifiedPurchase: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Interface cho static methods
interface IReviewModel extends Model<IReview> {
  findByTemplate(templateId: mongoose.Types.ObjectId): Promise<IReview[]>;
  findByReviewer(reviewerId: mongoose.Types.ObjectId): Promise<IReview[]>;
  calculateRating(
    templateId: mongoose.Types.ObjectId
  ): Promise<{ average: number; count: number }>;
  findPendingModeration(): Promise<IReview[]>;
}

// Review Schema definition
const ReviewSchema = new Schema<IReview>(
  {
    template: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    rating: {
      type: Number,
      required: [true, "Đánh giá sao là bắt buộc"],
      min: [1, "Đánh giá tối thiểu là 1 sao"],
      max: [5, "Đánh giá tối đa là 5 sao"],
      validate: {
        validator: Number.isInteger,
        message: "Đánh giá phải là số nguyên",
      },
    },

    title: {
      type: String,
      trim: true,
      maxlength: [100, "Tiêu đề không được vượt quá 100 ký tự"],
    },

    content: {
      type: String,
      required: [true, "Nội dung đánh giá là bắt buộc"],
      trim: true,
      minlength: [10, "Nội dung đánh giá phải có ít nhất 10 ký tự"],
      maxlength: [2000, "Nội dung đánh giá không được vượt quá 2000 ký tự"],
    },

    pros: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Mỗi ưu điểm không được vượt quá 200 ký tự"],
      },
    ],

    cons: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Mỗi nhược điểm không được vượt quá 200 ký tự"],
      },
    ],

    helpfulVotes: {
      helpful: {
        type: Number,
        default: 0,
        min: 0,
      },
      notHelpful: {
        type: Number,
        default: 0,
        min: 0,
      },
      voters: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "flagged"],
      default: "approved", // Auto-approve for now, can change to 'pending' if manual moderation needed
    },

    moderationNotes: {
      type: String,
      maxlength: [500, "Ghi chú kiểm duyệt không được vượt quá 500 ký tự"],
    },

    flagReasons: [
      {
        reason: {
          type: String,
          enum: ["spam", "inappropriate", "fake", "offensive", "other"],
          required: true,
        },
        reportedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        reportedAt: {
          type: Date,
          default: Date.now,
        },
        description: {
          type: String,
          maxlength: [500, "Mô tả báo cáo không được vượt quá 500 ký tự"],
        },
      },
    ],

    sellerResponse: {
      content: {
        type: String,
        required: true,
        trim: true,
        maxlength: [
          1000,
          "Phản hồi của người bán không được vượt quá 1000 ký tự",
        ],
      },
      respondedAt: {
        type: Date,
        default: Date.now,
      },
      isEdited: {
        type: Boolean,
        default: false,
      },
      editedAt: Date,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    editHistory: [
      {
        content: {
          type: String,
          required: true,
        },
        editedAt: {
          type: Date,
          default: Date.now,
        },
        reason: {
          type: String,
          maxlength: [200, "Lý do chỉnh sửa không được vượt quá 200 ký tự"],
        },
      },
    ],

    isVerifiedPurchase: {
      type: Boolean,
      default: true, // Will be validated against order
    },
  },
  {
    timestamps: true,
    collection: "reviews",
  }
);

// Indexes for performance
ReviewSchema.index({ template: 1, status: 1 });
ReviewSchema.index({ reviewer: 1, createdAt: -1 });
ReviewSchema.index({ order: 1 }, { unique: true }); // One review per order
ReviewSchema.index({ status: 1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ createdAt: -1 });

// Compound indexes
ReviewSchema.index({ template: 1, rating: -1 });
ReviewSchema.index({ template: 1, "helpfulVotes.helpful": -1 });

// Text search index
ReviewSchema.index({
  title: "text",
  content: "text",
});

// Virtual for reviewer details
ReviewSchema.virtual("reviewerDetails", {
  ref: "User",
  localField: "reviewer",
  foreignField: "_id",
  justOne: true,
});

// Virtual for template details
ReviewSchema.virtual("templateDetails", {
  ref: "Template",
  localField: "template",
  foreignField: "_id",
  justOne: true,
});

// Virtual for order details
ReviewSchema.virtual("orderDetails", {
  ref: "Order",
  localField: "order",
  foreignField: "_id",
  justOne: true,
});

// Virtual for helpfulness ratio
ReviewSchema.virtual("helpfulnessRatio").get(function () {
  const total = this.helpfulVotes.helpful + this.helpfulVotes.notHelpful;
  if (total === 0) return 0;
  return this.helpfulVotes.helpful / total;
});

// Method to vote on review helpfulness
ReviewSchema.methods.voteHelpful = function (
  userId: mongoose.Types.ObjectId,
  isHelpful: boolean
) {
  // Check if user already voted
  const hasVoted = this.helpfulVotes.voters.includes(userId);
  if (hasVoted) {
    throw new Error("Người dùng đã bình chọn cho đánh giá này");
  }

  // Add vote
  if (isHelpful) {
    this.helpfulVotes.helpful += 1;
  } else {
    this.helpfulVotes.notHelpful += 1;
  }

  this.helpfulVotes.voters.push(userId);
  return this.save();
};

// Method to edit review
ReviewSchema.methods.editReview = function (
  newContent: string,
  newRating?: number,
  reason?: string
) {
  // Save to edit history
  this.editHistory = this.editHistory || [];
  this.editHistory.push({
    content: this.content,
    editedAt: new Date(),
    reason,
  });

  // Update review
  this.content = newContent;
  if (newRating !== undefined) {
    this.rating = newRating;
  }
  this.isEdited = true;

  return this.save();
};

// Method to add seller response
ReviewSchema.methods.addSellerResponse = function (content: string) {
  this.sellerResponse = {
    content,
    respondedAt: new Date(),
    isEdited: false,
  };
  return this.save();
};

// Method to flag review
ReviewSchema.methods.flagReview = function (
  reason: "spam" | "inappropriate" | "fake" | "offensive" | "other",
  reportedBy: mongoose.Types.ObjectId,
  description?: string
) {
  this.flagReasons = this.flagReasons || [];
  this.flagReasons.push({
    reason,
    reportedBy,
    reportedAt: new Date(),
    description,
  });

  if (this.status !== "flagged") {
    this.status = "flagged";
  }

  return this.save();
};

// Static method to find reviews by template
ReviewSchema.statics.findByTemplate = function (
  templateId: mongoose.Types.ObjectId
) {
  return this.find({ template: templateId, status: "approved" })
    .sort({ createdAt: -1 })
    .populate("reviewer", "name image");
};

// Static method to find reviews by reviewer
ReviewSchema.statics.findByReviewer = function (
  reviewerId: mongoose.Types.ObjectId
) {
  return this.find({ reviewer: reviewerId })
    .sort({ createdAt: -1 })
    .populate("template", "title slug");
};

// Static method to calculate rating for a template
ReviewSchema.statics.calculateRating = function (
  templateId: mongoose.Types.ObjectId
) {
  return this.aggregate([
    {
      $match: {
        template: templateId,
        status: "approved",
      },
    },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        count: { $sum: 1 },
        ratings: { $push: "$rating" },
      },
    },
    {
      $project: {
        _id: 0,
        average: { $round: ["$average", 1] },
        count: 1,
        distribution: {
          5: {
            $size: {
              $filter: { input: "$ratings", cond: { $eq: ["$$this", 5] } },
            },
          },
          4: {
            $size: {
              $filter: { input: "$ratings", cond: { $eq: ["$$this", 4] } },
            },
          },
          3: {
            $size: {
              $filter: { input: "$ratings", cond: { $eq: ["$$this", 3] } },
            },
          },
          2: {
            $size: {
              $filter: { input: "$ratings", cond: { $eq: ["$$this", 2] } },
            },
          },
          1: {
            $size: {
              $filter: { input: "$ratings", cond: { $eq: ["$$this", 1] } },
            },
          },
        },
      },
    },
  ]).then(
    (results) =>
      results[0] || {
        average: 0,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      }
  );
};

// Static method to find pending moderation
ReviewSchema.statics.findPendingModeration = function () {
  return this.find({
    $or: [{ status: "pending" }, { status: "flagged" }],
  }).sort({ createdAt: -1 });
};

// Pre-save middleware to verify purchase
ReviewSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Import Order model to check purchase
      const Order = mongoose.model("Order");
      const order = await Order.findOne({
        _id: this.order,
        buyer: this.reviewer,
        template: this.template,
        status: "completed",
      });

      if (!order) {
        throw new Error("Chỉ có thể đánh giá template đã mua");
      }

      this.isVerifiedPurchase = true;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

// Post-save middleware to update template rating
ReviewSchema.post("save", async function () {
  try {
    const Template = mongoose.model("Template");
    const ratingData = await (this.constructor as IReviewModel).calculateRating(
      this.template
    );

    await Template.findByIdAndUpdate(this.template, {
      "stats.rating.average": ratingData.average,
      "stats.rating.count": ratingData.count,
    });
  } catch (error) {
    console.error("Error updating template rating:", error);
  }
});

const Review = (mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema)) as IReviewModel;

export default Review;
