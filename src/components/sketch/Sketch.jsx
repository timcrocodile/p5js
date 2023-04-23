import React, { useEffect, useRef } from "react";
import p5 from "p5";
import styles from "./index.module.scss";

export default function Sketch() {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = new p5((p) => {
      let canvas;

      p.setup = () => {
        canvas = p.createCanvas(2000, 1000);
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

  return (
    <div className={styles.sketchContainer}>
      <button onClick={() => sketchRef.current.exportCanvas()}>
        Salva immagine
      </button>
      <div ref={sketchRef}></div>
    </div>
  );
}