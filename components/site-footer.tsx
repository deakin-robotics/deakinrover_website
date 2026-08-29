export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-mark">DEAKIN ROVER</p>
        <p className="footer-note">Project archive / development build.</p>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} Deakin Rover Team</p>
    </footer>
  );
}
