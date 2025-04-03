import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import mannersData from "./assets/manners.json";
import { supabase } from "./supabaseClient";

const btnStyle = {
  padding: "1rem",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "#4f46e5",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center"
};

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  padding: "2rem",
  backgroundColor: "#1f2937",
  color: "white",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const centerButtonWrapper = {
  marginTop: "2rem",
  width: "100%",
  display: "flex",
  justifyContent: "center"
};

const Login = ({ setUsername }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input.trim()) {
      localStorage.setItem("username", input);
      setUsername(input);
      navigate("/");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ padding: "2rem", maxWidth: "400px", width: "100%", backgroundColor: "#111827", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", borderRadius: "1rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>닉네임으로 로그인</h1>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            marginBottom: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            backgroundColor: "#1f2937",
            color: "white",
            textAlign: "center",           // 텍스트 가운데 정렬
            fontSize: "1rem",              // 글자 크기 설정
            fontWeight: "400",             // 글자 두께 보정
            boxSizing: "border-box"        // 패딩 포함해서 정렬 안깨지게
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleLogin}
            style={{
              ...btnStyle,
              textAlign: "center"       // ★ 추가!
          }}
        >
          입장하기
        </button>
      </div>
    </div>
    </div>
  );
};

const Home = ({ username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  const todayManner = {
    title: "어른이 수저를 드신 후 함께 식사 시작하기",
    description: "한국에서는 식사 자리에서 연장자가 먼저 수저를 든 후 함께 식사를 시작하는 것이 예의입니다."
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>안녕하세요, {username}님!</h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>오늘의 예절</h2>

      <div style={{ padding: "1rem", border: "1px solid #374151", borderRadius: "1rem", marginBottom: "2rem", backgroundColor: "#111827", width: "100%", maxWidth: "600px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{todayManner.title}</h2>
        <p style={{ marginTop: "0.5rem" }}>{todayManner.description}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "100%", maxWidth: "600px", justifyContent: "center" }}>
        <Link to="/manners" style={{ display: "flex", justifyContent: "center" }}><button style={btnStyle}>예절 모음</button></Link>
        <Link to="/quiz" style={{ display: "flex", justifyContent: "center" }}><button style={btnStyle}>예절 퀴즈</button></Link>
        <Link to="/ranking" style={{ display: "flex", justifyContent: "center" }}><button style={btnStyle}>랭킹</button></Link>
        <Link to="/mypage" style={{ display: "flex", justifyContent: "center" }}><button style={btnStyle}>마이페이지</button></Link>
      </div>
      <div style={centerButtonWrapper}>
        <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>로그아웃</button>
      </div>
    </div>
  );
};

// 예절 모음
const Manners = () => {
  return (
    <div style={{ ...containerStyle, alignItems: "center" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>예절 모음</h1>
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {mannersData.map((manner, index) => (
          <div
            key={index}
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "1rem",
              backgroundColor: "#111827",
              boxSizing: "border-box",
              wordWrap: "break-word",
              width: "100%"
            }}
          >
            <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>{manner.title}</h2>
            <p style={{ marginBottom: "0.5rem", color: "#ccc" }}>{manner.description}</p>
            <span style={{ fontSize: "0.85rem", color: "#999" }}>카테고리: {manner.category}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            홈으로
          </button>
        </Link>
      </div>
    </div>
  );
};

// 퀴즈
const Quiz = () => {
  const questions = mannersData
    .filter(m => m.quiz)
    .map(m => m.quiz);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const saveScore = async (finalScore) => {
    const username = localStorage.getItem("username") || "익명";
    const { data, error } = await supabase.from("Ranking").insert([
      {
        username,
        score: finalScore,
        timestamp: new Date().toISOString()
      }
    ]);
  };  

  const handleAnswer = async (selected) => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        await saveScore(score + 1);
        setShowResult(true);
      }
    } else {
      await saveScore(score);  // 현재 점수 저장
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div style={containerStyle}>
        <p>퀴즈 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ ...containerStyle, alignItems: "center" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>예절 퀴즈</h1>
      {showResult ? (
        <div>
          <h2>퀴즈 완료!</h2>
          <p>맞힌 문제 수: {score} / {questions.length}</p>
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>{questions[current].question}</h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                style={{
                  marginBottom: "0.75rem",
                  padding: "1rem",
                  width: "100%",
                  maxWidth: "400px",
                  backgroundColor: "#dbeafe",
                  border: "1px solid #93c5fd",
                  borderRadius: "0.5rem",
                  color: "#1e3a8a",
                  fontWeight: "600",
                  fontSize: "1rem",
                  textAlign: "center",
                  cursor: "pointer"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: "2rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            홈으로
          </button>
        </Link>
      </div>
    </div>
  );
};

// 랭킹 페이지
const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data, error } = await supabase
        .from("Ranking")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);

      if (error) {
        console.error("랭킹 불러오기 실패:", error);
      } else {
        setRanking(data);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div style={{ ...containerStyle, alignItems: "center" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>퀴즈 랭킹</h1>
      <ul style={{ width: "100%", maxWidth: "400px", textAlign: "left" }}>
        {ranking.map((entry, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            {index + 1}. {entry.username} - {entry.score}점
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "2rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            홈으로
          </button>
        </Link>
      </div>
    </div>
  );
};

// 마이페이지
const MyPage = ({ username }) => {
  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>{username}님의 마이페이지</h1>
      <p>퀴즈 정답 수: 추후 구현</p>
      <p>랭킹 기록: localStorage에 저장됨</p>
      <div style={centerButtonWrapper}>
        <Link to="/">
          <button style={btnStyle}>홈으로</button>
        </Link>
      </div>
    </div>
  );
};


// 최상위 App
const App = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("username");
    setUsername(saved || "");
  }, []);

  if (username === null) return null; // 로딩 중엔 아무것도 안 보여줘

  return (
    <Router>
      <Routes>
        {!username ? (
          <Route path="*" element={<Login setUsername={setUsername} />} />
        ) : (
          <>
            <Route path="/" element={<Home username={username} setUsername={setUsername} />} />
            <Route path="/manners" element={<Manners />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/mypage" element={<MyPage username={username} />} />
            <Route path="*" element={<Home username={username} setUsername={setUsername} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};


export default App;