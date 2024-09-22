import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('brainCanvasContainer').appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(50, 50, 50, 0.8)';
    tooltip.style.color = '#ffffff';
    tooltip.style.padding = '8px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.display = 'none';
    tooltip.style.fontSize = '0.9em';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);

    const infoPanel = document.createElement('div');
    infoPanel.id = 'infoPanel';
    document.body.appendChild(infoPanel);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset View';
    Object.assign(resetButton.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1001,
        padding: '10px 15px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    });
    resetButton.addEventListener('mouseover', () => {
        resetButton.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    });
    resetButton.addEventListener('mouseout', () => {
        resetButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    });
    resetButton.addEventListener('click', () => {
        camera.position.set(0, 0, 5);
        controls.reset();
    });
    document.body.appendChild(resetButton);
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
            selectedObject.material.color.set(0x00ff00); // Highlight color
            selectedObject.material.emissive.set(0x00ff00);
            selectedObject.material.emissiveIntensity = 0.7;
            selectedObject.material.needsUpdate = true;
            selectedObject.scale.set(1.1, 1.1, 1.1); // Slightly enlarge on selection
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX + 5}px`;
            tooltip.style.top = `${event.clientY + 5}px`;
            tooltip.textContent = 'Brain Region Selected';
        } else {
            // Reset scale for non-selected objects
            scene.children.forEach(child => {
                if (child.isMesh) {
                    child.scale.set(1, 1, 1);
                }
            });
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
