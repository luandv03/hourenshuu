import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Courses } from "../models/Courses.js";
import { User } from "../models/User.js";
import { Lecture } from "../models/Lecture.js";
import { Chapter } from "../models/Chapter.js";
import { Practice } from "../models/Practice.js";
import { PracticeUser } from "../models/PracticeUser.js";

const DB_URL = process.env.DB;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const seedRoles = async () => {
  // Connect to db
  mongoose
    .connect(DB_URL, options)
    .then(() => {
      console.log("Mongoose is connected");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));

  console.log("Seeding data...");

  const courses = [
    {
      _id: "67703ce382a229f497f2b16a",
      title: "報連相の基本",
      description: "報連相の基本についての入門コースです。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Tanaka",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b16b",
      title: "報連相とは何か",
      description: "報連相の意味と重要性について学びます。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 30,
      createdBy: "Yamada",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b16c",
      title: "報連相の日本文化における役割",
      description: "報連相が日本文化にどのように根付いているかを学びます。",
      image:
        "https://to-ieba.com/wp-content/uploads/2023/10/japanese-culture.jpg",
      level: "中級",
      duration: 15,
      createdBy: "Saito",
      category: "日本文化",
    },
    {
      _id: "67703ce382a229f497f2b16d",
      title: "チーム内での報連相の実践",
      description: "チーム内で効果的に報連相を実践する方法を学びます。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Akira",
      category: "チーム内",
    },
    {
      _id: "67703ce382a229f497f2b16e",
      title: "ビジネスにおける報連相の重要性",
      description: "ビジネス環境で報連相がどのように役立つかを学びます。",
      image:
        "https://sherpaworks.jp/sherpa/cms/wp-content/uploads/2022/10/EyeCatch46-3-1.png",
      level: "初級",
      duration: 15,
      createdBy: "Yamamoto",
      category: "ビジネス",
    },
    {
      _id: "67703ce382a229f497f2b16f",
      title: "報連相の基本的なスキル",
      description: "報連相の基本的なスキルを習得します。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Sakura",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b170",
      title: "報連相の実践例",
      description: "報連相の実践例を通じて学びます。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Yamada",
      category: "チーム内",
    },
    {
      _id: "67703ce382a229f497f2b171",
      title: "報連相の歴史",
      description: "報連相の歴史とその発展について学びます。",
      image:
        "https://to-ieba.com/wp-content/uploads/2023/10/japanese-culture.jpg",
      level: "中級",
      duration: 15,
      createdBy: "Tanaka",
      category: "日本文化",
    },
    {
      _id: "67703ce382a229f497f2b172",
      title: "報連相の応用",
      description: "報連相の応用方法を学びます。",
      image:
        "https://sherpaworks.jp/sherpa/cms/wp-content/uploads/2022/10/EyeCatch46-3-1.png",
      level: "中級",
      duration: 12,
      createdBy: "Tanaka",
      category: "ビジネス",
    },
    {
      _id: "67703ce382a229f497f2b173",
      title: "報連相の効果的なコミュニケーション",
      description: "報連相を使った効果的なコミュニケーション方法を学びます。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Tanaka",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b174",
      title: "報連相の実践トレーニング",
      description: "報連相の実践トレーニングを行います。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Tanaka",
      category: "チーム内",
    },
    {
      _id: "67703ce382a229f497f2b175",
      title: "報連相のビジネスケーススタディ",
      description: "ビジネスにおける報連相のケーススタディを学びます。",
      image:
        "https://sherpaworks.jp/sherpa/cms/wp-content/uploads/2022/10/EyeCatch46-3-1.png",
      level: "上級",
      duration: 15,
      createdBy: "Yamada",
      category: "ビジネス",
    },
    {
      _id: "67703ce382a229f497f2b176",
      title: "報連相の基本的な概念",
      description: "報連相の基本的な概念を理解します。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Yamada",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b177",
      title: "報連相のチームビルディング",
      description: "報連相を使ったチームビルディングの方法を学びます。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Yamada",
      category: "チーム内",
    },
    {
      _id: "67703ce382a229f497f2b178",
      title: "報連相のビジネス戦略",
      description: "ビジネスにおける報連相の戦略を学びます。",
      image:
        "https://sherpaworks.jp/sherpa/cms/wp-content/uploads/2022/10/EyeCatch46-3-1.png",
      level: "上級",
      duration: 15,
      createdBy: "Yamada",
      category: "ビジネス",
    },
    {
      _id: "67703ce382a229f497f2b179",
      title: "報連相の基本的な原則",
      description: "報連相の基本的な原則を学びます。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Sakura",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b17a",
      title: "報連相のチームワーク",
      description: "報連相を使ったチームワークの向上方法を学びます。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Sakura",
      category: "チーム内",
    },
    {
      _id: "67703ce382a229f497f2b17b",
      title: "報連相のビジネスコミュニケーション",
      description: "ビジネスにおける報連相のコミュニケーション方法を学びます。",
      image:
        "https://sherpaworks.jp/sherpa/cms/wp-content/uploads/2022/10/EyeCatch46-3-1.png",
      level: "上級",
      duration: 15,
      createdBy: "Sakura",
      category: "ビジネス",
    },
    {
      _id: "67703ce382a229f497f2b17c",
      title: "報連相の基本的な手法",
      description: "報連相の基本的な手法を学びます。",
      image:
        "https://livable-hub.com/wp-content/uploads/20220302_hourensou_2.jpg",
      level: "初級",
      duration: 10,
      createdBy: "Sakura",
      category: "基本",
    },
    {
      _id: "67703ce382a229f497f2b17d",
      title: "報連相のチーム内コミュニケーション",
      description: "チーム内での報連相のコミュニケーション方法を学びます。",
      image:
        "https://kaizen-base.com/wp/wp-content/uploads/2021/10/houreisou.gif",
      level: "中級",
      duration: 12,
      createdBy: "Yamamoto",
      category: "チーム内",
    },
  ];

  try {
    await Courses.deleteMany({});
    await Courses.insertMany(courses);
    console.log("Courses seeded successfully!");

    const chapters = [
      {
        _id: "677044cd82a229f497f2b182",
        title: "報連相の基本 - 理論と概念",
        order: 1,
        description:
          "このセッションでは、報連相の基本的な理論と概念について学びます。",
        testTitle: "報連相の基本テスト1",
        course: "67703ce382a229f497f2b16a",
      },
      {
        _id: "677044cd82a229f497f2b183",
        title: "報連相の基本 - 実践方法",
        order: 2,
        description: "このセッションでは、報連相の実践方法について学びます。",
        testTitle: "報連相の基本テスト2",
        course: "67703ce382a229f497f2b16a",
      },
      {
        _id: "677044cd82a229f497f2b184",
        title: "報連相の基本 - ケーススタディ",
        order: 3,
        description:
          "このセッションでは、報連相のケーススタディを通じて学びます。",
        testTitle: "報連相の基本テスト3",
        course: "67703ce382a229f497f2b16a",
      },
      {
        _id: "677044cd82a229f497f2b185",
        title: "報連相の歴史 - 起源と発展",
        order: 1,
        description:
          "このセッションでは、報連相の起源とその発展について学びます。",
        testTitle: "報連相の歴史テスト1",
        course: "67703ce382a229f497f2b171",
      },
      {
        _id: "677044cd82a229f497f2b186",
        title: "報連相の歴史 - 重要な出来事",
        order: 2,
        description:
          "このセッションでは、報連相の歴史における重要な出来事について学びます。",
        testTitle: "報連相の歴史テスト2",
        course: "67703ce382a229f497f2b171",
      },
      {
        _id: "677044cd82a229f497f2b187",
        title: "報連相の歴史 - 現代への影響",
        order: 3,
        description:
          "このセッションでは、報連相の歴史が現代にどのように影響を与えているかについて学びます。",
        testTitle: "報連相の歴史テスト3",
        course: "67703ce382a229f497f2b171",
      },
      {
        _id: "677044cd82a229f497f2b188",
        title: "報連相の応用 - 基本概念",
        order: 1,
        description:
          "このセッションでは、報連相の応用における基本概念について学びます。",
        testTitle: "報連相の応用テスト1",
        course: "67703ce382a229f497f2b172",
      },
      {
        _id: "677044cd82a229f497f2b189",
        title: "報連相の応用 - 実践方法",
        order: 2,
        description:
          "このセッションでは、報連相の応用における実践方法について学びます。",
        testTitle: "報連相の応用テスト2",
        course: "67703ce382a229f497f2b172",
      },
      {
        _id: "677044cd82a229f497f2b18a",
        title: "報連相の応用 - ケーススタディ",
        order: 3,
        description:
          "このセッションでは、報連相の応用におけるケーススタディを通じて学びます。",
        testTitle: "報連相の応用テスト3",
        course: "67703ce382a229f497f2b172",
      },
      {
        _id: "677044cd82a229f497f2b18b",
        title: "報連相のチームワーク - 基本概念",
        order: 1,
        description:
          "このセッションでは、報連相を使ったチームワークの基本概念について学びます。",
        testTitle: "報連相のチームワークテスト1",
        course: "67703ce382a229f497f2b17a",
      },
      {
        _id: "677044cd82a229f497f2b18c",
        title: "報連相のチームワーク - 実践方法",
        order: 2,
        description:
          "このセッションでは、報連相を使ったチームワークの実践方法について学びます。",
        testTitle: "報連相のチームワークテスト2",
        course: "67703ce382a229f497f2b17a",
      },
      {
        _id: "677044cd82a229f497f2b18d",
        title: "報連相のチームワーク - ケーススタディ",
        order: 3,
        description:
          "このセッションでは、報連相を使ったチームワークのケーススタディを通じて学びます。",
        testTitle: "報連相のチームワークテスト3",
        course: "67703ce382a229f497f2b17a",
      },
    ];

    await Chapter.deleteMany({});
    await Chapter.insertMany(chapters);
    console.log("Chapters seeded successfully");

    const lectures = [
      {
        _id: "6772a64fe3d5844691ee30f4",
        title: "報連相の基本 - 理論と概念 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の基本的な理論と概念について学びます。",
        testTitle: "報連相の基本テスト1",
        content: `
          <h2>報連相の基本</h2>
          <p>報連相（ほうれんそう）は、日本のビジネス文化において非常に重要なコミュニケーションの手法です。以下にその基本的な理論と概念について説明します。</p>
          <h3>報連相の基本</h3>
          <ol>
            <li><strong>報告（ほうこく）</strong>: 上司や関係者に対して、業務の進捗や結果を伝えること。定期的な報告や問題が発生した際の迅速な報告が求められます。</li>
            <li><strong>連絡（れんらく）</strong>: 関係者間で必要な情報を共有すること。連絡はタイムリーかつ正確であることが重要です。</li>
            <li><strong>相談（そうだん）</strong>: 問題や課題が発生した際に、上司や同僚に意見を求めること。相談することで、より良い解決策を見つけることができます。</li>
          </ol>
          <h3>理論と概念</h3>
          <ul>
            <li><strong>透明性の確保</strong>: 報連相を徹底することで、業務の透明性が高まり、組織全体の信頼関係が強化されます。</li>
            <li><strong>迅速な対応</strong>: 問題が発生した際に迅速に報告・連絡・相談を行うことで、早期に対応策を講じることができます。</li>
            <li><strong>チームワークの向上</strong>: 報連相を通じて、チーム内のコミュニケーションが円滑になり、協力体制が強化されます。</li>
          </ul>
          <p>報連相は、個人の業務効率を高めるだけでなく、組織全体のパフォーマンス向上にも寄与します。</p>
        `,
        video: "https://www.youtube.com/embed/_gVIxV1EbGU",
        course: "67703ce382a229f497f2b16a",
        chapter: "677044cd82a229f497f2b182",
      },
      {
        _id: "6772a64fe3d5844691ee3100",
        title: "報連相の基本 - 理論と概念 レッスン２",
        order: 2,
        description:
          "このセッションでは、報連相の意義、目的、そしてその重要性について学びます。",
        testTitle: "報連相の基本テスト2",
        content: `
          <h2>報連相の意義と重要性</h2>
          <p>報連相（ほうれんそう）は、日本のビジネス文化において非常に重要なコミュニケーションの手法です。以下にその意義、目的、そして重要性について説明します。</p>
          <h3>意義と目的</h3>
          <ul>
            <li><strong>情報共有の促進</strong>: 報連相を通じて、関係者間で必要な情報を迅速かつ正確に共有することができます。</li>
            <li><strong>問題解決の迅速化</strong>: 問題が発生した際に迅速に報告・連絡・相談を行うことで、早期に対応策を講じることができます。</li>
            <li><strong>信頼関係の構築</strong>: 報連相を徹底することで、業務の透明性が高まり、組織全体の信頼関係が強化されます。</li>
          </ul>
          <h3>重要性</h3>
          <ul>
            <li><strong>業務効率の向上</strong>: 報連相を通じて、個人の業務効率を高めるだけでなく、組織全体のパフォーマンス向上にも寄与します。</li>
            <li><strong>リスク管理の強化</strong>: 迅速な報告・連絡・相談を行うことで、リスクを早期に発見し、適切な対応を行うことができます。</li>
            <li><strong>チームワークの向上</strong>: 報連相を通じて、チーム内のコミュニケーションが円滑になり、協力体制が強化されます。</li>
          </ul>
          <p>報連相は、組織の成功に不可欠な要素であり、その重要性を理解し、実践することが求められます。</p>
        `,
        video: "https://www.youtube.com/embed/EFFUSptNnmk?si=hBdsWVNidcSI1tK8",
        course: "67703ce382a229f497f2b16a",
        chapter: "677044cd82a229f497f2b182",
      },
      {
        _id: "6772a64fe3d5844691ee3101",
        title: "報連相の基本 - 理論と概念 レッスン３",
        order: 3,
        description:
          "このセッションでは、報連相の学び方と練習方法について学びます。",
        testTitle: "報連相の基本テスト3",
        content: `
          <h2>報連相の学び方と練習方法</h2>
          <p>報連相（ほうれんそう）は、日本のビジネス文化において非常に重要なコミュニケーションの手法です。以下にその学び方と練習方法について説明します。</p>
          <h3>学び方</h3>
          <ul>
            <li><strong>理論の理解</strong>: 報連相の基本的な理論と概念を理解することから始めます。書籍やオンラインコースを活用して学びましょう。</li>
            <li><strong>実践の重要性</strong>: 理論を学んだ後は、実際の業務で報連相を実践することが重要です。日常の業務で意識的に報連相を行いましょう。</li>
            <li><strong>フィードバックの活用</strong>: 上司や同僚からのフィードバックを受け入れ、改善点を見つけていくことが大切です。</li>
          </ul>
          <h3>練習方法</h3>
          <ul>
            <li><strong>ロールプレイ</strong>: 同僚と一緒にロールプレイを行い、報連相のスキルを磨きます。様々なシチュエーションを想定して練習しましょう。</li>
            <li><strong>ケーススタディ</strong>: 過去の事例を分析し、どのように報連相が行われたかを学びます。成功例や失敗例から学ぶことができます。</li>
            <li><strong>定期的な振り返り</strong>: 定期的に自身の報連相の実践状況を振り返り、改善点を見つけていくことが重要です。</li>
          </ul>
          <p>報連相のスキルは、継続的な学びと練習によって向上します。日々の業務で意識的に取り組みましょう。</p>
        `,
        video: "https://www.youtube.com/embed/sZSpqF1XHg0?si=SmsYQetwgMKNTpSc",
        course: "67703ce382a229f497f2b16a",
        chapter: "677044cd82a229f497f2b182",
      },
      {
        _id: "6772a64fe3d5844691ee30f5",
        title: "報連相の基本 - 実践方法 レッスン１",
        order: 1,
        description: "このセッションでは、報連相の実践方法について学びます。",
        testTitle: "報連相の基本テスト2",
        content:
          "報連相の実践方法についての詳細な説明。\n\n### 報告の実践方法\n- 定期的な報告を行うためのスケジュールを設定します。\n- 報告内容は簡潔かつ具体的にまとめます。\n- 問題が発生した場合は、迅速に上司に報告します。\n\n### 連絡の実践方法\n- 関係者全員に必要な情報を漏れなく伝えます。\n- 連絡手段はメール、電話、チャットなど状況に応じて使い分けます。\n- 連絡内容は正確であることを確認します。\n\n### 相談の実践方法\n- 問題や課題が発生した際には、早めに上司や同僚に相談します。\n- 相談内容は具体的に説明し、解決策を一緒に考えます。\n- 相談後は、決定事項を関係者に共有します。\n\n報連相の実践方法を徹底することで、業務の効率化と組織全体のパフォーマンス向上が期待できます。",
        video: "https://www.youtube.com/embed/deZvXX6QDqQ",
        course: "67703ce382a229f497f2b16a",
        chapter: "677044cd82a229f497f2b183",
      },
      {
        _id: "6772a64fe3d5844691ee30f6",
        title: "報連相の基本 - ケーススタディ レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相のケーススタディを通じて学びます。",
        testTitle: "報連相の基本テスト3",
        content:
          "報連相のケーススタディについての詳細な説明。\n\n### ケーススタディ1: 報告の重要性\n- あるプロジェクトで、定期的な報告が行われなかったために、進捗状況が把握できず、プロジェクトが遅延しました。\n- このケースでは、定期的な報告の重要性が強調されました。\n\n### ケーススタディ2: 連絡の不足\n- チームメンバー間での連絡が不足していたため、情報の共有が不十分で、誤解やミスが発生しました。\n- このケースでは、適切な連絡手段とタイミングの重要性が示されました。\n\n### ケーススタディ3: 相談の効果\n- 問題が発生した際に、早期に上司や同僚に相談することで、迅速に解決策が見つかり、プロジェクトが順調に進みました。\n- このケースでは、相談の効果とその重要性が明らかになりました。\n\nこれらのケーススタディを通じて、報連相の実践が業務の効率化と組織全体のパフォーマンス向上にどれほど重要であるかを学びます。",
        video: "https://www.youtube.com/embed/MPP94Tm0t4c",
        course: "67703ce382a229f497f2b16a",
        chapter: "677044cd82a229f497f2b184",
      },
      {
        _id: "6772a64fe3d5844691ee30f7",
        title: "報連相の歴史 - 起源と発展 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の起源とその発展について学びます。",
        testTitle: "報連相の歴史テスト1",
        content:
          "報連相の起源とその発展についての詳細な説明。\n\n### 起源\n- 報連相の概念は、日本の伝統的なコミュニケーション文化に根ざしています。\n- 古代からの報告、連絡、相談の重要性が強調されてきました。\n\n### 発展\n- 20世紀に入り、企業文化としての報連相が確立されました。\n- 現代のビジネス環境においても、報連相は重要なコミュニケーション手法として活用されています。\n\n報連相の歴史を学ぶことで、その重要性と現代への適用方法を理解することができます。",
        video: "https://www.youtube.com/embed/ELjNwMaX6yE",
        course: "67703ce382a229f497f2b171",
        chapter: "677044cd82a229f497f2b185",
      },
      {
        _id: "6772a64fe3d5844691ee30f8",
        title: "報連相の歴史 - 重要な出来事 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の歴史における重要な出来事について学びます。",
        testTitle: "報連相の歴史テスト2",
        content:
          "報連相の歴史における重要な出来事についての詳細な説明。\n\n### 重要な出来事\n- 1950年代: 報連相の概念が企業文化として広まり始めました。\n- 1980年代: 大手企業が報連相を導入し、業務効率化に成功しました。\n- 2000年代: IT技術の発展により、報連相の手法がデジタル化されました。\n\nこれらの出来事を通じて、報連相がどのように進化し、現代のビジネスにおいてどのように適用されているかを学びます。",
        video: "https://www.youtube.com/embed/ELjNwMaX6yE",
        course: "67703ce382a229f497f2b171",
        chapter: "677044cd82a229f497f2b187",
      },
      {
        _id: "6772a64fe3d5844691ee30f9",
        title: "報連相の歴史 - 現代への影響 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の歴史が現代にどのように影響を与えているかについて学びます。",
        testTitle: "報連相の歴史テスト3",
        content:
          "報連相の歴史が現代にどのように影響を与えているかについての詳細な説明。\n\n### 現代への影響\n- 報連相は、現代の企業文化においても重要な役割を果たしています。\n- 効果的なコミュニケーション手法として、多くの企業で採用されています。\n- デジタルツールの発展により、報連相の手法がさらに効率化されています。\n\n報連相の歴史を通じて、その現代への影響と重要性を理解することができます。",
        video: "https://www.youtube.com/embed/ELjNwMaX6yE",
        course: "67703ce382a229f497f2b171",
        chapter: "677044cd82a229f497f2b187",
      },
      {
        _id: "6772a64fe3d5844691ee30fa",
        title: "報連相の応用 - 基本概念 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の応用における基本概念について学びます。",
        testTitle: "報連相の応用テスト1",
        content:
          "報連相の応用における基本概念についての詳細な説明。\n\n### 基本概念\n- 報連相は、業務の効率化と組織のパフォーマンス向上に寄与します。\n- 報告、連絡、相談の各要素がどのように機能するかを理解することが重要です。\n- 効果的な報連相の実践には、タイムリーかつ正確な情報共有が求められます。\n\n報連相の基本概念を理解することで、その応用方法を効果的に学ぶことができます。",
        video: "https://youtu.be/MPP94Tm0t4c?si=ESp-HdrG9MskH4h-",
        course: "67703ce382a229f497f2b172",
        chapter: "677044cd82a229f497f2b188",
      },
      {
        _id: "6772a64fe3d5844691ee30fb",
        title: "報連相の応用 - 実践方法 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の応用における実践方法について学びます。",
        testTitle: "報連相の応用テスト2",
        content:
          "報連相の応用における実践方法についての詳細な説明。\n\n### 実践方法\n- 定期的な報告を行うためのスケジュールを設定します。\n- 連絡手段を状況に応じて使い分け、正確な情報共有を行います。\n- 問題が発生した際には、迅速に相談し、解決策を見つけます。\n\n報連相の応用における実践方法を学ぶことで、業務の効率化と組織のパフォーマンス向上を図ることができます。",
        video: "https://www.youtube.com/embed/Kgwrzy-HUWo",
        course: "67703ce382a229f497f2b172",
        chapter: "677044cd82a229f497f2b189",
      },
      {
        _id: "6772a64fe3d5844691ee30fc",
        title: "報連相の応用 - ケーススタディ レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相の応用におけるケーススタディを通じて学びます。",
        testTitle: "報連相の応用テスト3",
        content:
          "報連相の応用におけるケーススタディについての詳細な説明。\n\n### ケーススタディ1: 報告の重要性\n- あるプロジェクトで、定期的な報告が行われなかったために、進捗状況が把握できず、プロジェクトが遅延しました。\n- このケースでは、定期的な報告の重要性が強調されました。\n\n### ケーススタディ2: 連絡の不足\n- チームメンバー間での連絡が不足していたため、情報の共有が不十分で、誤解やミスが発生しました。\n- このケースでは、適切な連絡手段とタイミングの重要性が示されました。\n\n### ケーススタディ3: 相談の効果\n- 問題が発生した際に、早期に上司や同僚に相談することで、迅速に解決策が見つかり、プロジェクトが順調に進みました。\n- このケースでは、相談の効果とその重要性が明らかになりました。\n\nこれらのケーススタディを通じて、報連相の応用が業務の効率化と組織全体のパフォーマンス向上にどれほど重要であるかを学びます。",
        video: "https://www.youtube.com/embed/tfPC4G8tTJY",
        course: "67703ce382a229f497f2b172",
        chapter: "677044cd82a229f497f2b18a",
      },
      {
        _id: "6772a64fe3d5844691ee30fd",
        title: "報連相のチームワーク - 基本概念 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相を使ったチームワークの基本概念について学びます。",
        testTitle: "報連相のチームワークテスト1",
        content:
          "報連相を使ったチームワークの基本概念についての詳細な説明。\n\n### 基本概念\n- 報連相は、チーム内のコミュニケーションを円滑にし、協力体制を強化します。\n- 効果的なチームワークには、報告、連絡、相談の各要素が欠かせません。\n- チーム全員が報連相を実践することで、業務の効率化と成果の向上が期待できます。\n\n報連相を使ったチームワークの基本概念を理解することで、より良いチームパフォーマンスを実現することができます。",
        video: "https://youtu.be/qHTTXJoYP8U?si=TKWBrEUsZQw9ASRQ",
        course: "67703ce382a229f497f2b17a",
        chapter: "677044cd82a229f497f2b18b",
      },
      {
        _id: "6772a64fe3d5844691ee30fe",
        title: "報連相のチームワーク - 実践方法 レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相を使ったチームワークの実践方法について学びます。",
        testTitle: "報連相のチームワークテスト2",
        content:
          "報連相を使ったチームワークの実践方法についての詳細な説明。\n\n### 実践方法\n- チーム内での定期的な報告会を開催します。\n- 連絡手段を統一し、情報共有を円滑に行います。\n- 問題が発生した際には、チーム全員で相談し、解決策を見つけます。\n\n報連相を使ったチームワークの実践方法を学ぶことで、チームの効率化と成果の向上を図ることができます。",
        video: "https://www.youtube.com/embed/dL3eq5JU3Ic",
        course: "67703ce382a229f497f2b17a",
        chapter: "677044cd82a229f497f2b18c",
      },
      {
        _id: "6772a64fe3d5844691ee30ff",
        title: "報連相のチームワーク - ケーススタディ レッスン１",
        order: 1,
        description:
          "このセッションでは、報連相を使ったチームワークのケーススタディを通じて学びます。",
        testTitle: "報連相のチームワークテスト3",
        content:
          "報連相を使ったチームワークのケーススタディについての詳細な説明。\n\n### ケーススタディ1: 報告の重要性\n- あるプロジェクトで、定期的な報告が行われなかったために、進捗状況が把握できず、プロジェクトが遅延しました。\n- このケースでは、定期的な報告の重要性が強調されました。\n\n### ケーススタディ2: 連絡の不足\n- チームメンバー間での連絡が不足していたため、情報の共有が不十分で、誤解やミスが発生しました。\n- このケースでは、適切な連絡手段とタイミングの重要性が示されました。\n\n### ケーススタディ3: 相談の効果\n- 問題が発生した際に、早期に上司や同僚に相談することで、迅速に解決策が見つかり、プロジェクトが順調に進みました。\n- このケースでは、相談の効果とその重要性が明らかになりました。\n\nこれらのケーススタディを通じて、報連相を使ったチームワークが業務の効率化と組織全体のパフォーマンス向上にどれほど重要であるかを学びます。",
        video: "https://youtu.be/MPP94Tm0t4c?si=qvcGbThfriFkVBKN",
        course: "67703ce382a229f497f2b17a",
        chapter: "677044cd82a229f497f2b18d",
      },
    ];

    await Lecture.deleteMany({});
    await Lecture.insertMany(lectures);
    console.log("Lectures seeded successfully");

    const users = [
      {
        _id: "64a7e4c60123d9539987bc01",
        name: "管理者",
        email: "admin@hourenshuu.com",
        password: "luandeptrai",
        role: "admin",
        mainrole: "admin",
        subscription: ["64a7e4c60123d9539987bc10", "64a7e4c60123d9539987bc11"],
        resetPasswordExpire: null,
      },
      {
        _id: "64a7e4c60123d9539987bc02",
        name: "ルアン",
        email: "user@hourenshuu.com",
        password: "luandeptrai",
        role: "user",
        mainrole: "user",
        subscription: [
          "67703ce382a229f497f2b16a",
          "67703ce382a229f497f2b16b",
          "67703ce382a229f497f2b16c",
          "67703ce382a229f497f2b16d",
          "67703ce382a229f497f2b16e",
          "67703ce382a229f497f2b16f",
          "67703ce382a229f497f2b170",
        ],
        resetPasswordExpire: null,
      },
    ];

    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users seeded successfully");

    const practices = [
      {
        _id: "64a7e4c60123d9539987bc10",
        title: "報連相の基本",
        description: "報連相の基本を学びます。",
        video: "https://youtu.be/wqFoKvHbEpE",
        course_id: "67703ce382a229f497f2b16a",
      },
    ];

    await Practice.deleteMany({});
    await Practice.insertMany(practices);

    // reset PracticeUser
    await PracticeUser.deleteMany({});

    console.log("Practice seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedRoles();
