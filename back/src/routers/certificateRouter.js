import is from "@sindresorhus/is";
import { Router } from "express";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 자격증 정보 추가
certificateRouter.post('/certificate/create', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const when_date = req.body.when_date;

        const newCertificate = await certificateService.addCertificate({
            user_id,
            title,
            description,
            when_date,
          });

        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage);
        }
      
        res.status(201).json(newCertificate);

    }catch (error) {
    next(error);
  }
});

 // 자격증 정보 조회
 certificateRouter.get('/certificatelist/:id', async (req, res, next) => {
  try {
      const user_id = req.params.id;

      const certificates = await certificateService.getCertificates({user_id});

      if (certificates.errorMessage) {
          throw new Error(certificates.errorMessage);
       }
       
      res.status(200).send(certificates);
    } catch (error) {
      next(error);
    }
});

// 자격증 정보 수정
certificateRouter.put('/certificates/:id', async (req, res, next) => {
  try{
      const id = req.params.id;
      const { title, description, when_date } = req.body;

      const toUpdate = { title, description, when_date };
      const updatedCertificate = await certificateService.setCertificate({ id, toUpdate });

      if (updatedCertificate.errorMessage) {
         throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
      } catch (error) {
        next(error);
      }
});

export { certificateRouter };