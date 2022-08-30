import { PostModel } from "../schemas/post";

class Post {
    static async create({ newPost }) {
      const createdNewPost = await PostModel.create(newPost);
      return createdNewPost;
    }
  
    static async findByUserId({ user_id }) {
      const user = await PostModel.find({ user_id: user_id });
      return user;
    }
  
    static async findById({ id }) {
      const post = await PostModel.findOne({ id: id });
      return post;
    }
  
    static async update({ id, fieldToUpdate, newValue }) {
      const filter = { id: id };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedPost = await PostModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedPost;
    }

    static async deleteById({ id }) {
      const post = await PostModel.deleteOne({ id: id });
      return post;
    }
  }
  
  export { Post };
  