import Image from 'next/image';
import Link from 'next/link';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-night)' }}>
      <div className="px-8 md:px-20 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="Blue Eye Samurai"
              width={140}
              height={35}
              className="opacity-70"
            />
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://www.netflix.com/title/81144203"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 hover:opacity-100 transition-opacity duration-300"
              aria-label="Netflix"
            >
              <Image
                src="/images/netflix-logo.svg"
                alt="Netflix"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.tiktok.com/@deboragimenez108/video/7636823774142139666?_r=1&_t=ZS-97b5LLLu2Df"
              target="_blank"
              rel="noopener noreferrer"
              className="text-snow/40 hover:text-snow transition-colors duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://open.spotify.com/episode/0Z8AhL35wMZjlFKY4lL1NA?si=f907bb55a0f74290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-snow/40 hover:text-snow transition-colors duration-300"
              aria-label="Spotify"
            >
              <SpotifyIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-8 md:mx-20 h-px bg-white/10" />

      <div className="px-8 md:px-20 py-10">
        <p className="font-ui text-sm text-snow/40 text-center tracking-wide">
          &copy; 2026 Blue Eye Samurai. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
