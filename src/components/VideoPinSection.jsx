import React, { useRef } from 'react'; // Impor useRef
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
    const main = useRef(); // Ref untuk elemen section utama

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Logika untuk Tablet & Desktop
        mm.add("(min-width: 768px)", () => {
            // Setup animasi pin
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main.current,
                    start: "-15% top",
                    end: "180% top",
                    scrub: 1.5,
                    pin: true,
                }
            });

            // Set state awal dan animasikan clipPath
            gsap.set(".video-box", { clipPath: "circle(10% at 50% 50%)" });
            tl.to(".video-box", {
                clipPath: "circle(100% at 50% 50%)",
                ease: "power1.inOut",
            });

            // Fungsi cleanup untuk desktop
            return () => {
                // Hapus style clipPath saat kembali ke mobile
                gsap.set(".video-box", { clearProps: "clipPath" });
            };
        });

        // Logika untuk Mobile
        mm.add("(max-width: 767px)", () => {
            // Di mobile, pastikan video terlihat penuh tanpa animasi
            gsap.set(".video-box", { clipPath: "circle(100% at 50% 50%)" });
        });

    }, { scope: main });

    return (
        // Terapkan ref ke section
        <section ref={main} className="vd-pin-section">
            <div className="size-full video-box">
                <video
                    src="videos/pin-video.mp4"
                    playsInline
                    muted
                    loop
                    autoPlay
                />
                <div className="abs-center md:scale-100 scale-200">
                    <img src="images/circle-text.svg" alt="" className="spin-circle"/>
                    <div className="play-btn">
                        <img src="images/play.svg" alt="" className="size-[3vw] ml-[.5vw]"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoPinSection;