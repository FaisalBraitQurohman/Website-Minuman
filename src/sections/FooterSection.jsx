import React, { useRef } from 'react'; // Impor useRef
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react"; // Impor useGSAP
import gsap from "gsap"; // Impor gsap
import { ScrollTrigger } from "gsap/all"; // Impor ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Daftarkan plugin

const FooterSection = () => {
    const isMobile = useMediaQuery({
        query: "(max-width: 760px)",
    });

    const videoRef = useRef(null); // Buat ref untuk video

    // Gunakan useGSAP untuk memicu pemutaran video saat di-scroll
    useGSAP(() => {
        // Jangan jalankan di mobile karena tidak ada video
        if (isMobile) return;

        ScrollTrigger.create({
            trigger: ".footer-section", // Pemicu adalah section itu sendiri
            start: "top 50%", // Mulai saat 50% bagian atas section terlihat
            onEnter: () => {
                // Saat section masuk, putar video dari awal
                if (videoRef.current) {
                    videoRef.current.currentTime = 0; // Kembali ke detik ke-0
                    videoRef.current.play(); // Putar video
                }
            }
        });
    }, [isMobile]); // Jalankan ulang efek jika status isMobile berubah

    return (
        <section className="footer-section">
            <img src="images/footer-dip.png" alt="" className="w-full object-cover -translate-y-1" />

            {/* Gambar/Video Latar Belakang */}
            {isMobile ? (
                <img src="images/footer-drink.png" alt="" className="absolute inset-0 size-full object-cover" />
            ) : (
                <video
                    ref={videoRef} // Terapkan ref ke elemen video
                    src="videos/splash.mp4"
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 size-full object-cover mix-blend-lighten"
                />
            )}

            {/* KONTENER UTAMA UNTUK SEMUA KONTEN (tidak ada perubahan di sini) */}
            <div className="relative z-10 flex flex-col justify-between min-h-[100dvh] md:pt-20 pt-10">
                {/* Bagian Konten Atas (Judul & Tombol Sosial) */}
                <div className="col-center">
                    <div className="overflow-hidden">
                        <h1 className="general-title text-center text-milk py-5">
                            #CHUGRESPONSIBLY
                        </h1>
                    </div>
                    <div className="flex-center gap-5 mt-5">
                        <div className="social-btn">
                            <img src="images/yt.svg" alt="" />
                        </div>
                        <div className="social-btn">
                            <img src="images/insta.svg" alt="" />
                        </div>
                        <div className="social-btn">
                            <img src="images/tiktok.svg" alt="" />
                        </div>
                    </div>
                </div>

                {/* Bagian Konten Bawah (Link & Form) */}
                <div>
                    <div className="md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
                        <div className="flex items-start md:gap-16 gap-10">
                            <div>
                                <p>SPYLT Flavors</p>
                            </div>
                            <div>
                                <p className="font-bold">Chug Club</p>
                                <p>Student Marketing</p>
                                <p>Dairy Dealers</p>
                            </div>
                            <div>
                                <p className="font-bold">Company</p>
                                <p>Contacts</p>
                                <p>Tasty Talk</p>
                            </div>
                        </div>
                        <div className="md:max-w-lg">
                            <p>
                                Get Exclusive Early Access and Stay informed About Product Updates, Events, and More!
                            </p>
                            <div className="flex justify-between items-center border-b py-5 mt-5">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full placeholder:font-sans bg-transparent outline-none"
                                />
                                <img src="images/arrow.svg" alt="" className="cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Kotak Copyright */}
                    <div className="w-full md:px-10 px-5 py-7 text-milk opacity-50 md:text-lg font-paragraph flex gap-7 md:flex-row flex-col-reverse md:justify-between justify-center items-center mt-10">
                        <p className="text-center">
                            Copyright 2025 Spylt - All Rights Reserved
                        </p>
                        <div className="flex items-center gap-7">
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;