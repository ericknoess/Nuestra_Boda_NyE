/**
 * WEDDING EXPERIENCE - CENTRAL CONFIGURATION V3.4 (SPA Integrated)
 */

const weddingConfig = {

    couple: {
        partnerOne: "Nadia",
        partnerTwo: "Erick",
        fullName: "Nadia & Erick",
        monogramUrl: "#bronze-metallic" 
    },

    audio: {
        enabled: true,            
        autoplay: false,          
        preload: "auto",
        loop: true,
        src: "assets/audio/ambient-track.mp3" 
    },

    chapterOne: {
        title: "Capítulo I • El Umbral",
        metaText: "21 . 11 . 2026 • Ixtapan de la Sal"
    },

    // Datos estructurados del nuevo Capítulo III (V5.9)
    chapterThree: {
        tag: "Capítulo III • Coordenadas",
        date: "21 . 11 . 2026",
        ceremony: {
            phase: "La Ceremonia",
            location: "Iglesia Principal",
            city: "Ixtapan de la Sal"
        },
        reception: {
            phase: "La Celebración",
            location: "Finca El Encanto",
            city: "Recepción y Banquete"
        },
        images: {
            iglesia: "iglesia.jpeg",
            jardin: "jardin.jpeg"
        }
    }
};

export default weddingConfig;