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

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000; // Increased count
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;    // Reduced spread
      posArray[i + 1] = (Math.random() - 0.5) * 100; // Reduced spread
      posArray[i + 2] = (Math.random() - 0.5) * 100; // Reduced spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
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
    const animateBackground = () => {
      requestAnimationFrame(animateBackground);
      time += 0.001;

      const positions = particlesGeometry.attributes.position.array;
      for(let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] = Math.sin((x + time) * 0.5) * Math.cos((z + time) * 0.5) * 5;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animateBackground();

    const handleBackgroundResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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

    // Improved lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  // Increased intensity
    scene.add(ambientLight);

    // Multiple point lights for better coverage
    const frontLight = new THREE.PointLight(0x6366f1, 1);
    frontLight.position.set(0, 0, 20);
    scene.add(frontLight);

    const topLight = new THREE.PointLight(0xffffff, 1);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    const leftLight = new THREE.PointLight(0xffffff, 0.5);
    leftLight.position.set(-20, 0, 0);
    scene.add(leftLight);

    // Adjusted material for better light reflection
    const geometry = new THREE.TorusKnotGeometry(8, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1,
      shininess: 30,          // Reduced shininess for more diffuse reflection
      flatShading: false,
      specular: 0x444444     // Added specular highlight color
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
      {/* Background canvas */}
      <canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full"  // Changed to fixed positioning
        style={{ 
          opacity: 0.8,
          zIndex: -1,
          pointerEvents: 'none'
        }} 
      />
      
      <div className="w-1/2 flex items-center justify-center px-8 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full bg-gray-300 mb-8">
            <img src="/kurtik-appadoo.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">
              Kurtik Appadoo
            </h1>
            <p className="text-xl text-muted-foreground">
              Computer Science and Economics Double Major student at Union College with a passion for software development. 
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-1/2 relative">
        <canvas ref={rightSideCanvasRef} className="absolute inset-0" />
      </div>
    </section>
  );
}
