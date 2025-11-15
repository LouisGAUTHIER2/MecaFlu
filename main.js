var canvasSurface = document.getElementById("canvas");
console.log(canvasSurface);
// Vertex shader source code
const vertexShaderSource = `#version 300 es
in vec4 a_position;

void main() {
    gl_Position = a_position;
}`;

// Fragment shader source code
const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec4 u_color;

void main() {
    outColor = u_color;
}`;

// Initialize WebGL2 support
const ds = new DrawingSurface(canvasSurface, vertexShaderSource, fragmentShaderSource);

// draw basic rectangle
const positions = new Float32Array([
    0.5, 0.5,
    0.5, -0.5,
    -0.5, -0.5,
    -0.5, -0.5,
    -0.5, 0.5,
    0.5, 0.5
])

var positionAttributeLocation = ds.getUniformLocation("a_position");
var positionBuffer = ds.gl.createBuffer();
ds.gl.bindBuffer(ds.gl.ARRAY_BUFFER, positionBuffer);
ds.gl.bufferData(ds.gl.ARRAY_BUFFER, positions, ds.gl.STATIC_DRAW);

var vao = ds.gl.createVertexArray();
ds.gl.bindVertexArray(vao);
ds.gl.enableVertexAttribArray(positionAttributeLocation);

var size = 2;
var type = ds.gl.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
ds.gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

ds.clearSurface([0.0, 0.0, 0.0, 1.0]);

var colorUniformLocation = ds.getUniformLocation("u_color");
ds.gl.uniform4f(colorUniformLocation, 0.0, 1.0, 0.0, 1.0);

var primitiveType = ds.gl.TRIANGLES;
var offset = 0;
var count = 6;
ds.gl.drawArrays(primitiveType, offset, count);