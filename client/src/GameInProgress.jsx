import React, { useState } from 'react'
import AppHeader from './AppHeader.jsx'
import WerewolfLogo from "./images/WerewolfLogo.svg";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useSound from 'use-sound';
import wolfEyes from './images/wolfEyes.jpeg';
import growl from '../../assets/sounds/growl.mp3';

const GameInProgress = () => {
  // const containerStyle = {
  //   position: 'absolute',
  //   left: '50%',
  //   transform: 'translate(-50%)',
  //   textAlign: 'center',
  // }
  // const imageContainer = {
  //   height: '300px',
  //   width: '700px',
  //   overflow: 'hidden',
  //   margin: '0 auto'
  // }
  // const imageStyle = {
  //   width: '90%',
  //   marginTop: '-20px',
  //   marginBottom: '-40px',
  //   margin: '0 auto'
  // }
  // const textStyle = {
  //   marginTop: '-10px',
  //   marginBottom: '10%',
  // }
  const iconStyle = {
    marginLeft: '35%',
  }

  const [play, { stop }] = useSound(growl, {volume: 0.5});
  const [hovering, setHovering] = useState(false);

    // Parallax Eyes
    const x = useMotionValue(100);
    const y = useMotionValue(100);
    const rotateX = useTransform(y, [0, 200], [20, -20]);
    const rotateY = useTransform(x, [0, 200], [-20, 20]);

    const handleMouse = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();

      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }

  return (
  <div id='GIPContainer' onMouseMove={handleMouse}>
    <motion.div id='GIPWolf'
        style={{
            width: 150,
            height: 150,
            boxShadow: '0px -20px 50px 50px black',
            borderRadius: '20%',
            rotateX: rotateX,
            rotateY: rotateY,
        }}
        onMouseEnter={() => setHovering(true) + play()}
        onMouseLeave={() => setHovering(false) + stop()}
        transition={{type: "spring", mass: 1, stiffness: 350, damping: 25, tension: 100}}
       >
       <img src={wolfEyes}  style={{width: 150, height: 150}}/>
    </motion.div>
    <div id="GIPLogo">
      <img id="GIPImage" src={WerewolfLogo} alt="Werewolf Logo" />
    </div>
    <div id='GIPTextContainer'>
      <h1 id='GIPText'>game in progress, please come back later</h1>
      <h1 id='JText' > 申し訳ございません <br/> ありがとうございます</h1>
      <i className="fas fa-cog fa-10x" style={{...iconStyle}}></i>
    </div>

  </div>
  )
}
export default GameInProgress