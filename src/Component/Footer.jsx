"use client";

import Link from "next/link";
import { Button } from "@heroui/react"
import { Mail, MapPinCheck, Phone } from "lucide-react";
import { LogoFacebook } from "@gravity-ui/icons";
import { FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
import { BsYoutube } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto w-full border-t border-default-100 bg-background text-default-600 transition-colors duration-200">
     
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
       
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent w-max"
          >
            MediQueue
          </Link>
          <p className="text-sm text-default-500 leading-relaxed">
            শিক্ষার্থীদের জন্য সঠিক সময়ে সঠিক টিউটর খুঁজে নেওয়ার এবং ঝামেলাহীন অনলাইন সেশন বুকিংয়ের আধুনিক প্ল্যাটফর্ম।
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Learning Services
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/tutors" className="transition hover:text-primary">Browse Top Tutors</Link>
            </li>
            <li>
              <Link href="/services/academic" className="transition hover:text-primary">Academic Learning</Link>
            </li>
            <li>
              <Link href="/services/skill-development" className="transition hover:text-primary">Skill Development</Link>
            </li>
            <li>
              <Link href="/pricing" className="transition hover:text-primary">Session Pricing</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Contact Info
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-indigo-500" />
              <a href="mailto:support@mediqueue.com" className="transition hover:text-primary">
                support@mediqueue.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-indigo-500" />
              <a href="tel:+880123456789" className="transition hover:text-primary">
                +880 1234-567890
              </a>
            </li>
            <li className="flex items-center gap-2 items-start">
              <MapPinCheck size={16} className="text-indigo-500 mt-0.5 shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Follow Us
          </h4>
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="flat" color="primary" radius="full" size="sm" as="a" href="https://facebook.com" target="_blank">
              <LogoFacebook size={16} />
            </Button>
            <Button isIconOnly variant="flat" color="primary" radius="full" size="sm" as="a" href="https://twitter.com" target="_blank">
            <FaXTwitter />

            </Button>
            <Button isIconOnly variant="flat" color="primary" radius="full" size="sm" as="a" href="https://linkedin.com" target="_blank">
              <LiaLinkedin size={16} />
            </Button>
            <Button isIconOnly variant="flat" color="primary" radius="full" size="sm" as="a" href="https://youtube.com" target="_blank">
              <BsYoutube size={16} />
            </Button>
          </div>
        </div>

      </div>

      <div className="border-t border-default-100 bg-default-50/50 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-default-400">
          <p>© {currentYear} MediQueue. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-default-600 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-default-600 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}