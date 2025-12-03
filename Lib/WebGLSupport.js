class DrawingSurface{
    // Thanks to https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
    
    /*
    * @param {HTMLCanvasElement} canvas - the canvas element where to get the WebGL2 context
    * @param {string} vertexShaderSource - source code of the vertex shader
    * @param {string} fragmentShaderSource - source code of the fragment shader
    */
    constructor(canvas, vertexShaderSource, fragmentShaderSource) {
        // initialization of WebGL2 context
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2")

        if (!this.gl) {
            throw new Error("WebGL2 is not supported by your browser.");
            return;
        }

        // creation of the shader program
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(this.vertexShader, this.fragmentShader);

        this.gl.useProgram(this.program);

        //initialisation of canvas
        this.updateCanvasSize();
    }

    /*
    * @param {number} type - this.gl.VERTEX_SHADER | this.gl.FRAGMENT_SHADER
    * @param {string} source - source code of the shader
    * @returns {WebGLShader} - compiled shader
    */
    createShader(type, source) {
        // compilation of shader
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return shader;
        }

        const error = this.gl.getShaderInfoLog(shader);
        throw new Error("An error occurred compiling the shaders: " + error);
        this.gl.deleteShader(shader);
    }

    /*
    * @param {WebGLShader} vertexShader - compiled vertex shader
    * @param {WebGLShader} fragmentShader - compiled fragment shader
    * @returns {WebGLProgram} - linked shader program
    */
    createProgram(vertexShader, fragmentShader) {
        // creation of the shader program and linking of shaders
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            //this.gl.enable(this.gl.CULL_FACE);
            this.gl.enable(this.gl.DEPTH_TEST);

            return program;
        }

        const error = this.gl.getProgramInfoLog(program);
        throw new Error("Unable to initialize the shader program: " + error);
        this.gl.deleteProgram(program);
    }

    /*
    * @param {string} name - name of the uniform variable in the shader program
    * @returns {WebGLUniformLocation} - location of the uniform variable
    */
    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
    getAttributeLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    clearSurface(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    updateCanvasSize() {
        //resize the canvas to match the size it's displayed.
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}