import { Inertia } from "@inertiajs/inertia";
import "../css/app.css";
import "./bootstrap";
import { useState, useEffect } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Loading from "./Components/Loading"; // Import the Loading component

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx") // Automatically resolves all page components
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const AppWithLoading = () => {
            const [isLoading, setIsLoading] = useState(false);

            useEffect(() => {
                const handleStart = () => setIsLoading(true);
                const handleFinish = () => setIsLoading(false);

                Inertia.on("start", handleStart);

                Inertia.on("finish", handleFinish);

                return () => {
                    Inertia.off("start", handleStart);
                    Inertia.off("finish", handleFinish);
                };
            }, []);

            return (
                <>
                    {isLoading && <Loading />}{" "}
                    {!isLoading && <App {...props} />}
                </>
            );
        };

        // Render the new AppWithLoading component
        root.render(<AppWithLoading />);
    },
});
