import is from "@sindresorhus/is";
import { Router } from "express";
import { boardService } from "../services/boardService";

const boardRouter = Router();

// 게시물 추가
boardRouter.post('/board', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const title = req.body.title;
        const content = req.body.content;

        const newBoard = await boardService.addBoard({
            title,
            content,
          });

        if (newBoard.errorMessage) {
            throw new Error(newBoard.errorMessage);
        }
      
        res.status(201).json(newBoard);

    }catch (error) {
    next(error);
  }
})

 // 게시물 조회
boardRouter.get('/boards', async (req, res, next) => {
    try {
        const boards = await boardService.getBoards();

        if (boards.errorMessage) {
            throw new Error(boards.errorMessage);
         }
         
        res.status(200).send(boards);
      } catch (error) {
        next(error);
      }
 });

// 게시물 수정
boardRouter.put('/boards/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
	      const { title, content } = req.body;

        const toUpdate = { title, content };
        const updatedBoard = await boardService.setBoard({ id, toUpdate });

        if (updatedBoard.errorMessage) {
           throw new Error(updatedBoard.errorMessage);
        }

        res.status(200).json(updatedBoard);
        } catch (error) {
          next(error);
        }
});

 // 게시물 삭제
 boardRouter.delete('/boards/:id', async (req, res, next) => {
	try {
    const id = req.params.id;
		const boards = await boardService.deleteBoard({ id });
    
    if (boards.errorMessage) {
      throw new Error(boards.errorMessage);
   }

		res.send("삭제가 완료되었습니다.");
	} catch (error) {
		next(error);
	};
});

export { boardRouter };