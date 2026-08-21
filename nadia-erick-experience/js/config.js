/**
 * WEDDING EXPERIENCE - CENTRAL CONFIGURATION V2.0 (SPA Integrated)
 * unifies data for Chapter I
 */

const weddingConfig = {

    /**
     * GENERAL PAIR DATA
     */
    couple: {
        partnerOne: "Nadia",
        partnerTwo: "Erick",
        fullName: "Nadia & Erick",
        monogramUrl: "#bronze-metallic" // Reference to Ch1 Gradient
    },

    /**
     * AUDIO SYSTEM (Opt-in)
     */
    audio: {
        enabled: true,            // Feature toggle
        autoplay: false,          // Strictly FALSE by luxury policy
        preload: "auto",
        loop: true,
        src: "assets/audio/ambient-track.mp3" // [MISSING ASSET]
    },

    /**
     * CHAPTER I: THE THRESHOLD (Hero Section)
     * Static narrative extracted from provided mockup
     */
    chapterOne: {
        title: "Capítulo I • El Umbral",
        metaText: "21 . 11 . 2026 • Ixtapan de la Sal"
    }
};

export default weddingConfig;