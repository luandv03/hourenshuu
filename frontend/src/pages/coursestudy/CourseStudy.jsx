import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CourseData } from "../../context/CourseContext";
import courseImageJapanese from "./assets/japan-course.png";
import courseImageCulture from "./assets/Culture.jpg";
import courseImageVietnamese from "./assets/vietnamese.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faCheck,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import axiosInstance from "@/api/axiosInstance";

const CHAPTERS = [
    {
        id: 1,
        title: "入門",
        order: 1,
        description: "この章では、日本語の基本的な知識を学びます。",
        lectures: ["日本語の概要", "ひらがなとカタカナ", "挨拶と基本フレーズ"],
        test: "漢字",
    },
    {
        id: 2,
        title: "文法の基礎",
        order: 2,
        description: "この章では、日本語の文法について学びます。",
        lectures: ["動詞と形容詞の使い方", "助詞の基本", "日常会話の例"],
        test: "文法",
    },
    {
        id: 3,
        title: "応用",
        order: 3,
        description: "この章では、応用的な日本語スキルを習得します。",
        lectures: ["ビジネス日本語の基本", "読解と作文の練習", "試験対策"],
        test: "リスニング",
    },
];

const CourseStudy = ({ user }) => {
    const [lectures, setLectures] = useState([]);
    const [completedLectures, setCompletedLectures] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Tab1");
    const [chapters, setChapters] = useState(CHAPTERS);

    const params = useParams();
    const { fetchCourse, course } = CourseData();
    const navigate = useNavigate();

    const handleLectureCompletion = (lectureId) => {
        setCompletedLectures((prev) => [...prev, lectureId]);
    };

    async function fetchLectures() {
        try {
            console.log(course);
            const { data } = await axiosInstance.get(
                `/api/lectures/${params.id}`
            );
            console.log("lectures::", data);
            setLectures(data.lectures);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function fetchProgress() {
        try {
            const { data } = await axiosInstance.get(
                `/api/user/progress?course=${params.id}`
            );
            setCompletedLectures(data.completedLectures);
            setProgress(data.progress);
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetChapters = async () => {
        try {
            const res = await axiosInstance.get(
                `/api/course/${params.id}/chapter/get`
            );

            if (res.data.status === 200 && res.data.chapters.length > 0) {
                setChapters(res.data.chapters);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetChapters();
        fetchCourse(params.id);
        fetchLectures();
        fetchProgress();
    }, [params.id]);

    const categoryImages = {
        Japanese: courseImageJapanese,
        Culture: courseImageCulture,
        Vietnamese: courseImageVietnamese,
        Default: courseImageJapanese,
    };

    const [openChapters, setOpenChapters] = useState({}); // Track opened/closed chapters

    const toggleChapter = (chapterId) => {
        setOpenChapters((prev) => ({
            ...prev,
            [chapterId]: !prev[chapterId],
        }));
    };

    const exercises = [
        { id: 1, title: "練習問題 1" },
        { id: 2, title: "練習問題 2" },
        { id: 3, title: "練習問題 3" },
        { id: 4, title: "練習問題 4" },
    ];

    const handleRedirect = () => {
        navigate(`/lectures/${course._id}`);
    };

    return (
        <>
            {course && (
                <div className="flex flex-col gap-6 h-[1200px]">
                    {/* Section 1: Course Title and Progress Bar */}
                    <div className="flex flex-col gap-4 border-b pb-4 bg-gradient-to-r from-blue-100 to-blue-300 pl-5 text-gray-800 shadow-lg rounded-lg">
                        <h1 className="text-left text-[45px] font-bold text-blue-900">
                            {course.title}
                        </h1>
                        <div className="flex">
                            {/* Progress */}
                            <div className="w-48">
                                <div className="h-7 bg-gray-300 rounded">
                                    <div
                                        className="h-full bg-green-400 rounded"
                                        style={{ width: "30%" }}
                                    ></div>
                                </div>
                            </div>
                            {/* Start Date */}
                            <div className="flex ml-6 items-center">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="text-blue-700 pr-3"
                                    size="lg"
                                />
                                <div>
                                    <p className="text-gray-800">11-03-2024</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleRedirect}
                            className="w-[200px] bg-blue-500 from-green-400 to-green-600 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-300"
                        >
                            続ける
                        </button>
                    </div>

                    <div className="flex ">
                        {/* Section 3 */}
                        <div className="m-8 mt-6 w-full bg-gray-100 shadow rounded-lg">
                            {/* Tab Headers */}
                            <div className="flex border-b">
                                <button
                                    className={`flex-1 py-2 px-4 text-center ${
                                        activeTab === "Tab1"
                                            ? "bg-blue-200 font-bold border-b-2 border-blue-200"
                                            : "text-gray-600"
                                    }`}
                                    onClick={() => setActiveTab("Tab1")}
                                >
                                    学習
                                </button>
                                <button
                                    className={`flex-1 py-2 px-4 text-center ${
                                        activeTab === "Tab2"
                                            ? "bg-blue-200 font-bold border-b-2 border-blue-200"
                                            : "text-gray-600"
                                    }`}
                                    onClick={() => setActiveTab("Tab2")}
                                >
                                    練習
                                </button>
                            </div>

                            <div className="p-4">
                                {activeTab === "Tab1" && (
                                    <div>
                                        {chapters.map((chapter, index) => (
                                            <div
                                                key={chapter._id}
                                                className="mb-4"
                                            >
                                                {/* Chapter Header */}
                                                <button
                                                    className="w-full text-left py-2 px-4 bg-gray-300 rounded flex justify-between items-center"
                                                    onClick={() =>
                                                        toggleChapter(
                                                            chapter._id
                                                        )
                                                    }
                                                >
                                                    <span className="font-bold">
                                                        {`セクション${Math.abs(
                                                            chapter?.order
                                                        )}:${chapter?.title}`}
                                                    </span>
                                                    <span>
                                                        {openChapters[
                                                            chapter._id
                                                        ]
                                                            ? "▲"
                                                            : "▼"}
                                                    </span>
                                                </button>

                                                {openChapters[chapter._id] && (
                                                    <div className="mt-2 pl-4">
                                                        {/* Mô tả chương */}
                                                        <div className="mb-4 text-gray-700 font-medium">
                                                            <p>
                                                                {
                                                                    chapter?.description
                                                                }
                                                            </p>
                                                        </div>

                                                        {/* Danh sách bài học */}
                                                        {chapter?.lectures
                                                            .length > 0 &&
                                                            chapter?.lectures.map(
                                                                (
                                                                    lecture,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        className="flex"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/lectures/${course._id}`}
                                                                            className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                                                                        >
                                                                            <span className="text-left">
                                                                                {`第${
                                                                                    index +
                                                                                    1
                                                                                }課:${lecture}`}
                                                                            </span>
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    chapter?.order >
                                                                                    1
                                                                                        ? faLock
                                                                                        : faCheck
                                                                                }
                                                                                className="text-green-500 text-[20px]"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            )}

                                                        <div className="flex">
                                                            <Link
                                                                to={`/course/${course._id}/tests`}
                                                                className="m-2 w-full bg-red-200 text-black rounded hover:bg-red-300 flex items-center justify-between gap-2 py-2 p-2"
                                                            >
                                                                <span className="text-left">
                                                                    {`テスト${
                                                                        index +
                                                                        1
                                                                    }:${
                                                                        chapter?.test
                                                                    }`}
                                                                </span>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        chapter?.order >
                                                                        1
                                                                            ? faLock
                                                                            : faCheck
                                                                    }
                                                                    className="text-green-500 text-[20px]"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === "Tab2" && (
                                    <div>
                                        {/* Đây là nội dung của Tab 2. */}
                                        {exercises.map((exercise) => (
                                            <div
                                                className="flex"
                                                key={exercise.id}
                                            >
                                                <Link
                                                    to={`/course/${course._id}/practices`}
                                                    className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                                                >
                                                    <span className="text-left">
                                                        {exercise.title}
                                                    </span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 2: Course Stats */}
                        <div className="h-[400px] w-[600px] p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4">
                            <div className="w-full bg-yellow-200 rounded-lg overflow-hidden flex justify-center items-center">
                                <img
                                    src={course?.image}
                                    alt="Thumbnail"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-gray-800">
                                <p className="font-medium text-500">
                                    レッスン数: 5
                                </p>
                                <p className="font-medium text-500">
                                    演習問題数: 4
                                </p>
                                <p className="font-medium text-500">
                                    テスト数: 3
                                </p>
                                <p className="font-medium text-500">
                                    受講者数: 11
                                </p>
                            </div>
                            <button
                                onClick={handleRedirect}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                続ける
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseStudy;
