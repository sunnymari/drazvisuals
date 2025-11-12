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
              DRAZ
            </span>
          ))}
        </div>
      </div>

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
            <h1 className="hero__title-overlay">DRAZ</h1>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} className="marquee__item">
              DRAZ
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

