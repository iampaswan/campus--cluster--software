import mongoose, { Schema, model, Document } from "mongoose";


export interface InterfaceUsers extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<InterfaceUsers>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

}, { timestamps: true })

export const User = model<InterfaceUsers>('users', userSchema);