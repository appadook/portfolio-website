// components/HeroSection.tsx
import { useRef, useEffect } from "react";
import * as THREE from 'three';

export default function HeroSection() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightSideCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background particles effect
  useEffect(() => {
    if (!backgroundCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: backgroundCanvasRef.current, 
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
      color: 0x6366f1,
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
  }, []);

  // Right side animation (using TorusKnot as example)
  useEffect(() => {
    if (!rightSideCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: rightSideCanvasRef.current, 
      alpha: true,
      antialias: true  // Added for smoother edges
    });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);  // Increased ambient light
    scene.add(ambientLight);

    // Main front light
    const frontLight = new THREE.DirectionalLight(0x6366f1, 1.5);
    frontLight.position.set(0, 0, 30);
    scene.add(frontLight);

    // Top light for better surface detail
    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 30, 0);
    scene.add(topLight);

    // Side lights for depth
    const leftLight = new THREE.DirectionalLight(0xffffff, 0.8);
    leftLight.position.set(-20, 0, 10);
    scene.add(leftLight);

    const rightLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rightLight.position.set(20, 0, 10);
    scene.add(rightLight);

    // Adjusted material for better visibility
    const geometry = new THREE.TorusKnotGeometry(8, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1,
      shininess: 50,          // Increased shininess
      flatShading: false,
      specular: 0x6366f1,    // Changed specular to match base color
      emissive: 0x1a1a1a     // Added slight emissive for better visibility
    });
    const torusKnot = new THREE.Mesh(geometry, material);

    scene.add(torusKnot);
    camera.position.z = 30;

    const animateRight = () => {
      requestAnimationFrame(animateRight);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.005;
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

  return (
    <section id="about" className="relative h-screen flex overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full bg-[url('/galaxy-bg.webp')] bg-cover bg-center bg-no-repeat"
        style={{ zIndex: -2 }}
      />
      
      {/* Background canvas */}
      <canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full"
        style={{ 
          opacity: 0.8,
          zIndex: -1,
          pointerEvents: 'none'
        }} 
      />
      
      <div className="w-1/2 flex items-center justify-center px-8 z-10">
        <div className="flex flex-col items-center text-center text-white">
          <div className="w-48 h-48 rounded-full bg-gray-300 mb-8">
            <img src="/kurtik-appadoo.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">
              Kurtik Appadoo
            </h1>
            <p className="text-xl text-white">
              Computer Science and Economics Double Major student at Union College with a passion for software development. 
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-1/2 relative z-10">
        <canvas ref={rightSideCanvasRef} className="absolute inset-0" />
      </div>
    </section>
  );
}
