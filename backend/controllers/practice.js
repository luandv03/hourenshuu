import { PracticeUser } from "../models/PracticeUser.js";
import { Practice } from "../models/Practice.js";

export class PracticeController {
    async saveAnswerPractice(req, res) {
        try {
            const { answerRecording, answerText } = req.body;
            const { practice_id, user_id } = req.params;

            const existedPractice = await PracticeUser.findOne({
                practice_id,
                user_id,
            });

            // If exits then delete
            if (existedPractice) {
                await PracticeUser.findByIdAndDelete(existedPractice._id);
            }

            const practice = await PracticeUser.create({
                answerRecording,
                answerText,
                practice_id,
                user_id,
            });

            res.status(200).json({
                status: 200,
                message: "Answer saved successfully",
                data: practice,
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to save answer", error });
        }
    }

    async getPracticeById(req, res) {
        try {
            const { practiceId } = req.params;
            const practice = await Practice.findById(practiceId);

            res.status(200).json({
                status: 200,
                message: "Get saved successfully",
                data: practice,
            });
        } catch (error) {
            res.status(500).json();
        }
    }

    async getPracticeUser(req, res) {
        try {
            const practices = await PracticeUser.find({})
                .populate("user_id")
                .sort({ createdAt: -1 });

            res.status(200).json({
                status: 200,
                message: "Get saved successfully",
                data: practices.length > 0 ? [practices[0]] : [],
            });
        } catch (error) {
            res.status(500).json();
        }
    }

    async getPracticeUserById(req, res) {
        try {
            const { practiceId, userId } = req.params;
            const practice = await PracticeUser.findOne({
                practice_id: practiceId,
                user_id: userId,
            });

            res.status(200).json({
                status: 200,
                message: "Get saved successfully",
                data: practice,
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to get practice", error });
        }
    }

    async regardingPracticeUser(req, res) {
        try {
            const { practiceUserId } = req.params;
            const { result, point } = req.body;
            const practice = await PracticeUser.findByIdAndUpdate(
                practiceUserId,
                { result, point }
            );

            res.status(200).json({
                status: 200,
                message: "Regarding successfully",
                data: practice,
            });
        } catch (error) {
            res.status(500).json();
        }
    }
}
