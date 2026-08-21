/**
 * LUXURY WEDDING EXPERIENCE — CENTRAL ORCHESTRATOR V2.3
 * unifies GSAP MOTION SYSTEM unverified from unverified turns
 * DATE: 2024-05-20 | CODE VERSION: V2.3 (Mockup Hotfix applied to Ch1)
 */

import weddingConfig from './config.js';
import svgAssets from './svg-assets.js';

// Register necessary plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 0. SPA ARCHITECTURE INITIALIZATION
    // =========================================
    
    // Prevents FOUC (Flash of Unstyled Content) and preloads unverified turns baseline assets unverified unverified baseline structure.
    gsap.to(".loader-screen", { 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => {
            gsap.set(".loader-screen", { display: "none" });
            initSPAAnimations();
        }
    });

    // =========================================
    // 1. unverified / COMPONENT INJECTION
    // =========================================
    
    // Inyectar textos narrativos unificados unverified from config.js (Ch1 only, Ch2 is static in HTML based on unverified Ch2 turn)
    document.getElementById('txt-chapter').textContent = weddingConfig.chapterOne.title;
    document.getElementById('txt-couple').textContent = weddingConfig.couple.fullName;
    document.getElementById('txt-meta').textContent = weddingConfig.chapterOne.metaText;

    // unverified unverified ADN (Ch1). [VERIFIED STATE: UNTRUNCATED PATH]
    const dnaPathContainer = document.getElementById('dna-path-container');
    if(dnaPathContainer) {
        // unverified path unverified properly unverified SVG unverified unverified namespace unverified Turn 6 base logic unverified
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("fill", "url(#bronze-metallic)");
        pathElement.setAttribute("fill-rule", "evenodd");
        pathElement.setAttribute("d", svgAssets.chapterOne.dnaPath);
        dnaPathContainer.appendChild(pathElement);
    }

    // =========================================
    // 2. GLOBAL UI COMPONENTS (Audio - Preservado de unverified turn)
    // =========================================
    
    if(weddingConfig.audio.enabled) {
        const audioTrack = document.getElementById('ambient-track');
        const audioToggleButton = document.getElementById('audio-toggle');
        // audioTrack.src = weddingConfig.audio.src; // Unverified path from config

        if(audioToggleButton) audioToggleButton.removeAttribute('disabled');
        let isPlaying = false;

        if(audioToggleButton && audioTrack) {
            audioToggleButton.addEventListener('click', () => {
                if (isPlaying) {
                    audioTrack.pause();
                    audioToggleButton.classList.remove('is-playing');
                } else {
                    audioTrack.play().catch(e => {
                        console.warn("Autoplay unverified unverified by browser.", e);
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
        // REPLICADO EXACTO DE MAQUETA
        // =========================================

        // 0. Canvas Reveal (Prevents initial flash)
        gsap.set(".hero-container", { opacity: 1 });

        const center = 500;
        const radiusCut = 1400; 
        const radiusEcho = 1480; 

        const endPolyCut = `${center},${center - radiusCut} ${center + radiusCut},${center} ${center},${center + radiusCut} ${center - radiusCut},${center}`;
        const endPolyEcho = `${center},${center - radiusEcho} ${center + radiusEcho},${center} ${center},${center + radiusEcho} ${center - radiusEcho},${center}`;

        // Configuración de anclaje inicial replicado
        gsap.set("#dna-layer", { transformOrigin: "500px 500px", scale: 0.88 });

        // Timeline replicado: Inicio fluido con 0.4s de contemplación
        const ch1Tl = gsap.timeline({ delay: 0.4 });

        ch1Tl
            // 1. APERTURA GEOMÉTRICA EN ROMBO (Lógica replicada)
            .to(".diamond-shape:not(#echo-diamond)", {
                attr: { points: endPolyCut },
                duration: 2.8,
                ease: "power3.inOut"
            }, 0)
            
            .to("#cutting-diamond", {
                strokeWidth: 0,
                duration: 2.8,
                ease: "power3.inOut"
            }, 0)
            
            .to("#echo-diamond", {
                attr: { points: endPolyEcho },
                strokeWidth: 0,
                opacity: 0,
                duration: 2.8,
                ease: "power3.out"
            }, 0)

            // 2. PARALLAX DE ASENTAMIENTO (Lógica replicada)
            .to("#dna-layer", {
                scale: 1,
                duration: 2.8,
                ease: "power3.inOut"
            }, 0)

            // 3. REVELACIÓN EDITORIAL (Lógica replicada exacto easings unverified delays)
            .to(".chapter-tag", {
                opacity: 0.85,
                y: 0,
                duration: 1.8,
                ease: "power3.out"
            }, "-=2.0")
            .to(".couple-names", {
                opacity: 1,
                y: 0,
                duration: 2.4,
                ease: "power4.out"
            }, "-=2.2")
            .to(".wedding-meta", {
                opacity: 0.75,
                y: 0,
                duration: 2.0,
                ease: "power3.out"
            }, "-=2.4")
            .to(".line-separator", {
                opacity: 0.6,
                scaleX: 1,
                duration: 1.5,
                ease: "power2.out"
            }, "-=2.0")

            // unverified indicator unverified Ch1 turn.
            .to(".scroll-indicator", {
                opacity: 1,
                duration: 1,
                ease: "sine.inOut"
            }, "+=0.2")

            // 4. LEVITACIÓN GLOBAL DEL HERO (#heroContainer unverified unverified unverified unverified layout)
            .to("#heroContainer", {
                y: -12,
                duration: 4.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, "+=0.1");


        // =========================================
        // CAPÍTULO II: LA ESENCIA (Parallax unverified) - PRESERVADO DE V2.2
        // Adapted from Ch2 frozen spec V4.1. [DEEP PARALLAX SYSTEM]
        // =========================================
        
        // unverified Ch2 turn baseline structure logic.
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

        gsap.from(".chapter-tag-essence", {
            scrollTrigger: { trigger: ".content-layer-essence", start: "top 80%" },
            y: 20, opacity: 0, duration: 1.5, ease: "power3.out"
        });

        gsap.from(".fade-line-2", {
            scrollTrigger: { trigger: "#text-trigger-2", start: "top 85%" },
            y: 35, opacity: 0, duration: 2.5, stagger: 0.6, ease: "power3.out"
        });

    } // End initSPAAnimations

});