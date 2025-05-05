# 🧮🧠 WASM + Elixir + LLM Shader Playground

A small two-tab web application that demonstrates a hybrid architecture using **React**, **Rust (WASM)**, and an **Elixir backend** that communicates with an **LLM** to generate WebGL shaders.

---

## ✨ Features

### Tab 1: Rust Calculator
- Input a basic math expression (e.g., `2+2`, `(3*4)/2`).
- Expression is evaluated in **Rust**, compiled to **WebAssembly (WASM)**.
- Result is displayed directly in the React UI.

### Tab 2: Text-to-Shader
- Describe a shader in plain English (e.g., _"A rotating cube with a gradient background"_).
- The description is sent to the **Elixir backend**, which forwards it to an **LLM**.
- The LLM generates GLSL shader code (vertex/fragment or combined).
- Shader is compiled and rendered live on a `<canvas>` element.
- Raw shader code is shown in a `<pre>` block.
- If the shader is invalid, the app shows the raw response and a compile error message.

---

## 🏗️ Architecture Overview
Frontend (React + Rust/WASM)
│
├── Tab 1: Rust-based expression evaluator (in-browser via WASM)
└── Tab 2: WebGL renderer + input UI
│
▼
Backend (Elixir + Phoenix/Plug)
│
└── LLM (GPT / Gemini / LLaMA) → Shader Code

## 🛠️ Getting Started

### Prerequisites

- Node.js & npm
- Rust + `wasm-pack`
- Elixir & Mix
- LLM API key (e.g., OpenAI, Gemini, etc.)

---

## 📦 Installation

### 1. Frontend (React + WASM)

```bash
cd frontend
npm install
wasm-pack build rust_calculator --target web
npm start

rust_calculator is the Rust crate for evaluating math expressions.

wasm-pack compiles the Rust code to WebAssembly and exposes it to JS.

### 2. Backend (Elixir)
bash
Copy
Edit
cd backend
mix deps.get
mix phx.server
The Elixir server should expose an endpoint like POST /shader that accepts the description and returns GLSL code.



