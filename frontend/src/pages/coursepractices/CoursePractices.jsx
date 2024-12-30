import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PracticeOverview from "../../components/practiceoverview/PracticeOverview";
import DoPractice from "../../components/practiceoverview/DoPractice";
import PracticeResult from "../../components/practiceoverview/PracticeResult";
import axiosInstance from "@/api/axiosInstance";
import { sample_course_id } from "@/main";
import PracImage from "./practice_image.jpg";

export const practiceSet = {
    practice1: {
        title: "シナリオ練習1",
        timeLimit: 600,
        practiceImage: PracImage,
        id: "practice_001",
        number_of_questions: 1,
        description:
            "このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
        questions: [
            {
                id: "q1",
                type: "video",
                question: "ビデオを見て質問に答えてください。",
                video: "https://www.youtube.com/embed/BGz3pkoGPag",
                options: [
                    "Today",
                    "Tomorrow",
                    "The day after tomorrow",
                    "Yesterday",
                ],
                answer: "The day after tomorrow",
                image: "https://example.com/question2.jpg",
            },
        ],
    },
};

const Practices = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState({});
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isDoPracticed, setIsDoPracticed] = useState(false);

    async function fetchLectures() {
        try {
            const { data } = await axiosInstance.get(
                `/api/lectures/${sample_course_id}`
            );
            setLectures(data.lectures);
            setLoading(false);

            if (data.lectures.length > 0) {
                setLecture(data.lectures[0]);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleEndPractice = () => {
        toast.success("Practice finished!");
        setIsEnd(true);
        setIsStart(false);
        navigate(`/course/${sample_course_id}/practiced`);
    };

    const handleStartPractice = () => {
        setIsStart(true);
    };

    const navigateLecture = (direction) => {
        const currentIndex = lectures.findIndex(
            (lec) => lec._id === lecture._id
        );
        const nextIndex =
            direction === "next"
                ? (currentIndex + 1) % lectures.length
                : (currentIndex - 1 + lectures.length) % lectures.length;
        setLecture(lectures[nextIndex]);
    };

    useEffect(() => {
        fetchLectures();
    }, []);

    const handleGetPracticeUser = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/practice/64a7e4c60123d9539987bc10/user/64a7e4c60123d9539987bc02"
        );

        if (res.data.status === 200) {
            if (res.data.data) {
                setIsDoPracticed(true);
            }
        }
    };

    useEffect(() => {
        handleGetPracticeUser();
    }, []);

    return (
        <div className="">
            {loading ? (
                <Loading />
            ) : isEnd ? (
                <PracticeResult />
            ) : (
                <>
                    {isStart ? (
                        <DoPractice
                            practice={practiceSet.practice1}
                            isStart={isStart}
                        />
                    ) : (
                        <PracticeOverview practice={practiceSet.practice1} />
                    )}
                    {isStart ? (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={handleEndPractice}
                                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                            >
                                提出する
                            </button>
                        </div>
                    ) : (
                        <>
                            {isDoPracticed ? (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/course/${sample_course_id}/practiced`
                                            )
                                        }
                                        className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                                    >
                                        回答を確認する
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={handleStartPractice}
                                        className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                                    >
                                        始める
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Practices;
{
    /* <TestOverview test = {test1}/> */
}
