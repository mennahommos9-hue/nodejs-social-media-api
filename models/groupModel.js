const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        permissions: {
            type: String,
            enum: ["public", "private"],
            default: "public"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Group", groupSchema);