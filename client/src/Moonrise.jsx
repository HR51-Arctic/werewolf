import React from 'react';
import { motion } from 'framer-motion';
import moon from './images/moon.svg';


const Moonrise = ( { timer } ) => {

  return(
    <motion.div id="moon"
    animate={{opacity: 0, y: 100}} transition={{duration: timer}}
    >
    <img src={moon} style={{height: '60px', width: '60px', backgroundColor: 'rgb(4, 65, 130)', borderRadius: '50%', boxShadow: '0 0 10px 10px rgb(4, 65, 130)'}}></img>
    </motion.div>
  )
};

export default Moonrise;