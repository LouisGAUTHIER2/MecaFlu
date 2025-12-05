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

// generate plane
var vertices_position = []
var vertices_color = []
const planeSize = 10;

for (let x = 0; x < planeSize; x++) {
    for (let z = 0; z < planeSize; z++) {
        vertices_position.push(x+1, 0, z+1);
        vertices_position.push(x, 0, z+1);
        vertices_position.push(x, 0, z);

        vertices_position.push(x, 0, z);
        vertices_position.push(x+1, 0, z+1);
        vertices_position.push(x+1, 0, z);

        vertices_color.push(0,0,255);
        vertices_color.push(0,0,255);
        vertices_color.push(0,0,255);

        vertices_color.push(0,0,255);
        vertices_color.push(0,0,255);
        vertices_color.push(0,0,255);
    }
}

vertices_position = new Float32Array(vertices_position);
vertices_color = new Uint8Array(vertices_color);

var k = 0;
var plane = new mesh(vertices_position, vertices_color, new vec3(-5,0,-5), new vec3(0,0,0), drawSurf);
var c = new camera(new vec3(0,1,-1), new vec3(-0.1,0.9,0), 30, drawSurf)

function mainLoop() {
    //ds.updateCanvasSize();
    drawSurf.clearSurface([0.0, 0.0, 0.0, 0.0]);
    
    plane.draw(c.getViewMatrix());
    requestAnimationFrame(() => {
        mainLoop();
    });
}

mainLoop();