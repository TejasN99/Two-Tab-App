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

