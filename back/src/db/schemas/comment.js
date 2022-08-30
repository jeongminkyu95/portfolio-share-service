import { Schema, model } from "mongoose";

const CommentSchema = new Schema (
    {
        id: {
            type: String,
            required: true,
        },
        post_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = model( "Comment", CommentSchema);
export { CommentModel };