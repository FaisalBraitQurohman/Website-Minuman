import React, { useRef } from 'react';
import { cards } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
    const vdRef = useRef([]);
    const main = useRef();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // --- Setup untuk Tablet & Desktop ---
            gsap.set(main.current, { marginTop: "-140vh" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                }
            });

            tl.to(".first-title", { xPercent: 70 })
                .to(".sec-title", { xPercent: 25 }, "<")
                .to(".third-title", { xPercent: -50 }, "<")
                .from(".vd-card", { yPercent: 150, stagger: 0.2, ease: "power1.inOut" }, "<");

            return () => {
                gsap.set(main.current, { clearProps: "marginTop" });
            };
        });

        mm.add("(max-width: 767px)", () => {
            // --- Setup untuk Mobile ---
            // TAMBAHKAN INI: Set margin-top untuk mobile
            gsap.set(main.current, { marginTop: "-30" }); // Anda bisa sesuaikan nilai "-30vh"

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main.current,
                    start: "top 70%",
                    end: "70% 80%",
                    scrub: 1.5,
                }
            });

            tl.from(".first-title", { autoAlpha: 0, x: -50 })
                .from(".sec-title", { autoAlpha: 0, x: 50 }, "<")
                .from(".third-title", { autoAlpha: 0, x: -50 }, "<")
                .from(".vd-card", { yPercent: 120, autoAlpha: 0, stagger: 0.5 }, "-=0.5");

            // TAMBAHKAN INI: Cleanup function untuk mobile
            // Ini penting untuk menghapus marginTop saat beralih ke desktop
            return () => {
                gsap.set(main.current, { clearProps: "marginTop" });
            };
        });

    }, { scope: main });

    const handlePlay = (index) => {
        const video = vdRef.current[index];
        if (video) video.play();
    };

    const handlePause = (index) => {
        const video = vdRef.current[index];
        if (video) video.pause();
    };

    return (
        <section ref={main} className="testimonials-section">
            <div className="absolute size-full flex flex-col items-center">
                <h1 className="text-black first-title">what's</h1>
                <h1 className="text-light-brown sec-title">Everyone</h1>
                <h1 className="text-black third-title">Talking</h1>
            </div>

            <div className="pin-box">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`vd-card ${card.translation || ''} ${card.rotation}`}
                        onMouseEnter={() => handlePlay(index)}
                        onMouseLeave={() => handlePause(index)}
                    >
                        <video
                            ref={(el) => (vdRef.current[index] = el)}
                            src={card.src}
                            playsInline
                            muted
                            loop
                            className="size-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;