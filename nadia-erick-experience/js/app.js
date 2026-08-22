/**
 * LUXURY WEDDING EXPERIENCE — CENTRAL ORCHESTRATOR V3.16
 * GSAP MOTION SYSTEM (Ch1 Fast & Crisp, Ch2 Active Read, Ch3 Native Sticky + Scrub Fix)
 */

import weddingConfig from './config.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 0. LOADER
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
    // 1. DATA INJECTION (Solo Ch1)
    // =========================================
    document.getElementById('txt-chapter').textContent = weddingConfig.chapterOne.title;
    document.getElementById('txt-couple').textContent = weddingConfig.couple.fullName;
    document.getElementById('txt-meta').textContent = weddingConfig.chapterOne.metaText;

    // =========================================
    // 2. AUDIO COMPONENT
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
                    audioTrack.play().catch(e => console.warn("Autoplay blocked", e));
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
        
        // --- CH1: EL UMBRAL ---
        gsap.set(".hero-container", { opacity: 1 });
        const center = 500;
        const radiusCut = 1400; 
        const radiusEcho = 1480; 
        const endPolyCut = `${center},${center - radiusCut} ${center + radiusCut},${center} ${center},${center + radiusCut} ${center - radiusCut},${center}`;
        const endPolyEcho = `${center},${center - radiusEcho} ${center + radiusEcho},${center} ${center},${center + radiusEcho} ${center - radiusEcho},${center}`;

        gsap.set("#dna-layer", { transformOrigin: "500px 500px", scale: 0.88 });

        const ch1Tl = gsap.timeline({ delay: 0.1 });
        ch1Tl
            .to(".diamond-shape:not(#echo-diamond)", { attr: { points: endPolyCut }, duration: 1.8, ease: "power3.inOut" }, 0)
            .to("#cutting-diamond", { strokeWidth: 0, duration: 1.8, ease: "power3.inOut" }, 0)
            .to("#echo-diamond", { attr: { points: endPolyEcho }, strokeWidth: 0, opacity: 0, duration: 1.8, ease: "power3.out" }, 0)
            .to("#dna-layer", { scale: 1, duration: 1.8, ease: "power3.inOut" }, 0) 
            
            .to(".chapter-tag", { opacity: 0.85, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.0")
            .to(".couple-names", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "-=1.1")
            .to(".wedding-meta", { opacity: 0.75, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.2")
            .to(".line-separator", { opacity: 0.6, scaleX: 1, duration: 1.0, ease: "power2.out" }, "-=1.0")
            
            .to(".scroll-indicator", { opacity: 1, duration: 1.0, ease: "sine.inOut" }, "+=0.1")
            .to("#heroContainer", { y: -12, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, "+=0.1");

        // --- CH2: LA ESENCIA ---
        gsap.to(".parallax-bg", { y: 150, ease: "none", scrollTrigger: { trigger: "#chapter-2", start: "top bottom", end: "bottom top", scrub: true }});
        gsap.to(".parallax-fg", { y: -250, ease: "none", scrollTrigger: { trigger: "#chapter-2", start: "top bottom", end: "bottom top", scrub: true }});
        gsap.fromTo(".content-layer-essence", { y: 30 }, { y: -15, ease: "none", scrollTrigger: { trigger: "#chapter-2", start: "top bottom", end: "bottom top", scrub: true }});
        gsap.from(".chapter-tag-essence", { scrollTrigger: { trigger: ".content-layer-essence", start: "top 80%" }, y: 20, opacity: 0, duration: 1.5, ease: "power3.out" });

        gsap.utils.toArray(".fade-line-2").forEach((line) => {
            gsap.from(line, {
                scrollTrigger: { trigger: line, start: "top center" },
                y: 35, opacity: 0, duration: 1.5, ease: "power3.out"
            });
        });

        // --- CH3: COORDENADAS (Corrección de Integración SPA: Eliminado pin: true) ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#chapter-3",
                start: "top top",      
                end: "bottom bottom",  // Sincronizado perfectamente con los 450vh del CSS
                scrub: 1              
                // pin: true           // Eliminado para evitar conflicto con position: sticky del CSS
            }
        });

        tl
            // ACTO 1: Inicia la fecha y entra la atmósfera de la iglesia (0 a 1)
            .to("#bg-iglesia", { opacity: 0.25, duration: 1 }, 0)
            
            // ACTO 2: La Fecha SE RETIRA (1 a 2)
            .to("#layer-fecha", { opacity: 0, y: -40, duration: 1 }, 1)
            
            // ACTO 3: La Ceremonia ENTRA sola, una vez que la fecha ya no está (2 a 3)
            .to("#layer-ceremonia", { opacity: 1, y: 0, duration: 1 }, 2)
            
            // ACTO 4: La Ceremonia SE RETIRA junto con la iglesia (4 a 5)
            .to("#layer-ceremonia", { opacity: 0, y: -40, duration: 1 }, 4)
            .to("#bg-iglesia", { opacity: 0, duration: 1 }, 4)
            
            // ACTO 5: Entra el Jardín y luego la Recepción (5 a 6.5)
            .to("#bg-jardin", { opacity: 0.25, duration: 1 }, 5)
            .to("#layer-recepcion", { opacity: 1, y: 0, duration: 1 }, 5.5)
            
            // MOVIMIENTO DE FONDO CONTINUO (Se reproduce independientemente)
            .to("#bg-iglesia", { scale: 1.06, duration: 5, ease: "none" }, 0)
            .to("#bg-jardin", { scale: 1.06, duration: 4.5, ease: "none" }, 5)
            
            // ACTO FINAL: Salida limpia hacia el siguiente capítulo (8 a 9)
            .to("#layer-recepcion", { opacity: 0, y: -40, duration: 1 }, 8)
            .to("#bg-jardin", { opacity: 0, duration: 1 }, 8)
            .to("#ch-tag", { opacity: 0, duration: 1 }, 8);

    } 
});