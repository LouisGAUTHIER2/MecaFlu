var canvasSurface = document.getElementById("canvas");

// Vertex shader source code
const vertexShaderSource = `#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

// all shaders have a main function
void main() {
  gl_Position = u_matrix * a_position;

  v_color = a_color;
}
`;

// Fragment shader source code
const fragmentShaderSource = `#version 300 es

precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

// Initialize WebGL2 support
const drawSurf = new DrawingSurface(canvasSurface, vertexShaderSource, fragmentShaderSource);

// draw basic cube

const positions = new Float32Array([
    // devant
    0.5,-0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    
    -0.5, 0.5, 0.5,
    -0.5,-0.5, 0.5,
    0.5,-0.5, 0.5,
    // arriere
    0.5,-0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5,-0.5, -0.5,
    -0.5,-0.5, -0.5,
    -0.5, 0.5, -0.5,
    // haut
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
    // bas
    -0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    // droite
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    // gauche
    -0.5, 0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
])

const colors = new Uint8Array([
    // devant
    255,0,0,
    255,0,0,
    255,0,0,
    255,0,0,
    255,0,0,
    255,0,0,
    // arriere
    0,255,255,
    0,255,255,
    0,255,255,
    0,255,255,
    0,255,255,
    0,255,255,
    //haut
    0,255,0,
    0,255,0,
    0,255,0,
    0,255,0,
    0,255,0,
    0,255,0,
    // bas
    255,0,255,
    255,0,255,
    255,0,255,
    255,0,255,
    255,0,255,
    255,0,255,
    // droite
    0,0,255,
    0,0,255,
    0,0,255,
    0,0,255,
    0,0,255,
    0,0,255,
    // gauche
    255,255,0,
    255,255,0,
    255,255,0,
    255,255,0,
    255,255,0,
    255,255,0,
]);

/*
const positions = new Float32Array([
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    -0.5,-0.5, 0.0,
    0.5, 0.5, 0.0,
    -0.5,-0.5, 0.0,
    0.5,-0.5, 0.0,
]);

const colors = new Uint8Array([
    255,   0,   0,
    255,   0,   0,
    255,   0,   0,
      0,   0, 255,
      0,   0, 255,
      0,   0, 255,
])
*/

var cubeA = new mesh(positions, colors, new vec3(2,0,-2), new vec3(0,0,0), drawSurf);
var cubeB = new mesh(positions, colors, new vec3(-2,0,2), new vec3(0,0,0), drawSurf);
var cubeC = new mesh(positions, colors, new vec3(0,0,30), new vec3(0,0,0), drawSurf);
var c = new camera(new vec3(0,0,18), new vec3(0,0,0), 30, drawSurf)

var k = 0;
function mainLoop() {
    //ds.updateCanvasSize();
    drawSurf.clearSurface([0.0, 0.0, 0.0, 1.0]);
    c.rotation.y = k
    
    cubeA.draw(c.getViewMatrix());
    cubeB.draw(c.getViewMatrix());
    cubeC.draw(c.getViewMatrix());
    
    requestAnimationFrame(() => {
        mainLoop();
    });
    k += 0.01;
}

mainLoop();