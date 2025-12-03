var canvasSurface = document.getElementById("canvas");
console.log(canvasSurface);
// Vertex shader source code
const vertexShaderSource = `#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

// all shaders have a main function
void main() {
  vec4 pos = u_matrix * a_position;
  gl_Position = vec4(pos.xy/(1.0+pos.z),pos.zw);

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

var cube = new mesh(positions, colors, drawSurf);


function mainLoop() {
    //ds.updateCanvasSize();
    drawSurf.clearSurface([0.0, 0.0, 0.0, 1.0]);

    cube.draw();

    requestAnimationFrame(() => {
        mainLoop();
    });
}

mainLoop();