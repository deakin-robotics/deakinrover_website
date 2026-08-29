"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " site-header--faded" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Deakin Rover home">
        <Image
          className="wordmark-logo"
          src="/assets/home/deakin-rover-logo-white.svg"
          alt=""
          width={96}
          height={58}
          priority
        />
      </Link>

      <NavigationMenu.Root className="site-nav" aria-label="Primary navigation">
        <NavigationMenu.List className="site-nav-list">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="nav-dropdown-trigger">Rovers</NavigationMenu.Trigger>
            <NavigationMenu.Content className="nav-dropdown-menu">
              <ul>
                <li>
                  <NavigationMenu.Link asChild>
                    {/* Intentional full reload: reset the 3D scene on rover entry. */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/rovers/borealis">Borealis</a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    {/* Intentional full reload: reset the 3D scene on rover entry. */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/rovers/aurora">AURORA</a>
                  </NavigationMenu.Link>
                </li>
                <li><span className="nav-dropdown-pending" aria-disabled="true">Chasmata</span></li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/support">Sponsor</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <nav className="site-socials" aria-label="Social links">
        <a
          href="https://instagram.com/deakinroverteam"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" className="site-socials-fill" />
          </svg>
        </a>
        <a
          href="https://github.com/deakin-robotics"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.68c-2.65.58-3.21-1.12-3.21-1.12-.44-1.1-1.08-1.39-1.08-1.39-.87-.6.07-.59.07-.59.96.07 1.46.99 1.46.99.85 1.46 2.23 1.04 2.77.8.09-.62.33-1.04.6-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.98A9.1 9.1 0 0 1 12 7.04c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.23 4.48-4.36 4.72.34.29.64.86.64 1.74v2.58c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/company/deakin-competitive-robotics/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.2 8.1H2.8V21h2.4V8.1ZM4 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM21.2 13.6c0-3.88-2.07-5.68-4.83-5.68-2.23 0-3.23 1.23-3.79 2.09V8.1h-2.4V21H12.6v-6.38c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.91 2.08 3.41V21h2.4l-.28-7.4Z" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
