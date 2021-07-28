import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Book = (props) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const getBookMaterials = (urlMap) => {
      const materialNames = ["edge", "spine", "top", "bottom", "front", "back"];
      return materialNames.map(
        (name) =>
          new THREE.MeshLambertMaterial(
            urlMap[name] ? { map: loader.load(urlMap[name]) } : 0xfffff
          )
      );
    };

    const refCurrent = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      props.width / props.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(props.width, props.height);

    mountRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x222222);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 6);
    scene.add(light);

    const loader = new THREE.TextureLoader();
    const urlMap = {
      front:
        "https://image.aladin.co.kr/product/24790/62/cover500/k392732321_1.jpg",
      back: "https://image.aladin.co.kr/product/24790/62/letslook/K392732321_b.jpg",
      spine:
        "https://image.aladin.co.kr/product/24790/62/spineflip/K392732321_d.jpg",
    };
    const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
    const cube = new THREE.Mesh(geometry, getBookMaterials(urlMap));

    scene.add(cube);
    camera.position.z = 6;

    const animate = function () {
      requestAnimationFrame(animate);
      mountRef.current.addEventListener("mouseover", () => {
        cube.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      refCurrent.removeEventListener("mouseover");
      refCurrent.removeChild(renderer.domElement);
    };
  }, [props]);

  return <div ref={mountRef} />;
};
export default Book;
