const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
  alert("WebGL2 not supported");
}

gl.viewport(0, 0, canvas.width, canvas.height);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = createProgram(gl,
  Shaders["noise-vert"],
  Shaders["noise-frag"]
);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const quad = new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1
]);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

const posLoc = gl.getAttribLocation(program, "Position");
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.bindVertexArray(vao);

const timeLoc = gl.getUniformLocation(program, "uTime");

function render(t) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform1f(timeLoc, t * 0.001);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

render();