function createProgram(gl, vsSrc, fsSrc) {

    function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);

        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error(src);
            throw new Error(gl.getShaderInfoLog(s));
        }
        return s;
    }

    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);

    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);

    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p));
    }

    return p;
}
