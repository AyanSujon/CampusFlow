
import Link from "next/link";
import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

const footerSections = [
  {
    title: "Academics",
    links: [
      { name: "Faculties", url: "/faculties" },
      { name: "Departments", url: "/departments" },
      { name: "Programs", url: "/programs" },
      { name: "Courses", url: "/courses" },
      { name: "Subjects", url: "/subjects" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { name: "Admission Process", url: "/admissions/process" },
      { name: "Requirements", url: "/admissions/requirements" },
      { name: "Apply Now", url: "/admissions/apply" },
    ],
  },
  {
    title: "Campus Life",
    links: [
      { name: "Events", url: "/events" },
      { name: "Clubs & Organizations", url: "/clubs" },
      { name: "Campus Facilities", url: "/facilities" },
    ],
  },
];

const quickLinks = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
  { name: "Contact", url: "/contact" },
  { name: "Login", url: "/login" },
];

const socialLinks = [
  {
    name: "Facebook",
    url: "#",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    url: "#",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: FaLinkedinIn,
  },
  {
    name: "Twitter",
    url: "#",
    icon: FaTwitter,
  },
];

export default function FooterPublic() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div
          className="
            grid gap-10
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-8
          "
        >
          {/* =================================================
              BRAND / ABOUT
              ================================================= */}
          <div className="sm:col-span-2 lg:col-span-4">
            {/* Logo */}
            <Link
              href="/"
              className="
                inline-block
                text-2xl
                font-bold
                tracking-tight
                text-primary
              "
            >
              Campus
              <span className="text-accent">Flow</span>
            </Link>

            {/* Description */}
            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              A modern university management platform designed
              to connect students, faculty, departments, and
              administrators through one seamless digital campus.
            </p>

            {/* Contact Information */}
            <div className="mt-6 space-y-3">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MdLocationOn
                  className="
                    mt-0.5
                    h-5 w-5
                    shrink-0
                    text-primary
                  "
                />

                <span className="text-sm text-muted-foreground">
                  University Campus, Bangladesh
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <MdPhone
                  className="
                    h-5 w-5
                    shrink-0
                    text-primary
                  "
                />

                <a
                  href="tel:+8800000000000"
                  className="
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                >
                  +880 0000-000000
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <MdEmail
                  className="
                    h-5 w-5
                    shrink-0
                    text-primary
                  "
                />

                <a
                  href="mailto:info@campusflow.edu"
                  className="
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                >
                  info@campusflow.edu
                </a>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER LINK SECTIONS
              ================================================= */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="lg:col-span-2"
            >
              <h3
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                {section.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.url}
                      className="
                        text-sm
                        text-muted-foreground
                        transition-colors
                        hover:text-primary
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* =================================================
              QUICK LINKS
              ================================================= */}
          <div className="lg:col-span-2">
            <h3
              className="
                text-sm
                font-semibold
                text-foreground
              "
            >
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="
                      text-sm
                      text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              SOCIAL
              ================================================= */}
          <div className="lg:col-span-2">
            <h3
              className="
                text-sm
                font-semibold
                text-foreground
              "
            >
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="
                      inline-flex
                      h-9 w-9
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-border
                      bg-background
                      text-muted-foreground
                      transition-all
                      hover:border-primary
                      hover:bg-primary
                      hover:text-primary-foreground
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>

            <p
              className="
                mt-4
                text-xs
                leading-5
                text-muted-foreground
              "
            >
              Stay connected with CampusFlow for the
              latest university news and updates.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FOOTER
          ===================================================== */}
      <div className="border-t border-border">
        <div
          className="
            container mx-auto
            flex flex-col
            gap-4
            px-4 py-5
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-8
          "
        >
          {/* Copyright */}
          <p
            className="
              text-center
              text-xs
              text-muted-foreground
              md:text-left
            "
          >
            © {new Date().getFullYear()} CampusFlow.
            All rights reserved.
          </p>

          {/* Legal Links */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-5
              md:justify-end
            "
          >
            <Link
              href="/privacy-policy"
              className="
                text-xs
                text-muted-foreground
                transition-colors
                hover:text-primary
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-xs
                text-muted-foreground
                transition-colors
                hover:text-primary
              "
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
