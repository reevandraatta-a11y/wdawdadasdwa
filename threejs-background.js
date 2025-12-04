// Three.js Background Animation
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('threejs-background');
    
    if (!container) return;
    
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);
    
    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Add glowing particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesColors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        particlesPositions[i] = (Math.random() - 0.5) * 10;
        particlesPositions[i + 1] = (Math.random() - 0.5) * 10;
        particlesPositions[i + 2] = (Math.random() - 0.5) * 10;
        
        // Random colors between blue and pink
        const color = new THREE.Color();
        if (Math.random() > 0.5) {
            color.setHex(0x00d9ff);
        } else {
            color.setHex(0xff0055);
        }
        
        particlesColors[i] = color.r;
        particlesColors[i + 1] = color.g;
        particlesColors[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate icosahedron
        icosahedron.rotation.x += 0.002;
        icosahedron.rotation.y += 0.003;
        
        // Rotate particles
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        // Move stars
        stars.rotation.y += 0.0005;
        
        // Mouse interaction
        icosahedron.rotation.y += mouseX * 0.01;
        icosahedron.rotation.x += mouseY * 0.01;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
});