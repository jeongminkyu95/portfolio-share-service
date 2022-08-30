import { CommentModel } from "../schemas/comment";
import { PostModel } from "../schemas/post";

class Comment {
  static async createComment({ newComment}) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }

  static async findByPostId({ post_id }) {
    const post = await PostModel.findOne({ id: post_id });
    return post;
  }

  static async findComments({ post_id }) {
    const comments = await CommentModel.find({ post_id: post_id });
    return comments;
  }

  static async findById({ id }) {
    const comment = await CommentModel.findOne({ id: id });
    return comment;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteById({ id }) {
    const comment = await CommentModel.deleteOne({ id: id });
    return comment;
  }
}

export { Comment };