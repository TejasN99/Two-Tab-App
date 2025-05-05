import { useRef, useState } from "react";

export default function ShaderTab() {
  const [input, setInput] = useState("");
  const [shaderCode, setShaderCode] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const promptToShaderMap: Record<string, string> = {
    "gradient background": `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        gl_FragColor = vec4(st.x, st.y, 0.5 + 0.5 * sin(u_time), 1.0);
      }
    `,
    "plasma": `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float color = 0.0;
        color += sin(st.x * 10.0 + u_time);
        color += sin(st.y * 10.0 + u_time);
        color += sin((st.x + st.y) * 10.0 + u_time);
        color = color / 3.0;
        gl_FragColor = vec4(vec3(color), 1.0);
      }
    `,
    "red screen": `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `,
  };

  const fetchShader = async () => {
    const shader = promptToShaderMap[input.toLowerCase().trim()];
    if (shader) {
      setShaderCode(shader);
      renderShader(shader);
    } else {
      const fallback = "// No shader found for this prompt.";
      setShaderCode(fallback);
    }
  };

  const renderShader = (fragShaderSource: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      setShaderCode("// WebGL not supported.");
      return;
    }

    // Clear any existing programs
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vertShaderSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fragShaderSource);

    if (!vertShader || !fragShader) {
      setShaderCode("// Shader compilation failed.");
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      setShaderCode("// Program linking failed.");
      return;
    }

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const renderFrame = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (timeLocation) gl.uniform1f(timeLocation, time * 0.001);
      if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  };

  return (
    <div className="shader-container">
      <div className="shader-box">
        <h2 className="shader-title">Text-to-Shader</h2>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter shader prompt (e.g., 'gradient background')"
          className="shader-input"
        />

        <button onClick={fetchShader} className="shader-button">
          Generate Shader
        </button>

        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          className="shader-canvas"
        ></canvas>

        {shaderCode && (
          <pre className="shader-code">
            {shaderCode}
          </pre>
        )}
      </div>
    </div>
  );
}
