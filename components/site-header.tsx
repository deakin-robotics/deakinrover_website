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
                    <Link href="/rovers/borealis">Borealis</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <Link href="/rovers/aurora">AURORA</Link>
                  </NavigationMenu.Link>
                </li>
                <li><span className="nav-dropdown-pending" aria-disabled="true">Chasmata</span></li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/support">Support</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
