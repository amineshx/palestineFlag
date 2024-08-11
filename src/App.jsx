import { useEffect } from 'react';
import * as THREE from 'three';

const App = () => {
  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha:true,
      antialias:true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const loader = new THREE.TextureLoader()
    const geometry = new THREE.PlaneGeometry(5,3,50,30);
    const material = new THREE.MeshBasicMaterial({ 
      
      map:loader.load('src/assets/palstine.jpg')
      
    });
    const flag = new THREE.Mesh(geometry, material);
    scene.add(flag)
    flag.rotation.set(-0.1,0,0)
    camera.position.z = 5;

    const positionAttribute = geometry.attributes.position;
    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime(); // Get elapsed time

      // Update vertex positions based on sine function over time
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const waveX1=0.3*Math.sin(x * 2 + t*5)
        const multi=(x+2.5)/5
        positionAttribute.setZ(i, waveX1*multi); // Create waving effect
      }
      positionAttribute.needsUpdate = true; // Notify Three.js that the attribute has changed

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; 
};

export default App;
