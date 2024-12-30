import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sample_course_id } from "@/main";

const PracticeResult = ({ practiceUser }) => {
    return (
        <div className="p-6 mb-4 w-full mx-auto bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                結果
            </h1>

            <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    練習:{" "}
                    <span className="text-gray-800">
                        {practiceUser?.practiceName}
                    </span>
                </h3>
                <div>
                    <h3 className="text-left text-xl font-bold mb-2">答え</h3>

                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            答え
                        </label>
                        <p className="text-md font-medium bg-gray-100 rounded-sm p-2 inline-block">
                            {practiceUser?.answerText}
                        </p>
                    </div>

                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            録音
                        </label>
                        <div className="w-60 outline-none">
                            <video
                                src={practiceUser?.answerRecording}
                                controls
                                className="bg-none w-full max-h-10"
                            />
                        </div>
                    </div>

                    <h3 className="text-left text-xl font-bold my-2">採点</h3>
                    {practiceUser?.result ? (
                        <>
                            {" "}
                            <div className="p-0 m-2">
                                <label className="block text-md font-medium text-gray-700">
                                    評価
                                </label>
                                <p className="text-md font-medium bg-gray-100 rounded-sm p-2 inline-block">
                                    {practiceUser?.result}
                                </p>
                            </div>
                            <div className="p-0 m-2">
                                <label className="block text-md font-medium text-gray-700">
                                    点
                                </label>
                                <input
                                    disabled
                                    value={practiceUser?.point}
                                    type="number"
                                    className="w-24 border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                />
                            </div>
                        </>
                    ) : (
                        <div className="p-0 m-2">
                            <p>現在、課題はまだ採点されていません</p>
                            <p>お待ちください</p>
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="flex justify-center">
                <button
                    //   onClick={() => navigate(`/course/${sample_course_id}/`)}
                    onClick={() =>
                        navigate(`/course/${sample_course_id}/practiced`)
                    }
                    className="px-6 py-3 border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg hover:bg-blue-500 hover:text-white"
                >
                    回答を確認する
                </button>
            </div> */}
        </div>
    );
};

export default PracticeResult;
