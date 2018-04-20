

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
	image.src = "https://farm6.staticflickr.com/5448/30487368834_3df548b2e6_b.jpg"
    //useful util function to return a glProgram from just vertex and fragment shader source.
      // image.src = "https://cdn0.iconfinder.com/data/icons/politicians-vol-2/478/hillary_grey-512.png"

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


    var test = new Torii("Torii");
    test.position = new Float32Array([-2,0.5,   2]);
    test.scale = [2, 2, 2];


   grobjects.push(new Torii("Torii1",new Float32Array([-0.2,2, -0.5]),[1, 4, 1]) );

  

})();

