import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import styles from "./index.module.scss";

export default function Sketch() {
  const sketchRef = useRef(null);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const sketch = new p5((p) => {
      let canvas;

      p.setup = () => {
        // canvas = p.createCanvas(800, 800);
        canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        // p.background(1122);
        p.background(560);
      };

      p.draw = () => {
        // Call the variableEllipse() method and send it the
        // parameters for the current mouse position
        // and the previous mouse position
        variableEllipse(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY, p);
      };

      // The simple method variableEllipse() was created specifically
      // for this program. It calculates the speed of the mouse
      // and draws a small ellipse if the mouse is moving slowly
      // and draws a large ellipse if the mouse is moving quickly
      const variableEllipse = (x, y, px, py, p) => {
        let speed = p.abs(x - px) + p.abs(y - py);
        p.stroke(speed);
        p.ellipse(x, y, speed, speed);
      };

      // Esporta il canvas come immagine PNG
      p.exportCanvas = () => {
        p.saveCanvas(canvas, "myCanvas", "png");
      };
    });

    sketchRef.current = sketch;

    return () => {
      sketchRef.current.remove();
    };
  }, []);

  const handleSaveCanvas = () => {
    sketchRef.current.exportCanvas();
  };

  // navigator.getBattery().then(function (b) {
  //   console.log(`Battery:${Math.round(b.level * 100)}%`);
  // });

  navigator.getBattery().then(function (b) {
    setBatteryLevel(Math.round(b.level * 100));
  });

  return (
    <div className={styles.sketchContainer}>
      {/* <button onClick={() => sketchRef.current.exportCanvas()}> */}
      <div className={styles.navbar}>
        <button onClick={handleSaveCanvas}>#PutYourStressInCanva</button>
        {batteryLevel !== null && (
          <p>Your Device Battery level: {batteryLevel}%</p>
        )}
        <iframe
          width="200"
          height="100"
          src="https://www.youtube.com/embed/WJ3-F02-F_Y"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div ref={sketchRef}></div>
    </div>
  );
}
