import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import wolfEyes from './images/wolfEyes.jpeg';

const ParallaxEyes = () => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  const handleMouse = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
    style={{
        width: "100%",
        height: "100%",
        display: "flex",
        placeItems: "center",
        placeContent: "center",

    }}
    onMouseMove={handleMouse}
>
    <motion.div
        style={{
            width: 150,
            height: 150,
            borderRadius: 30,
            backgroundColor: "#fff",
            rotateX: rotateX,
            rotateY: rotateY,
        }}
    >
      <img src={wolfEyes}  style={{width: 150, height: 150}}/>
    </motion.div>
</motion.div>
  )
}

export default ParallaxEyes;