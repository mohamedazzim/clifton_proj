import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points[]>([]);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create multiple particle systems with different behaviors
    const particleSystems: THREE.Points[] = [];
    const geometricShapes: THREE.Mesh[] = [];

    // Floating particles with scroll-based movement
    for (let system = 0; system < 3; system++) {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 150;
      const posArray = new Float32Array(particlesCount * 3);
      const velocityArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        velocityArray[i] = (Math.random() - 0.5) * 0.02;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8 + system * 0.3,
        color: theme === 'dark' ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0.1 + system * 0.05,
        blending: THREE.AdditiveBlending
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      particlesMesh.position.z = -system * 20;
      scene.add(particlesMesh);
      particleSystems.push(particlesMesh);
    }

    // Add geometric shapes for depth
    const geometries = [
      new THREE.RingGeometry(2, 3, 8),
      new THREE.CircleGeometry(1.5, 6),
      new THREE.PlaneGeometry(2, 0.1)
    ];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0.05,
        wireframe: index % 2 === 0
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        -30 - index * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      geometricShapes.push(mesh);
    });

    camera.position.z = 30;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particleSystems;
    meshesRef.current = geometricShapes;

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with advanced effects
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      const scrollY = window.pageYOffset;
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);

      // Animate particle systems
      particleSystems.forEach((particles, index) => {
        // Scroll-based rotation and movement
        particles.rotation.x = scrollY * 0.0003 + time * 0.1;
        particles.rotation.y = scrollY * 0.0002 + time * 0.05;
        particles.rotation.z = scrollProgress * Math.PI * 2;

        // Mouse interaction
        particles.position.x = mouseX * 5 * (index + 1);
        particles.position.y = mouseY * 5 * (index + 1);

        // Pulsing effect
        const scale = 1 + Math.sin(time + index) * 0.1;
        particles.scale.setScalar(scale);

        // Update particle positions for floating effect
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const velocities = particles.geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i] * (1 + scrollProgress);
          positions[i + 1] += velocities[i + 1] * (1 + scrollProgress);
          positions[i + 2] += velocities[i + 2] * 0.5;

          // Wrap around boundaries
          if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
      });

      // Animate geometric shapes
      geometricShapes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.002;
        mesh.rotation.y += 0.003 + index * 0.001;
        mesh.rotation.z += 0.001;

        // Parallax movement based on scroll
        mesh.position.y += scrollY * 0.001 * (index + 1);
        
        // Breathing effect
        const breathe = 1 + Math.sin(time * 2 + index) * 0.05;
        mesh.scale.setScalar(breathe);

        // Mouse interaction
        mesh.position.x += mouseX * 2 * (index + 1);
        mesh.position.z += mouseY * 2;
      });

      // Camera movement based on scroll and mouse
      camera.position.x = mouseX * 5;
      camera.position.y = mouseY * 5 + scrollY * 0.002;
      camera.lookAt(0, scrollY * 0.001, 0);

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      particleSystems.forEach(particles => {
        particles.geometry.dispose();
        (particles.material as THREE.PointsMaterial).dispose();
      });
      geometricShapes.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.MeshBasicMaterial).dispose();
      });
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef}
      id="three-canvas"
      className="fixed top-0 left-0 -z-10 pointer-events-none w-full h-full"
    />
  );
}
