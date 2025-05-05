import { useState, useEffect } from "react";
import init, { eval_expr } from "../rust-wasm/pkg/rust_wasm";

export default function CalculatorTab() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="calculator-container">
  <div className="calculator-box">
    <h2 className="calculator-title">Rust-Powered Calculator</h2>

    <input
      className="calculator-input"
      value={expr}
      onChange={(e) => setExpr(e.target.value)}
      placeholder="Enter an expression, e.g., 2 + 2"
    />

    <div className="calculator-button-container">
      <button
        className="calculator-button"
        onClick={() => setResult(eval_expr(expr))}
      >
        Calculate
      </button>
    </div>

    {result !== null && (
      <p className="calculator-result">Result: {result}</p>
    )}
  </div>
</div>

  );
}
