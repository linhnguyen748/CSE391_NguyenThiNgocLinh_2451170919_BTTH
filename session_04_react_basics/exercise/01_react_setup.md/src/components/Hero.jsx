// src/components/Hero.jsx
function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <h1>
                    Hi, I'm <span className="highlight">Your Name</span>
                </h1>
                <p className="hero-subtitle">
                    Full-Stack Developer | UI Designer | Problem Solver
                </p>
                <a href="#portfolio" className="cta-button">
                    View My Work →
                </a>
            </div>
        </section>
    );
}

export default Hero;