import React from 'react';
import styles from '../styles/Logo.module.css';
import LogoImg from '../assets/logo.webp';

// Logo component to render logo
function Logo() {
  return (
    <div className={styles.LogoContainer}>
        <img 
            className={styles.Logo} 
            src={LogoImg} 
            alt="Preloved Canine Clobber Logo" 
        />
    </div>    
  )
};

export default Logo;

