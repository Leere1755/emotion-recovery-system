import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}`
    );
    const data = await response.json();
    console.log(data);
    setAnimeList(data.data);
  };

  return (
    <div className="main-container" style={{
      backgroundColor: "#008080", // 윈도우 98 배경색 (청록색)
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "monospace" // 레트로한 폰트 느낌
    }}>
      {/* 레트로 컴퓨터 모니터 프레임 */}
      <div className="monitor" style={{
        backgroundColor: "#c0c0c0", // 회색 플라스틱 느낌
        padding: "10px",
        border: "4px solid #ffffff",
        borderRightColor: "#808080",
        borderBottomColor: "#808080",
        width: "90%",
        maxWidth: "800px",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "10px 10px 0px rgba(0,0,0,0.2)"
      }}>
        {/* 파란색 상단 바 (제목 표시줄) */}
        <div style={{ 
          backgroundColor: "#000080", 
          color: "white", 
          padding: "5px 10px", 
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold"
        }}>
          <span>AnimeSearch.exe - [Internet Explorer]</span>
          <span>[?][X]</span>
        </div>

        {/* 실제 내용이 나오는 화면 구역 */}
        <div className="screen" style={{
          backgroundColor: "white",
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          border: "inset 3px #ffffff",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#333", fontSize: "2rem", marginBottom: "20px" }}>
            ✨ Anime Search ✨
          </h1>

          {/* 검색 영역 */}
          <div style={{ marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="애니메이션 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                padding: "8px",
                border: "inset 2px white",
                width: "60%",
                marginRight: "5px"
              }}
            />
            <button 
              onClick={handleSearch}
              style={{
                backgroundColor: "#c0c0c0",
                border: "2px outset white",
                padding: "8px 15px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Search
            </button>
          </div>

          {/* 결과 리스트 영역 (그리드 형태) */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
            gap: "15px" 
          }}>
            {animeList.map((anime: any) => (
              <div key={anime.mal_id} style={{ 
                border: "1px solid #808080", 
                padding: "10px",
                backgroundColor: "#f0f0f0"
              }}>
                <img 
                  src={anime.images.jpg.image_url} 
                  alt={anime.title} 
                  style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "5px" }} 
                />
                <p style={{ fontSize: "12px", fontWeight: "bold", wordBreak: "keep-all" }}>
                  {anime.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;