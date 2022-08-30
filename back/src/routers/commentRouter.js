import is from "@sindresorhus/is";
import { Router } from "express";
import { commentService } from "../services/commentService";

const commentRouter = Router();


// 게시물 댓글 작성
commentRouter.post('/comment/:post_id', async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const post_id=req.params.post_id;
  
      const name = req.body.name;
      const comment = req.body.comment;
  
      const newComment = await commentService.addComment({
          post_id,
          name,
          comment,
        });
  
      if (newComment.errorMessage) {
          throw new Error(newComment.errorMessage);
      }
    
      res.status(201).json(newComment);
  
  }catch (error) {
  next(error);
  }
  })
  
   // 게시물 댓글 조회
   commentRouter.get('/comments/:post_id', async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
  
        const comments = await commentService.getComments({post_id});
  
        if (comments.errorMessage) {
            throw new Error(comments.errorMessage);
         }
         
        res.status(200).send(comments);
      } catch (error) {
        next(error);
      }
  });

  // 게시물 댓글 수정
commentRouter.put('/comments/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
	      const { name, comment } = req.body;

        const toUpdate = { name, comment };
        const updatedComment = await commentService.setComment({ id, toUpdate });

        if (updatedComment.errorMessage) {
           throw new Error(updatedComment.errorMessage);
        }

        res.status(200).json(updatedComment);
        } catch (error) {
          next(error);
        }
});

 // 게시물 댓글 삭제
 commentRouter.delete('/comments/:id', async (req, res, next) => {
	try {
        const id = req.params.id;
		const comments = await commentService.deleteComment({ id });
    
        if (comments.errorMessage) {
            throw new Error(comments.errorMessage);
        }
        res.send("삭제가 완료되었습니다.");
	} catch (error) {
		next(error);
	};
});



export { commentRouter };