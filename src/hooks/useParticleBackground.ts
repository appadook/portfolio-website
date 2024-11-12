import { useEffect, RefObject } from 'react';
import * as THREE from 'three';

export const useParticleBackground = (canvasRef: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Calculate spread based on viewport
    const calculateSpread = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      return {
        x: 100 * aspectRatio,
        y: 100,
        z: 100 * aspectRatio
      };
    };

    let spread = calculateSpread();

    // Create particles with viewport-based spread
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const posArray = new Float32Array(particleCount * 3);

    // This sets the initial random positions of particles
    const updateParticlePositions = () => {
      for(let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * spread.x;     // X position
        posArray[i + 1] = (Math.random() - 0.5) * spread.y; // Y position
        posArray[i + 2] = (Math.random() - 0.5) * spread.z; // Z position
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    };

    updateParticlePositions();

    const particlesMaterial = new THREE.PointsMaterial({
      size: 3,                    // Adjusted base size
      sizeAttenuation: false,       // Disabled size attenuation so all particles are same size
      color: 0x8A7CFF,             // Changed to a softer purple/blue shade
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8                  // Increased opacity
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 30;         // Moved camera closer

    let time = 0;
    // This animates the Y position of particles using sine waves
    const animateBackground = () => {
      requestAnimationFrame(animateBackground);
      time += 0.001;

      const positions = particlesGeometry.attributes.position.array;
      for(let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        // Y position is animated using sine waves
        positions[i + 1] = Math.sin((x + time) * 0.5) * Math.cos((z + time) * 0.5) * 40;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animateBackground();

    const handleBackgroundResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Update spread and particle positions on resize
      spread = calculateSpread();
      updateParticlePositions();
    };

    window.addEventListener('resize', handleBackgroundResize);
    return () => window.removeEventListener('resize', handleBackgroundResize);
  }, [canvasRef]);
};