import is from "@sindresorhus/is";
import { Router } from "express";
import { educationService } from "../services/educationService";

const educationRouter = Router();

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

export { educationRouter };