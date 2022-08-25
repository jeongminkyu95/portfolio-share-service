import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService } from "../services/awardService";


const awardRouter = Router();

// 수상 내역 추가
awardRouter.post('/award/create', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;

        const newAward = await awardService.addAward({
            user_id,
            title,
            description,
          });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        }
      
        res.status(201).json(newAward);

    }catch (error) {
    next(error);
  }
})

// 수상 내역 수정
awardRouter.put('/awards/:id', async (req, res, next) => {
  try{
      const id = req.params.id;
      const { title, description } = req.body;

      const toUpdate = { title, description };
      const updatedAward = await awardService.setAward({ id, toUpdate });

      if (updatedAward.errorMessage) {
         throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
      } catch (error) {
        next(error);
      }
});

 // 수상 내역 조회
 awardRouter.get('/awardlist/:id', async (req, res, next) => {
    try {
        const user_id = req.params.id;

        const awards = await awardService.getAwards({user_id});
        // console.log(awards); // user_id가 다를때 awards = [] 로 나옴
        if (awards.errorMessage) { 
            throw new Error(awards.errorMessage);
         }
         
        res.status(200).send(awards);
      } catch (error) {
        next(error);
      }
 });

export { awardRouter };