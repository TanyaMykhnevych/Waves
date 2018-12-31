//import * as THREE from "/lib/lib";

class View3d {
    constructor(sea, d) {
        this.sea = sea;
        this.n = sea.n;
        this.d = d;

        this.camera = new THREE.OrthographicCamera(-this.n/2, this.n/2, this.n/2,  -this.n/2, -100, 1000 );

        this.renderer = new THREE.WebGLRenderer({canvas: canvas3d});
        this.renderer.setSize(this.n, this.n);
        this.renderer.shadowMap.enabled = true;

        this.light = new THREE.DirectionalLight( 0xffffff, 1.1 );
        this.light.castShadow = true;

        this.vertices = this.initVertices();
        this.geometry = new THREE.BufferGeometry();
        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );

        let material = new THREE.MeshPhongMaterial( { color: 0x00FFFF } );
        this.ocean = new THREE.Mesh( this.geometry, material );
        this.ocean.receiveShadow = true;
        this.ocean.castShadow = true;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xbfd1e5 );
        this.scene.add(this.light);
        this.scene.add( this.ocean );

        /// test cube
        let geometry = new THREE.BoxGeometry( 100, 100, 6 );
        let material2 = new THREE.MeshPhongMaterial( {color: 0xff0000} );
        let cube = new THREE.Mesh( geometry, material2 );
        cube.position.set(60, 60, 3);
        this.scene.add( cube );


    }

    initVertices() {
        let d = this.d;
        let a = [];
        for (let r = 0; r < this.n - d; r += d ) {
            for (let c = 0; c < this.n - d; c += d ) {
                // 1
                a.push(c);
                a.push(r);
                a.push(0);
                // 2
                a.push(c+d);
                a.push(r);
                a.push(0);
                // 3
                a.push(c);
                a.push(r+d);
                a.push(0);

                //3
                a.push(c);
                a.push(r+d);
                a.push(0);
                // 2
                a.push(c+d);
                a.push(r);
                a.push(0);
                // 4
                a.push(c+d);
                a.push(r+d);
                a.push(0);        }
        }
        return new Float32Array(a);
    }

    draw()
    {

        let r = 500;
        let y = r * Math.sin(cameraRange.value);
        let z = r * Math.cos(cameraRange.value);
        this.camera.position.set(250, 250 + y, z);
        this.camera.lookAt(250, 250-y, -z );


        this.light.position.set( 0, -this.n/2, lightRange.value);


        let d = this.d;
        let i = 0;
        let amp = amplitudeRange.value;
        for (let r_ = 0; r_ < this.n - d; r_ += d) {
            let r = this.n - d - r_;
            for (let c = 0; c < this.n - d; c += d) {
                // 1
                let v = this.vertices;
                // v[i] = c;
                // v[i+1] = r_;
                v[i+2] = this.sea.w[r][c].x * amp;
                // 2
                // v[i+3] = c+d;
                // v[i+4] = r_;
                v[i+5] = this.sea.w[r-d][c].x * amp;
                // 3
                // v[i+6] = c;
                // v[i+7] = r_+d;
                v[i+8] = this.sea.w[r][c + d].x * amp;
                // 3
                // v[i+9] = c;
                // v[i+10] = r_+d;
                v[i+11] = this.sea.w[r][c + d].x * amp;
                // 2
                // v[i+12] = c+d;
                // v[i+13] = r_;
                v[i+14] = this.sea.w[r-d][c].x * amp;
                // 4
                // v[i+15] = c+d;
                // v[i+16] = r_+d;
                v[i+17] = this.sea.w[r-d][c + d].x * amp;
                i += 18;
            }
        }
        this.geometry.computeVertexNormals();

        this.renderer.render( this.scene, this.camera );
    }
}
