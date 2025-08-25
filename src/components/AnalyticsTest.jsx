// src/pages/AnalyticsTest.jsx
import { useEffect } from "react";

const AnalyticsTest = () => {

    const sendEvent = (action) => {
        if (typeof window.gtag !== "undefined") {
            window.gtag("event", action, {
                event_category: "Teste",
                event_label: action,
            });
            console.log(`Evento GA disparado: ${action}`);
        } else {
            console.log("GA não carregado ainda");
        }
    };

    useEffect(() => {
        // Dispara page_view da página de analytics
        if (typeof window.gtag !== "undefined") {
            window.gtag("config", "G-N59X7PNQZZ", {
                page_path: "/analytics",
            });
            console.log("Page view GA AnalyticsTest");
        }
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Página de Analytics Test</h1>
            <p>Use os botões abaixo para disparar eventos e ver no console se o GA está funcionando.</p>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={() => sendEvent("Clique_WhatsApp")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Testar Clique WhatsApp
                </button>

                <button
                    onClick={() => sendEvent("Clique_Agendamento")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Testar Clique Agendamento
                </button>

                <button
                    onClick={() => sendEvent("Clique_Banner")}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md"
                >
                    Testar Clique Banner
                </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
                Abra o console do navegador para ver os logs dos eventos disparados.
            </p>
        </div>
    );
};

export default AnalyticsTest;
