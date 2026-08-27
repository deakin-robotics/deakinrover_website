"use client";

import Link from "next/link";
import { NavigationMenu } from "radix-ui";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Deakin Rover home">
        <span>DEAKIN</span>
        <span>ROVER</span>
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
              <Link href="/#mission">Mission</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/#support">Support</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
