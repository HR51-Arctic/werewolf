import React from 'react'
import AppHeader from './AppHeader.jsx'
import WerewolfLogo from "./images/WerewolfLogo.svg";

const GameInProgress = () => {
  const containerStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    textAlign: 'center',
  }
  const imageContainer = {
    height: '300px',
    width: '700px',
    overflow: 'hidden',
    margin: '0 auto'
  }
  const imageStyle = {
    width: '90%',
    marginTop: '-20px',
    marginBottom: '-40px',
    margin: '0 auto'
  }
  const textStyle = {
    marginTop: '-10px',
    marginBottom: '10%',
  }
  const iconStyle ={

  }

  return (
  <div style={{...containerStyle}}>
    <div style={{...imageContainer}}><img src={WerewolfLogo} alt="Werewolf/ Werewolf Logo" className="werewolfLogo" style={{...imageStyle}}/></div>
    <h1 style={{...textStyle}}>game in progress, please come back later<br />申し訳ございません <br />ありがとうございます</h1>
    <i className="fas fa-cog fa-10x" style={{...iconStyle}}></i>
  </div>
  )
}
export default GameInProgress