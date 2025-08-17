import React from 'react'
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(SplitText)

const FlavorTitle = () => {

    useGSAP(() => {
        const firstTextSplit = SplitText.create(".first-text-split h1", {
            type: "chars",
        })
        const secondTextSplit = SplitText.create(".second-text-split h1", {
            type: "chars",
        })

        gsap.from(firstTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top center",
                end: "20% center",
                scrub: true,
            }
        })

        gsap.to(".flavor-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top center",
                end: "20% center",
                scrub: true,
            }
        })

        gsap.from(secondTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "5% center",
                end: "20% center",
                scrub: true,
            }
        })
    })

    return (
        <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
            <div className="overflow-hidden 2xl:py-0 py-3 first-text-split pr-1">
                <h1>We have 6</h1>
            </div>

            <div style={{
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
                className="flavor-text-scroll">
                <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
                    <h2 className="text-milk">freaking</h2>
                </div>
            </div>

            <div className="overflow-hidden 2xl:py-0 py-3 second-text-split pr-1">
                <h1>delicious flavors</h1>
            </div>
        </div>
    )
}
export default FlavorTitle
