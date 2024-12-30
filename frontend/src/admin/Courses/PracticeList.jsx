import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faVideo, faEye } from "@fortawesome/free-solid-svg-icons";
import { FaBook, FaPen, FaRegListAlt, FaEye } from "react-icons/fa";

function PracticeList() {
    const [openChapters, setOpenChapters] = useState({}); // Track opened/closed chapters
    const navigate = useNavigate();

    const toggleChapter = (chapterId) => {
        console.log(chapterId);

        setOpenChapters((prev) => ({
            ...prev,
            [chapterId]: !prev[chapterId],
        }));
    };

    const chapters = [
        {
            id: 1,
            title: "練習問題 1",
            description: "この章では、日本語の基本的な知識を学びます。",
            lectures: [
                "第1課: 日本語の概要",
                "第2課: ひらがなとカタカナ",
                "第3課: 挨拶と基本フレーズ",
            ],
        },
        {
            id: 2,
            title: "練習問題 2",
            description: "この章では、日本語の文法について学びます。",
            lectures: [
                "第1課: 動詞と形容詞の使い方",
                "第2課: 助詞の基本",
                "第3課: 日常会話の例",
            ],
        },
        {
            id: 3,
            title: "練習問題 3",
            description: "この章では、応用的な日本語スキルを習得します。",
            lectures: [
                "第1課: ビジネス日本語の基本",
                "第2課: 読解と作文の練習",
                "第3課: 試験対策",
            ],
        },
        {
            id: 4,
            title: "練習問題 4",
            description: "この章では、応用的な日本語スキルを習得します。",
            lectures: [
                "第1課: ビジネス日本語の基本",
                "第2課: 読解と作文の練習",
                "第3課: 試験対策",
            ],
        },
    ];

    const handleRegard = (courseId) => {
        navigate("/admin/course/practice-regard/" + courseId);
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-left text-2xl font-bold mb-6">
                提出済みの課題
            </h1>{" "}
            <div className="mt-4">
                {chapters.map((chapter) => (
                    <div key={chapter.id} className="mb-4">
                        {/* Chapter Header */}
                        <button
                            className="w-full text-left py-2 px-4 bg-gray-300 rounded flex justify-between items-center"
                            onClick={() => toggleChapter(chapter.id)}
                        >
                            <span className="font-bold">{chapter.title}</span>
                            <span>{openChapters[chapter.id] ? "▲" : "▼"}</span>
                        </button>

                        {chapter.id === 1
                            ? openChapters[chapter.id] && (
                                  <div className="mt-2 pl-4">
                                      {/* Mô tả chương */}
                                      <div className="mb-4 text-gray-700 font-medium">
                                          <h2 className="font-bold">問題:</h2>
                                          <p> {chapter?.description}</p>
                                      </div>

                                      <div className="flex">
                                          <Link
                                              // to={`/lectures/${course._id}`}
                                              className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                                          >
                                              <div>
                                                  <FontAwesomeIcon
                                                      icon={faVideo}
                                                      className="text-gray-600 text-2xl"
                                                  />
                                                  <span className="ml-1 text-left">
                                                      ビデオ
                                                  </span>
                                              </div>
                                              <FontAwesomeIcon
                                                  icon={faEye}
                                                  className="text-green-500 text-[20px]"
                                              />
                                          </Link>
                                      </div>
                                      {/* het bai hoc */}
                                      {[
                                          "ルアン",
                                          "ドゥック・フ",
                                          "ゾオン",
                                          "ヒエン",
                                      ].map((name) => (
                                          <div className="m-2  bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between px-2">
                                              <div className="">
                                                  <span className="text-gray-500 font-bold">
                                                      {name}
                                                  </span>
                                                  <span>さんの答え</span>
                                              </div>
                                              <div className="flex space-x-4 py-2">
                                                  <button
                                                      className="flex items-center p-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300"
                                                      onClick={() =>
                                                          handleRegard(
                                                              chapter.id
                                                          )
                                                      }
                                                  >
                                                      <FaPen className="mr-2 text-gray-600" />
                                                      <span>採点</span>
                                                  </button>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              )
                            : openChapters[chapter.id] && (
                                  <div className="mt-2 pl-4">
                                      {/* Mô tả chương */}
                                      <div className="mb-4 text-gray-700 font-medium">
                                          <h2 className="font-bold">問題:</h2>
                                          <p> {chapter?.description}</p>
                                      </div>

                                      {/* Danh sách bài học */}
                                      <div className="flex">
                                          <Link
                                              // to={`/lectures/${course._id}`}
                                              className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                                          >
                                              <div>
                                                  <FontAwesomeIcon
                                                      icon={faVideo}
                                                      className="text-gray-600 text-2xl"
                                                  />
                                                  <span className="ml-1 text-left">
                                                      ビデオ
                                                  </span>
                                              </div>
                                              <FontAwesomeIcon
                                                  icon={faEye}
                                                  className="text-green-500 text-[20px]"
                                              />
                                          </Link>
                                      </div>
                                      {/* het bai hoc */}
                                      {[
                                          "ルアン",
                                          "ドゥック・フ",
                                          "ゾオン",
                                          "ヒエン",
                                      ].map((name) => (
                                          <div className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between px-2">
                                              <div className="">
                                                  <span className="text-gray-500 font-bold">
                                                      {name}
                                                  </span>
                                                  <span>さんの答え</span>
                                              </div>
                                              <div className="flex space-x-4 py-2">
                                                  <button
                                                      className="flex items-center p-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300"
                                                      onClick={() =>
                                                          handleRegard(
                                                              chapter.id
                                                          )
                                                      }
                                                  >
                                                      <FaPen className="mr-2 text-gray-600" />
                                                      <span>採点</span>
                                                  </button>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PracticeList;
