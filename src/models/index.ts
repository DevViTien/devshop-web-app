// Central export file for all Mongoose models
export { default as User, type IUser } from "./User";
export { default as Template, type ITemplate } from "./Template";
export { default as Order, type IOrder } from "./Order";
export { default as Review, type IReview } from "./Review";

// Re-export mongoose types for convenience
export type { ObjectId } from "mongoose";
export { Types } from "mongoose";
