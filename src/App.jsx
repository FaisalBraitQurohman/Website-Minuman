import NavBar from "./components/NavBar.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection.jsx";
import { FlavourSection } from "./sections/FlavourSection.jsx";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection.jsx";
import BenefitSection from "./sections/BenefitSection.jsx";
import TestimonialSection from "./sections/TestimonialSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";
import { useEffect } from "react"; // Pastikan useEffect diimpor

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
    useGSAP(() => {
        // Buat instance ScrollSmoother
        const smoother = ScrollSmoother.create({
            smooth: 2, // Anda bisa sesuaikan nilainya
            effects: true,
        });

        // --- INI BAGIAN PALING PENTING ---
        // Fungsi untuk me-refresh ScrollTrigger setelah resize
        function refreshOnResize() {
            ScrollTrigger.refresh();
        }

        // Debounce untuk performa
        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(refreshOnResize, 200); // Tunggu 200ms setelah resize berhenti
        };

        // Tambahkan event listener
        window.addEventListener("resize", handleResize);

        // Fungsi cleanup untuk menghapus listener saat komponen dilepas
        return () => {
            window.removeEventListener("resize", handleResize);
            // Hancurkan smoother untuk mencegah memory leak
            if (smoother) smoother.kill();
        };
    }, []);

    return (
        <main>
            <NavBar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <HeroSection />
                    <MessageSection />
                    <FlavourSection />
                    <NutritionSection />
                    <div>
                        <BenefitSection />
                        <TestimonialSection />
                    </div>
                    <FooterSection />
                </div>
            </div>
        </main>
    );
};

export default App;