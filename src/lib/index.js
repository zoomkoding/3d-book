import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Book = (props) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const { bookCovers, style } = props;
    const aspect = style.width / style.height;

    const getBookMaterials = (urlMap) => {
      const materialNames = ["edge", "spine", "top", "bottom", "front", "back"];
      return materialNames.map((name) => {
        if (!urlMap[name]) return new THREE.MeshBasicMaterial(0xffffff);

        const texture = new THREE.TextureLoader().load(urlMap[name]);

        // to create high quality texture
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        return new THREE.MeshBasicMaterial({ map: texture });
      });
    };

    const refCurrent = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(style.background);

    const planeGeometry = new THREE.PlaneGeometry(500, 500, 32, 32);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.5;

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, 10, 10);
    light.castShadow = true;
    scene.add(light);

    const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
    const cube = new THREE.Mesh(geometry, getBookMaterials(bookCovers));
    cube.castShadow = true;
    cube.position.set(0, 0, 0);
    scene.add(cube);

    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    let isMouseOver = false;
    refCurrent.addEventListener("mouseover", () => {
      isMouseOver = true;
    });
    refCurrent.addEventListener("mouseleave", () => {
      isMouseOver = false;
    });

    let degrees = 90;

    const camera = new THREE.PerspectiveCamera(70, aspect, 1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(style.width, style.height);

    const distance = camera.position.distanceTo(cube.position);

    const rotate = () => {
      if (degrees < 135) {
        degrees += 2;
        const radian = degrees * (Math.PI / 180);
        camera.position.x = Math.cos(radian) * distance;
        camera.position.z = Math.sin(radian) * distance;
      }
    };

    const rotateBack = () => {
      if (degrees > 90) {
        degrees -= 2;
        const radian = degrees * (Math.PI / 180);
        camera.position.x = Math.cos(radian) * distance;
        camera.position.z = Math.sin(radian) * distance;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      isMouseOver ? rotate() : rotateBack();
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    refCurrent.appendChild(renderer.domElement);
    animate();

    return () => {
      refCurrent.removeChild(renderer.domElement);
    };
  }, [props]);

  return <div ref={mountRef} style={props.style} />;
};
export default Book;
