"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ThemeTogol from "./ThemeTogol";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutor" },
  ];

  const authNavItems = [
    { name: "Add Tutor", href: "/addTutor" },
    { name: "My Tutors", href: "/my-tutors" },
    { name: "My Booked Sessions", href: "/mybookedsession" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-default-100 bg-background/80 backdrop-blur-md mx-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent"
        >
          MediQueue
        </Link>

        {/* Desktop Middle Nav */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8 mx-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-default-600 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn &&
            authNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-default-600 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={user?.image}
                  alt={user?.name || "User"}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-default-200 bg-white shadow-xl z-50 dark:bg-neutral-900 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block border-b border-default-100 px-4 py-3 text-sm hover:bg-default-100 transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="light" color="primary" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/singup">
                <Button color="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
          <ThemeTogol />
        </div>

        {/* Mobile Right: Theme + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeTogol />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-6 py-4 space-y-1">

          {/* Nav Links */}
          {[...navItems, ...(isLoggedIn ? authNavItems : [])].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-default-600 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-default-100 pt-4 mt-2 space-y-2">
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 pb-2">
                  <img
                    src={user?.image}
                    alt={user?.name || "User"}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <span className="text-sm font-medium text-default-700 truncate">
                    {user?.name || user?.email}
                  </span>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center rounded-lg border border-default-200 py-2 text-sm font-medium hover:bg-default-100 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="cursor-pointer w-full rounded-lg border border-red-200 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="bordered" className="w-full" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button color="primary" className="w-full" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}