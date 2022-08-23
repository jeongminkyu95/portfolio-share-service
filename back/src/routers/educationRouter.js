import is from "@sindresorhus/is";
import { Router } from "express";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// 추가
educationRouter.post('/education/create', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const school = req.body.school;
        const major = req.body.major;
        const position = req.body.position;
        // const user_id = await userAuthService.getUser({ email, password });

        const newEducation = await educationService.addEducation({
            user_id,
            school,
            major,
            position,
          });

        if (newEducation.errorMessage) {
            throw new Error(newEducation.errorMessage);
        }
      
        res.status(201).json(newEducation);

    }catch (error) {
    next(error);
  }
})

// 수정
educationRouter.put('/educations/:id', async (req, res, next) => {
    try{
        const user_id = req.params.id;
        // console.log(user_id);
	    const { school, major, position } = req.body;

        const toUpdate = { school, major, position };
        const updatedEducation = await educationService.setEducation({ user_id, toUpdate });

        if (updatedEducation.errorMessage) {
           throw new Error(updatedEducation.errorMessage);
        }

        res.status(200).json(updatedEducation);
        } catch (error) {
          next(error);
        }
});

export { educationRouter };