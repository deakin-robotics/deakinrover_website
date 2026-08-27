import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Deakin Rover home">
        <span>DEAKIN</span>
        <span>ROVER</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-dropdown">
          <Link className="nav-dropdown-trigger" href="/#rovers">Rovers</Link>
          <div className="nav-dropdown-menu">
            <Link href="/rovers/borealis">Borealis</Link>
            <Link href="/rovers/aurora">AURORA</Link>
            <span className="nav-dropdown-pending" aria-disabled="true">Chasmata</span>
          </div>
        </div>
        <Link href="/#mission">Mission</Link>
        <Link href="/#support">Support</Link>
      </nav>
    </header>
  );
}
