import { Comment } from "../db";
import { v4 as uuidv4 } from "uuid";

class commentService {
    static async addComment({ post_id, name, comment }) {
        const posts = await Comment.findByPostId({ post_id });
        if (!posts) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        const id = uuidv4();
        const newComment = { id, post_id, name, comment };
        
        const createdNewComment = await Comment.createComment({ newComment });
        createdNewComment.errorMessage = null;

        return createdNewComment;
    }

    static async getComments({ post_id }) {
        const comments = await Comment.findComments({ post_id });
        if (comments.length === 0) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return comments;
    }

    static async setComment({ id, toUpdate}) {
        let comment = await Comment.findById({ id });

        if (!comment) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
    
        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            comment = await Comment.update({ id, fieldToUpdate, newValue });
        }
  
        if (toUpdate.comment) {
            const fieldToUpdate = "comment";
            const newValue = toUpdate.comment;
            comment = await Comment.update({ id, fieldToUpdate, newValue });
        }
  
        return comment;
    }

    static async deleteComment({ id }) {
        let comments = await Comment.findById({ id });
        if (!comments) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        comments  = await Comment.deleteById({ id });

        return comments;
    }
}

export { commentService };