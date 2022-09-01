import { Router } from "express";
// import { projectService } from "../services/projectService";
import { Like } from "../db/schemas/like";

const likeRouter = Router();

likeRouter.post("/like/uplike", (req, res) => {
  let { commentId, userId } = req.body;

  const LikeIns = new Like({ userId, commentId });

  LikeIns.save((err, result) => {
    if (err) return res.status(400).json({ upLike: false, err });
    return res.status(200).json({ upLike: true });
  });
});

likeRouter.post("/like/unlike", (req, res) => {
  let { commentId, userId } = req.body;

  console.log(commentId, userId);

  Like.findOneAndDelete({ commentId: commentId, userId: userId }).exec(
    (err, result) => {
      if (err) return res.status(400).json({ unLike: false, err });
      return res.status(200).json({ unLike: true });
    }
  );
});

export {likeRouter};