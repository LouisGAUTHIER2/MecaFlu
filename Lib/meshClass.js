class mesh {
    constructor(vertices, colors, drawSurf) {
        this.vertices = vertices;
        this.colors = colors;
        this.drawSurf = drawSurf;

        // transformation properties
        this.rotation = [0,1,1];
        this.position = [0,0,1];
        this.scale = [1,1,1];

        // initialization of buffers
        this.positionAttributeLocation= drawSurf.getAttributeLocation("a_position");
        this.colorAttributeLocation = drawSurf.getAttributeLocation("a_color");

        this.positionBuffer = drawSurf.gl.createBuffer();
        this.colorBuffer = drawSurf.gl.createBuffer();

        this.vao = drawSurf.gl.createVertexArray();
        drawSurf.gl.bindVertexArray(this.vao);

        drawSurf.gl.bindBuffer(drawSurf.gl.ARRAY_BUFFER, this.positionBuffer);
        drawSurf.gl.bufferData(drawSurf.gl.ARRAY_BUFFER, this.vertices, drawSurf.gl.STATIC_DRAW);
        drawSurf.gl.enableVertexAttribArray(this.positionAttributeLocation);
        drawSurf.gl.vertexAttribPointer(this.positionAttributeLocation, 3, drawSurf.gl.FLOAT, false, 0, 0);

        drawSurf.gl.bindBuffer(drawSurf.gl.ARRAY_BUFFER, this.colorBuffer);
        drawSurf.gl.bufferData(drawSurf.gl.ARRAY_BUFFER, this.colors, drawSurf.gl.STATIC_DRAW);
        drawSurf.gl.enableVertexAttribArray(this.colorAttributeLocation);
        drawSurf.gl.vertexAttribPointer(this.colorAttributeLocation, 3, drawSurf.gl.UNSIGNED_BYTE, true, 0, 0);
    }

    draw() {
        this.drawSurf.gl.useProgram(this.drawSurf.program);
        this.drawSurf.gl.bindVertexArray(this.vao);

        var matrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0.4,
            0,0,0,1
        ];
        matrix = m4.translate(matrix, this.position[0], this.position[1], this.position[2]);
        matrix = m4.xRotate(matrix, this.rotation[0]);
        matrix = m4.yRotate(matrix, this.rotation[1]);
        matrix = m4.zRotate(matrix, this.rotation[2]);
        matrix = m4.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);

        var matrixLocation = this.drawSurf.getUniformLocation("u_matrix");
        this.drawSurf.gl.uniformMatrix4fv(matrixLocation, false, matrix);

        var primitiveType = this.drawSurf.gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        this.drawSurf.gl.drawArrays(primitiveType, offset, count);
    }
}