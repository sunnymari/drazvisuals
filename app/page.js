import AngelArt from "./AngelArt";
import FilmSection from "./FilmSection";
import Logo from "./Logo";

const marquee = Array.from({ length: 16 }, (_, index) => (
  <span key={index} className="marquee__item">
    CALVIN COPPERMAN
  </span>
));

export default function Home() {
  return (
    <main>
      <section className="hero">
        <video
          className="hero__bg"
          src="/film.mp4"
          poster="/film-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <img className="hero__bladerunner" src="/bladerunner-2049.gif" alt="" aria-hidden="true" />
        <div className="hero__shaft" aria-hidden="true" />
        <div className="hero__red" aria-hidden="true" />
        <div className="hero__vignette" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <div className="marquee marquee--top" aria-hidden="true">
          <div className="marquee__track">{marquee}</div>
        </div>

        <figure className="artist-credit">
          <AngelArt />
          <img className="artist-credit__corgi" src="/corgi.png" alt="Corgi" />
          <figcaption className="artist-credit__caption">
            <span className="artist-credit__label">Artist</span>
            <span className="artist-credit__name">Calvin Copperman</span>
          </figcaption>
        </figure>

        <h1 className="hero__title">
          <span className="sr-only">Calvin Copperman</span>
          <Logo />
        </h1>

        <a className="hero__scroll" href="#film">
          <span>Film</span>
        </a>

        <div className="marquee marquee--bottom" aria-hidden="true">
          <div className="marquee__track">{marquee}</div>
        </div>
      </section>

      <FilmSection />
    </main>
  );
}
