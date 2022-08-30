import { Post} from "../db";
import { v4 as uuidv4 } from "uuid";

class postService {
    static async addPost({ user_id, title, description }) {
        const id = uuidv4();

        const newPost = { id, user_id, title, description };
        
        const createdNewPost = await Post.create({ newPost });
        createdNewPost.errorMessage = null;

        return createdNewPost;
    }

    static async getPosts({ user_id }) {
        const posts = await Post.findByUserId({ user_id });
        
        if (posts.length === 0) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return posts;
    }

    static async setPost({ id, toUpdate}) {
        let post = await Post.findById({ id });

        if (!post) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
    
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            post = await Post.update({ id, fieldToUpdate, newValue });
        }
  
        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            post = await Post.update({ id, fieldToUpdate, newValue });
        }
  
        return post;
    }

    static async deletePost({ id }) {
        let posts = await Post.findById({ id });
        if (!posts) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        posts  = await Post.deleteById({ id });

        return posts;
    }

}

export { postService };