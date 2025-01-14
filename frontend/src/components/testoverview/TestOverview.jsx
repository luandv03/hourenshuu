import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TestOverview = ({ test }) => {
    console.log("test overview:", test);

    const navigate = useNavigate();

    return (
        <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow-xl">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-200 text-blue-600 p-2 rounded hover:bg-blue-300 text-left pl-4 mb-4 flex items-center"
                style={{
                    clipPath:
                        "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)",
                }}
            >
                コースに戻る
            </button>

            {/* Title and Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 ">
                <div className="flex flex-col justify-between ">
                    {/* Title */}
                    <h1 className="text-left text-3xl font-bold text-blue-800">
                        {test.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    {/* Left Section */}
                    <div className="w-2/3 pr-4">
                        <h3 className="text-left text-xl font-semibold text-blue-700 mb-4">
                            テスト説明:
                        </h3>
                        <p className="text-left text-gray-800 leading-relaxed mb-6">
                            {test.description}
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg shadow">
                            <h4 className="text-left text-lg font-semibold text-blue-700 mb-2">
                                テスト詳細:
                            </h4>
                            <ul className="list-disc list-inside text-left text-gray-700">
                                <li>
                                    <span className="font-bold">質問数:</span>{" "}
                                    {test.number_of_questions} 問
                                </li>
                                <li>
                                    <span className="font-bold">回答形式:</span>
                                    <span className="font-bold text-red-500">
                                        {" "}
                                        単一選択, 複数選択
                                    </span>
                                </li>
                                <li>
                                    <span className="font-bold">時間:</span> 30
                                    分
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div>
                        <img
                            src={test.testImage}
                            alt={test.title}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>

            {/* Start Button */}
        </div>
    );
};

export default TestOverview;

// Sử dụng component này với data test1 như sau:
// <TestOverview test={test1} />
