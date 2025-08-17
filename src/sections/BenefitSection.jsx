import React, { useRef } from 'react'; // Impor useRef
import ClipPathTitle from "../components/ClipPathTitle.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection.jsx";

const BenefitSection = () => {
    const main = useRef(); // Ref untuk elemen section utama

    useGSAP(() => {
        const revealTl = gsap.timeline({
            delay: 1,
            scrollTrigger: {
                trigger: main.current, // Gunakan ref sebagai trigger
                start: "top 50%",
                end: "top top",
                scrub: 1.5,
            }
        });

        revealTl.to(".benefit-section .first-title", {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
        }).to(".benefit-section .second-title", {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
        }).to(".benefit-section .third-title", {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
        }).to(".benefit-section .fourth-title", {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
        });
    }, { scope: main }); // Tentukan scope untuk pembersihan otomatis

    return (
        // Terapkan ref ke section
        <section ref={main} className="benefit-section">
            <div className="container mx-auto pt-20">
                <div className="col-center">
                    <p>
                        Unlock the Advantages: <br />Explore the key Benefits of Choosing SPYLT
                    </p>
                    <div className="mt-20 col-center">
                        <ClipPathTitle
                            title={"Shelf Stable"}
                            color={"#faeade"}
                            bg={"#c88e64"}
                            className="first-title"
                            borderColor={"#222123"}
                        />
                        <ClipPathTitle
                            title={"Protein + Caffeine"}
                            color={"#222123"}
                            bg={"#faeade"}
                            className="second-title"
                            borderColor={"#222123"}
                        />
                        <ClipPathTitle
                            title={"infinitely Recyclable"}
                            color={"#faeade"}
                            bg={"#7F3B2D"}
                            className="third-title"
                            borderColor={"#222123"}
                        />
                        <ClipPathTitle
                            title={"Lactose Free"}
                            color={"#2E2D2F"}
                            bg={"#FED775"}
                            className="fourth-title"
                            borderColor={"#222123"}
                        />
                    </div>
                    <div className="md:mt-0 mt-10">
                        <p>
                            And Much More ....
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overlay-box">
                <VideoPinSection />
            </div>
        </section>
    );
};

export default BenefitSection;