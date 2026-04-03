'use client';

/*
 * ThreeScene.tsx — Interactive 3D scene component
 *
 * WHY 'use client':
 *   Three.js requires browser APIs that don't exist in Node.js:
 *     - new THREE.WebGLRenderer() accesses WebGLRenderingContext (browser GPU API)
 *     - navigator.userAgent (browser string, no equivalent in Node)
 *     - window.innerWidth, window.devicePixelRatio
 *     - requestAnimationFrame, cancelAnimationFrame
 *     - document.addEventListener('visibilitychange')
 *
 *   If Next.js attempted to server-render this component, it would crash
 *   immediately at 'new THREE.WebGLRenderer()'. The 'use client' directive
 *   tells Next.js: "Never execute this file on the server."
 *
 * WHY DYNAMIC IMPORT WITH { ssr: false } IN app/page.tsx:
 *   'use client' alone does not prevent Next.js from including the component
 *   in the server render pass — it prevents the component from running, but
 *   the import itself is still analyzed. The parent page imports this component
 *   via `dynamic({ ssr: false })` which tells Next.js to completely skip
 *   this component during server rendering, not just skip executing it.
 *
 * THREE.JS SCENE OVERVIEW:
 *   1. GLTFLoader loads sword.glb from /public/sword.glb
 *   2. Scene lighting: ambient + directional + point light
 *   3. Dithering post-process: renders to a WebGLRenderTarget first, then applies
 *      a custom Bayer 8×8 dithering GLSL shader to produce the pixelated/halftone look
 *   4. Animation loop: slow Y-axis rotation + gentle float on Y
 *   5. Drag interaction: spherical coordinate camera orbit (no zoom)
 *   6. Touch interaction: same orbit for mobile
 *   7. Visibility change: pauses the animation loop when the browser tab is hidden
 *      to avoid burning CPU/GPU when the user isn't looking
 *   8. Cleanup: disposes GPU memory (geometry, materials, textures, render target)
 *      when the component unmounts to prevent memory leaks in SPA navigation
 */

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeScene() {
  // mountRef is the DOM node where the WebGL canvas will be appended
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // This entire effect runs only in the browser (guaranteed by 'use client').
    // The guard is belt-and-suspenders — it shouldn't be needed, but it makes
    // the intent explicit and satisfies TypeScript's null check.
    if (!mountRef.current) return;

    const container = mountRef.current;
    let animationId: number;

    // ─── Device detection ───────────────────────────────────────────────────
    // Mobile devices get lower quality settings (no antialias, lower pixel ratio,
    // lower-power GPU preference) to maintain smooth frame rates on weaker hardware.
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    // ─── Scene setup ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    // PerspectiveCamera(fov, aspect, near, far)
    // fov=75: fairly wide view. aspect=width/height: matches container. near/far: clip planes.
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Antialias is expensive; disable on mobile
      alpha: true,          // Transparent background so CSS gradient shows through
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Limit pixel ratio: 1.75 max on desktop, 1.3 on mobile — prevents
    // rendering at 3× or 4× resolution on high-DPI screens (wasteful).
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.3 : 1.75));
    container.appendChild(renderer.domElement);

    let model3D: THREE.Group | null = null;

    // ─── Model loading ──────────────────────────────────────────────────────
    // GLTFLoader.load() is async (callback-based). The model file lives at
    // /public/sword.glb which Next.js serves at /sword.glb in production.
    const loadModel = () => {
      const loader = new GLTFLoader();

      loader.load(
        '/sword.glb',
        // onLoad callback — called when the .glb file has fully downloaded and parsed
        (gltf) => {
          model3D = gltf.scene;
          model3D.scale.setScalar(0.05);
          model3D.position.set(0, 0, 0);
          model3D.rotation.set(0.5, 0, 0.1);

          // Traverse every mesh in the loaded model and upgrade MeshBasicMaterial
          // (which ignores lighting) to MeshStandardMaterial (which responds to
          // the directional/point lights we set up below).
          model3D.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
              child.castShadow = true;
              child.receiveShadow = true;

              const upgradeMaterial = (mat: THREE.Material) => {
                if (mat instanceof THREE.MeshBasicMaterial) {
                  return new THREE.MeshStandardMaterial({
                    color: mat.color,
                    map: mat.map,
                    transparent: mat.transparent,
                    opacity: mat.opacity,
                    metalness: 0.5,
                    roughness: 0.4,
                  });
                }
                return mat;
              };

              if (Array.isArray(child.material)) {
                child.material = child.material.map(upgradeMaterial);
              } else {
                child.material = upgradeMaterial(child.material);
              }
            }
          });

          scene.add(model3D);
          setLoading(false);
        },
        // onProgress callback — called periodically as bytes download
        (progress) => {
          if (progress.total > 0) {
            setLoadingProgress((progress.loaded / progress.total) * 100);
          }
        },
        // onError callback — if the GLB fails to load, fall back to a procedural shape
        () => {
          createFallbackModel();
        }
      );
    };

    // ─── Fallback model ─────────────────────────────────────────────────────
    // If the GLB fails to load (e.g., network error), this creates a simple
    // geometric shape so the scene isn't empty.
    const createFallbackModel = () => {
      const modelGroup = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 2),
        new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6, roughness: 0.4 })
      );
      body.castShadow = true;

      const top = new THREE.Mesh(
        new THREE.ConeGeometry(1, 1, 8),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 })
      );
      top.position.y = 1;
      top.castShadow = true;

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const detail = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 8, 6),
          new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 })
        );
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
    };

    loadModel();

    // ─── Lighting ────────────────────────────────────────────────────────────
    // Three-point lighting rig: ambient (fills shadows), directional (key light),
    // point (fill/rim light from the opposite side).
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

    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // ─── Dithering post-process shader ──────────────────────────────────────
    // This is a two-pass rendering pipeline:
    //   Pass 1: Render the scene normally into renderTarget (off-screen buffer)
    //   Pass 2: Render a fullscreen quad using the DitheringShader, which reads
    //           renderTarget.texture and applies pixelation + Bayer dithering
    //
    // Bayer dithering: a threshold matrix technique that converts grayscale to
    // binary (black/white) in a way that looks like halftone shading from a distance.
    // The 8×8 Bayer matrix provides finer gradation than the simpler 4×4 or 2×2 variants.
    const DitheringShader = {
      uniforms: {
        tDiffuse:    { value: null as THREE.Texture | null },
        uPixelSize:  { value: 2.0 },
        uDitherSize: { value: 8.0 },
        uGrayscale:  { value: 1.0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
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

          // 8×8 Bayer ordered dither matrix.
          // Each value is a threshold: luminance > threshold → white, else black.
          // The spatial arrangement of thresholds creates the characteristic
          // cross-hatch / halftone pattern.
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
          // Pixelate: snap UV coords to a grid of size uPixelSize
          vec2 pixelUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
          vec4 color = texture2D(tDiffuse, pixelUv);

          // Standard luminance formula (weights match human eye sensitivity)
          float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

          if (uGrayscale > 0.5) {
            color = vec4(vec3(luminance), color.a);
          }

          // Compare luminance against the Bayer threshold at this pixel coordinate.
          // step(threshold, value) returns 1 if value >= threshold, else 0.
          // Result: each color channel becomes either 0 or 1 (black or white).
          float threshold = getBayerValue(ivec2(gl_FragCoord.xy));
          color.rgb = step(threshold, color.rgb);

          gl_FragColor = color;
        }
      `,
    };

    // Render target: the scene renders into this off-screen buffer at the same
    // resolution as the canvas (×1.5 on desktop for sharper dithering detail).
    const renderTargetScale = isMobile ? 1 : 1.5;
    const renderTarget = new THREE.WebGLRenderTarget(
      container.clientWidth * renderTargetScale,
      container.clientHeight * renderTargetScale,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
      }
    );

    // The post-processing quad: a fullscreen plane rendered by an orthographic
    // camera (orthographic means no perspective distortion — it's just a 2D blit).
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMaterial = new THREE.ShaderMaterial(DitheringShader);
    const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial);
    const postScene = new THREE.Scene();
    postScene.add(postQuad);

    // ─── Animation loop ──────────────────────────────────────────────────────
    // requestAnimationFrame (rAF) calls animate() before each browser repaint,
    // typically 60 times per second. We track `isAnimating` so we can pause
    // when the tab is hidden (visibility change) and resume when it's shown again.
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;
      animationId = requestAnimationFrame(animate);

      if (model3D) {
        // Slow auto-rotation: gives the model a "living display" quality
        model3D.rotation.x += 0.001;
        model3D.rotation.y += 0.003;
        // Gentle vertical float using a sine wave keyed to real time
        // Date.now() * 0.0005 gives one full oscillation every ~12 seconds
        model3D.position.y = Math.sin(Date.now() * 0.0005) * 0.1;
      }

      // Pass 1: render 3D scene into the off-screen render target
      renderer.setRenderTarget(renderTarget);
      renderer.render(scene, camera);

      // Pass 2: render the dithering shader to the screen
      postMaterial.uniforms.tDiffuse.value = renderTarget.texture;
      renderer.setRenderTarget(null); // null = back to screen
      renderer.render(postScene, postCamera);
    };

    animate();

    // ─── Visibility change ───────────────────────────────────────────────────
    // When the user switches tabs, document.hidden becomes true.
    // We stop the rAF loop to avoid wasting GPU resources.
    // When they return, we restart it.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isAnimating = false;
        if (animationId) cancelAnimationFrame(animationId);
      } else if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── Resize handler ──────────────────────────────────────────────────────
    // When the container resizes (window resize, layout shift), we must update:
    //   - Camera aspect ratio → prevents stretching
    //   - Renderer size → matches container
    //   - Render target size → keeps dithering resolution consistent
    //   - Resolution uniform → shader needs the correct pixel dimensions
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderTarget.setSize(width * renderTargetScale, height * renderTargetScale);
      postMaterial.uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ─── Mouse / touch drag (camera orbit) ──────────────────────────────────
    // We use spherical coordinates (radius, phi, theta) to orbit the camera
    // around the scene center. This is more natural than directly manipulating
    // camera.position.x/y/z for orbiting.
    //
    // Spherical coords: radius = distance from origin, phi = vertical angle
    // (0=top, π=bottom), theta = horizontal angle (0=front, increases clockwise)
    const mouse = new THREE.Vector2();
    const mouseStart = new THREE.Vector2();
    let isDragging = false;
    const spherical = new THREE.Spherical(8, Math.PI / 2, 0); // radius=8, phi=90°, theta=0°

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      // Normalize to [-1, 1] range — standard Three.js NDC convention
      mouseStart.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseStart.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = mouse.x - mouseStart.x;
        const deltaY = mouse.y - mouseStart.y;

        // Scale the delta to control rotation sensitivity
        spherical.theta -= deltaX * 3;
        // Clamp phi to avoid gimbal lock at the poles (never fully vertical)
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 2));

        // setFromSpherical converts (radius, phi, theta) → (x, y, z)
        const position = new THREE.Vector3();
        position.setFromSpherical(spherical);
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);

        // Update mouseStart so next frame's delta is relative to current position
        mouseStart.copy(mouse);
      }
    };

    const handleMouseUp = () => { isDragging = false; container.style.cursor = 'grab'; };
    const handleMouseLeave = () => { isDragging = false; container.style.cursor = 'grab'; };

    // Touch events mirror the mouse events but read from event.touches[0]
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault(); // Prevents scroll-while-dragging on mobile
      if (event.touches.length !== 1) return;
      isDragging = true;
      const touch = event.touches[0];
      const rect = container.getBoundingClientRect();
      mouseStart.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseStart.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!isDragging || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const rect = container.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      const deltaX = mouse.x - mouseStart.x;
      const deltaY = mouse.y - mouseStart.y;
      // Slightly more sensitive on mobile to compensate for smaller touch targets
      spherical.theta -= deltaX * (isMobile ? 4 : 3);
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * (isMobile ? 3 : 2)));

      const position = new THREE.Vector3();
      position.setFromSpherical(spherical);
      camera.position.copy(position);
      camera.lookAt(0, 0, 0);
      mouseStart.copy(mouse);
    };

    const handleTouchEnd = (event: TouchEvent) => { event.preventDefault(); isDragging = false; };

    container.style.cursor = 'grab';
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    // React calls this cleanup function when the component unmounts (e.g., the
    // user navigates away). Without cleanup, the WebGL renderer and GPU memory
    // remain allocated — a memory leak. We must:
    //   1. Cancel the animation loop
    //   2. Remove all event listeners
    //   3. Detach the canvas from the DOM
    //   4. Dispose GPU resources (geometry, materials, textures)
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      isAnimating = false;

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Dispose all mesh geometry and materials in the loaded model
      if (model3D) {
        model3D.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      renderTarget.dispose();
      postMaterial.dispose();
      postQuad.geometry.dispose();
    };
  }, []); // Empty dependency array: run once on mount, cleanup on unmount

  return (
    // The outer div is the animation sidebar — sticky on desktop, stacked on mobile
    <div className="
      w-[min(35vw,580px)] min-w-[300px] flex-shrink-0
      flex flex-col items-center
      sticky top-8
      max-sm:w-full max-sm:max-w-[90vw] max-sm:static
    ">
      {/* Canvas container — mountRef is where Three.js appends its <canvas> element */}
      <div
        ref={mountRef}
        style={{ opacity: loading ? 0 : 1 }}
        className="
          w-full h-[min(35vw,600px)] min-h-[300px]
          border border-[var(--border)] rounded-[18px] overflow-hidden
          bg-[var(--surface-strong)]
          relative transition-opacity duration-500
          shadow-[var(--shadow-strong)] cursor-grab
          [image-rendering:pixelated]
          max-sm:h-[min(60vw,300px)] max-sm:rounded-[12px]
          max-xs:h-[min(70vw,250px)]
        "
      />

      {/* Loading indicator — visible while the GLB downloads */}
      {loading && (
        <div className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-[var(--text-muted)] text-center
        ">
          <div className="text-[0.9rem] font-medium animate-pulse">Loading...</div>
          {loadingProgress > 0 && (
            <div className="text-[0.8rem] mt-1">{loadingProgress.toFixed(0)}%</div>
          )}
        </div>
      )}
    </div>
  );
}
