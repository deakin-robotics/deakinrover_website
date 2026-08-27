import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-mark">DEAKIN ROVER</p>
        <p className="footer-note">Project archive / development build.</p>
      </div>
      <div className="footer-links">
        <Link href="/#programme">Timeline</Link>
        <Link href="/#rovers">Rovers</Link>
        <Link href="/support">Support</Link>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} Deakin Rover Team</p>
    </footer>
  );
}
