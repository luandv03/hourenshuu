import express from "express";
import { PracticeController } from "../controllers/practice.js";

const router = express.Router();
const practiceController = new PracticeController();

// user lay cau hoi
router.post("/practice/:practice_id", practiceController.getPracticeById);

// user luu cau tra loi
router.post(
    "/practice/:practice_id/user/:user_id/save",
    practiceController.saveAnswerPractice
);

// lay practice cua user de danh gia
router.get(
    "/practice/:practiceId/user/:userId/get",
    practiceController.getPracticeById
);

// lay tat ca practice cua user
router.get("/practice/user", practiceController.getPracticeUser);

// lay practice cua user theo id
router.get(
    "/practice/:practiceId/user/:userId",
    practiceController.getPracticeUserById
);

// danh gia practice cua user
router.put(
    "/practice/:practiceUserId/regarding",
    practiceController.regardingPracticeUser
);

export default router;
