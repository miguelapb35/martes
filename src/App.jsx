import React, { Suspense, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Environment, Loader } from "@react-three/drei";

import { BodyCopy, Headline, Subtitle } from "./Text";
import { Image } from "./Image";
import { ImageCube } from "./ImageCube";
import { WebGLBackground } from "./WebGLBackground";
import { Lens } from "./Lens";

import EffectsToggle from "./EffectsToggle";

import "@14islands/r3f-scroll-rig/css";

// Photos by <a href="https://unsplash.com/@maxberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maxim Berg</a> on <a href="https://unsplash.com/photos/u8maxDvbae8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    // We attach events onparent div in order to get events on both canvas and DOM
    <div ref={eventSource}>
      <GlobalCanvas
        // shader errors are hidden by default which speeds up compilation
        debug={false}
        // scaleMultiplier is a scroll-rig setting to scale the entire scene
        scaleMultiplier={0.01}
        // All other props on the R3F Canvas is supported:
        eventSource={eventSource}
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {(globalChildren) => (
          <Lens>
            <WebGLBackground />
            <Suspense fallback="">
              {/* 
                Our materials use PBR ligting and requires an environment
              */}
              <Environment files="env/empty_warehouse_01_1k.hdr" />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={enabled}
        config={{ syncTouch: true }} // Lenis setting to force smooth scroll on touch devices
      />
      <article>
        <EffectsToggle setEnabled={setEnabled} enabled={enabled} />
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline wobble>
                RESPONSIVE {enabled ? "WEBGL" : "HTML"}
              </Headline>
            </h2>
            <BodyCopy as="p" className="subline">
              {/*  Progressively enhance your React website with WebGL using
              r3f-scroll-rig, React Three Fiber and Three.js */}
              Hallo Ich lerne React Three Fiber
            </BodyCopy>
          </div>
        </header>
        <section className="container">
          <Image
            src="images/maxim-berg-1_U2RcHnSjc-unsplash.jpg"
            className="ImageLandscape"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Que te parece Connie?</Subtitle>
            <em>
              <Subtitle>Esta tecnologia</Subtitle>
            </em>
          </h3>
          <p>
            <BodyCopy>
              Try turning off WebGL using the button in the sticky header.
              You’ll notice smooth scrolling is disabled, and all scroll-bound
              WebGL effects disappears.
            </BodyCopy>
          </p>
        </section>
        <section className="ParallaxContainer">
          <Image
            src="images/maxim-berg-qsDfqZyTCAE-unsplash-crop.jpg"
            className="aspect-9_13"
            parallaxSpeed={1.08}
          />
          <Image
            src="images/maxim-berg-ANuuRuCRRAc-unsplash.jpg"
            className="aspect-16_11"
            parallaxSpeed={0.92}
          />
        </section>
        <section className="container">
          <h4>
            <BodyCopy>
              Thanks to Threejs we can also render 3D geometry or models. The
              following image is replaced by a box. Try scrolling hard to make
              it wiggle.
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src="images/maxim-berg-TcE45yIzJA0-unsplash.jpg"
            className="JellyPlaceholder"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Mia</Subtitle>
            <em>
              <Subtitle>Ich liebe dich.</Subtitle>
            </em>
          </h3>
        </section>
        <footer></footer>
      </article>

      <Loader
        containerStyles={{
          background: "transparent",
          top: "auto",
          bottom: 0,
          height: "5px",
        }}
        innerStyles={{ background: "white", width: "100vw", height: "5px" }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
      />
    </div>
  );
}
