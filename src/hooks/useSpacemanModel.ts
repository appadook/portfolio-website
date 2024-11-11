
import { useEffect, RefObject } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const useSpacemanModel = (canvasRef: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);

    // Enhanced lighting for the spaceman
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(0, 2, 5);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0x6366f1, 1);
    backLight.position.set(0, 2, -5);
    scene.add(backLight);

    let spaceman: THREE.Object3D;
    const loader = new GLTFLoader();
    
    // Load the spaceman model
    loader.load(
      '/spaceman.glb', // Make sure to add this model to your public folder
      (gltf) => {
        spaceman = gltf.scene;
        spaceman.scale.set(0.008,0.008,0.008);  // Reduced from 1.5 to 0.008
        spaceman.rotation.y = Math.PI / 4;
        scene.add(spaceman);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    camera.position.z = 15;
    camera.position.y = 2;

    let time = 0;
    const animateRight = () => {
      requestAnimationFrame(animateRight);
      time += 0.01;

      if (spaceman) {
        // Floating animation
        spaceman.position.y = Math.sin(time) * 0.5 + 1;
        spaceman.rotation.y = Math.sin(time * 0.5) * 0.2 + Math.PI / 4;
        
        // Subtle tilting
        spaceman.rotation.x = Math.sin(time * 0.7) * 0.1;
        spaceman.rotation.z = Math.cos(time * 0.8) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animateRight();

    const handleRightResize = () => {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    };

    window.addEventListener('resize', handleRightResize);
    return () => window.removeEventListener('resize', handleRightResize);
  }, []);
};