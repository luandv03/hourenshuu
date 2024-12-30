import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PracticeRegarding() {
    const [regard, setRegard] = useState({
        feedback: "",
        score: 0,
    });
    const [practiceUsers, setPracticeUsers] = useState([]);

    const handleGetPracticeUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/practice/user");

        setPracticeUsers(res.data.data);

        console.log(res.data.data);
    };

    const handleSave = async (practiceUserId) => {
        if (regard.feedback === "" || regard.score === 0)
            return toast("フィードバックと点数を入力してください。");

        const res = await axios.put(
            `http://localhost:5000/api/practice/${practiceUserId}/regarding`,
            {
                result: regard.feedback,
                point: regard.score,
            }
        );

        if (res.data.status === 200) {
            toast.success("保存しました。");
        } else {
            toast.error("エラーが発生しました。");
        }
    };

    useEffect(() => {
        handleGetPracticeUsers();
    }, []);

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-left text-2xl font-bold mb-6">
                シナリオ練習1を採点
            </h1>

            {practiceUsers.length > 0 ? (
                <div>
                    <h3 className="text-left text-xl font-bold mb-2">
                        <span className="text-gray-500">
                            {practiceUsers[0]?.user_id?.name}
                        </span>
                        さんの答え
                    </h3>

                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            答え
                        </label>
                        <p className="inline-block text-md font-medium bg-gray-100 rounded-sm p-2">
                            {practiceUsers[0]?.answerText}
                        </p>
                    </div>

                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            録音
                        </label>
                        <div className="w-60 outline-none">
                            <video
                                src={practiceUsers[0]?.answerRecording}
                                controls
                                className="bg-none w-full max-h-10"
                            />
                        </div>
                    </div>

                    <h3 className="text-left text-xl font-bold my-2">採点</h3>
                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            評価
                        </label>
                        <textarea
                            value={regard.feedback}
                            onChange={(e) =>
                                setRegard({
                                    ...regard,
                                    feedback: e.target.value,
                                })
                            }
                            rows="6"
                            className="w-[700px] mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="p-0 m-2">
                        <label className="block text-md font-medium text-gray-700">
                            点
                        </label>
                        <input
                            type="number"
                            value={regard.score}
                            onChange={(e) =>
                                setRegard({
                                    ...regard,
                                    score: e.target.value,
                                })
                            }
                            className="w-24 border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => handleSave(practiceUsers[0]?._id)}
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            保存
                        </button>
                    </div>
                </div>
            ) : (
                <div>完了シナリオ練習がありません。</div>
            )}
        </div>
    );
}

export default PracticeRegarding;
