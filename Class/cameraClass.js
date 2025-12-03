class camera {
    constructor(position, rotation, fov, drawSurf) {
        this.position = position;
        this.rotation = rotation;
        this.fov = fov;

        this.drawSurf = drawSurf
    }

    getViewMatrix() {
        var projectionMatrix = m4.perspective(
            this.fov*(Math.PI/180),
            this.drawSurf.gl.canvas.clientWidth/this.drawSurf.gl.canvas.clientHeight,
            2,
            200,
        )
        
        var cameraMatrix = m4.translate(m4.identity(), this.position.x,this.position.y,this.position.z)

        //cameraMatrix = m4.yRotation(cameraMatrix,this.rotation.y);
        //cameraMatrix = m4.translate(cameraMatrix,this.position.x,this.position.y,this.position.z);
        cameraMatrix = m4.xRotate(cameraMatrix,this.rotation.x);
        cameraMatrix = m4.yRotate(cameraMatrix,this.rotation.y);
        cameraMatrix = m4.zRotate(cameraMatrix,this.rotation.z);

        var viewMatrix = m4.inverse(cameraMatrix);

        return m4.multiply(projectionMatrix, viewMatrix)
    }
}