import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.bottom = '20px';
    infoPanel.style.left = '20px';
    infoPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    infoPanel.style.padding = '10px';
    infoPanel.style.borderRadius = '5px';
    infoPanel.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    infoPanel.style.maxWidth = '300px';
    infoPanel.style.transition = 'opacity 0.5s ease';
    infoPanel.style.opacity = 0;
    document.body.appendChild(infoPanel);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('path/to/brain_model.gltf', (gltf) => {
        scene.add(gltf.scene);
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error(error);
    });

    camera.position.z = 5;

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        fetch('data/brainRegions.json')
            .then(response => response.json())
            .then(data => {
                const regionData = data.regions.find(region => region.name === selectedObject.name);
                if (regionData) {
                    infoPanel.innerHTML = `
                        <h3>${regionData.name}</h3>
                        <p><strong>Functions:</strong> ${regionData.functions}</p>
                        <p><strong>Related Research:</strong> ${regionData.relatedResearch}</p>
                    `;
                    infoPanel.style.opacity = 1;
                }
            })
            .catch(error => console.error('Error loading region data:', error));
    }

    function onClick(event) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            selectedObject.material.color.set(0xff0000); // Highlight color
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX + 5}px`;
            tooltip.style.top = `${event.clientY + 5}px`;
            tooltip.textContent = 'Brain Region Selected';
        }
    }

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onClick, false);

    const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
});
