"use client"
import Lenis from 'lenis'
import React, { useContext, useEffect, useState, createContext } from 'react';

const smoothScrollerContext = createContext<Lenis | null>(null);

export const useSmoothScroller = () => useContext(smoothScrollerContext);

export default function ScrollContext({children} : {children: React.ReactNode}){
    const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

    useEffect(() => {
        const scroller = new Lenis();
        function callingRaf(time: number){
            scroller.raf(time);
            requestAnimationFrame(callingRaf);
        };

        const rafId = requestAnimationFrame(callingRaf);
        setLenisRef(scroller);

        return () => {
            cancelAnimationFrame(rafId)
            scroller.destroy();        }
    }, [])

    return (
        <smoothScrollerContext.Provider value={lenisRef}>
            {children}
        </smoothScrollerContext.Provider>
    )
}
