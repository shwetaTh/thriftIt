import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        },
        quantity:{
            type: Number,
            required: true
        }
    })

const orderSchema = new mongoose.Schema(
    {
        orderPrice:{
            type: Number,
            required: true
        },
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderItems:{
            type: [orderItemSchema]
        },
        address:{
            type: String,
            required: true
        },
        status:{
            type: String,
            enum: ["PENDING", "CANCELLED","IN DELIVERY", "DELIVERED"],
            default: "PENDING"
        }
    },{timestamps: true})
export const Order = mongoose.model("Order", orderSchema)    