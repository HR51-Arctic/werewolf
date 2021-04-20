import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';


const Sunrise = () => {

//  const animation = useAnimation();
//   async function sequence() {
//     await animation.start({ scale: 1.5 })
//     await animation.start({ rotate: 0 })
//     animation.start({ scale: 1 })
// }

  return(
    <motion.div id="sun"
    animate={{opacity: 1, y: -100, x: -25}}
    transition={{duration: 3}}
    />
  )
};

export default Sunrise;

{/* <>
<motion.div id="sun"
animate={{opacity: 1, y: -100, x: -25}}
transition={{duration: 3}}
/>
<motion.div id='sunset'
animate={{opacity: 0, y: 100, x: 25}}
transition={{delay: 3, duration: 10}}
/>
</> */}