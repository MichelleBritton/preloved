import { useEffect, useRef } from "react";

export const useScrollHandler = (styles) => {
    const logoRef = useRef(null);
    const navBarLogoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            let scrollPos = window.scrollY;
            if (scrollPos > 100) {
                if (logoRef.current) logoRef.current.classList.add(styles.Shrink);
                if (navBarLogoRef.current) navBarLogoRef.current.classList.add(styles.Visible);
            } else {
                if (logoRef.current) logoRef.current.classList.remove(styles.Shrink);
                if (navBarLogoRef.current) navBarLogoRef.current.classList.remove(styles.Visible);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [styles]);

    return { logoRef, navBarLogoRef };
};

export default useScrollHandler;