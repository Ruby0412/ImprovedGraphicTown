

var grobjects = grobjects || [];


(function() {
    "use strict";

    var vertexSource = ""+
        "precision highp float;" +
        "attribute vec3 aPosition;" +
        "attribute vec2 aTexCoord;" +
        "attribute vec3 aNormal;" +
        "attribute vec3 aColor;" +
        "varying vec2 vTexCoord;" +
        "varying vec4 vNormal;" +
        "varying vec3 vlight;"+
        "varying vec3 outPos; "+
        "varying vec3 vColor; "+
        "uniform mat4 pMatrix;" +
        "uniform mat4 vMatrix;" +
        "uniform mat4 mMatrix;" +
        "uniform vec3 lightdir;"+
        "void main(void) {" +
        "  gl_Position = pMatrix * vMatrix * mMatrix * vec4(aPosition, 1.0);" +
        "  vTexCoord = aTexCoord;" +
        "  outPos = (vMatrix * mMatrix * vec4(aPosition,1.0)).xyz;" +
        "  vNormal = normalize(mMatrix * vec4(aNormal,0.0));"+
        "  vlight = lightdir;"+
        "  vColor = aColor;"+
        "}";

    var fragmentSource = "" +
        "precision highp float;" +
        "varying vec2 vTexCoord;" +
        "varying vec4 vNormal;" +
        "varying vec3 vlight;"+
        "varying vec3 outPos; "+
        "varying vec3 vColor; "+
        "uniform sampler2D uTexture;" +
        "const vec3 lightColor = vec3(1.0,1.0,1.0);" +
        "const vec3 cubeColor = vec3(1.0,0.0,0.0);" +

        "void main(void) {" +
        "vec3 n = normalize(vNormal).xyz;" +
        "vec3 e = normalize(-outPos);" +
        "vec3 l = normalize(vlight);" +
        "vec3 h = normalize(e+l);"+
        "float diffuse = .5 + .5*abs(dot(vNormal, vec4(vlight,0.0)));"+
        "vec3 specular = lightColor * pow(max(dot(n,h),0.0),32.0);"+
        "vec4 texColor = texture2D(uTexture, vTexCoord);" +
        "vec3 outColor = texColor.xyz * diffuse + specular;"+
        "gl_FragColor = vec4(outColor,1.0);" +
        "}";

    var vertices = new Float32Array(
        [
            0.5,  0.5,  1,
            -0.5,  0.5,  1,
            -0.5, -0.5,  1,

            0.5,  0.5,  1,
            -0.5, -0.5,  1,
            0.5, -0.5,  1,

            0.5,0.5, 0,
            0.5,0.5, 1,
            0.5,-0.5,1,
            0.5,0.5,0,
            0.5,-0.5,1,
            0.5,-0.5,0,

            0.5,  0.5,  0,
            -0.5,  0.5,  0,
            -0.5, -0.5,  0,

            0.5,  0.5,  0,
            -0.5, -0.5, 0,
            0.5, -0.5,  0,

            -0.5,  0.5,  0,
            -0.5,  0.5,  1,
            -0.5, -0.5,  1,

            -0.5,  0.5,  0,
            -0.5, -0.5, 1,
            -0.5, -0.5,  0,

            0.5,  0.5,  0,
            -0.5,  0.5,  0,
            -0.5, 0.5,  1,

            0.5,  0.5,  0,
            -0.5, 0.5, 1,
            0.5, 0.5,  1,

            0.5,  -0.5,  0,
            -0.5,  -0.5,  0,
            -0.5, -0.5,  1,

            0.5,  -0.5,  0,
            -0.5, -0.5, 1,
            0.5, -0.5,  1,





        ]);

    var uvs = new Float32Array(
        [  1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,





        ]);
    var vertexNormals = new Float32Array(
        [ 0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
            0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
            0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
            0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
            -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
            1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,


        ]);
    var vertexColors = new Float32Array(
        [  1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
            1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,



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
    image.src = "data:image/png;base64,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Xmg0Ih3JGQOAUCCewhgQNgCCBbSM+RAJA06sAW1EA4wKa5IvAK+VACABAgkIQFcLm/IDCEa9DWKcgBkCgqgGAAAAxaaAoDhxdugsA6A5CgeAGAZiDRAQIEtJFhAEihDhAAYom8KJCWNiIYJQmLZQAC4TMHAwckAAoACTgCu0JIJ52mBkADQBsBAGBUigCpyRU/G2sAhGCDS6ANGEcQDiQWC7ABSBIDMROF8YQUFhIAUBL4gCCgQXkoT8wCEAAQBsCA4VBRTCAJShGI2AQebDvoSPrhEkCmMaFwKhBgBSoO3JgWKMgFALAsCJYQAhEAFbHQBAAugQDFgLAlAdwC4pwJpVCHQAWgLiFsEDJAAHYVC2QICyKxLQIBYEeHiahBYbtAAmQBMBDwAmiACwDk/GGAIBQgIFAJpuHAQAFpUE0AEFoGXALRgwEYhh2MF8AGEAhgXL8KiYQgFIECAKECADEglECUDlCBEOhyQkJJWKEQkFAUHEA8gPBABCjSANDgIAgINQRgaSrgE4GJAVD6sAAQgFplkTAMJmIB4LIAo8QQjUBCFwg7AlREBA/IBSKKlDgJE+sQUACgGAAAAjYDcIyFMAIDQExgBMKQFwBGQBcAICK5AKqgcBDAAFoBQIwEYHmAmIch2BzeRoKAnBFQQGJlJKAkkFgIARQOABwQkvg5APAkhAQQAHh9MkVAkRSgJyioA//9kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA=";
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

    var Torii = function (name,position,scale) {
        this.name = name;
        this.position = position||new Float32Array([0, 0, 0]);
        this.scale = scale||new Float32Array([1, 1,1]);

        this.program = null;
        this.attributes = null;
        this.uniforms = null;
        this.buffers = [null, null]
        this.texture = null;
    }

    Torii.prototype.init = function (drawingState) {
        var gl = drawingState.gl;

        this.program = createGLProgram(gl, vertexSource, fragmentSource);
        this.attributes = findAttribLocations(gl, this.program, ["aPosition", "aTexCoord","aNormal","aColor"]);
        this.uniforms = findUniformLocations(gl, this.program, ["pMatrix", "vMatrix", "mMatrix", "uTexture","lightdir"]);

        this.texture = createGLTexture(gl, image, true);

        this.buffers[0] = createGLBuffer(gl, vertices, gl.STATIC_DRAW);
        this.buffers[1] = createGLBuffer(gl, uvs, gl.STATIC_DRAW);
        this.buffers[2] = createGLBuffer(gl, vertexNormals, gl.STATIC_DRAW);
        this.buffers[3] = createGLBuffer(gl, vertexColors, gl.STATIC_DRAW);

    }

    Torii.prototype.center = function () {
        return this.position;
    }

    Torii.prototype.draw = function (drawingState) {
        var gl = drawingState.gl;

        gl.useProgram(this.program);
        gl.disable(gl.CULL_FACE);

        var modelM = twgl.m4.scaling([this.scale[0],this.scale[1],this.scale[2]]);
        twgl.m4.setTranslation(modelM,this.position, modelM);

        gl.uniformMatrix4fv(this.uniforms.pMatrix, gl.FALSE, drawingState.proj);
        gl.uniformMatrix4fv(this.uniforms.vMatrix, gl.FALSE, drawingState.view);
        gl.uniformMatrix4fv(this.uniforms.mMatrix, gl.FALSE, modelM);
        gl.uniform3fv(this.uniforms.lightdir, drawingState.sunDirection);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.uniforms.uTexture, 0);



        enableLocations(gl, this.attributes)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[0]);
        gl.vertexAttribPointer(this.attributes.aPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[1]);
        gl.vertexAttribPointer(this.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[2]);
        gl.vertexAttribPointer(this.attributes.aNormal, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[3]);
        gl.vertexAttribPointer(this.attributes.aColor, 3, gl.FLOAT, false, 0, 0);



        gl.drawArrays(gl.TRIANGLES, 0, 36);

        disableLocations(gl, this.attributes);
    };


    //var test = new Torii("Torii");
    //test.position = new Float32Array([-2,0.5,   2]);
    //test.scale = [2, 2, 2];



    grobjects.push(new Torii("Torii1",new Float32Array([3.5,3.5,   -0.5]),[1, 1, 1]) );
    grobjects.push(new Torii("Torii2",new Float32Array([ 3.5,2.5,   -0.5]),[1, 1, 1]));
        grobjects.push(new Torii("Torii2",new Float32Array([ 3.5,2.5,   -0.5]),[1, 1, 1]));

    grobjects.push(new Torii("Torii3",new Float32Array([ 3.5, 1.5, -0.5]),[1, 1, 1]));
    grobjects.push(new Torii("Torii4",new Float32Array([ 3.5,0.5,-0.5]),[1, 1, 1]));
    
     grobjects.push(new Torii("Torii4",new Float32Array([ 0,0.5,4]),[1, 1, 1]));
     grobjects.push(new Torii("Torii4",new Float32Array([ 1,1.5,4]),[1, 1, 1]));
       grobjects.push(new Torii("Torii4",new Float32Array([ 0,2.5,4]),[1, 1, 1]));
              grobjects.push(new Torii("Torii4",new Float32Array([ -1,1.5,4]),[1, 1, 1]));



})();