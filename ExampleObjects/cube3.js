

var grobjects = grobjects || [];


(function() {
    "use strict";

    var vertexSource = ""+
        "precision highp float;" +
        "attribute vec3 aPosition;" +
        "attribute vec2 aTexCoord;" +
        "varying vec2 vTexCoord;" +
        "uniform mat4 pMatrix;" +
        "uniform mat4 vMatrix;" +
        "uniform mat4 mMatrix;" +
        "void main(void) {" +
        "  gl_Position = pMatrix * vMatrix * mMatrix * vec4(aPosition, 1.0);" +
        "  vTexCoord = aTexCoord;" +
        "}";

    var fragmentSource = "" +
        "precision highp float;" +
        "varying vec2 vTexCoord;" +
        "uniform sampler2D uTexture;" +
        "void main(void) {" +
        "  gl_FragColor = texture2D(uTexture, vTexCoord);" +
        "}";


    var vertices = new Float32Array([
        0.5,  0.5,  0.0,
        -0.5,  0.5,  0.0,
        -0.5, -0.5,  0.0,

        0.5,  0.5,  0.0,
        -0.5, -0.5,  0.0,
        0.5, -0.5,  0.0

    ]);

    var uvs = new Float32Array([
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ]);

    //useful util function to simplify shader creation. type is either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
    var createGLShader = function (gl, type, src) {
        var shader = gl.createShader(type)
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            console.log("warning: shader failed to compile!")
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    //see above comment on how this works.
    var image = new Image();
    image.src = "data:image/png;base64,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";
        //useful util function to return a glProgram from just vertex and fragment shader source.
    var createGLProgram = function (gl, vSrc, fSrc) {
        var program = gl.createProgram();
        var vShader = createGLShader(gl, gl.VERTEX_SHADER, vSrc);
        var fShader = createGLShader(gl, gl.FRAGMENT_SHADER, fSrc);
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.log("warning: program failed to link");
            return null;

        }
        return program;
    }

    //creates a gl buffer and unbinds it when done.
    var createGLBuffer = function (gl, data, usage) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, usage);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    var findAttribLocations = function (gl, program, attributes) {
        var out = {};
        for(var i = 0; i < attributes.length;i++){
            var attrib = attributes[i];
            out[attrib] = gl.getAttribLocation(program, attrib);
        }
        return out;
    }

    var findUniformLocations = function (gl, program, uniforms) {
        var out = {};
        for(var i = 0; i < uniforms.length;i++){
            var uniform = uniforms[i];
            out[uniform] = gl.getUniformLocation(program, uniform);
        }
        return out;
    }

    var enableLocations = function (gl, attributes) {
        for(var key in attributes){
            var location = attributes[key];
            gl.enableVertexAttribArray(location);
        }
    }

    //always a good idea to clean up your attrib location bindings when done. You wont regret it later.
    var disableLocations = function (gl, attributes) {
        for(var key in attributes){
            var location = attributes[key];
            gl.disableVertexAttribArray(location);
        }
    }

    //creates a gl texture from an image object. Sometiems the image is upside down so flipY is passed to optionally flip the data.
    //it's mostly going to be a try it once, flip if you need to.
    var createGLTexture = function (gl, image, flipY) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if(flipY){
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,  gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }

    var TexturedPlane = function () {
        this.name = "TexturedPlane"
        this.position = new Float32Array([0, 0, 0]);
        this.scale = new Float32Array([1, 1]);
        this.program = null;
        this.attributes = null;
        this.uniforms = null;
        this.buffers = [null, null]
        this.texture = null;
    }

    TexturedPlane.prototype.init = function (drawingState) {
        var gl = drawingState.gl;

        this.program = createGLProgram(gl, vertexSource, fragmentSource);
        this.attributes = findAttribLocations(gl, this.program, ["aPosition", "aTexCoord"]);
        this.uniforms = findUniformLocations(gl, this.program, ["pMatrix", "vMatrix", "mMatrix", "uTexture"]);

        this.texture = createGLTexture(gl, image, true);

        this.buffers[0] = createGLBuffer(gl, vertices, gl.STATIC_DRAW);
        this.buffers[1] = createGLBuffer(gl, uvs, gl.STATIC_DRAW);
    }

    TexturedPlane.prototype.center = function () {
        return this.position;
    }

    TexturedPlane.prototype.draw = function (drawingState) {
        var gl = drawingState.gl;

        gl.useProgram(this.program);
        gl.disable(gl.CULL_FACE);

        var modelM = twgl.m4.scaling([this.scale[0],this.scale[1], 1]);
        twgl.m4.setTranslation(modelM,this.position, modelM);

        gl.uniformMatrix4fv(this.uniforms.pMatrix, gl.FALSE, drawingState.proj);
        gl.uniformMatrix4fv(this.uniforms.vMatrix, gl.FALSE, drawingState.view);
        gl.uniformMatrix4fv(this.uniforms.mMatrix, gl.FALSE, modelM);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.uniforms.uTexture, 0);



        enableLocations(gl, this.attributes);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[0]);
        gl.vertexAttribPointer(this.attributes.aPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[1]);
        gl.vertexAttribPointer(this.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);



        gl.drawArrays(gl.TRIANGLES, 0, 6);

        disableLocations(gl, this.attributes);
    }


    var test = new TexturedPlane();
    test.position = [2.3,0.75,0];
    test.scale = [0.5, 0.5];

    var test2 = new TexturedPlane();
    test2.position = [4.3,0.75,0];
    test2.scale = [0.5, 0.5];

    var test3 = new TexturedPlane();
    test3.position = [-1.7,0.75,0];
    test3.scale = [0.5, 0.5];

    var test4 = new TexturedPlane();
    test4.position = [-3.7,0.75,0];
    test4.scale = [0.5, 0.5];

    grobjects.push(test);
    grobjects.push(test2);
    grobjects.push(test3);
    grobjects.push(test4);

})();