import React, { useRef, useEffect } from 'react';
import { flavorlists } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FlavorSlider = () => {
    const sliderRef = useRef();

    useEffect(() => {
        // Efek ini masih berguna untuk memastikan refresh terjadi setelah semua gambar dimuat
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('load', handleLoad);
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    useGSAP(() => {
        // Animasi judul yang berjalan di semua ukuran layar
        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top top",
                end: "bottom 80%",
                scrub: true,
            }
        });

        titleTl.to(".first-text-split", {
            xPercent: -30,
            ease: "power1.inOut",
        }).to(".flavor-text-scroll", {
            xPercent: -22,
            ease: "power1.inOut",
        }, "<").to(".second-text-split", {
            xPercent: -10,
            ease: "power1.inOut",
        }, "<");

        // Gunakan matchMedia untuk animasi yang HANYA berjalan di layar besar
        ScrollTrigger.matchMedia({
            // Untuk layar desktop (lebar 1025px ke atas)
            "(min-width: 1025px)": function() {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".flavor-section",
                        start: "2% top",
                        end: () => `+=${sliderRef.current.scrollWidth - window.innerWidth + 1500}`,
                        scrub: true,
                        pin: true, // Pin HANYA aktif di breakpoint ini
                    }
                });

                tl.to(".flavor-section", {
                    x: () => `-${sliderRef.current.scrollWidth - window.innerWidth + 1200}`,
                    ease: "power1.inOut",
                });
            },

            // Anda bisa menambahkan breakpoint lain di sini jika perlu
            // "(max-width: 1024px)": function() {
            //     // Kode animasi khusus tablet
            // }
        });

    }, []); // <-- Pastikan dependencies array KOSONG. matchMedia mengelola dirinya sendiri.

    return (
        <div ref={sliderRef} className="slider-wrapper">
            <div className="flavors">
                {
                    flavorlists.map((flavor) => {
                        return (
                            <div key={flavor.name} className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[60vw] md:h-[45vh] h-80 flex-none ${flavor.rotation}`}>
                                <img src={`images/${flavor.color}-bg.svg`} alt="" className="absolute bottom-0 " />
                                <img src={`images/${flavor.color}-drink.webp`} alt="" className="drinks" />
                                <img src={`images/${flavor.color}-elements.webp`} alt="" className="elements" />
                                <h1>{flavor.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default FlavorSlider;