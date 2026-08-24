/**
 * LUXURY WEDDING EXPERIENCE — CENTRAL ORCHESTRATOR V3.64
 * GSAP MOTION SYSTEM + LENIS SMOOTH SCROLL (Inertia Control)
 */

import weddingConfig from './config.js';

gsap.registerPlugin(ScrollTrigger);

// =========================================
// 0.5 MOTOR DE INERCIA Y SCROLL SUAVE (LENIS)
// =========================================
const lenis = new Lenis({
    duration: 1.2,      
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    smooth: true,
    smoothTouch: false  
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
        
        // 1. Iniciar Audio
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

        // 2. Transición de Interfaz y Liberación de Scroll
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
// 1. DATA INJECTION (Solo Ch1)
// =========================================
document.getElementById('txt-chapter').textContent = weddingConfig.chapterOne.title;
document.getElementById('txt-couple').textContent = weddingConfig.couple.fullName;
document.getElementById('txt-meta').textContent = weddingConfig.chapterOne.metaText;

// =========================================
// 2. AUDIO COMPONENT (Toggle Manual)
// =========================================
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

    const ch1Tl = gsap.timeline({ 
        scrollTrigger: { 
            trigger: ".hero-container", 
            end: "+=150%"
        },
        delay: 0.2 
    });
    
    ch1Tl
        // FASE 1: Apertura majestuosa del diamante (ralentizada a 6.0s)
        .to(".diamond-shape:not(#echo-diamond)", { attr: { points: endPolyCut }, duration: 6.0, ease: "power3.inOut" }, 0)
        .to("#cutting-diamond", { strokeWidth: 0, duration: 6.0, ease: "power3.inOut" }, 0)
        .to("#echo-diamond", { attr: { points: endPolyEcho }, strokeWidth: 0, opacity: 0, duration: 6.0, ease: "power3.out" }, 0)
        .to("#dna-layer", { scale: 1, duration: 6.0, ease: "power3.inOut" }, 0) 
        .to("#audioContainer", { opacity: 1, duration: 6.0, ease: "power3.inOut" }, 0) 
        
        // FASE 2: Los textos aparecen de forma escalonada una vez que el diamante va a la mitad de su trayecto (3.0s)
        // Se alargan un poco las duraciones para que empaten con el "mood" relajado de los 6 segundos.
        .to(".chapter-tag", { opacity: 0.85, y: 0, duration: 2.0, ease: "power3.out" }, 3.0)
        .to(".couple-names", { opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }, 3.4)
        .to(".wedding-meta", { opacity: 0.75, y: 0, duration: 2.0, ease: "power3.out" }, 3.8)
        .to(".line-separator", { opacity: 0.6, scaleX: 1, duration: 2.0, ease: "power2.out" }, 4.2)
        
        // FASE 3: Indicadores de scroll y efecto flotante inician al finalizar la fase 1 (6.0s)
        .to(".scroll-indicator", { opacity: 1, duration: 1.5, ease: "sine.inOut" }, 6.0)
        .to("#heroContainer", { y: -12, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 6.0);


    // --- CH2: LA ESENCIA (FADE REVEAL CON PIN Y SCRUB) ---
    
    gsap.utils.toArray(".fade-line-2").forEach((line) => {
        gsap.from(line, {
            scrollTrigger: { 
                trigger: "#chapter-2", 
                start: "top 70%" 
            },
            y: 30, 
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
            end: "+=150%",     
            scrub: 1,          
            pin: true
        }
    });

    ch2Tl
        .to("#manifesto-content", { opacity: 0, y: -40, duration: 1 }, 0)
        .to("#solid-canvas", { opacity: 0, duration: 1.5 }, 0.5)
        .to(".majestic-ethereal-photo", { scale: 1, duration: 2, ease: "sine.out" }, 0.5);


    // --- CH3: COORDENADAS ---
    const tl = gsap.timeline({
        scrollTrigger: { trigger: "#chapter-3", start: "top top", end: "bottom bottom", scrub: 1.5 }
    });

    tl
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
}