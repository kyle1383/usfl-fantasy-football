/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/earth.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.EmptyAction.play();
    actions["SphereAction.001"].play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Empty">
          <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={materials["Material.002"]}
            position={[0, 4.45, 0]}
            rotation={[Math.PI, -1.48, Math.PI]}
            scale={[0.05, 0.05, 0.1]}
          />
        </group>
        <mesh
          name="Circle"
          geometry={nodes.Circle.geometry}
          material={materials["Material.001"]}
          position={[0, 2.58, 0]}
          scale={[0.05, 0.1, 0.05]}
        />
        <group name="Icosphere">
          <mesh
            name="Icosphere002"
            geometry={nodes.Icosphere002.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="Icosphere002_1"
            geometry={nodes.Icosphere002_1.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Icosphere002_2"
            geometry={nodes.Icosphere002_2.geometry}
            material={materials.Material}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/earth.glb");
