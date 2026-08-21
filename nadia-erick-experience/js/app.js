/**
 * LUXURY WEDDING EXPERIENCE — CENTRAL ORCHESTRATOR V2.8
 * GSAP MOTION SYSTEM (Optimized Ch1 + Editorial Pacing Ch2)
 * DATE: 2024-05-20 | CODE VERSION: V2.8 (Editorial Pacing Hotfix)
 */

import weddingConfig from './config.js';
import svgAssets from './svg-assets.js';

// Register necessary plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 0. SPA ARCHITECTURE INITIALIZATION
    // =========================================
    
    gsap.to(".loader-screen", { 
        opacity: 0, 
        duration: 0.5, 
        ease: "power2.inOut",
        onComplete: () => {
            gsap.set(".loader-screen", { display: "none" });
            initSPAAnimations();
        }
    });

    // =========================================
    // 1. DATA & COMPONENT INJECTION
    // =========================================
    
    document.getElementById('txt-chapter').textContent = weddingConfig.chapterOne.title;
    document.getElementById('txt-couple').textContent = weddingConfig.couple.fullName;
    document.getElementById('txt-meta').textContent = weddingConfig.chapterOne.metaText;

    const dnaPathContainer = document.getElementById('dna-path-container');
    if(dnaPathContainer) {
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("fill", "url(#bronze-metallic)");
        pathElement.setAttribute("fill-rule", "evenodd");
        pathElement.setAttribute("d", svgAssets.chapterOne.dnaPath);
        dnaPathContainer.appendChild(pathElement);
    }

    // =========================================
    // 2. GLOBAL UI COMPONENTS (Audio)
    // =========================================
    
    if(weddingConfig.audio.enabled) {
        const audioTrack = document.getElementById('ambient-track');
        const audioToggleButton = document.getElementById('audio-toggle');

        if(audioToggleButton) audioToggleButton.removeAttribute('disabled');
        let isPlaying = false;

        if(audioToggleButton && audioTrack) {
            audioToggleButton.addEventListener('click', () => {
                if (isPlaying) {
                    audioTrack.pause();
                    audioToggleButton.classList.remove('is-playing');
                } else {
                    audioTrack.play().catch(e => {
                        console.warn("Autoplay blocked by browser.", e);
                    });
                    audioToggleButton.classList.add('is-playing');
                }
                isPlaying = !isPlaying;
            });
        }
    }

    // =========================================
    // 3. SPA MOTION ORCHESTRATION
    // =========================================
    
    function initSPAAnimations() {
        
        // =========================================
        // CAPÍTULO I: EL UMBRAL (Hero)
        // VELOCIDAD OPTIMIZADA (V2.7 Preservado)
        // =========================================

        gsap.set(".hero-container", { opacity: 1 });

        const center = 500;
        const radiusCut = 1400; 
        const radiusEcho = 1480; 

        const endPolyCut = `${center},${center - radiusCut} ${center + radiusCut},${center} ${center},${center + radiusCut} ${center - radiusCut},${center}`;
        const endPolyEcho = `${center},${center - radiusEcho} ${center + radiusEcho},${center} ${center},${center + radiusEcho} ${center - radiusEcho},${center}`;

        // Preparación del estado inicial 
        gsap.set("#dna-layer", { 
            transformOrigin: "500px 500px", 
            scale: 0.82, 
            opacity: 0,        
            rotationZ: -2      
        });
        
        gsap.set("#echo-diamond", { 
            transformOrigin: "500px 500px",
            scale: 0.9, 
            opacity: 0 
        });

        // Inicio reactivo casi inmediato
        const ch1Tl = gsap.timeline({ delay: 0.1 });

        ch1Tl
            .to(".diamond-shape:not(#echo-diamond)", {
                attr: { points: endPolyCut },
                duration: 1.8,
                ease: "power3.inOut" 
            }, 0)
            
            .to("#cutting-diamond", {
                strokeWidth: 0,
                opacity: 0,
                duration: 1.2,
                ease: "power2.in"
            }, 0.1)
            
            .to("#echo-diamond", {
                attr: { points: endPolyEcho },
                scale: 1.05,
                opacity: 0.6,
                duration: 1.5,
                ease: "power3.out"
            }, 0.2)
            .to("#echo-diamond", {
                strokeWidth: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, 0.8)

            .to("#dna-layer", {
                scale: 1,
                opacity: 1,
                rotationZ: 0,
                duration: 2.0,
                ease: "power3.out" 
            }, 0.3) 

            .to(".chapter-tag", {
                opacity: 0.85,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=1.4")
            .to(".couple-names", {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out"
            }, "-=1.2")
            .to(".wedding-meta", {
                opacity: 0.75,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=1.3")
            .to(".line-separator", {
                opacity: 0.6,
                scaleX: 1,
                duration: 1.0,
                ease: "power2.out"
            }, "-=1.0")

            .to(".scroll-indicator", {
                opacity: 1,
                duration: 1.0,
                ease: "sine.inOut"
            }, "+=0.1")

            .to("#heroContainer", {
                y: -12,
                duration: 4.0, 
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, "+=0.1");


        // =========================================
        // CAPÍTULO II: LA ESENCIA (Parallax & Editorial)
        // =========================================
        
        // 1. Motor Parallax Profundo (Preservado)
        gsap.to(".parallax-bg", {
            y: 150, 
            ease: "none",
            scrollTrigger: {
                trigger: "#chapter-2",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        gsap.to(".parallax-fg", {
            y: -250, 
            ease: "none",
            scrollTrigger: {
                trigger: "#chapter-2",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        // 2. Parallax inverso sutil para el contenedor del manifiesto
        gsap.fromTo(".content-layer-essence", 
            { y: 30 },
            { y: -15, ease: "none", scrollTrigger: {
                trigger: "#chapter-2",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }}
        );

        // 3. Etiqueta del capítulo entra normalmente al 80%
        gsap.from(".chapter-tag-essence", {
            scrollTrigger: { trigger: ".content-layer-essence", start: "top 80%" },
            y: 20, opacity: 0, duration: 1.5, ease: "power3.out"
        });

        // =========================================
        // HOTFIX V2.8: LECTURA ACTIVA (Párrafo por párrafo al centro)
        // =========================================
        
        // Iteramos sobre cada párrafo individualmente
        gsap.utils.toArray(".fade-line-2").forEach((line) => {
            gsap.from(line, {
                scrollTrigger: { 
                    trigger: line, 
                    // Se dispara EXACTAMENTE cuando la parte superior del texto llega a la mitad de la pantalla
                    start: "top center", 
                    // Opcional: toggleActions "play none none reverse" haría que desaparezcan al subir.
                    // Para lectura natural, mantenemos solo "play".
                },
                y: 35, 
                opacity: 0, 
                duration: 1.5, 
                ease: "power3.out"
            });
        });

    } // End initSPAAnimations

});