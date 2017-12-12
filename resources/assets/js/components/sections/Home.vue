<template>
    <div>
        <div class="section">
            <div class="logo">
                <img src="/images/logo_deep_blue_white.png" alt="Deep Blue">
                <h2>ERC20 Ethereum Standard Token for Embedded Computing</h2>
            </div>
            <div id="canvasHome"></div>
        </div>
        <div class="description">
            <div class="container">
                <p>
                    DeepBlue is the ERC20 Ethereum Standard Token that takes advantage of all the processing power
                    provided by embedded devices, low-latency systems, regular cpu computers and the ever growing amount
                    of internet of things devices. DeepBlue maximizes the use of this power and groups small quantities of
                    power into huge processing on-chain superprocessors.
                </p>
            </div>
        </div>
        <div class="aditional">
            <div class="container">
                <p>Early adopt this ERC20 Ethereum Standard.</p>
                <p>Unlock all the power provided by millions of devices.</p>
                <p>Improve the world including the excluded people and computers into the blockchain usage.</p>
                <p>Use or create meaningful ways to exchange processing power for everybody.</p>
            </div>
        </div>
        <div class="">
            <div class="subscribe">
                <div class="container">
                    <div class="text">Apply for <strong>AirDrop</strong>.</div>
                    <form @submit.prevent="submitEmail">
                        <input type="email" v-model="userEmail" placeholder="alex@domain.com">
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div id="circleCanvas"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import VueSweetAlert from 'vue-sweetalert';


    export default {
        name: 'Home',
        data () {
            return {
                userEmail: '',
                hero: {
                    particles: 80
                }
            }
        },
        methods: {
            submitEmail: function (event) {
                event.preventDefault();

                let self = this;
                axios.post('/newsletterUser', {
                    email: self.userEmail
                })
                .then(function (response) {
                    console.log(response);
                    self.userEmail = '';
                    self.$swal('Gracias por registrarte, te enviaremos las instrucciones próximamente');
                })
                .catch(function (error) {
                    console.log(error);
                });


            },
            circle: function(){
                let canvas, ctx;
                let render, init;
                let blob;
                class Blob {
                    constructor() {
                        this.points = [];
                    }
                    init() {
                        for(let i = 0; i < this.numPoints; i++) {
                            let point = new Point(this.divisional * ( i + 1 ), this);
                            // point.acceleration = -1 + Math.random() * 2;
                            this.push(point);
                        }
                    }
                    render() {
                        let canvas = this.canvas;
                        let ctx = this.ctx;
                        let position = this.position;
                        let pointsArray = this.points;
                        let radius = this.radius;
                        let points = this.numPoints;
                        let divisional = this.divisional;
                        let center = this.center;
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        pointsArray[0].solveWith(pointsArray[points-1], pointsArray[1]);
                        let p0 = pointsArray[points-1].position;
                        let p1 = pointsArray[0].position;
                        let _p2 = p1;
                        ctx.beginPath();
                        ctx.moveTo(center.x, center.y);
                        ctx.moveTo( (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 );
                        for(let i = 1; i < points; i++) {
                            pointsArray[i].solveWith(pointsArray[i-1], pointsArray[i+1] || pointsArray[0]);
                            let p2 = pointsArray[i].position;
                            var xc = (p1.x + p2.x) / 2;
                            var yc = (p1.y + p2.y) / 2;
                            ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
                            // ctx.lineTo(p2.x, p2.y);
                            ctx.fillStyle = '#000000';
                            // ctx.fillRect(p1.x-2.5, p1.y-2.5, 5, 5);
                            p1 = p2;
                        }
                        var xc = (p1.x + _p2.x) / 2;
                        var yc = (p1.y + _p2.y) / 2;
                        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
                        // ctx.lineTo(_p2.x, _p2.y);
                        // ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.strokeStyle = '#839fcd';
                        // ctx.stroke();
                        /*
                         ctx.fillStyle = '#000000';
                         if(this.mousePos) {
                         let angle = Math.atan2(this.mousePos.y, this.mousePos.x) + Math.PI;
                         ctx.fillRect(center.x + Math.cos(angle) * this.radius, center.y + Math.sin(angle) * this.radius, 5, 5);
                         }
                         */
                        requestAnimationFrame(this.render.bind(this));
                    }
                    push(item) {
                        if(item instanceof Point) {
                            this.points.push(item);
                        }
                    }
                    set color(value) {
                        this._color = value;
                    }
                    get color() {
                        return this._color || '#c6d3e8';
                    }
                    set canvas(value) {
                        if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
                            this._canvas = canvas;
                            this.ctx = this._canvas.getContext('2d');
                        }
                    }
                    get canvas() {
                        return this._canvas;
                    }
                    set numPoints(value) {
                        if(value > 2) {
                            this._points = value;
                        }
                    }
                    get numPoints() {
                        return this._points || 32;
                    }
                    set radius(value) {
                        if(value > 0) {
                            this._radius = value;
                        }
                    }
                    get radius() {
                        return this._radius || 150;
                    }
                    set position(value) {
                        if(typeof value == 'object' && value.x && value.y) {
                            this._position = value;
                        }
                    }
                    get position() {
                        return this._position || { x: 0.5, y: 0.5 };
                    }
                    get divisional() {
                        return Math.PI * 2 / this.numPoints;
                    }
                    get center() {
                        return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
                    }
                    set running(value) {
                        this._running = value === true;
                    }
                    get running() {
                        return this.running !== false;
                    }
                }
                class Point {
                    constructor(azimuth, parent) {
                        this.parent = parent;
                        this.azimuth = Math.PI - azimuth;
                        this._components = {
                            x: Math.cos(this.azimuth),
                            y: Math.sin(this.azimuth)
                        };
                        this.acceleration = -0.3 + Math.random() * 0.6;
                    }
                    solveWith(leftPoint, rightPoint) {
                        this.acceleration = (-0.3 * this.radialEffect + ( leftPoint.radialEffect - this.radialEffect ) + ( rightPoint.radialEffect - this.radialEffect )) * this.elasticity - this.speed * this.friction;
                    }
                    set acceleration(value) {
                        if(typeof value == 'number') {
                            this._acceleration = value;
                            this.speed += this._acceleration * 2;
                        }
                    }
                    get acceleration() {
                        return this._acceleration || 0;
                    }
                    set speed(value) {
                        if(typeof value == 'number') {
                            this._speed = value;
                            this.radialEffect += this._speed * 5;
                        }
                    }
                    get speed() {
                        return this._speed || 0;
                    }
                    set radialEffect(value) {
                        if(typeof value == 'number') {
                            this._radialEffect = value;
                        }
                    }
                    get radialEffect() {
                        return this._radialEffect || 0;
                    }
                    get position() {
                        return {
                            x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect),
                            y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect)
                        }
                    }
                    get components() {
                        return this._components;
                    }
                    set elasticity(value) {
                        if(typeof value === 'number') {
                            this._elasticity = value;
                        }
                    }
                    get elasticity() {
                        return this._elasticity || 0.001;
                    }
                    set friction(value) {
                        if(typeof value === 'number') {
                            this._friction = value;
                        }
                    }
                    get friction() {
                        return this._friction || 0.0085;
                    }
                }
                blob = new Blob;
                init = function() {
                    canvas = document.createElement('canvas');
                    document.getElementById('circleCanvas').appendChild(canvas);
                    let resize = function() {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    }
                    window.addEventListener('resize', resize);
                    resize();
                    let oldMousePoint = { x: 0, y: 0};
                    let hover = false;
                    let mouseMove = function(e) {
                        let pos = blob.center;
                        let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                        let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
                        let angle = null;
                        blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };
                        if(dist < blob.radius && hover === false) {
                            let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                            angle = Math.atan2(vector.y, vector.x);
                            hover = true;
                            // blob.color = '#77FF00';
                        } else if(dist > blob.radius && hover === true){
                            let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                            angle = Math.atan2(vector.y, vector.x);
                            hover = false;
                            blob.color = null;
                        }
                        if(typeof angle == 'number') {
                            let nearestPoint = null;
                            let distanceFromPoint = 100;
                            blob.points.forEach((point)=> {
                                if(Math.abs(angle - point.azimuth) < distanceFromPoint) {
                                // console.log(point.azimuth, angle, distanceFromPoint);
                                nearestPoint = point;
                                distanceFromPoint = Math.abs(angle - point.azimuth);
                            }
                        });
                            if(nearestPoint) {
                                let strength = { x: oldMousePoint.x - e.clientX, y: oldMousePoint.y - e.clientY };
                                strength = Math.sqrt((strength.x * strength.x) + (strength.y * strength.y)) * 10;
                                if(strength > 100) strength = 100;
                                nearestPoint.acceleration = strength / 100 * (hover ? -1 : 1);
                            }
                        }
                        oldMousePoint.x = e.clientX;
                        oldMousePoint.y = e.clientY;
                    }
                    window.addEventListener('mousemove', mouseMove);
                    blob.canvas = canvas;
                    blob.init();
                    blob.render();
                }
                init();
            }
        },
        mounted(){
            self = this;
            setTimeout( function () {
                let container;
                let colors = [0x839fcd, 0x9eb4d8, 0xc6d3e8];
                let camera, scene, renderer;
                let obj = [];
                init();
                animate();
                this.circle();

                let object;
                function init() {
                    container = document.createElement( "div" );
                    document.getElementById('canvasHome').appendChild( container );
                    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
                    camera.position.set( -600, 0, 0 );
                    scene = new THREE.Scene();
                    let groundMaterial = new THREE.MeshPhongMaterial({
                        color: 0x082c6a
                    });
                    let plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), groundMaterial);
                    plane.rotation.y = -Math.PI / 2;
                    plane.position.x = 500;
                    plane.receiveShadow = true;
                    scene.add(plane);
                    // LIGHTS
                    scene.add(new THREE.AmbientLight(0xFFFFFF));
                    let light;
                    light = new THREE.DirectionalLight(0xdfebff, 1.75);
                    light.position.set(-1000, 0, 0);
                    light.position.multiplyScalar(1.3);
                    light.intensity = 1;
                    light.castShadow = true;
                    // light.shadowCameraVisible = true;
                    light.shadowMapWidth = 1000;
                    light.shadowMapHeight = 1000;
                    let d = 500;
                    light.shadowCameraLeft = -d;
                    light.shadowCameraRight = d;
                    light.shadowCameraTop = d;
                    light.shadowCameraBottom = -d;
                    light.shadowCameraFar = 4000;
                    light.shadowDarkness = 0.1;
                    scene.add(light);
//                    let manager = new THREE.LoadingManager();
                    let group = new THREE.Group();
                    scene.add(group);
                    while(obj.length < self.hero.particles){
                        let item = new Tetrahedron();
                        obj.push(item)
                    }
                    for (let i = 0; i < obj.length; i++) {
                        group.add(obj[i].shape);
                    }
                    renderer = new THREE.WebGLRenderer({antialias: true});
                    renderer.shadowMapEnabled = true;
                    renderer.shadowMapSoft = true;
                    renderer.setClearColor( 0x000000 , 1 );
                    renderer.setPixelRatio( window.devicePixelRatio );
                    renderer.setSize( window.innerWidth, window.innerHeight );
                    container.appendChild( renderer.domElement );
                    // controls = new THREE.OrbitControls(camera, document, renderer.domElement);
//                    window.addEventListener( "resize", onWindowResize, false );
                }
//                function onWindowResize() {
//                    let windowHalfX = window.innerWidth / 2;
//                    let windowHalfY = window.innerHeight / 2;
//                    camera.aspect = window.innerWidth / window.innerHeight;
//                    camera.updateProjectionMatrix();
//                    renderer.setSize( window.innerWidth, window.innerHeight );
//                }
                function animate() {
                    requestAnimationFrame( animate );
                    render();
                }
                function render() {
                    camera.lookAt( scene.position );
                    renderer.render( scene, camera );
                    for (let i = 0; i < obj.length; i++) {
                        obj[i].animate();
                    }
                }
                function Tetrahedron(){
                    this.size = Math.random();
                    this.color = colors[Math.floor(Math.random()*colors.length)];
                    this.geometry = new THREE.TetrahedronGeometry(this.size*17, 0);
                    this.material = new THREE.MeshLambertMaterial({color : this.color, shading: THREE.FlatShading});
                    this.shape = new THREE.Mesh(this.geometry, this.material);
                    this.shape.position.set(Math.floor(Math.random()*150)+300, 0, 0)
                    this.circle_rotation = Math.random() * Math.PI * 2;
                    this.shape.castShadow = true;
                    this.shape.receiveShadow = true;
                    this.circle = Math.floor((Math.random() * 100) + 300);
                    this.animate = function(){
                        this.shape.position.y = Math.sin(this.circle_rotation)*this.circle;
                        this.shape.position.z = Math.cos(this.circle_rotation)*this.circle;
                        this.shape.rotation.x += this.size*0.05;
                        this.shape.rotation.z += this.size*0.1;
                        this.circle_rotation+=0.002;
                    }
                }
            }.bind(this), 300 );
        }
    }
</script>

<style lang="scss">
    $color-1: #426cb4;
    $color-2: #1b5dd5;

    .container{
        width: 100%;
        margin: 0 auto;
        display: block;
        padding: 0 15px;
        max-width: 1200px;
    }
    .section{
        height: 100vh;
        min-height: 500px;
        position: relative;
        .logo{
            z-index: 9;
            max-height: 30%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            position: absolute;
            img{
                height: 100%;
                display: block;
                margin: 0 auto;
                max-height: 500px;
            }
            h2{
                color: #FFF;
                display: block;
                margin: 0 auto;
                max-width: 500px;
                text-align: center;
                /*text-shadow: 0 0 10px rgba(0,0,0,0.5);*/
            }
        }
    }
    .subscribe{
        color: #000;
        font-size: 2rem;
        padding: 100px 0;
        text-align: center;
        position: relative;
        background: $color-2;
        .container{
            top: 50%;
            left: 0;
            right: 0;
            position: absolute;
            transform: translateY(-50%);
        }
        .text, form, button{
            color: #FFF;
            font-size: 2rem;
            margin-right: 20px;
            display: inline-block;
            vertical-align: middle;
        }
        .text{
            font-size: 3rem;
            transform: translate3d(40px, -65px, 0);
        }
        input[type="email"]{
            color: #FFF;
            font-size: 2rem;
            padding: 10px 40px;
            display: inline-block;
            vertical-align: middle;
            border: 2px solid #FFF;
            background: transparent;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
             color: #FFF;
         }
        &::-moz-placeholder { /* Firefox 19+ */
             color: #FFF;
         }
        &:-ms-input-placeholder { /* IE 10+ */
             color: #FFF;
         }
        &:-moz-placeholder { /* Firefox 18- */
             color: #FFF;
         }
        }
        button{
            color: #fff;
            padding: 10px 40px;
            display: inline-block;
            vertical-align: middle;
            border: 2px solid #FFF;
            border-radius: 0;
            background: transparent;
        }
    }
    .aditional{
        padding: 35px 0;
        p{
            margin: 0;
            padding: 2rem 15px;
            color: $color-2;
            font-size: 2rem;
            &:nth-of-type(2n){
                color: #FFF;
                background: $color-2;
             }
        }
    }
</style>