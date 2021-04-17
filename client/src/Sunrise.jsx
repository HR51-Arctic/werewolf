import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Sunrise = () => {
  return(
    <motion.div id="sun"
    animate={{opacity: 1, y: -100}} transition={{duration: 2}}
    />
  )
};

export default Sunrise;