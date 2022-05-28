import React, {
  Component,
  useState,
  Suspense,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PresentationControls,
  TransformControls,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Model from "./Usflworld";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import "../../styles/Landing.css";

function Landing() {
  const WorldAnimation = () => {
    return (
      <Canvas
        camera={{ position: [2, 0, 25.25], fov: 12 }}
        style={{
          backgroundColor: "transparent",
          height: "40vh",
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight
          intensity={0.4}
          color={"#ffb703"}
          position={[0, 5, 0]}
        />
        <directionalLight
          intensity={1}
          color={"#fb8500"}
          position={[2, 5, 0]}
        />
        <directionalLight
          intensity={1}
          color={"#04f06a"}
          position={[0, 5, 3]}
        />
        <directionalLight
          intensity={1}
          color={"#63d2ff"}
          position={[1, 1, 0]}
        />
        <directionalLight
          intensity={1}
          color={"#009ffd"}
          position={[0, 0, 3]}
        />

        <Suspense fallback={<h1>Loading profile...</h1>}>
          <Model position={[0, -2.75, 0]} /> /* highlight-line */
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={2}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
          </EffectComposer>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={true} />
      </Canvas>
    );
  };
  const Hero = () => {
    const [username, setUsername] = useState("");
    const handleLogin = () => {
      console.log("log");
    };
    return (
      <div className="hero">
        <div className="half-panel">
          <h1> The Only Dedicated Fantasy App for the USFL.</h1>
          <p>
            {" "}
            USFL Fantasy not only brings fantasy football to the USFL, but
            improves it along the way We take the best ideas from NFL fantasy,
            and add to them.
          </p>
          <div className="form-box">
            <Form onSubmit={handleLogin}>
              <div className="form-group">
                <Input
                  type="email"
                  placeholder="name@usflfantasy.app"
                  className="mini-email"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-accent-5">Sign Up Now</button>
              </div>
            </Form>
          </div>
        </div>
        <div className="half-panel">
          <WorldAnimation />
        </div>
      </div>
    );
  };

  return (
    <div className="landing">
      <Hero />
    </div>
  );
}

export default React.memo(Landing);
