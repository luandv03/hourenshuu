// import { instance } from "../index.js";
import mongoose from "mongoose";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
import { Progress } from "../models/Progress.js";
import { Chapter } from "../models/Chapter.js";

export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.json({
        courses,
    });
});

export const getSingleCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    res.json({
        course,
    });
});

export const getChapterByCourseId = TryCatch(async (req, res) => {
    try {
        const id = req.params.id;
        // Validate courseId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid courseId");
        }

        console.log("Fetching chapters for courseId:", id);

        // Query chapters by courseId
        const chapters = await Chapter.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(id) } }, // Filter by courseId
            { $sort: { order: 1 } }, // Sort chapters by order
            {
                $lookup: {
                    from: "lectures", // Lecture collection
                    localField: "_id", // Chapter _id
                    foreignField: "chapter", // Lecture chapter reference
                    as: "lectures", // Merge results into "lectures"
                },
            },
            {
                $project: {
                    id: "$_id",
                    title: "$title",
                    description: "$description", // Assuming description is in testTitle
                    test: "$testTitle", // Assuming testTitle contains test information
                    order: "$order",
                    lectures: {
                        $map: {
                            input: "$lectures",
                            as: "lecture",
                            in: "$$lecture.title", // Extract lecture titles
                        },
                    },
                },
            },
        ]);

        return res.json({
            message: "Chapters fetched successfully",
            status: 200,
            chapters,
        });
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw new Error("Failed to fetch chapters");
    }
});

export const fetchLectures = TryCatch(async (req, res) => {
    console.log(req.params.id);
    const lectures = await Lecture.find({ course: req.params.id });

    console.log(lectures);

    if (!req.user) {
        return res.json({ lectures });
    }

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lectures });
    }

    if (!user.subscription.includes(req.params.id)) {
        return res.status(400).json({
            message: "You have not subscribed to this course",
        });
    }

    res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    if (!req.user) {
        return res.json({ lecture });
    }

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lecture });
    }

    if (!user.subscription.includes(lecture.course)) {
        return res.status(400).json({
            message: "You have not subscribed to this course",
        });
    }

    res.json({ lecture });
});

// export const fetchLectures = TryCatch(async (req, res) => {
//   const lectures = await Lecture.find({ course: req.params.id });

//   const user = await User.findById(req.user._id);

//   if (user.role === "admin") {
//     return res.json({ lectures });
//   }

//   if (!user.subscription.includes(req.params.id))
//     return res.status(400).json({
//       message: "You have not subscribed to this course",
//     });

//   res.json({ lectures });
// });

// export const fetchLecture = TryCatch(async (req, res) => {
//   const lecture = await Lecture.findById(req.params.id);

//   const user = await User.findById(req.user._id);

//   if (user.role === "admin") {
//     return res.json({ lecture });
//   }

//   if (!user.subscription.includes(lecture.course))
//     return res.status(400).json({
//       message: "You have not subscribed to this course",
//     });

//   res.json({ lecture });
// });

export const getMyCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find({ _id: req.user.subscription });

    res.json({
        courses,
    });
});

// export const checkout = TryCatch(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   const course = await Courses.findById(req.params.id);

//   if (user.subscription.includes(course._id)) {
//     return res.status(400).json({
//       message: "You already have this course",
//     });
//   }

//   const options = {
//     amount: Number(course.price * 100),
//     currency: "INR",
//   };

//   const order = await instance.orders.create(options);

//   res.status(201).json({
//     order,
//     course,
//   });
// });

export const paymentVerification = TryCatch(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.Razorpay_Secret)
        .update(body)
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const user = await User.findById(req.user._id);

        const course = await Courses.findById(req.params.id);

        user.subscription.push(course._id);

        await Progress.create({
            course: course._id,
            completedLectures: [],
            user: req.user._id,
        });

        await user.save();

        res.status(200).json({
            message: "Course Purchased Successfully",
        });
    } else {
        return res.status(400).json({
            message: "Payment Failed",
        });
    }
});

export const addProgress = TryCatch(async (req, res) => {
    const progress = await Progress.findOne({
        user: req.user._id,
        course: req.query.course,
    });

    const { lectureId } = req.query;

    if (progress.completedLectures.includes(lectureId)) {
        return res.json({
            message: "Progress recorded",
        });
    }

    progress.completedLectures.push(lectureId);

    await progress.save();

    res.status(201).json({
        message: "new Progress added",
    });
});

export const getYourProgress = TryCatch(async (req, res) => {
    const progress = await Progress.find({
        user: req.user._id,
        course: req.query.course,
    });

    if (!progress) return res.status(404).json({ message: "null" });

    const allLectures = (await Lecture.find({ course: req.query.course }))
        .length;

    const completedLectures = progress[0].completedLectures.length;

    const courseProgressPercentage = (completedLectures * 100) / allLectures;

    res.json({
        courseProgressPercentage,
        completedLectures,
        allLectures,
        progress,
    });
});
