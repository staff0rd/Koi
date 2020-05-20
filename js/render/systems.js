/**
 * A container for all persistent rendering systems
 * @param {WebGLRenderingContext} gl A WebGL context
 * @param {Random} random A randomizer
 * @param {Number} width The WebGL context width in pixels
 * @param {Number} height The WebGL context height in pixels
 * @constructor
 */
const Systems = function(gl, random, width, height) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.primitives = new Primitives(gl);
    this.randomSource = new RandomSource(gl, random);
    this.patterns = new Patterns(gl, this.randomSource);
    this.sand = new Sand(gl, this.randomSource);
    this.waves = new Waves(gl);
    this.wavePainter = new WavePainter(gl);
    this.bodies = new Bodies(gl);
};

/**
 * Resize the WebGL context
 * @param {Number} width The WebGL context width in pixels
 * @param {Number} height The WebGL context height in pixels
 */
Systems.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
};

/**
 * Target the framebuffer visible to the user
 */
Systems.prototype.targetMain = function() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.viewport(0, 0, this.width, this.height);
};

/**
 * Free all rendering systems
 */
Systems.prototype.free = function() {
    this.primitives.free();
    this.randomSource.free();
    this.patterns.free();
    this.sand.free();
    this.waves.free();
    this.wavePainter.free();
    this.bodies.free();
};