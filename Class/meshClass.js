class mesh {
    constructor(vertices, colors, position, rotation, drawSurf) {
        this.vertices = vertices;
        this.colors = colors;
        this.drawSurf = drawSurf;

        // transformation properties
        this.rotation = rotation;
        this.position = position;
        this.scale = [1,1,1];

        // initialization of buffers
        this.verticesAttributeLocation= drawSurf.getAttributeLocation("a_position");
        this.colorAttributeLocation = drawSurf.getAttributeLocation("a_color");

        this.verticesBuffer = drawSurf.gl.createBuffer();
        this.colorBuffer = drawSurf.gl.createBuffer();

        this.vao = drawSurf.gl.createVertexArray();
        drawSurf.gl.bindVertexArray(this.vao);

        drawSurf.gl.bindBuffer(drawSurf.gl.ARRAY_BUFFER, this.verticesBuffer);
        drawSurf.gl.bufferData(drawSurf.gl.ARRAY_BUFFER, this.vertices, drawSurf.gl.STATIC_DRAW);
        drawSurf.gl.enableVertexAttribArray(this.verticesAttributeLocation);
        drawSurf.gl.vertexAttribPointer(this.verticesAttributeLocation, 3, drawSurf.gl.FLOAT, false, 0, 0);

        drawSurf.gl.bindBuffer(drawSurf.gl.ARRAY_BUFFER, this.colorBuffer);
        drawSurf.gl.bufferData(drawSurf.gl.ARRAY_BUFFER, this.colors, drawSurf.gl.STATIC_DRAW);
        drawSurf.gl.enableVertexAttribArray(this.colorAttributeLocation);
        drawSurf.gl.vertexAttribPointer(this.colorAttributeLocation, 3, drawSurf.gl.UNSIGNED_BYTE, true, 0, 0);
    }

    draw(viewProjectionMatrix) {
        this.drawSurf.gl.useProgram(this.drawSurf.program);
        this.drawSurf.gl.bindVertexArray(this.vao);

        var matrix = m4.translate(viewProjectionMatrix, this.position.x, this.position.y, this.position.z);
        matrix = m4.xRotate(matrix, this.rotation.x);
        matrix = m4.yRotate(matrix, this.rotation.y);
        matrix = m4.zRotate(matrix, this.rotation.z);
        matrix = m4.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);

        var matrixLocation = this.drawSurf.getUniformLocation("u_matrix");
        this.drawSurf.gl.uniformMatrix4fv(matrixLocation, false, matrix);

        var primitiveType = this.drawSurf.gl.TRIANGLES;
        var offset = 0;
        var count = this.vertices.length/3;
        this.drawSurf.gl.drawArrays(primitiveType, offset, count);
    }
}
