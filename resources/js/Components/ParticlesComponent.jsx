import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            fullScreen: {
                enable: false,
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "repulse" },
                    onHover: { enable: true, mode: "grab" },
                },
                modes: {
                    push: { distance: 200, duration: 5 },
                    grab: { distance: 150 },
                },
            },
            particles: {
                color: { value: "#ddff33" },
                links: {
                    color: "#ddff33",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 2,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 200,
                },
                opacity: { value: 1.0 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        []
    );

    return (
        <Particles id="tsparticles" init={particlesLoaded} options={options} />
    );
};

export default ParticlesComponent;
