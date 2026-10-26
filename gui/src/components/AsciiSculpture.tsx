import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export default function AsciiSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      host.textContent = "01001001  ·  SYSTEMS IN MOTION";
      return;
    }

    renderer.setPixelRatio(1);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0d1117");
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const geometry = new THREE.TorusKnotGeometry(2.7, 0.8, 150, 18, 2, 3);
    const material = new THREE.MeshPhongMaterial({ color: "#88c0d0", shininess: 70, flatShading: true });
    const sculpture = new THREE.Mesh(geometry, material);
    scene.add(sculpture);
    scene.add(new THREE.AmbientLight("#4a8fd9", 1.2));
    const light = new THREE.PointLight("#a3be8c", 100);
    light.position.set(5, 5, 6);
    scene.add(light);

    const effect = new AsciiEffect(renderer, " .:-=+*#%@", { invert: true, resolution: 0.19, color: true });
    effect.domElement.className = "ascii-effect";
    host.appendChild(effect.domElement);

    let frame = 0;
    let visible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      effect.setSize(width, height);
      effect.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const onVisibility = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);
    const animate = () => {
      if (visible && !reducedMotion.matches) {
        sculpture.rotation.x += 0.004;
        sculpture.rotation.y += 0.007;
        effect.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
    };
    resize();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeChild(effect.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={hostRef} className="ascii-sculpture" role="img" aria-label="Animated ASCII torus knot sculpture" />;
}
