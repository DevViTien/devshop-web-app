import mongoose, { Document, Schema, Model } from "mongoose";

// Interface cho User document
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string; // Optional cho social login
  emailVerified?: Date;
  image?: string;
  role: "buyer" | "seller" | "admin";

  // Profile information
  profile: {
    bio?: string;
    website?: string;
    location?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };

  // Seller-specific fields
  sellerInfo?: {
    isVerified: boolean;
    verificationDate?: Date;
    businessName?: string;
    taxId?: string;
    paymentInfo?: {
      paypalEmail?: string;
      stripeAccountId?: string;
    };
    rating: {
      average: number;
      count: number;
    };
    totalSales: number;
    totalEarnings: number;
  };

  // User preferences
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
    };
    theme: "light" | "dark" | "system";
  };

  // Account status
  status: "active" | "suspended" | "pending" | "banned";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema definition
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Tên người dùng là bắt buộc"],
      trim: true,
      maxlength: [100, "Tên không được vượt quá 100 ký tự"],
    },

    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ",
      ],
    },

    password: {
      type: String,
      required: function (this: IUser) {
        // Password required nếu không phải social login
        return !this.image; // Nếu có image từ social login thì không cần password
      },
      minlength: [8, "Mật khẩu phải có ít nhất 8 ký tự"],
      select: false, // Không trả về password khi query
    },

    emailVerified: {
      type: Date,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
      required: true,
    },

    profile: {
      bio: {
        type: String,
        maxlength: [500, "Bio không được vượt quá 500 ký tự"],
      },
      website: {
        type: String,
        match: [/^https?:\/\/.+\..+/, "Website phải có định dạng URL hợp lệ"],
      },
      location: {
        type: String,
        maxlength: [100, "Địa điểm không được vượt quá 100 ký tự"],
      },
      socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
      },
    },

    sellerInfo: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationDate: Date,
      businessName: {
        type: String,
        maxlength: [200, "Tên doanh nghiệp không được vượt quá 200 ký tự"],
      },
      taxId: String,
      paymentInfo: {
        paypalEmail: String,
        stripeAccountId: String,
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
      totalSales: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    preferences: {
      language: {
        type: String,
        enum: ["vi", "en", "zh", "hi"],
        default: "vi",
      },
      currency: {
        type: String,
        enum: ["USD", "VND", "EUR"],
        default: "USD",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        marketing: {
          type: Boolean,
          default: false,
        },
      },
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
    },

    status: {
      type: String,
      enum: ["active", "suspended", "pending", "banned"],
      default: "active",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "users",
  }
);

// Indexes for performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ "sellerInfo.isVerified": 1 });
UserSchema.index({ createdAt: -1 });

// Virtual để tính tổng số template đã mua (sẽ populate từ Order model)
UserSchema.virtual("purchasedTemplates", {
  ref: "Order",
  localField: "_id",
  foreignField: "buyer",
  match: { status: "completed" },
});

// Virtual để tính tổng số template đã bán (cho seller)
UserSchema.virtual("soldTemplates", {
  ref: "Template",
  localField: "_id",
  foreignField: "seller",
});

// Middleware để cập nhật lastLoginAt
UserSchema.methods.updateLastLogin = function () {
  this.lastLoginAt = new Date();
  return this.save();
};

// Method để upgrade user thành seller
UserSchema.methods.upgradeTo = function (role: "seller" | "admin") {
  this.role = role;
  if (role === "seller" && !this.sellerInfo) {
    this.sellerInfo = {
      isVerified: false,
      rating: { average: 0, count: 0 },
      totalSales: 0,
      totalEarnings: 0,
    };
  }
  return this.save();
};

// Static method để tìm seller được verify
UserSchema.statics.findVerifiedSellers = function () {
  return this.find({
    role: "seller",
    "sellerInfo.isVerified": true,
    status: "active",
  });
};

// Tạo và export model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
