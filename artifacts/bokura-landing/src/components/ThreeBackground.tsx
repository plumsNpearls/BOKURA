import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function CSSFallbackBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" style={{ background: '#050508' }}>
      <div className="css-orb orb-1" />
      <div className="css-orb orb-2" />
      <div className="css-orb orb-3" />
      <div className="css-orb orb-4" />
      <div className="css-orb orb-5" />
      <div className="css-grid-lines" />
    </div>
  );
}

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isWebGLAvailable = false;
    try {
      const canvas = document.createElement('canvas');
      isWebGLAvailable = !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      isWebGLAvailable = false;
    }

    if (!isWebGLAvailable) {
      setWebGLFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.008);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 40;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setWebGLFailed(true);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;

    // ─── LIGHTS ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x111122, 2));

    const cyanLight = new THREE.PointLight(0x00d4ff, 8, 80);
    cyanLight.position.set(15, 15, 20);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xd4a017, 6, 80);
    goldLight.position.set(-15, -10, 20);
    scene.add(goldLight);

    const purpleLight = new THREE.PointLight(0x6600ff, 4, 60);
    purpleLight.position.set(0, -20, 10);
    scene.add(purpleLight);

    // ─── PARTICLE FIELD ────────────────────────────────────────────
    const particleCount = isMobile ? 800 : 2000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00d4ff);
    const gold = new THREE.Color(0xd4a017);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 200;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 150 - 20;
      particleSizes[i] = Math.random() * 2.5 + 0.5;

      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? cyan : colorChoice < 0.75 ? gold : white;
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── WIREFRAME ICOSAHEDRON ORBS (CYAN) ─────────────────────────
    const orbCount = isMobile ? 20 : 40;
    const orbGeo = new THREE.IcosahedronGeometry(1, 2);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < orbCount; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80 - 20
      );
      const s = Math.random() * 3 + 0.5;
      orb.scale.setScalar(s);
      scene.add(orb);
      orbs.push(orb);
    }

    // ─── GOLD COINS ────────────────────────────────────────────────
    const coinCount = isMobile ? 8 : 18;
    const coinGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.12, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 1.0,
      roughness: 0.1,
      emissive: 0xd4a017,
      emissiveIntensity: 0.4,
    });

    const coins: THREE.Mesh[] = [];
    for (let i = 0; i < coinCount; i++) {
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 15
      );
      coin.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const s = Math.random() * 0.8 + 0.4;
      coin.scale.setScalar(s);
      scene.add(coin);
      coins.push(coin);
    }

    // ─── TORUS RINGS ───────────────────────────────────────────────
    const torusCount = isMobile ? 3 : 6;
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00bfff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const toruses: THREE.Mesh[] = [];
    for (let i = 0; i < torusCount; i++) {
      const r = Math.random() * 4 + 2;
      const torusGeo = new THREE.TorusGeometry(r, 0.12, 12, 60);
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 20
      );
      torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(torus);
      toruses.push(torus);
    }

    // ─── FLOATING BAR CHARTS ───────────────────────────────────────
    const chartGroup = new THREE.Group();
    const barCount = isMobile ? 4 : 8;
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.3,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
    });

    for (let g = 0; g < 3; g++) {
      const miniGroup = new THREE.Group();
      for (let b = 0; b < barCount; b++) {
        const h = Math.random() * 3 + 0.5;
        const barGeo = new THREE.BoxGeometry(0.3, h, 0.3);
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.x = (b - barCount / 2) * 0.5;
        bar.position.y = h / 2;
        miniGroup.add(bar);
      }
      miniGroup.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30 - 20
      );
      miniGroup.rotation.y = Math.random() * Math.PI;
      miniGroup.scale.setScalar(Math.random() * 1.5 + 0.5);
      chartGroup.add(miniGroup);
    }
    scene.add(chartGroup);

    // ─── CONNECTING LINES (FINANCIAL NETWORK) ──────────────────────
    if (!isMobile) {
      const lineCount = 20;
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      });

      for (let i = 0; i < lineCount; i++) {
        const points = [];
        for (let p = 0; p < 3; p++) {
          points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 40 - 20
          ));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.Line(lineGeo, lineMat));
      }
    }

    // ─── GRID PLANE ────────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(300, 60, 0x00d4ff, 0x00d4ff);
    gridHelper.position.y = -30;
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.opacity = 0.04;
    gridMat.transparent = true;
    scene.add(gridHelper);

    // ─── INTERACTION STATE ─────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };
    const onScroll = () => { scrollY = window.scrollY; };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('scroll', onScroll);

    // ─── ANIMATION ─────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Particles drift slowly
      particles.rotation.y = t * 0.01;
      particles.rotation.x = t * 0.005;

      // Orbs gentle pulse + drift
      orbs.forEach((orb, i) => {
        orb.rotation.x = t * 0.04 + i;
        orb.rotation.y = t * 0.06 + i;
        orb.position.y += Math.sin(t * 0.5 + i) * 0.01;
      });

      // Coins spin and float
      coins.forEach((coin, i) => {
        coin.rotation.x += 0.008;
        coin.rotation.y += 0.015;
        coin.position.y += Math.sin(t + i * 1.3) * 0.015;
      });

      // Torus rings rotate + pulsing scale
      toruses.forEach((torus, i) => {
        torus.rotation.x += 0.006 + i * 0.002;
        torus.rotation.z += 0.004 + i * 0.001;
        const pulse = 1 + Math.sin(t * 1.5 + i) * 0.06;
        torus.scale.setScalar(pulse);
      });

      // Chart groups float
      chartGroup.children.forEach((child, i) => {
        (child as THREE.Group).position.y += Math.sin(t * 0.4 + i * 2) * 0.008;
        (child as THREE.Group).rotation.y = t * 0.1 + i;
      });

      // Pulsing lights
      cyanLight.intensity = 6 + Math.sin(t * 1.2) * 2;
      goldLight.intensity = 5 + Math.sin(t * 0.8 + 1) * 2;

      // Camera smooth follow mouse
      targetCamX = mouseX * 4;
      targetCamY = -mouseY * 3;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;

      // Cinematic scroll: fly forward + tilt
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      camera.position.z = 40 - scrollProgress * 25;
      camera.rotation.x = scrollProgress * 0.3;
      camera.rotation.y = mouseX * 0.05;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll', onScroll);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (webGLFailed) {
    return <CSSFallbackBackground />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ background: '#050508' }}
    />
  );
}
