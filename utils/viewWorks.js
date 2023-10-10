/*
 * @license
 * Copyright 2022-2023 NovaGraphix
 * (created: Feb 18, 2023)
 */
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls';

import { PLYExporter } from 'three/addons/exporters/PLYExporter';
import { STLExporter } from 'three/addons/exporters/STLExporter';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter';
import { OBJExporter } from 'three/addons/exporters/OBJExporter';
// import { ColladaExporter } from './ColladaExporter';
// import { MTLExporter } from './MTLExporter';
// import { VOXExporter } from './VOXExporter';

import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { VTKLoader } from 'three/addons/loaders/VTKLoader';
import { MD2Loader } from 'three/addons/loaders/MD2Loader';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';
import { VRMLLoader } from 'three/addons/loaders/VRMLLoader';
import { AMFLoader } from 'three/addons/loaders/AMFLoader';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader';
import { PLYLoader } from 'three/addons/loaders/PLYLoader';
import { STLLoader } from 'three/addons/loaders/STLLoader';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import { MTLLoader } from 'three/addons/loaders/MTLLoader';
import { SVGLoader } from 'three/addons/loaders/SVGLoader';
import { KMZLoader } from 'three/addons/loaders/KMZLoader';
import { TDSLoader } from 'three/addons/loaders/TDSLoader';
import { TGALoader } from 'three/addons/loaders/TGALoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { unzipSync, strFromU8 } from 'three/addons/libs/fflate.module.js';
import { VOXLoader, VOXMesh } from 'three/addons/loaders/VOXLoader';

const JAMIE = {};

//==============================================================================
// Newly created (separate from Jamie.js)
//==============================================================================

class AppWorks
//
// =============================================
//      Single AppWorks
// =============================================
// <div id="appWorks"></div> (or nothing)
//
// =============================================
//      Multiple AppWorks
// =============================================
// 1) index.html
// <canvas id="multiscene"></canvas>
// <div id="appContainer">
//     <div class="appWorks" 
//          style="width:300px; height:300px;" 
//          data-url="models/111.glb">
//     </div>
//     <div class="appWorks" 
//          style="width:300px; height:300px;" 
//          data-url="models/222.glb">
//     </div>
// </div>
// 2) style.css
// #multiscene {
//     position:absolute;
//     left:0;
//     width:100%;
//     height:100%;
// }
// #appContainer {
//     position: absolute;
// }
// .appWorks {
//     display: inline-block;
//     outline: none;
//     margin-left: 0.5em;
//     margin-bottom: 0.1em;
// }
// =============================================
{
    // static tabIndex = 1;
    static multiscene = false;
    static renderer = undefined;
    static canvas = undefined; // canvas = renderer.domElement

    static texloader = new THREE.TextureLoader();
    static loadTexture = (url) => AppWorks.texloader.load( url );

    constructor( options={} )
    // options = {
    //     dom: div element (default: automatically generated)
    //     width: viewport width (default: window.innerWidth)
    //     height: viewport height (default: window.innerHeight)
    //     background: 0x191919 (default), 'images/myPic.jpg', 'images/myHDR.hdr', 'default.hdr'
    //     multiscene: true if multiple viewport (default: false)
    // }
    {
        // size
        const [ windowWidth, windowHeight ] = this.getWindowSizes();
        this.width  = options.width  || windowWidth;
        this.height = options.height || windowHeight;
        this.widthRatio  = this.width  / windowWidth;
        this.heightRatio = this.height / windowHeight;

        // dom
        this.dom = options.dom || document.createElement('div');
        this.dom.className = this.dom.className || 'appWorks';
        this.dom.tabIndex = this.getTabIndex();
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';

        // canvas
        AppWorks.multiscene = options.multiscene || false;
        if( AppWorks.multiscene )
        {
            // AppWorks.canvas = document.createElement('canvas');
            // AppWorks.canvas.style.cssText = "position:absolute; left:0; width:100%; height:100%;";
            // document.body.appendChild( AppWorks.canvas );

            AppWorks.canvas = document.getElementById('multiscene');
            // AppWorks.canvas.style.cssText = "position:absolute; left:0; width:100%; height:100%;";
        }

        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.fov = 60;//50;
        this.nearPlane = 1;
        this.farPlane = 1000;

        this.clock = undefined;
        this.controls = undefined;
        this.animator = undefined;

        this.background = options.background || 0x191919;

        JAMIE.appWorks = this;
    }

    init()
    {
        // scene
        this.scene = new THREE.Scene();

        // camera
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.width / this.height,
            this.nearPlane,
            this.farPlane
        );
        this.camera.position.z = 50;

        // renderer
        if( AppWorks.multiscene === true )
        {
            if( AppWorks.renderer === undefined )
            {
                AppWorks.renderer = new THREE.WebGLRenderer({ canvas: AppWorks.canvas, antialias: true });
            }
            this.renderer = AppWorks.renderer;
        }
        else
        {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize( this.width, this.height );
            this.dom.appendChild( this.renderer.domElement );
        }
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;//default
        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 1;

        // clock
        this.clock = new THREE.Clock();

        // controls
        if( AppWorks.multiscene === true )
        {
            this.controls = new OrbitControls( this.camera, this.dom );
        }
        else
        {
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        }
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.075;

        // animator
        this.animator = new Animator( this.scene );

        // lights
        this.createLights();

        // background
        this.createBackground();

        // resize
        window.addEventListener( 'resize', () => this.onResize(), false );

        // click
        this.dom.addEventListener( 'click', (e) => this.onClick(e), false ); // why: focus ==> keyboard
        this.dom.addEventListener( 'dblclick', (e) => this.onDoubleClick(e), false );

        // keyboard
        this.dom.addEventListener( 'keydown', (e) => this.onKeyDown(e), false );
        this.dom.addEventListener( 'keyup', (e) => this.onKeyUp(e), false );

        return this;
    }

    //

    getTabIndex()
    {
        return '1'; // why: keyboard events
    }

    createLights()
    {
        const intensity = Math.PI;

        let light = new THREE.DirectionalLight( 0xffffff, intensity );
        light.position.set( 0.5, 0.0, 0.866 );
        this.scene.add( light );

        // light = new THREE.DirectionalLight( 0xffffff, intensity );
        // light.position.set( -0.2, 1.0, -0.4 );
        // this.scene.add( light );

        light = new THREE.HemisphereLight();
        this.scene.add( light );
    }

    createBackground()
    {
        const scope = this;

        // default.hdr
        if( this.background === 'default.hdr' )
        {
            new RGBELoader().load( '/images/sunset_puresky_4k.hdr', texture =>
            {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scope.scene.background = texture;
                scope.scene.environment = texture;
                scope.scene.backgroundBlurriness = 0.2; // 0.0 ~ 1.0
            });
        }

        // texture url
        else if( typeof this.background === 'string' )
        {
            const filename = this.background;
            const extension = filename.split( '.' ).pop().toLowerCase();

            // HDR texture
            if( extension === 'hdr' )
            {
                new RGBELoader().load( filename, texture =>
                {
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    scope.scene.background = texture;
                    scope.scene.environment = texture;
                    scope.scene.backgroundBlurriness = 0.2; // 0.0 ~ 1.0
                });
            }

            // image texture
            else
            {
                const texture = AppWorks.loadTexture( filename );
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set( 4, 2 );
                this.scene.background = texture;
            }
        }

        // hexadecimal color
        else if( typeof this.background === 'number' )
        {
            // darkMode: 0x191919
            // lightMode: 0xf0f0f0
            this.scene.background = new THREE.Color( this.background );
        }

        else
        {
            this.scene.background = new THREE.Color( 0x191919 );
        }
    }

    getWindowSizes()
    {
        const windowWidth  = Math.max( document.documentElement.clientWidth  || 0, window.innerWidth  || 0 );
        const windowHeight = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );
        return [ windowWidth, windowHeight ];
    }

    onResize()
    {
        if( AppWorks.multiscene === true )
        {
            const canvas = AppWorks.renderer.domElement;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if( canvas.width !== w || canvas.height !== h )
            {
                AppWorks.renderer.setSize( w, h, false );
            }
        }
        else
        {
            const [ windowWidth, windowHeight ] = this.getWindowSizes();
            this.width  = this.widthRatio  * windowWidth;
            this.height = this.heightRatio * windowHeight;

            // html-dom
            this.dom.style.width  = this.width  + 'px';
            this.dom.style.height = this.height + 'px';

            // camera
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            // renderer
            this.renderer.setSize( this.width, this.height );
        }
    }

    onClick( event )
    {
        this.dom.focus();
    }

    onDoubleClick( event ){}

    onKeyDown( event )
    {
        event.stopPropagation();

        switch( event.keyCode )
        {
        case 8: // backspace
            event.preventDefault(); // prevent browser back
            // do not use 'break'

        case 27: // escape
            scope.controls.enabled = true;
            break;

        case 49: // 1 (for the next background)
            // JAMIE.nextShowroom( 'background' );
            break;

        case 50: // 2 (for the next floor)
            // JAMIE.nextShowroom( 'floor' );
            break;

        case 66: //b (demo)
            // JAMIE.demoApplication();
            break;

        case 79: // o: stop the active action
            if( this.animator && this.selectObject )
            {
                var activeAction = this.selectObject.activeAction;
                if( activeAction )
                    activeAction.paused = !activeAction.paused;
            }
            break;

        case 80: // p(lay the next action)
            if( this.animator && this.selectObject )
            {
                this.animator.playNextAction( this.selectObject );
            }
            break;
        };
    }

    onKeyUp( event )
    {
        event.preventDefault();
        event.stopPropagation();

        switch( event.keyCode )
        {
        case 17: // ctrl
            // this.transformControls.setTranslationSnap( null );
            // this.transformControls.setRotationSnap( null );
            this.controls.enabled = true;
            break;

        case 18: // 18 = left_alt, 21 = right_alt
            break;
        }
    }

    //

    update()
    {
        const dt = this.clock.getDelta(); // seconds
        const ct = this.clock.getElapsedTime(); // seconds

        this.controls.update();
        this.animator.update( dt );

        this.scene.traverse( object => {
            if( object.update ) object.update( dt, ct );
        });
    }

    render()
    {
        this.renderer.render( this.scene, this.camera );
    }

    animate()
    {
        window.requestAnimationFrame( this.animate.bind(this) );
        this.update();
        this.render();
    }
}

JAMIE.AppWorks = AppWorks;

JAMIE.update = function( appWorkss )
{
    appWorkss.forEach( appWorks => appWorks.update() );
}

JAMIE.render = function( appWorkss )
{
    const renderer = AppWorks.renderer;
    const canvas = renderer.domElement;

    // update renderer size
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if( canvas.width !== w || canvas.height !== h )
    {
        renderer.setSize( w, h, false );
    }

    // canvas.style.transform = `translateY(${window.scrollY}px)`;

    renderer.setClearColor( 0xffffff );
    renderer.setScissorTest( false );
    renderer.clear();

    renderer.setClearColor( 0x191919 );
    renderer.setScissorTest( true );

    appWorkss.forEach( appWorks =>
    {
        const element = appWorks.dom;
        const rect = element.getBoundingClientRect();

        if( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
            rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {
            return; // it's off screen
        }

        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const x = rect.left;
        const y = renderer.domElement.clientHeight - rect.bottom;

        renderer.setViewport( x, y, width, height );
        renderer.setScissor( x, y, width, height );

        const scene = appWorks.scene;
        const camera = appWorks.camera;

        renderer.render( scene, camera );
    });
}

JAMIE.animate = function()
{
    // (cf) precondition: AppWorks.multiscene === true
    window.requestAnimationFrame( JAMIE.animate );
    JAMIE.update( JAMIE.appWorkss );
    JAMIE.render( JAMIE.appWorkss );
}

//==============================================================================

const Animator = function( scene )
{
    var scene = (scene !== undefined) ? scene : JAMIE.appWorks.scene;

    this.mixer = new THREE.AnimationMixer( scene );

    // cf: object.activeAction = used when switching to another action (eg: crossFade)

    this.update = function( dTime )
    {
        this.mixer.update( dTime );
    }

    this.addAnimation = function( object, animations )
    // animations = [clip, clip, ...] = array of THREE.AnimationClip
    {
        if( animations.length > 0 )
        {
            object.animations = animations;
        }
    }

    this.createActions = function( object )
    // return actions = { animationClip.name: animationAction, .... }
    // (Note*: not currently used...)
    {
        var actions = {};
        var animations = object.animations;

        if( animations !== undefined )
        {
            for( var animation of animations )
            {
                actions[ animation.name ] = this.mixer.clipAction( animation, object );

                if( !object.activeAction ) object.activeAction = actions[ animation.name ];
            }
            return actions;
        }
        return undefined;
    }

    this.playAction = function( object, clip, options )
    // clip = animationClip object or its name (eg: "walk", "jump")
    // options = {
    //     duration:    1 (= crossFade time in seconds)
    //     loopMode:    THREE.LoopRepeat*, THREE.LoopOnce, THREE.LoopPingPong
    //     repetitions: Infinity
    //     combine:     'crossFade'*, 'overlap'
    //     cf: crossFade = newAction fades in while playingAction fades out
    //     cf: overlap   = newAction overlapped with previous playing actions
    // }
    {
        if( !object.animations || object.animations.length === 0 ) return;

        var options     = options || {};
        var duration    = options.duration    || 1;
        var loopMode    = options.loopMode    || THREE.LoopRepeat;
        var repetitions = options.repetitions || Infinity;
        var combine     = options.combine     || 'crossFade';

        var object = (object !== undefined) ? object : JAMIE.appWorks.selectedObject;
        var clip =   (clip   !== undefined) ? clip   : object.animations[ 0 ];

        // crossFade between two actions
        if( combine == 'crossFade' )
        {
            var from = object.activeAction;
            var to = this.mixer.clipAction( clip, object );
            if( to )
            {
                to.enabled = true;
                to.setLoop( loopMode, repetitions );

                if( from )
                {
                    from.enabled = true;
                    from.crossFadeTo( to, duration ).play(); // "to.play()" will run...
                }
                else to.play();

                object.activeAction = to;

                return to;
            }
            else
            {
                return undefined;
            }
        }

        // overlap between playing actions
        else if( combine === 'overlap' )
        {
            var action = this.mixer.clipAction( clip, object );
            action.play();

            object.activeAction = action;

            return action;
        }

        return undefined;
    }

    this.playNextAction = function( object )
    {
        var object = (object !== undefined) ? object : JAMIE.appWorks.selectedObject;

        var animations = object.animations;

        if( animations !== undefined && animations.length > 0 )
        {
            var index = -1;
            if( object.activeAction )
            {
                var activeClip = object.activeAction.getClip();
                index = animations.indexOf( activeClip );
            }

            index = ~~( (index + 1) % animations.length );
            var nextClip = animations[ index ];
            object.activeAction = this.playAction( object, nextClip );

            console.log('>> playAction: "' + nextClip.name + '"');
        }
    }

    this.stopAction = function( object, clip )
    {
        if( object && clip )
        {
            var action = this.mixer.clipAction( clip, object );
            action.enabled = true;
            action.stop();
        }
        else if( object && !clip )
        {
            var action = object.activeAction;
            if( action )
            {
                action.enabled = true;
                action.stop();
            }
        }
    }

    this.stopAllActions = function()
    {
        this.mixer.stopAllAction();
    }
}

//==============================================================================

JAMIE.rgbaToHex = function( r, g, b, a, rgbaFloat = false )
{
    if( rgbaFloat ) // (r,g,b,a) = 0 ~ 1
    {
        return (a * 255) << 24 ^ (r * 255) << 16 ^ (g * 255) << 8 ^ (b * 255);
    }
    else // (r,g,b,a) = 0 ~ 255
    {
        return a << 24 ^ r << 16 ^ g << 8 ^ b;
    }
}

JAMIE.hexToRGB = function( hex, rgbFloat = false )
{
    if( rgbFloat ) // (r,g,b) = 0 ~ 1
    {
        return [ (hex >> 16 & 0xff) / 0xff, (hex >> 8 & 0xff) / 0xff, (hex & 0xff) / 0xff ];
    }
    else // (r,g,b) = 0 ~ 255
    {
        return [ hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff ];
    }
}

JAMIE.LinearToSRGB = function( c )
// c (= r, g, b) = 0 ~ 1
{
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}

JAMIE.hue2rgb = function( p, q, t )
{
	if ( t < 0 ) t += 1;
	if ( t > 1 ) t -= 1;
	if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
	if ( t < 1 / 2 ) return q;
	if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
	return p;
}

JAMIE.hslToHex = function( h, s, l, hslFloat = false )
{
    if( hslFloat === false )
    {
        h /= 360;
        s /= 100;
        l /= 100;
    }

    let r, g, b;
    if( s === 0 )
    {
        r = g = b = l; // achromatic
    }
    else
    {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = JAMIE.hue2rgb( p, q, h + 1 / 3 );
        g = JAMIE.hue2rgb( p, q, h );
        b = JAMIE.hue2rgb( p, q, h - 1 / 3 );
    }

    return JAMIE.rgbaToHex( r, g, b, 1.0, true );
}

JAMIE.randomHexColor = function( options={} )
{
    const colsys = options.colsys || 'rgb';
    if( colsys === 'hsl' )
    {
        const { h, s, l } = options;
        const _h = THREE.MathUtils.randFloat( h[0], h[1] ); // hmin, hmax
        const _s = THREE.MathUtils.randFloat( s[0], s[1] ); // smin, smax
        const _l = THREE.MathUtils.randFloat( l[0], l[1] ); // lmin, lmax
        return JAMIE.hslToHex( _h, _s, _l, true );
    }
    else
    {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        return JAMIE.rgbaToHex( r, g, b, 1.0, true );
    }
}

//==============================================================================

Number.prototype.format = function ()
{
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

JAMIE.clamp = function( value, min, max ){ return Math.max( min, Math.min( max, value ) ); }

JAMIE.humanFileSize = function( a, b, c, d, e )
{
    // (eg) '1.62 MB' = JAMIE.humanFileSize( file.size ); // file.size in bytes
    return ( b = Math, c = b.log, d = 1e3, e = c( a )/c( d ) | 0, a / b.pow( d, e ) ).toFixed( 2 ) + ' '+ ( e ? 'KMGTPEZY'[ --e ] + 'B' : 'Bytes' );
}

//==============================================================================

JAMIE.traverseMaterials = function( object, callback )
// (eg) JAMIE.traverseMaterials( object, (material) => {
//     if( material.map ) material.map.colorSpace = THREE.SRGBColorSpace;
//     if( material.emissiveMap ) material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
//     if( material.map || material.emissiveMap ) material.needsUpdate = true;
// });
{
    object.traverse( (node) =>
    {
        if( !node.isMesh ) return;
        const materials = Array.isArray( node.material ) ? node.material : [ node.material ];
        materials.forEach( callback );
    });
}

JAMIE.updateMaterialMapColorSpace = function( object, colorSpace )
// colorSpace = THREE.LinearSRGBColorSpace, THREE.SRGBColorSpace, ...
{
    colorSpace = colorSpace || THREE.SRGBColorSpace;

    JAMIE.traverseMaterials( object, (material) =>
    {
        if( material.map ) material.map.colorSpace = colorSpace;
        if( material.emissiveMap ) material.emissiveMap.colorSpace = colorSpace;
        if( material.map || material.emissiveMap ) material.needsUpdate = true;
    });
}

//==============================================================================

JAMIE.welcomeObject = function( object )
{
    object.updateMatrixWorld();

    const box = new THREE.Box3().setFromObject( object );
    const size = box.getSize( new THREE.Vector3() ).length();
    const center = box.getCenter( new THREE.Vector3() );

    // center (object to origin)
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);

    // fit camera (to object)
    const camera = JAMIE.appWorks.camera;
    camera.near = size / 100;
    camera.far = size * 100;
	camera.updateProjectionMatrix();

    camera.position.copy( center );
    camera.position.x += size / 2.0;
    camera.position.y += size / 5.0;
    camera.position.z += size / 1.5;
    camera.lookAt( center );

    JAMIE.appWorks.selectedObject = object;

    // JAMIE.add( JAMIE.createSpotShadowMesh( object ) );
}

JAMIE.add = function( object )
{
    JAMIE.updateMaterialMapColorSpace( object, THREE.SRGBColorSpace );

    JAMIE.appWorks.scene.add( object ); // not selectable, not undo/redo
}

//==============================================================================

JAMIE.createProgressbar = function()
{
    var progressBox = document.getElementById( 'progress-box' );
    if( progressBox )
    {
        progressBox.style.display = '';
        JAMIE.getProgressbar().style.width = '0%';
        return;
    }

    // progressBox ==> document.body
    var progressBox = document.createElement( 'div' );
    progressBox.id = 'progress-box';
    progressBox.innerHTML = `
        <div>
            <div style="color:#888;">Loading...</div>
            <div class="progress">
                <div id="progressbar"></div>
            </div>
        </div>
    `;
    document.body.appendChild( progressBox );

    // progressStyle ==> document.head
    var progressStyle = document.createElement( 'style' );
    progressStyle.id = 'progress-style';
    progressStyle.innerHTML = `
        #progress-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: x-large;
            font-family: sans-serif;
        }
        #progress-box>div>div {
            padding: 2px;
        }
        .progress {
            width: 50vw;
            border: 1px solid #888;
        }
        #progressbar {
            width: 0;
            transition: width ease-out .5s;
            height: 1em;
            background-color: #888;
            background-image: linear-gradient(
                -45deg, 
                rgba(255, 255, 255, .5) 25%, 
                transparent 25%, 
                transparent 50%, 
                rgba(255, 255, 255, .5) 50%, 
                rgba(255, 255, 255, .5) 75%, 
                transparent 75%, 
                transparent
            );
            background-size: 50px 50px;
            animation: progressanim 2s linear infinite;
        }
    `;
    document.head.appendChild( progressStyle );
}

JAMIE.getProgressbar = function()
{
    return document.getElementById( 'progressbar' );
}

JAMIE.updateProgressbar = function( itemsDone, itemsTotal, progressbar )
{
    if( progressbar === undefined ) progressbar = JAMIE.getProgressbar();

    progressbar.style.width = `${ itemsDone / itemsTotal * 100 | 0 }%`;
}

JAMIE.hideProgressbar = function()
{
    var progressBox = document.getElementById( 'progress-box' );
    if( progressBox ) progressBox.style.display = 'none';
}

JAMIE.showProgressbar = function()
{
    var progressBox = document.getElementById( 'progress-box' );
    if( progressBox ) progressBox.style.display = '';
}

JAMIE.errorProgressbar = function( err_message )
{
    console.warn( err_message );
}

JAMIE.removeProgressbar = function()
{
    var progressBox = document.getElementById( 'progress-box' );
    if( progressBox !== undefined ) document.body.removeChild( progressBox );

    var progressStyle = document.getElementById( 'progress-style' );
    if( progressStyle !== undefined ) document.head.removeChild( progressStyle );
}

//==============================================================================

function __gltf_fix_bug( scene )
{
    scene.traverse( function( child )
    {
        if( child.isMesh )
        {
            // why: 'vColor' differ between VERTEX and FRAGMENT
            var c = child.geometry.attributes.color;
            if( c && c.itemSize === 4 )
            {
                var m = child.material;
                if( m.vertexColors === true )
                {
                    m.vertexColors = false;
                    m.needsUpdate = true;
                }
            }

            // why: vertex shader not compiled (due to 'transformedTangent')
            var g = child.geometry;
            if( g.attributes.tangent )
            {
                delete g.attributes.tangent;
            }
        }
    });
}
function __gltf_add_envmap( scene )
{
    var background = JAMIE.appWorks.scene.background;

    if( background && background.isCubeTexture )
    {
        scene.traverse( function( child )
        {
            var m = child.material;
            if( m && ( m.isMeshStandardMaterial || (m.isShaderMaterial && m.envMap !== undefined) ) )
            {
                m.envMap = background;
                m.needsUpdate = true;
            }
        });
    }
}

JAMIE.Loader = function( appWorks )
{
    this.appWorks = appWorks;// <=== 지우지마!!

    var scope = this;

	this.texturePath = '';

    this.imageFiles = []; // used for md2
    this.mtlFile = null; // used for obj & mtl

	this.loadItemList = function ( items ) {

		JAMIE.LoaderUtils.getFilesFromItemList( items, function ( files, filesMap ) {

			scope.loadFiles( files, filesMap );

		} );

	};

	this.loadFiles = function ( files, filesMap ) {

		if ( files.length > 0 ) {

			var filesMap = filesMap || JAMIE.LoaderUtils.createFilesMap( files );

            var manager = new THREE.LoadingManager();
            manager.onStart    = () => { JAMIE.createProgressbar(); }
            manager.onProgress = (url, itemsLoaded, itemsTotal) => { JAMIE.updateProgressbar( itemsLoaded, itemsTotal ); }
            manager.onLoad     = () => { JAMIE.hideProgressbar(); } // cf: JAMIE.removeProgressbar()
            manager.onError    = url => { JAMIE.errorProgressbar( 'There was an error loading ' + url ); }

			manager.setURLModifier( function ( url ) {

                url = url.replace( /^(\.?\/)/, '' ); // remove './'

				var file = filesMap[ url ];

				if ( file ) {

					console.log( 'Loading', url );

					return URL.createObjectURL( file );

				}

				return url;

			} );

            manager.addHandler( /\.tga$/i, new TGALoader() );

            //

            this.imageFiles = [];
            this.mtlFile = null;

            for ( var i = 0; i < files.length; i ++ ) {

                if( files[ i ].name.match(/\.(png|jpg|gif)$/i) )
                {
                    this.imageFiles.push( files[ i ] ); // needed for md2
                }

                else if( files[ i ].name.match(/\.(mtl)$/i) )
                {
                    this.mtlFile = files[ i ];
                }

			}

            //

			for ( var i = 0; i < files.length; i ++ ) {

                this.loadFile( files[ i ], manager );

			}

		}

	};

	this.loadFile = function ( file, manager ) {

		var filename = file.name;
		var extension = filename.split( '.' ).pop().toLowerCase();

		var reader = new FileReader();
		reader.addEventListener( 'progress', function ( event ) {

			var size = '(' + Math.floor( event.total / 1000 ).format() + ' KB)';
			var progress = Math.floor( ( event.loaded / event.total ) * 100 ) + '%';

			console.log( 'Loading', filename, size, progress );

		} );

		switch ( extension ) {

			case '3ds':

				reader.addEventListener( 'load', function ( event ) {

                    var loader = new TDSLoader( manager );
                    var object = loader.parse( event.target.result );
                    
                    object.name = filename;

                    addObject( object );

				}, false );
				reader.readAsArrayBuffer( file );

                break;
                
            case '3mf':

                reader.addEventListener( 'load', function ( event ) {

                    var loader = new ThreeMFLoader( manager );

                    loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );

                    var object = loader.parse( event.target.result );
                    
                    object.name = filename;

                    addObject( object );

				}, false );
				reader.readAsArrayBuffer( file );

                break;

			case 'amf':

				reader.addEventListener( 'load', function ( event ) {

					var loader = new AMFLoader( manager );
                    var object = loader.parse( event.target.result );
                    
                    object.name = filename;

                    addObject( object );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'dae':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var loader = new ColladaLoader( manager );
					var collada = loader.parse( contents );

					collada.scene.name = filename;

					addAnimation( collada.scene, collada.animations );
                    addObject( collada.scene );

				}, false );
				reader.readAsText( file );

				break;

			case 'drc':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var loader = new DRACOLoader( manager );
					loader.setDecoderPath( 'js/draco/' );
					loader.decodeDracoFile( contents, function ( geometry ) {

                        geometry.center(); // jamie
                        JAMIE.computeVertexNormals( geometry );; // jamie

                        var object;

						if ( geometry.index !== null ) {

							var material = new THREE.MeshStandardMaterial();

							object = new THREE.Mesh( geometry, material );
							object.name = filename;

						} else {

							var material = new THREE.PointsMaterial( { size: 0.01 } );

							if ( geometry.hasAttribute( 'color' ) === true ) material.vertexColors = true;

							object = new THREE.Points( geometry, material );
							object.name = filename;

						}

                        addObject( object );

					} );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'fbx':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var loader = new FBXLoader( manager );
                    var object = loader.parse( contents );
                    
                    object.name = filename;

					addAnimation( object, object.animations );
                    addObject( object );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

            case 'md2':

                reader.addEventListener( 'load', function ( event ) {

                    var contents = event.target.result;

                    var loader = new MD2Loader( manager );

                    var geometry = loader.parse( contents );

                    var texture = null;
                    if( scope.imageFiles.length === 1 ) // cf: one md2 model has only one texture
                    {
                        texture = new THREE.TextureLoader().load( URL.createObjectURL( scope.imageFiles[0] ) );
                    }
                    var material = new THREE.MeshStandardMaterial({ map: texture });

                    var mesh = new THREE.Mesh( geometry, material );

                    mesh.mixer = new THREE.AnimationMixer( mesh );                    
                    mesh.name = filename;

                    addAnimation( mesh, geometry.animations );
                    addObject( mesh );

                }, false );
                reader.readAsArrayBuffer( file );

                break;

			case 'glb':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var dracoLoader = new DRACOLoader( manager ).setDecoderPath( 'js/draco/' );
                    var ktx2Loader = new KTX2Loader( manager ).setTranscoderPath( 'js/basis/' );

                    var loader = new GLTFLoader( manager )
                        .setCrossOrigin('anonymous')
                        .setDRACOLoader( dracoLoader )
                        .setKTX2Loader( ktx2Loader.detectSupport( JAMIE.appWorks.renderer ) )
                        .setMeshoptDecoder( MeshoptDecoder );

					loader.parse( contents, '', function ( result ) {

						var scene = result.scene;
						scene.name = filename;

                        __gltf_fix_bug( scene ); // added by jamie
                        __gltf_add_envmap( scene ); // added by jamie

						addAnimation( scene, result.animations );
                        addObject( scene );

					} );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'gltf':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var loader;

					if ( isGLTF1( contents ) ) {

						alert( 'Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.' );

					} else {

                        var dracoLoader = new DRACOLoader( manager ).setDecoderPath( 'js/draco/' );
                        var ktx2Loader = new KTX2Loader( manager ).setTranscoderPath( 'js/basis/' );

                        var loader = new GLTFLoader( manager )
                            .setCrossOrigin('anonymous')
                            .setDRACOLoader( dracoLoader )
                            .setKTX2Loader( ktx2Loader.detectSupport( JAMIE.appWorks.renderer ) )
                            .setMeshoptDecoder( MeshoptDecoder );

					}

					loader.parse( contents, '', function ( result ) {

						var scene = result.scene;
						scene.name = filename;

                        __gltf_fix_bug( scene ); // added by jamie
                        __gltf_add_envmap( scene ); // added by jamie

						addAnimation( scene, result.animations );
                        addObject( scene );

					} );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'js':
			case 'json':

				reader.addEventListener( 'load', function ( event ) {
					var contents = event.target.result;
					// 2.0
					if ( contents.indexOf( 'postMessage' ) !== - 1 )
                    {
						var blob = new Blob( [ contents ], { type: 'text/javascript' } );
						var url = URL.createObjectURL( blob );
						var worker = new Worker( url );
						worker.onmessage = function ( event )
                        {
							event.data.metadata = { version: 2 };
							handleJSON( event.data );
						};
						worker.postMessage( Date.now() );
						return;
					}
					// >= 3.0
					var data;
					try {
						data = JSON.parse( contents );
					} catch ( error ) {
						alert( error );
						return;
					}
					handleJSON( data );
				}, false );
				reader.readAsText( file );

				break;

			case 'kmz':

				reader.addEventListener( 'load', function ( event ) {

					var loader = new KMZLoader( manager );
					var collada = loader.parse( event.target.result );

					collada.scene.name = filename;

                    addObject( collada.scene );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'md2':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new MD2Loader( manager ).parse( contents );
					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.mixer = new THREE.AnimationMixer( mesh );
					mesh.name = filename;

					addAnimation( mesh, geometry.animations );
                    addObject( mesh );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'obj':

                function _loadOBJ( fileOBJ, materials=null )
                {
                    reader.addEventListener( 'load', function ( event )
                    {
                        const contents = event.target.result;

                        const loader = new OBJLoader( manager );
                        if( materials )
                        {
                            loader.setMaterials( materials )
                        }
                        const object = loader.parse( contents );

                        object.name = filename;

                        addObject( object );

                    }, false );
                    reader.readAsText( fileOBJ );
                }

                function _load_OBJ_MTL( fileOBJ, fileMTL )
                {
                    if( fileMTL )
                    {
                        var _reader = new FileReader();
                        _reader.addEventListener( 'load', function ( event ) {

                            const contents = event.target.result;

                            const materials = new MTLLoader( manager ).parse( contents );
                            materials.preload();

                            console.log( 'Loading', fileMTL.name );

                            //=====================================================
                            _loadOBJ( fileOBJ, materials );
                            //=====================================================

                        }, false );
                        _reader.readAsText( fileMTL );
                    }
                    else
                    {
                        //=====================================================
                        _loadOBJ( fileOBJ );
                        //=====================================================
                    }
                }

                _load_OBJ_MTL( file, this.mtlFile );

                break;

			case 'ply':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new PLYLoader( manager ).parse( contents );

                    JAMIE.computeVertexNormals( geometry );

					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

                    addObject( mesh );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'stl':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new STLLoader( manager ).parse( contents );

                    JAMIE.computeVertexNormals( geometry );

                    var material;
                    if( geometry.hasColors )
                    {
                        material = new THREE.MeshStandardMaterial({ vertexColors: true });
                    }
                    else
                    {
                        material = new THREE.MeshStandardMaterial();
                    }

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

                    addObject( mesh );

				}, false );

				if ( reader.readAsBinaryString !== undefined ) {

					reader.readAsBinaryString( file );

				} else {

					reader.readAsArrayBuffer( file );

				}

				break;

			case 'svg':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var loader = new SVGLoader( manager );
					var paths = loader.parse( contents ).paths;

					//

					var group = new THREE.Group();
					group.scale.multiplyScalar( 0.1 );
					group.scale.y *= - 1;

					for ( var i = 0; i < paths.length; i ++ ) {

						var path = paths[ i ];

						var material = new THREE.MeshBasicMaterial( {
							color: path.color,
							depthWrite: false
						} );

                        var shapes = SVGLoader.createShapes( path );

						for ( var j = 0; j < shapes.length; j ++ ) {

							var shape = shapes[ j ];

                            var geometry = new THREE.ShapeGeometry( shape );
							var mesh = new THREE.Mesh( geometry, material );

							group.add( mesh );

						}

                    }
                    
                    group.name = filename;

                    addObject( group );

				}, false );
				reader.readAsText( file );

				break;

			case 'vtk':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new VTKLoader( manager ).parse( contents );

                    JAMIE.computeVertexNormals( geometry );

					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

                    addObject( mesh );

				}, false );
                reader.readAsArrayBuffer( file );

				break;

            case 'vox':

                reader.addEventListener( 'load', function ( event ) {

                    var contents = event.target.result;

                    var chunks = new VOXLoader( manager ).parse( contents );

                    var meshes = chunks.map( chunk => new VOXMesh( chunk ) );

                    var object = new THREE.Group();
                    object.add( ...meshes );
                    object.name = filename;

                    addObject( object );

                }, false );
                reader.readAsArrayBuffer( file );

                break;

			case 'wrl':

				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

                    var result = new VRMLLoader( manager ).parse( contents );

                    // NOTE*:
                    // 1) result ==> THREE.Scene
                    // 2) every geometry inside result ==> THREE.BufferGeometry
                    // 3) every material inside result ==> THREE.MeshBasicMaterial or THREE.MeshPhongMaterial
                    // 4) color-priority: material.map >> material.vertexColors >> material.color

                    // // color-priority (defined by VRML)
                    // result.traverse( function( child )
                    // {
                    //     if( child.isMesh )
                    //     {
                    //         // 1st color-priority
                    //         if( child.material.map )
                    //         {
                    //             child.material.color.setHex(0xffffff);
                    //             child.material.vertexColors = false;
                    //         }
                    //         // 2nd color-priority
                    //         else if( child.geometry.attributes.color )
                    //         {
                    //             child.material.vertexColors = THREE.VertexColors;
                    //             child.material.color.setHex(0xffffff);
                    //         }
                    //     }
                    // });

                    result.name = filename;

                    // addScene( result );
                    addObject( result );

				}, false );
				reader.readAsText( file );

				break;

			case 'zip':

				reader.addEventListener( 'load', function ( event ) {

					handleZIP( event.target.result );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			default:
                // console.log( 'Unsupported file format:', extension );
				break;

		}

    };

    function addAnimation( object, animations )
    {
        if( animations && animations.length > 0 ) object.animations.push( ...animations );
    }
    
    function addObject( object )
    {
        JAMIE.appWorks = scope.appWorks;// <=== 지우지마!!

        JAMIE.add( object );

        JAMIE.welcomeObject( object );
    }

    function addScene( scene )
    {
        JAMIE.appWorks.setScene( scene );
    }

	function handleJSON( data )
    {
		if( data.metadata === undefined ) { // 2.0
			data.metadata = { type: 'DiscreteGeometry' };
		}

		if( data.metadata.type === undefined ) { // 3.0
			data.metadata.type = 'DiscreteGeometry';
		}

		if( data.metadata.formatVersion !== undefined ) {
			data.metadata.version = data.metadata.formatVersion;
		}

		switch( data.metadata.type.toLowerCase() )
        {
			case 'buffergeometry':
				var loader = new THREE.BufferGeometryLoader();
				var result = loader.parse( data );
				var mesh = new THREE.Mesh( result );
                addObject( mesh );
				break;

			case 'discretegeometry':
				console.error( 'Loader: "DiscreteGeometry" is no longer supported.' );
				break;

			case 'object':
				var loader = new THREE.ObjectLoader();
				loader.setResourcePath( scope.texturePath );
				loader.parse( data, function ( result )
                {
					if ( result.isScene )
                    {
                        addScene( result );
					}
                    else
                    {
                        if( result.name === 'natureObject' )
                        {
                            result.children.forEach( function( child )
                            {
                                JAMIE.add( JAMIE.cloneObject( child ) );
                            });
                        }
                        else
                        {
                            addObject( result );
                        }
					}
				});
				break;

			case 'app':
				JAMIE.appWorks.fromJSON( data );
				break;
		}

	}

	function handleZIP( contents ) {

		var zip = unzipSync( new Uint8Array( contents ) );

		// Poly

		// if ( zip[ 'model.obj' ] && zip[ 'materials.mtl' ] ) {
		// 	var materials = new MTLLoader().parse( strFromU8( zip[ 'materials.mtl' ] ) );
		// 	var object = new OBJLoader().setMaterials( materials ).parse( strFromU8( zip[ 'model.obj' ] ) );
        //     addObject( object );
		// }

        let bufferMTL = null, bufferOBJ = null;

		//

		for ( var path in zip ) {

            var file = zip[ path ];

            var manager = new THREE.LoadingManager();
            manager.onStart    = () => { JAMIE.createProgressbar(); }
            manager.onProgress = (url, itemsLoaded, itemsTotal) => { JAMIE.updateProgressbar( itemsLoaded, itemsTotal ); }
            manager.onLoad     = () => { JAMIE.hideProgressbar(); } // cf: JAMIE.removeProgressbar()
            manager.onError    = url => { JAMIE.errorProgressbar( 'There was an error loading ' + url ); }

			manager.setURLModifier( function ( url ) {

				var file = zip[ url ];

				if ( file ) {

					console.log( 'Loading', url );

					var blob = new Blob( [ file.buffer ], { type: 'application/octet-stream' } );
					return URL.createObjectURL( blob );

				}

				return url;

			} );

			var extension = path.split( '.' ).pop().toLowerCase();

			switch ( extension ) {

                case 'mtl':
                    bufferMTL = file.buffer;
                    break;
                case 'obj':
                    bufferOBJ = file.buffer;
                    break;

				case 'fbx':

					var loader = new FBXLoader( manager );
					var object = loader.parse( file.buffer );

                    addObject( object );

					break;

				case 'glb':

					var dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath( 'js/draco/' );

					var loader = new GLTFLoader();
					loader.setDRACOLoader( dracoLoader );

					loader.parse( file.buffer, '', function ( result ) {

						var scene = result.scene;

						addAnimation( scene, result.animations );
                        addObject( scene );

					} );

					break;

				case 'gltf':

					var dracoLoader = new DRACOLoader();
					dracoLoader.setDecoderPath( 'js/draco/' );

					var loader = new GLTFLoader( manager );
					loader.setDRACOLoader( dracoLoader );

					loader.parse( strFromU8( file ), '', function ( result ) {

						var scene = result.scene;

						addAnimation( scene, result.animations );
                        addObject( scene );

					} );

					break;

			}

		}

        // OBJ & MTL
        if( bufferMTL && bufferOBJ )
        {
            const materials = new MTLLoader( manager ).parse( strFromU8( bufferMTL ) );
            const object = new OBJLoader( manager ).setMaterials( materials ).parse( strFromU8( bufferOBJ ) );
            addObject( object );
        }

	}

	function isGLTF1( contents ) {

		var resultContent;

		if ( typeof contents === 'string' ) {

			// contents is a JSON string
			resultContent = contents;

		} else {

			var magic = THREE.LoaderUtils.decodeText( new Uint8Array( contents, 0, 4 ) );

			if ( magic === 'glTF' ) {

				// contents is a .glb file; extract the version
				var version = new DataView( contents ).getUint32( 4, true );

				return version < 2;

			} else {

				// contents is a .gltf file
				resultContent = THREE.LoaderUtils.decodeText( new Uint8Array( contents ) );

			}

		}

		var json = JSON.parse( resultContent );

		return ( json.asset != undefined && json.asset.version[ 0 ] < 2 );

	}
}

JAMIE.LoaderUtils = {

	createFilesMap: function ( files ) {

		var map = {};

		for ( var i = 0; i < files.length; i ++ ) {

			var file = files[ i ];
			map[ file.name ] = file;

		}

		return map;

	},

	getFilesFromItemList: function ( items, onDone ) {

		// TOFIX: setURLModifier() breaks when the file being loaded is not in root

		var itemsCount = 0;
		var itemsTotal = 0;

		var files = [];
		var filesMap = {};

		function onEntryHandled() {

			itemsCount ++;

			if ( itemsCount === itemsTotal ) {

				onDone( files, filesMap );

			}

		}

		function handleEntry( entry ) {

            if( !entry ) return;

			if ( entry.isDirectory ) {

				var reader = entry.createReader();
				reader.readEntries( function ( entries ) {

					for ( var i = 0; i < entries.length; i ++ ) {

						handleEntry( entries[ i ] );

					}

					onEntryHandled( entry );

				} );

			} else if ( entry.isFile ) {

				entry.file( function ( file ) {

					files.push( file );

					filesMap[ entry.fullPath.substr( 1 ) ] = file;
					onEntryHandled();

				} );

			}

			itemsTotal ++;

		}

		for ( var i = 0; i < items.length; i ++ ) {

			handleEntry( items[ i ].webkitGetAsEntry() );

		}

	}

}

JAMIE.loadFiles = function( urls, appWorks = JAMIE.appWorks )
{
    const promises = urls.map( async url =>
    {
        const filename = url.split( '/' ).pop().split( '?' )[ 0 ];
        const response = await fetch( url );
        const data = await response.blob();
        return new File( [ data ], filename, {
            type: data.type || 'image/jpeg',
        });
    });

    Promise.all( promises ).then( files =>
    {
        new JAMIE.Loader( appWorks ).loadFiles( files );
    });
}

//==============================================================================

JAMIE.saveOBJ = function( object, filename )
{
    var objName = filename || 'model.obj';
    var mtllib = objName.replace( '.obj', '' );
    var mtlName = mtllib + '.mtl';

    var text, blob, a = document.createElement( 'a' );

    // save as obj
    var objExporter = new OBJExporter();
    text = objExporter.parse( object, mtllib );
    blob = new Blob( [ text ], { type: 'text/plain' } );
    a.href = URL.createObjectURL( blob );
    a.download = objName;
    a.dispatchEvent( new MouseEvent( 'click' ) );

    // save as mtl
    var mtlExporter = new MTLExporter();
    text = mtlExporter.parse( object );
    blob = new Blob( [ text ], { type: 'text/plain' } );
    a.href = URL.createObjectURL( blob );
    a.download = mtlName;
    a.dispatchEvent( new MouseEvent( 'click' ) );
}

JAMIE.saveGLB = function( object, filename )
{
    var exporter = new GLTFExporter();

    exporter.parse( object, function ( buffer )
    {
        var blob = new Blob( [ buffer ], { type: 'application/octet-stream' } );
        var link = document.createElement( 'a' );
        link.href = URL.createObjectURL( blob );
        link.download = filename;
        link.dispatchEvent( new MouseEvent( 'click' ) ); // dialog box opens here!
    },
    function( error )
    {
        console.log( 'An error happened during parsing', error );
    },
    { binary: true } );
}

JAMIE.saveVOX = function( object, filename )
{
    if( object.isVoxelWorld )
    {
        const exporter = new VOXExporter();
        exporter.save( object, filename );
    }
}

JAMIE.Saver = function()
{
    // var scope = this;

    var link = document.createElement( 'a' );

    this.saveFile = function( filename )
    {
        var extension = filename.split( '.' ).pop().toLowerCase();

        var appWorks = JAMIE.appWorks;

        var object;
        if( appWorks.appName === 'NatureWorks' && extension === 'json' )
        {
            object = new THREE.Object3D();
            object.name = 'natureObject'; // <=== don't delete this line

            appWorks.scene.children.forEach( function( child )
            {
                if( child.visible === true )
                {
                    object.add( JAMIE.cloneObject( child ) );
                }
            });
        }
        else
        {
            object = appWorks.scene;
        }

        switch( extension )
        {
            case 'json':
                saveJSON( object, filename );
                break;
            case 'obj':
                saveOBJ( object, filename );
                break;
            case 'dae':
                saveDAE( object, filename );
                break;
            case 'glb':
                saveGLB( object, filename );
                break;
            case 'gltf':
                saveGLTF( object, filename );
                break;
            case 'stl':
                saveSTL( object, filename );
                break;
            case 'ply':
                savePLY( object, filename );
                break;
            default:
                alert( 'The file type "' + extension + '" is not supported.');
                break;
        }

        function parseNumber( key, value )
        {
            var NUMBER_PRECISION = 6;
            return typeof value === 'number' ? parseFloat( value.toFixed( NUMBER_PRECISION ) ) : value;
        }

        function _saveGeometry( geometry, filename )
        {
            var filename = filename || 'geometry.json';

            var output = geometry.toJSON();
            try
            {
                output = JSON.stringify( output, parseNumber, '\t' );
                output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
            }
            catch ( e )
            {
                output = JSON.stringify( output );
            }

            saveString( output, filename );
        }

        function saveJSON( object, filename )
        {
            var filename = filename || 'object.json';

            var output = object.toJSON();
            try
            {
                output = JSON.stringify( output, parseNumber, '\t' );
                output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
            }
            catch ( e )
            {
                output = JSON.stringify( output );
            }

            saveString( output, filename );
        }

        function saveOBJ( object, filename )
        {
            var objName = filename || 'model.obj';
            var mtllib = objName.replace( '.obj', '' );
            var mtlName = mtllib + '.mtl';

            // save as obj
            var objExporter = new OBJExporter();
            saveString( objExporter.parse( object, mtllib ), objName );

            // save as mtl
            var mtlExporter = new MTLExporter();
            saveString( mtlExporter.parse( object ), mtlName );
        }

        function saveDAE( object, filename )
        {
            var filename = filename || 'scene.dae';

            var exporter = new ColladaExporter();

            exporter.parse( object, function ( result )
            {
                saveString( result.data, filename );
            });
        }

        function saveGLB( object, filename )
        {
            var filename = filename || 'scene.glb';

            var exporter = new GLTFExporter();

            var options = { binary: true };

            exporter.parse( object, function ( result )
            {
                saveArrayBuffer( result, filename );
            },
            function( error )
            {
                console.log( 'An error happened during parsing', error );
            },
            options );
        }

        function saveGLTF( object, filename )
        {
            var filename = filename || 'scene.gltf';

            var exporter = new GLTFExporter();

            var options = { binary: false };

            exporter.parse( object, function ( result )
            {
                saveString( JSON.stringify( result, null, 2 ), filename );
            },
            function( error )
            {
                console.log( 'An error happened during parsing', error );
            },
            options );
        }

        function saveSTL( object, filename, ascii )
        {
            var filename = filename || 'model.stl';

            var exporter = new STLExporter();

            if( ascii === true )
            {
                // ASCII format
                saveString( exporter.parse( object ), filename );
            }
            else
            {
                // binary format
                saveArrayBuffer( exporter.parse( object, { binary: true } ), filename );
            }
        }

        function savePLY( object, filename )
        {
            var filename = filename || 'model.ply';

            var exporter = new PLYExporter();

            saveString( exporter.parse( object ), filename );
        }

        function saveString( text, filename )
        {
            save( new Blob( [ text ], { type: 'text/plain' } ), filename );
        }

        function saveArrayBuffer( buffer, filename )
        {
            save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
        }

        function save( blob, filename )
        {
            link.href = URL.createObjectURL( blob );
            link.download = filename || 'data.json';
            link.dispatchEvent( new MouseEvent( 'click' ) ); // dialog box opens here!
            // URL.revokeObjectURL( url ); breaks Firefox...
        }
    };
}

JAMIE.saveOpenFiles = function( appWorks )
{
    var appWorks = appWorks || JAMIE.appWorks;

    var scope = this;

    this.basePath = 'models/'; // base path for loading additional resources (e.g. textures)

    //==============================================================================
    // 1. save files...
    //==============================================================================

    this.saver = new JAMIE.Saver();

    this.fileOutput = document.createElement( 'div' );
    this.fileOutput.addEventListener( 'click', function()
    {
        var fileExtension = scope.fileOutput.fileExtension;

        scope.saver.saveFile( 'model.' + fileExtension );
    });

    this.saveAsFile = function( fileExtension )
    {
        this.fileOutput.fileExtension = fileExtension;
        this.fileOutput.click();
    }

    //==============================================================================
    // 2. load files...
    //==============================================================================

    this.loader = new JAMIE.Loader( appWorks );

    //======================
    // 2.1 open files
    //======================

    var fileInput = document.createElement( 'input' );
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    this.fileInput = fileInput;
    fileInput.addEventListener( 'change', function( e )
    {
        scope.loader.loadFiles( fileInput.files );
    });

    this.openFile = function()
    {
        this.fileInput.click();
    }

    //======================
    // 2.2 drag & drop files...
    //======================

    var container = appWorks.dom;
    container.addEventListener('dragover', function( e )
    {
        e.preventDefault();
        e.stopPropagation();

        container.classList.add('dragover');
    });

    container.addEventListener('dragleave', function( e )
    {
        e.preventDefault();
        e.stopPropagation();

        container.classList.remove('dragover');
    });

    container.addEventListener('drop', function( e )
    {
        // e.stopPropagation();
        e.preventDefault();

        if ( e.dataTransfer.types[ 0 ] === 'text/plain' ) return; // Outliner drop

        if ( e.dataTransfer.items ) {

            // DataTransferItemList supports folders

            scope.loader.loadItemList( e.dataTransfer.items );

        } else {

            scope.loader.loadFiles( e.dataTransfer.files );

        }

    }, false );
}

//==============================================================================

JAMIE.createSpotShadowMesh = function( object )
{
    const shadowTexture = AppWorks.loadTexture( '/images/spot_shadow.png' );

    const box = JAMIE.getBoundingBox( object );
    const center = box.getCenter( new THREE.Vector3() );
    center.y = box.min.y;
    const uside = box.max.x - box.min.x;
    const vside = box.max.z - box.min.z;

    const geometry = new THREE.PlaneGeometry( uside, vside );
    const material = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.9
    });

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.copy( center )
    mesh.rotation.x = - Math.PI / 2;

    return mesh;
}

//==============================================================================

JAMIE.computeVertexNormals = function( geometry )
// create vertex normals of geometry if they do not exist
{
    var normalExist = false;

    if( geometry.isDiscreteGeometry === true )
    {
        var vNormals = geometry.faces[ 0 ].vertexNormals;
        if( vNormals && vNormals.length === 3 ) normalExist = true;
    }
    else if( geometry.isBufferGeometry === true )
    {
        var aNormal = geometry.attributes.normal;
        if( aNormal && aNormal.count > 0 ) normalExist = true;
    }

    if( normalExist === false )
    {
        geometry.computeVertexNormals();
    }
}

JAMIE.getBoundingBox = function( object )
{
    if( object.geometry?.boundingBox )
    {
        return object.geometry.boundingBox;
    }
    else
    {
        return new THREE.Box3().setFromObject( object );
    }

    // if( object.isRaymarch === true )
    // {
    //     let points = object.toPoints( 0.1, false );
    //     points.geometry.computeBoundingBox();
    //     object.geometry.boundingBox = points.geometry.boundingBox.clone();
    //     JAMIE.dispose( points );
    //     return object.geometry.boundingBox;
    // }

    // if( object.isInstancedMesh === true )
    // {
    //     var geometry = object.geometry;
    //     if( geometry.boundingBox === null ) geometry.computeBoundingBox();
    //     var baseBox = geometry.boundingBox;

    //     var box = new THREE.Box3();
    //     var unionBox = new THREE.Box3();
    //     var matrix = new THREE.Matrix4();
    //     var count = object.count;

    //     for( var i = 0; i < count; i++ )
    //     {
    //         object.getMatrixAt( i, matrix );
    //         box.copy( baseBox ).applyMatrix4( matrix );
    //         unionBox.union( box );
    //     }

    //     return unionBox;
    // }
}

//==============================================================================

export default JAMIE;