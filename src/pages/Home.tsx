// src/components/Home.tsx - With Proper GLTFLoader
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../styles/home.css';

const Home: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let animationId: number;

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.3 : 1.75));
    container.appendChild(renderer.domElement);

    let model3D: THREE.Group | null = null;

    // Load 3D model
    const loadModel = async () => {
      try {
        const loader = new GLTFLoader();
        
        loader.load(
          '/sword.glb',
          (gltf: any) => {
            model3D = gltf.scene;
            
            // Scale and position the model appropriately
            model3D!.scale.setScalar(0.05);
            model3D!.position.set(0, 0, 0);
            model3D!.rotation.set(0.5, 0, 0.1);
            
            // Ensure materials work with our lighting
            model3D!.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                if (child.material) {
                  // Enable shadows and proper lighting
                  child.castShadow = true;
                  child.receiveShadow = true;
                  
                  // Enhance materials for better rendering
                  if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                      if (mat instanceof THREE.MeshBasicMaterial) {
                        const newMaterial = new THREE.MeshStandardMaterial({
                          color: mat.color,
                          map: mat.map,
                          transparent: mat.transparent,
                          opacity: mat.opacity,
                          metalness: 0.5,
                          roughness: 0.4
                        });
                        child.material = newMaterial;
                      }
                    });
                  } else if (child.material instanceof THREE.MeshBasicMaterial) {
                    const newMaterial = new THREE.MeshStandardMaterial({
                      color: child.material.color,
                      map: child.material.map,
                      transparent: child.material.transparent,
                      opacity: child.material.opacity,
                      metalness: 0.5,
                      roughness: 0.4
                    });
                    child.material = newMaterial;
                  }
                }
              }
            });
            
            scene.add(model3D!);
            setLoading(false);
            console.log('✅ 3D model loaded successfully!');
          },
          (progress: any) => {
            const percent = (progress.loaded / progress.total) * 100;
            setLoadingProgress(percent);
            console.log('Loading progress:', percent.toFixed(1) + '%');
          },
          (error: any) => {
            console.error('❌ Error loading 3D model:', error);
            createFallbackModel();
          }
        );
        
      } catch (error) {
        console.error('❌ Could not load GLTFLoader:', error);
        createFallbackModel();
      }
    };

    // Create a procedural model if GLB loading fails
    const createFallbackModel = () => {
      console.log('🎲 Creating procedural 3D object...');
      
      const modelGroup = new THREE.Group();
      
      // Main body
      const bodyGeometry = new THREE.BoxGeometry(2, 1, 2);
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x666666,
        metalness: 0.6,
        roughness: 0.4
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      
      // Top part
      const topGeometry = new THREE.ConeGeometry(1, 1, 8);
      const topMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        metalness: 0.7,
        roughness: 0.3
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 1;
      top.castShadow = true;
      
      // Details
      const detailGeometry = new THREE.SphereGeometry(0.3, 8, 6);
      const detailMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        metalness: 0.8,
        roughness: 0.2
      });
      
      for (let i = 0; i < 4; i++) {
        const detail = new THREE.Mesh(detailGeometry, detailMaterial);
        const angle = (i / 4) * Math.PI * 2;
        detail.position.x = Math.cos(angle) * 1.2;
        detail.position.z = Math.sin(angle) * 1.2;
        detail.castShadow = true;
        modelGroup.add(detail);
      }
      
      modelGroup.add(body, top);
      modelGroup.scale.setScalar(1.2);
      modelGroup.rotation.set(0.2, 0, 0.1);
      
      scene.add(modelGroup);
      model3D = modelGroup;
      setLoading(false);
      console.log('✅ Procedural 3D model created');
    };

    loadModel();

    // Enhanced lighting for the model
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(-10, 10, 10);
    scene.add(pointLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Camera position - adjusted for model viewing
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Dithering effect shader
    const DitheringShader = {
      uniforms: {
        tDiffuse: { value: null },
        uPixelSize: { value: 2.0 },
        uDitherSize: { value: 8.0 },
        uGrayscale: { value: 1.0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uPixelSize;
        uniform float uDitherSize;
        uniform float uGrayscale;
        uniform vec2 uResolution;
        varying vec2 vUv;

        float getBayerValue(ivec2 pos) {
          ivec2 dither = pos % int(uDitherSize);
          
          // 8x8 Bayer matrix for smoother dithering
          int bayerMatrix[64] = int[64](
            0,  32, 8,  40, 2,  34, 10, 42,
            48, 16, 56, 24, 50, 18, 58, 26,
            12, 44, 4,  36, 14, 46, 6,  38,
            60, 28, 52, 20, 62, 30, 54, 22,
            3,  35, 11, 43, 1,  33, 9,  41,
            51, 19, 59, 27, 49, 17, 57, 25,
            15, 47, 7,  39, 13, 45, 5,  37,
            63, 31, 55, 23, 61, 29, 53, 21
          );
          
          int index = dither.x + dither.y * int(uDitherSize);
          return float(bayerMatrix[index]) / 64.0;
        }

        void main() {
          // Improved pixelation with proper scaling
          vec2 pixelUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
          vec4 color = texture2D(tDiffuse, pixelUv);
          
          // Better luminance calculation
          float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          
          if (uGrayscale > 0.5) {
            color = vec4(vec3(luminance), color.a);
          }
          
          // Apply Bayer dithering
          vec2 ditherCoord = gl_FragCoord.xy;
          float threshold = getBayerValue(ivec2(ditherCoord));
          
          // Smoother dithering application
          color.rgb = step(threshold, color.rgb);
          
          gl_FragColor = color;
        }
      `
    };

    // Post-processing setup with mobile optimizations
    const renderTargetScale = isMobile ? 1 : 1.5; // Lower resolution on mobile/desktop balance
    const renderTarget = new THREE.WebGLRenderTarget(
      container.clientWidth * renderTargetScale,
      container.clientHeight * renderTargetScale,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      }
    );

    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMaterial = new THREE.ShaderMaterial(DitheringShader);
    const postPlane = new THREE.PlaneGeometry(2, 2);
    const postQuad = new THREE.Mesh(postPlane, postMaterial);
    const postScene = new THREE.Scene();
    postScene.add(postQuad);

    // Animation loop
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;
      animationId = requestAnimationFrame(animate);

      if (model3D) {
        // Much slower, more controlled rotation
        model3D.rotation.x += 0.001;
        model3D.rotation.y += 0.003;
        // Gentler floating motion
        model3D.position.y = Math.sin(Date.now() * 0.0005) * 0.1;
      }

      renderer.setRenderTarget(renderTarget);
      renderer.render(scene, camera);

      postMaterial.uniforms.tDiffuse.value = renderTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);
    };

    animate();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isAnimating = false;
        if (animationId) cancelAnimationFrame(animationId);
      } else if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderTarget.setSize(width * renderTargetScale, height * renderTargetScale);
      
      // Update resolution uniform
      postMaterial.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Enhanced mouse and touch interaction - rotation only (no zoom)
    const mouse = new THREE.Vector2();
    const mouseStart = new THREE.Vector2();
    let isDragging = false;
    let spherical = new THREE.Spherical(8, Math.PI / 2, 0); // radius=8, phi=90deg, theta=0

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      mouseStart.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseStart.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        // Calculate mouse delta for rotation
        const deltaX = mouse.x - mouseStart.x;
        const deltaY = mouse.y - mouseStart.y;

        // Update spherical coordinates
        spherical.theta -= deltaX * 3; // Horizontal rotation
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 2)); // Vertical rotation (clamped)

        // Convert spherical to cartesian coordinates
        const position = new THREE.Vector3();
        position.setFromSpherical(spherical);
        
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);

        // Update mouse start position for continuous dragging
        mouseStart.copy(mouse);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    // Touch event handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        isDragging = true;
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouseStart.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseStart.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (isDragging && event.touches.length === 1) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

        // Calculate touch delta for rotation (more sensitive on mobile)
        const deltaX = mouse.x - mouseStart.x;
        const deltaY = mouse.y - mouseStart.y;

        // Update spherical coordinates with mobile-optimized sensitivity
        spherical.theta -= deltaX * (isMobile ? 4 : 3); // More sensitive on mobile
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * (isMobile ? 3 : 2)));

        // Convert spherical to cartesian coordinates
        const position = new THREE.Vector3();
        position.setFromSpherical(spherical);
        
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);

        // Update touch start position for continuous dragging
        mouseStart.copy(mouse);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      isDragging = false;
    };

    // Set initial cursor
    container.style.cursor = 'grab';

    // Add event listeners for both mouse and touch
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events for mobile
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      // Remove touch event listeners
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (model3D) {
        model3D.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
      renderTarget.dispose();
      postMaterial.dispose();
      postPlane.dispose();
    };
  }, []);

  return (
    <div className="home-container">
      {/* Main Content */}
      <main className="main-demo">
        {/* Main Content - Left Side */}
        <div className="main-content">
          <h1 className="main-title">
            Cameron Powell — Lead Solutions Engineer
          </h1>
          <div className="intro-content">
            <p className="intro-paragraph">
              I build high-trust, technical partnerships that turn complex customer goals into shipped solutions.
              At CustomGPT.ai, I lead the Solutions Engineering function and work across product, engineering,
              and sales to deliver secure, scalable implementations.
            </p>
            <p className="intro-paragraph">
              My background blends software engineering, data analytics, and customer-facing delivery.
              I love messy problems, clear outcomes, and the craft of building things that work.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/projects">View projects</Link>
              <Link className="ghost-button" to="/contact">Get in touch</Link>
            </div>
          </div>
        </div>

        {/* 3D Animation - Right Side */}
        <div className="animation-sidebar">
          <div 
            ref={mountRef} 
            className="three-container"
            style={{ opacity: loading ? 0 : 1 }}
          />
          {loading && (
            <div className="loading">
              <div className="loading-text">Loading...</div>
              <div className="loading-progress">
                {loadingProgress > 0 && `${loadingProgress.toFixed(0)}%`}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Demo Info Section - Lower on page */}
      <section className="demo-info-section">
        <div className="demo-info">
          <h2>What I focus on</h2>
          <p>
            I specialize in bridging product and engineering with business outcomes: translating
            requirements, designing systems, and shipping production-ready solutions for enterprise teams.
          </p>
          <div className="tech-tags">
            <span className="tag">Solutions Engineering</span>
            <span className="tag">APIs & Integrations</span>
            <span className="tag">RAG & Automation</span>
            <span className="tag">Data & Dashboards</span>
            <span className="tag">React & TypeScript</span>
            <span className="tag">Python & SQL</span>
          </div>
        </div>
      </section>

      {/* Gradient Transition */}
      <div className="gradient-transition"></div>
    </div>
  );
};

export default Home;
