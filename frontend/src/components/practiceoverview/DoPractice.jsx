import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import axios from "axios";
import toast from "react-hot-toast";

const Dopractice = ({ practice, isStarted }) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(practice.timeLimit || 0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [answerText, setAnswerText] = useState("");
    const [answerRecording, setAnswerRecording] = useState("");

    // handle recording
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);

    const handleToggleRecording = async () => {
        if (!recording) {
            setMessage("");
            chunks.current = [];
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) chunks.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks.current, { type: "audio/mp4" });
                setAudioBlob(blob);
            };

            mediaRecorder.start();
        } else {
            mediaRecorderRef.current?.stop();
        }
        setRecording(!recording);
    };

    const handleSave = async () => {
        if (!audioBlob) {
            setMessage("録音データがありません。");
            return;
        }

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.mp4");

        setUploading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setAnswerRecording(response.data.url);
            setMessage("アップロード成功！ ファイルURL: " + response.data.url);

            handleSubmitPractice(response.data.url);
        } catch (error) {
            setMessage(
                "アップロード失敗: " + error.response?.data?.message ||
                    error.message
            );
        } finally {
            setUploading(false);
        }
    };

    const handlePlayRecording = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };
    // handle recording

    // Countdown Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(
                () => setTimeLeft((prev) => prev - 1),
                1000
            );
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // Calculate Progress
    //   const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = practice.number_of_questions;

    const handleSaveAnswer = () => {
        const currentAnswer = answers[currentQuestion];
        if (currentAnswer) {
            console.log(`Answer saved for question ${currentQuestion}`);
        } else {
            console.log("Please provide an answer");
        }
    };

    const handleSubmitPractice = async (answerRecording) => {
        // console.log("Test submitted with answers", answers);
        // navigate("/test-result");

        if (!answerText && !answerRecording) {
            alert("回答を入力してください。");
            return;
        }

        const payload = {
            answerText,
            answerRecording,
        };

        try {
            // handle call API save answer
            const res = await axios.post(
                "http://localhost:5000/api/practice/64a7e4c60123d9539987bc10/user/64a7e4c60123d9539987bc02/save",
                payload
            );

            if (res.data.status === 200) {
                toast.success("回答が保存されました。");
                // navigate("/test-result");
            } else {
                toast.error("回答の保存に失敗しました。");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const totalAnswered = Object.keys(answers).length; // Đếm số câu hỏi đã trả lời
        setAnsweredQuestions(totalAnswered); // Cập nhật số câu hỏi đã trả lời
    }, [answers]);

    const progress = Math.round((answeredQuestions / totalQuestions) * 100);

    return (
        <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow-xl">
            {/* Timer */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-left text-3xl font-bold text-blue-800">
                    {practice.title}
                </h1>
                {practice.timeLimit && (
                    <div className="text-right text-xl font-semibold text-red-600">
                        {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Question Selector */}

                {/* Current Question */}
                <div className="w-full bg-white p-4 rounded shadow">
                    <h3 className="text-left text-lg font-semibold text-blue-700 mb-4">
                        {/* Q{currentQuestion + 1}:{" "} */}
                        {practice.questions[currentQuestion].question}
                    </h3>
                    <span className="text-black">
                        <span className="font-bold"> 問題:</span>
                        あなたは、日本にある、企業に人を紹介する会社で働いています。社長があなた
                        くにしてん かんが かいぎ しゃちょう しつもん
                        の国に支店をつくろうと考えています。会議で社長があなたに質問します。それを
                        こた 聞いて答えてください。 くにかいしゃ
                    </span>
                    <p>
                        ・あなたの国で会社をつくることについて あたら してん
                        はたら
                    </p>
                    <p>・あなたが新しい支店で働くことについて</p>
                    <div className="mb-4 mt-4 m-auto">
                        {practice.questions[currentQuestion].type ===
                            "video" && (
                            <>
                                <div className="mb-4 flex justify-center">
                                    <iframe
                                        width="700"
                                        height="400"
                                        src="https://www.youtube.com/embed/nCCwUiVDUwc"
                                        title="Video question"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <textarea
                                    type="text"
                                    className="w-full h-36 p-2 border rounded resize-none outline-none"
                                    placeholder="回答を入力してください"
                                    value={answerText}
                                    onChange={(e) =>
                                        setAnswerText(e.target.value)
                                    }
                                />
                            </>
                        )}
                    </div>

                    {/* Hiển thị thông báo */}
                    {message && (
                        <p className="mt-4 mb-4 text-md font-bold text-blue-700">
                            {message}
                        </p>
                    )}

                    {/* Recording video */}
                    <div className="w-full flex">
                        {/* Nút toggle ghi âm */}
                        <button
                            onClick={handleToggleRecording}
                            className={`px-4 py-2 rounded text-white ${
                                recording ? "bg-red-500" : "bg-green-500"
                            } hover:bg-opacity-80`}
                        >
                            {recording ? "録音停止" : "録音開始"}
                        </button>

                        {/* Nút Play Recording */}
                        {audioBlob && (
                            <button
                                onClick={handlePlayRecording}
                                className="ml-4 px-4 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-700"
                            >
                                再生
                            </button>
                        )}

                        {/* Nút Save */}
                        <button
                            onClick={handleSave}
                            disabled={recording || uploading || !audioBlob}
                            className={`ml-4 px-4 py-2 rounded text-white flex items-center ${
                                recording || !audioBlob
                                    ? "bg-gray-400"
                                    : "bg-blue-500 hover:bg-blue-700"
                            }`}
                        >
                            {uploading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    保存中...
                                </>
                            ) : (
                                "保存"
                            )}
                        </button>
                    </div>

                    {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        ビデオをアップロード
                    </button>
                    <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        回答を保存
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Dopractice;
