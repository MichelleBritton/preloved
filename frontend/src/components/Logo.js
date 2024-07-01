import React from 'react';
import styles from '../styles/Logo.module.css';
import LogoImg from '../assets/logo.webp';
import useScrollHandler from '../hooks/useScrollHandler';

// Logo component to render logo which will disappear on scroll
const Logo = () => {
    const {logoRef} = useScrollHandler(styles);

    return (
        <div className={`${styles.LogoContainer} mb-4`}>
            <img 
                className={styles.Logo} 
                src={LogoImg} 
                ref={logoRef}
                alt="Preloved Canine Clobber Logo" 
            />
        </div> 
    );
};

export default Logo;


