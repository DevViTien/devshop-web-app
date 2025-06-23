import mongoose, { Document, Schema, Model } from "mongoose";

// Interface cho static methods
interface IOrderModel extends Model<IOrder> {
  generateOrderNumber(): string;
  findByBuyer(buyerId: mongoose.Types.ObjectId): Promise<IOrder[]>;
  findBySeller(sellerId: mongoose.Types.ObjectId): Promise<IOrder[]>;
  findRecentSales(limit?: number): Promise<IOrder[]>;
}

// Interface cho Order document
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;

  // Parties involved
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  template: mongoose.Types.ObjectId;

  // Order details
  orderDetails: {
    templateTitle: string;
    templateSlug: string;
    templateVersion: string;
    price: number;
    currency: string;
    discount?: {
      type: "percentage" | "fixed";
      value: number;
      code?: string; // Coupon code if applicable
    };
    finalPrice: number;
    tax?: {
      rate: number;
      amount: number;
    };
  };

  // Payment information
  payment: {
    method: "stripe" | "paypal" | "bank_transfer" | "free";
    status:
      | "pending"
      | "processing"
      | "completed"
      | "failed"
      | "refunded"
      | "cancelled";
    transactionId?: string;
    paymentIntentId?: string; // Stripe payment intent ID
    paidAt?: Date;
    refundedAt?: Date;
    refundAmount?: number;
    refundReason?: string;
  };

  // Download information
  download: {
    downloadUrl?: string; // Secure download link
    downloadCount: number;
    maxDownloads: number;
    expiresAt?: Date; // Download link expiry
    downloadHistory: Array<{
      downloadedAt: Date;
      ipAddress: string;
      userAgent: string;
    }>;
  };

  // Order status and fulfillment
  status:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled"
    | "refunded"
    | "disputed";
  fulfillmentStatus: "pending" | "processing" | "fulfilled" | "failed";

  // Communication
  notes?: string;
  customerNotes?: string;
  sellerNotes?: string;

  // Dispute information
  dispute?: {
    reason: string;
    description: string;
    status: "open" | "investigating" | "resolved" | "closed";
    createdAt: Date;
    resolvedAt?: Date;
    resolution?: string;
  };

  // Metadata
  metadata: {
    buyerIP: string;
    buyerUserAgent: string;
    source: "web" | "mobile" | "api";
    referrer?: string;
  };

  // Timestamps
  expiresAt?: Date; // For pending orders
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Order Schema definition
const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    template: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    orderDetails: {
      templateTitle: {
        type: String,
        required: true,
        trim: true,
      },
      templateSlug: {
        type: String,
        required: true,
      },
      templateVersion: {
        type: String,
        required: true,
        default: "1.0.0",
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        enum: ["USD", "VND", "EUR"],
        default: "USD",
      },
      discount: {
        type: {
          type: String,
          enum: ["percentage", "fixed"],
        },
        value: {
          type: Number,
          min: 0,
        },
        code: String,
      },
      finalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      tax: {
        rate: {
          type: Number,
          min: 0,
          max: 100,
        },
        amount: {
          type: Number,
          min: 0,
        },
      },
    },

    payment: {
      method: {
        type: String,
        enum: ["stripe", "paypal", "bank_transfer", "free"],
        required: true,
      },
      status: {
        type: String,
        enum: [
          "pending",
          "processing",
          "completed",
          "failed",
          "refunded",
          "cancelled",
        ],
        default: "pending",
      },
      transactionId: String,
      paymentIntentId: String,
      paidAt: Date,
      refundedAt: Date,
      refundAmount: {
        type: Number,
        min: 0,
      },
      refundReason: String,
    },

    download: {
      downloadUrl: String,
      downloadCount: {
        type: Number,
        default: 0,
        min: 0,
      },
      maxDownloads: {
        type: Number,
        default: 10, // Allow 10 downloads per purchase
        min: 1,
      },
      expiresAt: Date,
      downloadHistory: [
        {
          downloadedAt: {
            type: Date,
            required: true,
          },
          ipAddress: {
            type: String,
            required: true,
          },
          userAgent: {
            type: String,
            required: true,
          },
        },
      ],
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "cancelled",
        "refunded",
        "disputed",
      ],
      default: "pending",
    },

    fulfillmentStatus: {
      type: String,
      enum: ["pending", "processing", "fulfilled", "failed"],
      default: "pending",
    },

    notes: String,
    customerNotes: String,
    sellerNotes: String,

    dispute: {
      reason: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["open", "investigating", "resolved", "closed"],
        default: "open",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      resolvedAt: Date,
      resolution: String,
    },

    metadata: {
      buyerIP: {
        type: String,
        required: true,
      },
      buyerUserAgent: {
        type: String,
        required: true,
      },
      source: {
        type: String,
        enum: ["web", "mobile", "api"],
        default: "web",
      },
      referrer: String,
    },

    expiresAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

// Indexes for performance
OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ buyer: 1, createdAt: -1 });
OrderSchema.index({ seller: 1, createdAt: -1 });
OrderSchema.index({ template: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ "payment.status": 1 });
OrderSchema.index({ fulfillmentStatus: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for expired orders

// Compound indexes
OrderSchema.index({ buyer: 1, status: 1 });
OrderSchema.index({ seller: 1, status: 1 });
OrderSchema.index({ template: 1, status: 1 });

// Virtual for buyer details
OrderSchema.virtual("buyerDetails", {
  ref: "User",
  localField: "buyer",
  foreignField: "_id",
  justOne: true,
});

// Virtual for seller details
OrderSchema.virtual("sellerDetails", {
  ref: "User",
  localField: "seller",
  foreignField: "_id",
  justOne: true,
});

// Virtual for template details
OrderSchema.virtual("templateDetails", {
  ref: "Template",
  localField: "template",
  foreignField: "_id",
  justOne: true,
});

// Method to generate order number
OrderSchema.statics.generateOrderNumber = function (): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};

// Method to record download
OrderSchema.methods.recordDownload = function (
  ipAddress: string,
  userAgent: string
) {
  if (this.download.downloadCount >= this.download.maxDownloads) {
    throw new Error("Đã vượt quá số lần tải xuống cho phép");
  }

  this.download.downloadCount += 1;
  this.download.downloadHistory.push({
    downloadedAt: new Date(),
    ipAddress,
    userAgent,
  });

  return this.save();
};

// Method to process payment
OrderSchema.methods.processPayment = function (
  transactionId: string,
  paymentIntentId?: string
) {
  this.payment.status = "completed";
  this.payment.transactionId = transactionId;
  this.payment.paymentIntentId = paymentIntentId;
  this.payment.paidAt = new Date();
  this.status = "processing";

  return this.save();
};

// Method to fulfill order
OrderSchema.methods.fulfill = function (
  downloadUrl: string,
  expiryHours: number = 72
) {
  this.download.downloadUrl = downloadUrl;
  this.download.expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
  this.fulfillmentStatus = "fulfilled";
  this.status = "completed";
  this.completedAt = new Date();

  return this.save();
};

// Method to initiate refund
OrderSchema.methods.refund = function (amount: number, reason: string) {
  this.payment.status = "refunded";
  this.payment.refundAmount = amount;
  this.payment.refundReason = reason;
  this.payment.refundedAt = new Date();
  this.status = "refunded";

  return this.save();
};

// Static method to find orders by buyer
OrderSchema.statics.findByBuyer = function (buyerId: mongoose.Types.ObjectId) {
  return this.find({ buyer: buyerId }).sort({ createdAt: -1 });
};

// Static method to find orders by seller
OrderSchema.statics.findBySeller = function (
  sellerId: mongoose.Types.ObjectId
) {
  return this.find({ seller: sellerId }).sort({ createdAt: -1 });
};

// Static method to find recent sales
OrderSchema.statics.findRecentSales = function (limit: number = 10) {
  return this.find({ status: "completed" })
    .sort({ completedAt: -1 })
    .limit(limit)
    .populate("buyer", "name")
    .populate("template", "title slug");
};

// Pre-save middleware to set order number
OrderSchema.pre("save", function (next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    this.orderNumber = `ORD-${timestamp}-${randomStr}`.toUpperCase();
  }
  next();
});

// Pre-save middleware to set expiry for pending orders
OrderSchema.pre("save", function (next) {
  if (this.isNew && this.status === "pending" && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  }
  next();
});

const Order = (mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema)) as IOrderModel;

export default Order;
