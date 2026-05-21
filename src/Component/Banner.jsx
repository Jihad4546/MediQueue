"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { ChevronLeft, ChevronRight, BookOpen, Users, Sparkles } from "lucide-react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, tag: "উৎকর্ষতা", title: "সেরা টিউটরদের সাথে আপনার লার্নিং জার্নি শুরু করুন", description: "MediQueue-এর মাধ্যমে দেশের স্বনামধন্য শিক্ষকদের খুঁজে নিন এবং আপনার সুবিধাজনক সময়ে ওয়ান-টু-ওয়ান অনলাইন সেশন বুক করুন।", ctaText: "Find a Tutor", icon: <BookOpen size={16} />, chipColor: "primary", image: "/slider1.jpg", overlayColor: "rgba(99, 102, 241, 0.35)" },
        { id: 2, tag: "স্মার্ট শিডিউলিং", title: "কোনো টাইম স্লট কনফ্লিক্ট ছাড়াই বুক করুন ইনস্ট্যান্ট ক্লাস", description: "আমাদের ডিজিটাল টোকেন সিস্টেমের মাধ্যমে ম্যানুয়াল বুকিংয়ের ঝামেলা এড়িয়ে সরাসরি শিক্ষকের ফ্রি সময়ে আপনার ক্লাস নিশ্চিত করুন।", ctaText: "Explore Tutors", icon: <Sparkles size={16} />, chipColor: "secondary", image: "/slider2.jpg", overlayColor: "rgba(217, 70, 239, 0.35)" },
        { id: 3, tag: "দক্ষতা বৃদ্ধি", title: "একাডেমিক থেকে স্কিল ডেভেলপমেন্ট - সবই এক প্ল্যাটফর্মে", description: "গণিত, বিজ্ঞান কিংবা মডার্ন প্রোগ্রামিং—যেকোনো বিষয়ে আপনার দক্ষতাকে ঝালিয়ে নিতে আজই যুক্ত হোন আমাদের অভিজ্ঞ মেন্টরদের সাথে।", ctaText: "View Availability", icon: <Users size={16} />, chipColor: "success", image: "/slider3.jpeg", overlayColor: "rgba(16, 185, 129, 0.35)" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const s = slides[currentSlide];

    return (
        <div style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "row", // ডিফল্ট ডেস্কটপ লেআউট
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e4e4e7",
            padding: "80px 20px",
            overflow: "hidden",
            backgroundColor: "var(--background)",
            gap: "40px",
            flexWrap: "wrap", // রেসপন্সিভ করার জন্য এটি জরুরি
        }}>

            {/* Left: Text Content */}
            <div style={{
                flex: "1 1 500px", // ডেস্কটপে বড় হবে, মোবাইলে ফুল উইডথ
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                zIndex: 10,
            }}>
                <Chip color={s.chipColor} variant="flat" radius="full" size="sm">
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>{s.icon} {s.tag}</span>
                </Chip>

                <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, lineHeight: 1.3, margin: 0 }}>
                    {s.title}
                </h1>
                
                <p style={{ fontSize: "16px", color: "#71717a", maxWidth: "500px", lineHeight: 1.7 }}>
                    {s.description}
                </p>

                <div>
                    <Button as={Link} href="/tutors" color="primary" radius="full" size="lg" variant="shadow">
                        {s.ctaText}
                    </Button>
                </div>
            </div>

            {/* Right: Card */}
            <div style={{
                width: "100%",
                maxWidth: "380px", // মোবাইলে কার্ড বড় দেখাবে না
                zIndex: 10,
            }}>
                <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", backgroundColor: "var(--background)" }}>
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                        <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, backgroundColor: s.overlayColor }} />
                    </div>
                    {/* Body content... */}
                    <div style={{ padding: "24px", textAlign: "center" }}>
                        <h3 style={{ fontWeight: 800, fontSize: "18px" }}>১০০+ ভেরিফাইড টিউটর</h3>
                        <p style={{ fontSize: "12px", color: "#a1a1aa" }}>সব বিষয়ের অভিজ্ঞ মেন্টর এক ছাদের নিচে</p>
                    </div>
                </div>
            </div>

            {/* Nav Buttons & Dots remain the same... */}
        </div>
    );
};

export default Banner;