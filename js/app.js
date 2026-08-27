/**
 * LUXURY WEDDING EXPERIENCE — CENTRAL ORCHESTRATOR V4.5 (MOBILE STABILITY SHIELD)
 * GSAP MOTION SYSTEM + LENIS SMOOTH SCROLL (Inertia Control)
 */

import weddingConfig from './config.js';

gsap.registerPlugin(ScrollTrigger);

// =========================================
// 0.1 ESTABILIZACIÓN MÓVIL Y RESIZE (SAFARI/CHROME FIX)
// =========================================
// Ignora los cambios de altura causados por la barra de URL del celular
ScrollTrigger.config({ 
    ignoreMobileResize: true 
});

// =========================================
// 0.5 MOTOR DE INERCIA Y SCROLL SUAVE (LENIS)
// =========================================
const lenis = new Lenis({
    duration: 1.2,      
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    smooth: true,
    smoothTouch: false  
});

// Escudo protector contra giros de pantalla y redimensionamientos
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 300);
});

window.addEventListener("orientationchange", () => {
    lenis.stop(); // Congela el scroll para evitar glitches visuales
    setTimeout(() => {
        ScrollTrigger.refresh(); // Fuerza a GSAP a recalcular las alturas del viewport girado
        lenis.start(); // Libera el scroll de forma segura
    }, 500); // 500ms garantizan que Safari/Chrome terminó de dibujar la pantalla
});

window.scrollTo(0, 0);
lenis.stop();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// =========================================
// 0. CEREMONIAL GATE (LOADER) & AUDIO CONTROL
// =========================================
const enterBtn = document.getElementById('enter-experience');
const audioTrack = document.getElementById('ambient-track');
const ceremonialGate = document.getElementById('ceremonial-gate');
const audioToggleButton = document.getElementById('audio-toggle');
const audioContainer = document.getElementById('audioContainer');

let isAudioPlaying = false;

if(enterBtn) {
    enterBtn.addEventListener('click', () => {
        if(audioTrack && weddingConfig.audio.enabled) {
            audioTrack.volume = 0; 
            audioTrack.play().then(() => {
                isAudioPlaying = true;
                if(audioToggleButton) {
                    audioToggleButton.removeAttribute('disabled');
                    audioToggleButton.classList.add('is-playing');
                }
                gsap.to(audioTrack, { volume: 1, duration: 3 });
            }).catch(e => console.warn("Audio bloqueado por navegador", e));
        }

        gsap.to(enterBtn, { opacity: 0, duration: 0.5 });
        gsap.to(ceremonialGate, { 
            opacity: 0, 
            duration: 1.5, 
            delay: 0.3, 
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(ceremonialGate, { display: "none" });
                if(audioContainer) audioContainer.classList.add('is-active');
                initSPAAnimations(); 
                lenis.start();       
            }
        });
    });
}

// =========================================
// 1. DATA INJECTION
// =========================================
document.getElementById('txt-chapter').textContent = weddingConfig.chapterOne.title;
document.getElementById('txt-couple').textContent = weddingConfig.couple.fullName;
document.getElementById('txt-meta').textContent = weddingConfig.chapterOne.metaText;

if(weddingConfig.audio.enabled && audioToggleButton && audioTrack) {
    audioToggleButton.addEventListener('click', () => {
        if (isAudioPlaying) {
            audioTrack.pause();
            audioToggleButton.classList.remove('is-playing');
        } else {
            audioTrack.play().catch(e => console.warn("Autoplay bloqueado", e));
            audioToggleButton.classList.add('is-playing');
        }
        isAudioPlaying = !isAudioPlaying;
    });
}

// =========================================
// 2. SPA MOTION ORCHESTRATION (MATCH MEDIA)
// =========================================
function initSPAAnimations() {
    gsap.set(".hero-container", { opacity: 1 });
    
    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        const svgInitialScale = isMobile ? 0.70 : 0.88;
        const scrollEndCh1 = isMobile ? "+=120%" : "+=150%";
        const scrollEndCh2 = isMobile ? "+=220%" : "+=150%"; 

        // --- CH1: EL UMBRAL ---
        const center = 500;
        const radiusCut = 1400; 
        const radiusEcho = 1480; 
        const endPolyCut = `${center},${center - radiusCut} ${center + radiusCut},${center} ${center},${center + radiusCut} ${center - radiusCut},${center}`;
        const endPolyEcho = `${center},${center - radiusEcho} ${center + radiusEcho},${center} ${center},${center + radiusEcho} ${center - radiusEcho},${center}`;

        gsap.set("#dna-layer", { transformOrigin: "500px 500px", scale: svgInitialScale });

        const ch1Tl = gsap.timeline({ 
            scrollTrigger: { trigger: ".hero-container", end: scrollEndCh1 },
            delay: 0.2 
        });
        
        ch1Tl
            .to(".diamond-shape:not(#echo-diamond)", { attr: { points: endPolyCut }, duration: 6.0, ease: "power3.inOut" }, 0)
            .to("#cutting-diamond", { strokeWidth: 0, duration: 6.0, ease: "power3.inOut" }, 0)
            .to("#echo-diamond", { attr: { points: endPolyEcho }, strokeWidth: 0, opacity: 0, duration: 6.0, ease: "power3.out" }, 0)
            .to("#dna-layer", { scale: 1, duration: 6.0, ease: "power3.inOut" }, 0) 
            .to("#audioContainer", { opacity: 1, duration: 6.0, ease: "power3.inOut" }, 0) 
            
            .to(".chapter-tag", { opacity: 0.85, y: 0, duration: 2.0, ease: "power3.out" }, 3.0)
            .to(".couple-names", { opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }, 3.4)
            .to(".wedding-meta", { opacity: 0.75, y: 0, duration: 2.0, ease: "power3.out" }, 3.8)
            .to(".line-separator", { opacity: 0.6, scaleX: 1, duration: 2.0, ease: "power2.out" }, 4.2)
            
            .to(".scroll-indicator", { opacity: 1, duration: 1.5, ease: "sine.inOut" }, 6.0)
            .to("#heroContainer", { y: isMobile ? -8 : -12, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 6.0);


        // --- CH2: LA ESENCIA (FADE REVEAL CON PIN Y SCRUB) ---
        gsap.utils.toArray(".fade-line-2").forEach((line) => {
            gsap.from(line, {
                scrollTrigger: { trigger: "#chapter-2", start: "top 70%" },
                y: isMobile ? 15 : 30, 
                opacity: 0, 
                duration: 1.2, 
                stagger: 0.2, 
                ease: "power3.out"
            });
        });

        const ch2Tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#chapter-2",
                start: "top top",
                end: scrollEndCh2, 
                scrub: 1,          
                pin: true
            }
        });

        ch2Tl
            .to("#manifesto-content", { opacity: 0, y: -40, duration: 1 }, 0)
            .to("#solid-canvas", { opacity: 0, duration: 1.5 }, 0.5)
            .to(".majestic-ethereal-photo", { scale: 1, duration: 2, ease: "sine.out" }, 0.5);


        // --- CH3: COORDENADAS ---
        const ch3Tl = gsap.timeline({
            scrollTrigger: { trigger: "#chapter-3", start: "top top", end: "bottom bottom", scrub: 1.5 }
        });

        ch3Tl
            .to("#bg-iglesia", { opacity: 0.25, duration: 1 }, 0)
            .to("#layer-fecha", { opacity: 0, y: -40, duration: 1 }, 1)
            .to("#layer-ceremonia", { opacity: 1, y: 0, duration: 1 }, 2)
            .to("#layer-ceremonia", { opacity: 0, y: -40, duration: 1 }, 4)
            .to("#bg-iglesia", { opacity: 0, duration: 1 }, 4)
            .to("#bg-jardin", { opacity: 0.25, duration: 1 }, 5)
            .to("#layer-recepcion", { opacity: 1, y: 0, duration: 1 }, 5.5)
            .to("#bg-iglesia", { scale: 1.06, duration: 5, ease: "none" }, 0)
            .to("#bg-jardin", { scale: 1.06, duration: 4.5, ease: "none" }, 5)
            .to("#layer-recepcion", { opacity: 0, y: -40, duration: 1 }, 8)
            .to("#bg-jardin", { opacity: 0, duration: 1 }, 8)
            .to("#ch-tag", { opacity: 0, duration: 1 }, 8);
            
        // --- CIERRE FLORAL (PARALLAX SUTIL) ---
        const floralImage = document.querySelector(".floral-closure-photo");
        if (floralImage) {
            gsap.fromTo(floralImage, 
                { y: "-15%" }, 
                {
                    y: "10%",  
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".floral-closure-section",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
            
    }); 
}