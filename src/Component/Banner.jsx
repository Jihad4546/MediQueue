"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { ChevronLeft, ChevronRight, BookOpen, Users, Sparkles } from "lucide-react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            tag: "উৎকর্ষতা (Excellence)",
            title: "সেরা টিউটরদের সাথে আপনার লার্নিং জার্নি শুরু করুন",
            description: "MediQueue-এর মাধ্যমে দেশের স্বনামধন্য শিক্ষকদের খুঁজে নিন এবং আপনার সুবিধাজনক সময়ে ওয়ান-টু-ওয়ান অনলাইন সেশন বুক করুন।",
            ctaText: "Find a Tutor",
            icon: <BookOpen size={16} />,
            chipColor: "primary",
            image: "/slider1.jpg",
            overlayColor: "rgba(99, 102, 241, 0.35)",
        },
        {
            id: 2,
            tag: "স্মার্ট শিডিউলিং",
            title: "কোনো টাইম স্লট কনফ্লিক্ট ছাড়াই বুক করুন ইনস্ট্যান্ট ক্লাস",
            description: "আমাদের ডিজিটাল টোকেন সিস্টেমের মাধ্যমে ম্যানুয়াল বুকিংয়ের ঝামেলা এড়িয়ে সরাসরি শিক্ষকের ফ্রি সময়ে আপনার ক্লাস নিশ্চিত করুন।",
            ctaText: "Explore Tutors",
            icon: <Sparkles size={16} />,
            chipColor: "secondary",
            image: "/slider2.jpg",
            overlayColor: "rgba(217, 70, 239, 0.35)",
        },
        {
            id: 3,
            tag: "দক্ষতা বৃদ্ধি",
            title: "একাডেমিক থেকে স্কিল ডেভেলপমেন্ট - সবই এক প্ল্যাটফর্মে",
            description: "গণিত, বিজ্ঞান কিংবা মডার্ন প্রোগ্রামিং—যেকোনো বিষয়ে আপনার দক্ষতাকে ঝালিয়ে নিতে আজই যুক্ত হোন আমাদের অভিজ্ঞ মেন্টরদের সাথে।",
            ctaText: "View Availability",
            icon: <Users size={16} />,
            chipColor: "success",
            image: "/slider3.jpeg",
            overlayColor: "rgba(16, 185, 129, 0.35)",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    const prevSlide = () =>
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const s = slides[currentSlide];

    return (
        <div style={{
            position: "relative",
            width: "100%",
            minHeight: "520px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #e4e4e7",
            padding: "80px 0",
            overflow: "hidden",
            backgroundColor: "var(--background)",
        }}>

            {/* Left: Text Content */}
            <div style={{
                flex: "1",
                paddingLeft: "60px",
                paddingRight: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                zIndex: 10,
            }}>
                <Chip
                    color={s.chipColor}
                    variant="flat"
                    radius="full"
                    size="sm"
                    style={{ fontWeight: 600 }}
                >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {s.icon}
                        {s.tag}
                    </span>
                </Chip>

                <div style={{ minHeight: "160px" }}>
                    <h1 style={{
                        fontSize: "42px",
                        fontWeight: 900,
                        lineHeight: 1.3,
                        margin: 0,
                        color: "var(--foreground)",
                    }}>
                        {s.title}
                    </h1>
                </div>

                <div style={{ minHeight: "80px" }}>
                    <p style={{
                        fontSize: "16px",
                        color: "#71717a",
                        margin: 0,
                        maxWidth: "500px",
                        lineHeight: 1.7,
                    }}>
                        {s.description}
                    </p>
                </div>

                <div>
                    <Button
                        as={Link}
                        href="/tutors"
                        color="primary"
                        radius="full"
                        size="lg"
                        variant="shadow"
                        style={{ fontWeight: 700, padding: "0 32px" }}
                    >
                        {s.ctaText}
                    </Button>
                </div>
            </div>

            {/* Right: Card */}
            <div style={{
                width: "380px",
                flexShrink: 0,
                paddingRight: "60px",
                zIndex: 10,
            }}>
                <div style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    backgroundColor: "var(--background)",
                }}>
                    {/* Image with overlay */}
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                        <img
                            src={s.image}
                            alt={s.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: s.overlayColor,
                        }} />
                    </div>

                    {/* Card Body */}
                    <div style={{
                        padding: "24px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                    }}>
                        <div style={{
                            padding: "10px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,111,238,0.1)",
                            color: "#006FEE",
                        }}>
                            {s.icon}
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: "18px", margin: "0 0 4px" }}>
                                ১০০+ ভেরিফাইড টিউটর
                            </h3>
                            <p style={{ fontSize: "12px", color: "#a1a1aa", margin: 0 }}>
                                সব বিষয়ের অভিজ্ঞ মেন্টর এক ছাদের নিচে
                            </p>
                        </div>
                        <div style={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "8px",
                            paddingTop: "12px",
                            borderTop: "1px solid #f4f4f5",
                            textAlign: "left",
                        }}>
                            <div>
                                <p style={{ fontSize: "10px", color: "#a1a1aa", margin: "0 0 2px" }}>লাইভ সেশন</p>
                                <p style={{ fontSize: "12px", fontWeight: 700, margin: 0 }}>১:১ ওয়ান-টু-ওয়ান</p>
                            </div>
                            <div>
                                <p style={{ fontSize: "10px", color: "#a1a1aa", margin: "0 0 2px" }}>বুকিং প্রসেস</p>
                                <p style={{ fontSize: "12px", fontWeight: 700, margin: 0, color: "#17c964" }}>ইনস্ট্যান্ট টোকেন</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prev / Next buttons */}
            <button
                onClick={prevSlide}
                style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", zIndex: 20,
                    background: "rgba(255,255,255,0.8)", border: "1px solid #e4e4e7",
                    borderRadius: "50%", width: "36px", height: "36px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                }}
                aria-label="Previous"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", zIndex: 20,
                    background: "rgba(255,255,255,0.8)", border: "1px solid #e4e4e7",
                    borderRadius: "50%", width: "36px", height: "36px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                }}
                aria-label="Next"
            >
                <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div style={{
                position: "absolute", bottom: "20px",
                left: 0, right: 0,
                display: "flex", justifyContent: "center", gap: "8px", zIndex: 20,
            }}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        style={{
                            height: "8px", borderRadius: "99px", border: "none",
                            cursor: "pointer", transition: "all 0.3s",
                            width: currentSlide === i ? "28px" : "8px",
                            backgroundColor: currentSlide === i ? "#006FEE" : "#d4d4d8",
                        }}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;