import React, { useState, useRef, useEffect } from 'react'; // Impor useState dan useEffect
import { cards } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
    const vdRef = useRef([]);
    const main = useRef();
    const [playingVideo, setPlayingVideo] = useState(null); // State untuk melacak video
    const isTouchDevice = 'ontouchstart' in window; // Deteksi perangkat sentuh

    // Efek untuk menghentikan video jika pengguna scroll keluar dari section
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && playingVideo !== null) {
                    const video = vdRef.current[playingVideo];
                    if (video) video.pause();
                    setPlayingVideo(null);
                }
            },
            { threshold: 0.1 }
        );

        if (main.current) {
            observer.observe(main.current);
        }

        return () => {
            if (main.current) {
                observer.unobserve(main.current);
            }
        };
    }, [playingVideo]);


    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Setup untuk Tablet & Desktop
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
            // Setup untuk Mobile
            gsap.set(main.current, { marginTop: "-30vh" }); // Menggunakan -30vh untuk konsistensi

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1.5,
                }
            });

            tl.from(".first-title", { autoAlpha: 0, x: -50 })
                .from(".sec-title", { autoAlpha: 0, x: 50 }, "<")
                .from(".third-title", { autoAlpha: 0, x: -50 }, "<")
                .from(".vd-card", { yPercent: 120, autoAlpha: 0, stagger: 0.5 }, "-=0.5");

            return () => {
                gsap.set(main.current, { clearProps: "marginTop" });
            };
        });

    }, { scope: main });

    const handlePlay = (index) => {
        const videoToPlay = vdRef.current[index];
        if (!videoToPlay) return;

        if (playingVideo !== null && vdRef.current[playingVideo]) {
            vdRef.current[playingVideo].pause();
        }

        // Memaksa video untuk memuat datanya sebelum diputar
        videoToPlay.load();
        videoToPlay.play();
        setPlayingVideo(index);
    };

    const handlePause = () => {
        if (playingVideo !== null && vdRef.current[playingVideo]) {
            vdRef.current[playingVideo].pause();
        }
        setPlayingVideo(null);
    };

    const handleVideoToggle = (index) => {
        if (playingVideo === index) {
            handlePause();
        } else {
            handlePlay(index);
        }
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
                        className={`vd-card ${card.translation || ''} ${card.rotation} relative cursor-pointer`}
                        onClick={() => handleVideoToggle(index)}
                        // Menerapkan event hover HANYA jika bukan perangkat sentuh
                        {...(!isTouchDevice && {
                            onMouseEnter: () => handlePlay(index),
                            onMouseLeave: handlePause,
                        })}
                    >
                        <video
                            ref={(el) => (vdRef.current[index] = el)}
                            src={card.src}
                            playsInline
                            muted
                            loop
                            preload="auto" // <-- Atribut penting untuk iOS
                            className="size-full object-cover"
                        />
                        {/* Ikon Play sebagai petunjuk visual */}
                        {playingVideo !== index && (
                            <div className="abs-center bg-black/30 backdrop-blur-sm size-16 rounded-full flex-center pointer-events-none">
                                <img src="images/play.svg" alt="Play" className="w-6 h-6 ml-1" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;