import is from "@sindresorhus/is";
import { Router } from "express";
import { postService } from "../services/postService";

const postRouter = Router();

// 게시물 추가
postRouter.post('/post', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;

        const newPost = await postService.addPost({
            user_id,
            title,
            description,
          });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
        }
      
        res.status(201).json(newPost);

    }catch (error) {
    next(error);
  }
})

 // 게시물 조회
postRouter.get('/posts/:id', async (req, res, next) => {
    try {
        const user_id = req.params.id;

        const posts = await postService.getPosts({user_id});

        if (posts.errorMessage) {
            throw new Error(posts.errorMessage);
         }
         
        res.status(200).send(posts);
      } catch (error) {
        next(error);
      }
 });

// 게시물 수정
postRouter.put('/posts/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
	      const { title, description } = req.body;

        const toUpdate = { title, description };
        const updatedPost = await postService.setPost({ id, toUpdate });

        if (updatedPost.errorMessage) {
           throw new Error(updatedPost.errorMessage);
        }

        res.status(200).json(updatedPost);
        } catch (error) {
          next(error);
        }
});

 // 게시물 삭제
 postRouter.delete('/posts/:id', async (req, res, next) => {
	try {
    const id = req.params.id;
		const posts = await postService.deletePost({ id });
    
    if (posts.errorMessage) {
      throw new Error(posts.errorMessage);
   }

		res.send("삭제가 완료되었습니다.");
	} catch (error) {
		next(error);
	};
});

export { postRouter };