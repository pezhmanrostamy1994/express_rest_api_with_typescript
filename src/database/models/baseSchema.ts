import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema(
  {
    main: Boolean,
    path: String,
    large: String,
    tumb: String,
    medium: String,
  },
  { id: false }
);
export const optionalInputSchema = new mongoose.Schema(
  {
    name: String,
    value: String,
    inputName: String,
  },
  { id: false }
);
