import AngelArt from "./AngelArt";

export default function Home() {
  return (
    <main className="hero">
      <div className="hero__layer hero__layer--rings" aria-hidden="true" />
      <div className="hero__layer hero__layer--fade" aria-hidden="true" />
      
      <div className="hero__layer hero__layer--fade-image">
        <img
          src="/bladerunner-2049.gif"
          alt=""
          className="hero__fade-image"
          loading="lazy"
        />
      </div>
      
      <div className="hero__layer hero__layer--pink-fade">
        <img
          src="/hq720.jpg"
          alt=""
          className="hero__pink-fade-image"
          loading="lazy"
        />
      </div>
      
      <div className="hero__bg-gifs" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className={`hero__bg-gif hero__bg-gif--${index + 1}`}>
            <img
              src="/dancing.gif"
              alt=""
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="marquee marquee--top" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} className="marquee__item">
              NAYL × IZIK
            </span>
          ))}
        </div>
      </div>

      <figure className="artist-credit">
        <AngelArt />
        <figcaption className="artist-credit__caption">
          <span className="artist-credit__label">Artist</span>
          <span className="artist-credit__name">Mari Summers</span>
        </figcaption>
      </figure>

      <section className="hero__content">
        <div className="hero__main-gif hero__main-gif--expand">
          <div className="neon-square">
            <div className="neon-line neon-line--top"></div>
            <div className="neon-line neon-line--right"></div>
            <div className="neon-line neon-line--bottom"></div>
            <div className="neon-line neon-line--left"></div>
          </div>
          <img
            src="/main.gif"
            alt=""
            loading="lazy"
          />
          <div className="hero__title-wrapper">
            <h1 className="hero__title-overlay">
              <span className="hero__title-name">NAYL</span>
              <span className="hero__title-sep">×</span>
              <span className="hero__title-name">IZIK</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} className="marquee__item">
              NAYL × IZIK
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

