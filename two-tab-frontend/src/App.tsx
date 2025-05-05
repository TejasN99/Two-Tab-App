import { useState } from "react";
import CalculatorTab from "./components/CalculatorTab";
import ShaderTab from "./components/ShaderTab";

export default function App() {
  const [tab, setTab] = useState<"calc" | "shader">("calc");

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to right, #4c6ef5, #3b82f6)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 0",
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "20px",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.5",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    border: "none",
    outline: "none",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffffff",
    color: "#3b82f6",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.05)",
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: "#ffffff",
  };

  return (
    <>
      <nav style={navbarStyle}>
        <button
          onClick={() => setTab("calc")}
          style={tab === "calc" ? activeButtonStyle : inactiveButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = tab === "calc" ? "white" : "transparent")}
          aria-pressed={tab === "calc"}
        >
          Calculator
        </button>
        <button
          onClick={() => setTab("shader")}
          style={tab === "shader" ? activeButtonStyle : inactiveButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = tab === "shader" ? "white" : "transparent")}
          aria-pressed={tab === "shader"}
        >
          Shader
        </button>
      </nav>

      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "96px" }}>
        <div style={{ width: "100%", maxWidth: "960px", padding: "0 16px" }}>
          {tab === "calc" ? <CalculatorTab /> : <ShaderTab />}
        </div>
      </main>
    </>
  );
}
