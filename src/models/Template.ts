import mongoose, { Document, Schema, Model } from "mongoose";

// Interface cho Template document
export interface ITemplate extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;

  // Seller information
  seller: mongoose.Types.ObjectId;

  // Category and tags
  category: "web" | "mobile" | "backend" | "fullstack" | "ui-kit" | "other";
  subcategory?: string;
  tags: string[];
  technologies: string[];

  // Pricing
  pricing: {
    type: "free" | "paid" | "subscription";
    price: number;
    currency: string;
    discount?: {
      percentage: number;
      startDate: Date;
      endDate: Date;
    };
  };

  // Media
  images: {
    thumbnail: string;
    gallery: string[];
    preview?: string; // URL for live preview
  };

  // Files and content
  files: {
    mainFile: string; // ZIP file URL
    documentation?: string; // Documentation file URL
    changelog?: string;
    license: string;
  };

  // Template metadata
  metadata: {
    version: string;
    compatibility: string[];
    requirements: string[];
    fileSize: number; // in bytes
    includesSource: boolean;
    framework?: string;
    language: string;
  };

  // Statistics
  stats: {
    views: number;
    downloads: number;
    sales: number;
    favorites: number;
    rating: {
      average: number;
      count: number;
    };
  };

  // SEO
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };

  // Status and moderation
  status: "draft" | "pending" | "approved" | "rejected" | "suspended";
  moderationNotes?: string;
  featuredUntil?: Date;

  // Timestamps
  publishedAt?: Date;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Template Schema definition
const TemplateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề template là bắt buộc"],
      trim: true,
      maxlength: [100, "Tiêu đề không được vượt quá 100 ký tự"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug chỉ được chứa chữ thường, số và dấu gạch ngang",
      ],
    },

    description: {
      type: String,
      required: [true, "Mô tả ngắn là bắt buộc"],
      trim: true,
      maxlength: [300, "Mô tả ngắn không được vượt quá 300 ký tự"],
    },

    longDescription: {
      type: String,
      maxlength: [5000, "Mô tả chi tiết không được vượt quá 5000 ký tự"],
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "backend", "fullstack", "ui-kit", "other"],
    },

    subcategory: {
      type: String,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    pricing: {
      type: {
        type: String,
        enum: ["free", "paid", "subscription"],
        required: true,
        default: "paid",
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Giá không thể âm"],
      },
      currency: {
        type: String,
        enum: ["USD", "VND", "EUR"],
        default: "USD",
      },
      discount: {
        percentage: {
          type: Number,
          min: 0,
          max: 100,
        },
        startDate: Date,
        endDate: Date,
      },
    },

    images: {
      thumbnail: {
        type: String,
        required: [true, "Ảnh thumbnail là bắt buộc"],
      },
      gallery: [
        {
          type: String,
        },
      ],
      preview: String,
    },

    files: {
      mainFile: {
        type: String,
        required: [true, "File chính là bắt buộc"],
      },
      documentation: String,
      changelog: String,
      license: {
        type: String,
        required: true,
        default: "MIT",
      },
    },

    metadata: {
      version: {
        type: String,
        required: true,
        default: "1.0.0",
      },
      compatibility: [
        {
          type: String,
        },
      ],
      requirements: [
        {
          type: String,
        },
      ],
      fileSize: {
        type: Number,
        required: true,
        min: 0,
      },
      includesSource: {
        type: Boolean,
        default: true,
      },
      framework: String,
      language: {
        type: String,
        required: true,
      },
    },

    stats: {
      views: {
        type: Number,
        default: 0,
        min: 0,
      },
      downloads: {
        type: Number,
        default: 0,
        min: 0,
      },
      sales: {
        type: Number,
        default: 0,
        min: 0,
      },
      favorites: {
        type: Number,
        default: 0,
        min: 0,
      },
      rating: {
        average: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        count: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    },

    seo: {
      metaTitle: {
        type: String,
        maxlength: [60, "Meta title không được vượt quá 60 ký tự"],
      },
      metaDescription: {
        type: String,
        maxlength: [160, "Meta description không được vượt quá 160 ký tự"],
      },
      keywords: [
        {
          type: String,
          lowercase: true,
          trim: true,
        },
      ],
    },

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected", "suspended"],
      default: "draft",
    },

    moderationNotes: String,

    featuredUntil: Date,

    publishedAt: Date,

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "templates",
  }
);

// Indexes for performance and search
TemplateSchema.index({ slug: 1 }, { unique: true });
TemplateSchema.index({ seller: 1 });
TemplateSchema.index({ category: 1, subcategory: 1 });
TemplateSchema.index({ status: 1 });
TemplateSchema.index({ tags: 1 });
TemplateSchema.index({ "pricing.price": 1 });
TemplateSchema.index({ "stats.rating.average": -1 });
TemplateSchema.index({ "stats.sales": -1 });
TemplateSchema.index({ publishedAt: -1 });
TemplateSchema.index({ createdAt: -1 });

// Text search index
TemplateSchema.index({
  title: "text",
  description: "text",
  tags: "text",
  technologies: "text",
});

// Virtual for effective price (considering discount)
TemplateSchema.virtual("effectivePrice").get(function () {
  const { price, discount } = this.pricing;
  if (
    discount &&
    new Date() >= discount.startDate &&
    new Date() <= discount.endDate
  ) {
    return price * (1 - discount.percentage / 100);
  }
  return price;
});

// Virtual for reviews
TemplateSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "template",
});

// Virtual for orders
TemplateSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "template",
});

// Method to increment view count
TemplateSchema.methods.incrementViews = function () {
  this.stats.views += 1;
  return this.save();
};

// Method to update rating
TemplateSchema.methods.updateRating = function (
  newRating: number,
  isNew: boolean = true
) {
  const { rating } = this.stats;
  if (isNew) {
    // Add new rating
    const totalRating = rating.average * rating.count + newRating;
    rating.count += 1;
    rating.average = totalRating / rating.count;
  } else {
    // Recalculate from all reviews (when review is updated/deleted)
    // This would be called with aggregated data from Review model
  }
  return this.save();
};

// Static method to find featured templates
TemplateSchema.statics.findFeatured = function () {
  return this.find({
    status: "approved",
    featuredUntil: { $gte: new Date() },
  }).sort({ publishedAt: -1 });
};

// Static method to find popular templates
TemplateSchema.statics.findPopular = function (limit: number = 10) {
  return this.find({ status: "approved" })
    .sort({ "stats.sales": -1, "stats.rating.average": -1 })
    .limit(limit);
};

// Middleware to update lastUpdated on save
TemplateSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

// Middleware to set publishedAt when status changes to approved
TemplateSchema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "approved" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }
  next();
});

const Template: Model<ITemplate> =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
