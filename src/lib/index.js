import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Book = (props) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const getBookMaterials = (urlMap) => {
      const materialNames = ["edge", "spine", "top", "bottom", "front", "back"];
      return materialNames.map((name) => {
        if (!urlMap[name]) return new THREE.MeshBasicMaterial(0xffffff);
        const texture = new THREE.TextureLoader().load(urlMap[name]);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        return new THREE.MeshBasicMaterial({ map: texture });
      });
    };

    const refCurrent = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(props.style.background);
    const aspect = props.style.width / props.style.height;
    const camera = new THREE.PerspectiveCamera(70, aspect, 1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const planeGeometry = new THREE.PlaneGeometry(500, 500, 32, 32);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.5;

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    renderer.setSize(props.style.width, props.style.height);

    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, 10, 10);
    light.castShadow = true;
    scene.add(light);

    const urlMap = {
      front:
        "https://image.aladin.co.kr/product/24790/62/cover500/k392732321_1.jpg",
      back: "https://image.aladin.co.kr/product/24790/62/letslook/K392732321_b.jpg",
      spine:
        "https://image.aladin.co.kr/product/24790/62/spineflip/K392732321_d.jpg",
    };
    const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
    const cube = new THREE.Mesh(geometry, getBookMaterials(urlMap));
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);

    camera.position.z = 3;
    camera.position.x = -5;
    let isMouseOver = false;

    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    mountRef.current.addEventListener("mouseover", () => (isMouseOver = true));
    mountRef.current.addEventListener(
      "mouseleave",
      () => (isMouseOver = false)
    );

    let degrees = 90;
    const dist = camera.position.distanceTo(cube.position);

    const rotate = () => {
      if (degrees < 135) {
        degrees += 2;
        const radian = degrees * (Math.PI / 180);
        camera.position.x = Math.cos(radian) * dist;
        camera.position.z = Math.sin(radian) * dist;
      }
    };

    const recover = () => {
      if (degrees > 90) {
        degrees -= 2;
        const radian = degrees * (Math.PI / 180);
        camera.position.x = Math.cos(radian) * dist;
        camera.position.z = Math.sin(radian) * dist;
      }
    };

    const animate = function () {
      requestAnimationFrame(animate);

      if (isMouseOver) rotate();
      else recover();
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      refCurrent.removeChild(renderer.domElement);
    };
  }, [props]);

  return <div ref={mountRef} style={props.style} />;
};
export default Book;
