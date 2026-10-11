import AngelArt from "./AngelArt";
import FilmSection from "./FilmSection";
import NaylLogo from "./NaylLogo";

const marquee = Array.from({ length: 16 }, (_, index) => (
  <span key={index} className="marquee__item">
    NAYL × IZIK
  </span>
));

export default function Home() {
  return (
    <main>
      <section className="hero">
        <video
          className="hero__bg"
          src="/nayl-film.mp4"
          poster="/nayl-poster.jpg"
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
          <figcaption className="artist-credit__caption">
            <span className="artist-credit__label">Artist</span>
            <span className="artist-credit__name">Mari Summers</span>
          </figcaption>
        </figure>

        <h1 className="hero__title">
          <span className="sr-only">NAYL × IZIK</span>
          <NaylLogo />
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
