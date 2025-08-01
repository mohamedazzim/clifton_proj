import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ProductsThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Product-related floating icons
    const iconObjects: THREE.Object3D[] = [];

    // Create geometric shapes representing different product categories
    const geometries = [
      // Electronics - Circuit board pattern
      new THREE.BoxGeometry(0.3, 0.3, 0.1),
      // Agriculture - Cube for coffee/sugar
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      // Textiles - Cylinder for fabric rolls
      new THREE.CylinderGeometry(0.1, 0.1, 0.4),
      // Automotive - Torus for wheels/parts
      new THREE.TorusGeometry(0.2, 0.05, 8, 16),
      // Generic product boxes
      new THREE.BoxGeometry(0.25, 0.15, 0.25),
      // Spheres for various products
      new THREE.SphereGeometry(0.15, 16, 16)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x000000, 
        transparent: true, 
        opacity: 0.3,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x333333, 
        transparent: true, 
        opacity: 0.4,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x666666, 
        transparent: true, 
        opacity: 0.3,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x999999, 
        transparent: true, 
        opacity: 0.4,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xcccccc, 
        transparent: true, 
        opacity: 0.3,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.4,
        shininess: 100
      })
    ];

    // Create floating icons
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      // Random positioning
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 15;
      mesh.position.z = (Math.random() - 0.5) * 10;

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      // Store animation properties
      (mesh as any).floatSpeed = 0.01 + Math.random() * 0.02;
      (mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      (mesh as any).floatOffset = Math.random() * Math.PI * 2;

      scene.add(mesh);
      iconObjects.push(mesh);
    }

    // Lighting - Black and white theme
    const ambientLight = new THREE.AmbientLight(0x808080, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3, 10);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      iconObjects.forEach((obj) => {
        const mesh = obj as any;
        
        // Floating animation
        obj.position.y += Math.sin(time * mesh.floatSpeed + mesh.floatOffset) * 0.002;
        
        // Rotation animation
        obj.rotation.x += mesh.rotationSpeed.x;
        obj.rotation.y += mesh.rotationSpeed.y;
        obj.rotation.z += mesh.rotationSpeed.z;

        // Drift animation
        obj.position.x += Math.sin(time * 0.0005 + mesh.floatOffset) * 0.001;
        obj.position.z += Math.cos(time * 0.0007 + mesh.floatOffset) * 0.001;

        // Boundary check - reset position if too far
        if (Math.abs(obj.position.x) > 15) {
          obj.position.x = (Math.random() - 0.5) * 20;
        }
        if (Math.abs(obj.position.y) > 10) {
          obj.position.y = (Math.random() - 0.5) * 15;
        }
        if (Math.abs(obj.position.z) > 8) {
          obj.position.z = (Math.random() - 0.5) * 10;
        }
      });

      // Camera gentle movement
      camera.position.x = Math.sin(time * 0.0002) * 0.5;
      camera.position.y = Math.cos(time * 0.0003) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      iconObjects.forEach((obj, index) => {
        const influence = 0.1 / (index + 1);
        obj.rotation.x += mouseY * influence * 0.01;
        obj.rotation.y += mouseX * influence * 0.01;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      iconObjects.forEach(obj => {
        scene.remove(obj);
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
}