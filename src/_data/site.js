const baseUrl = (process.env.SITE_BASE_URL || "https://munizmath.github.io/fluvius").replace(/\/$/, "");
const basePath = new URL(baseUrl).pathname.replace(/\/$/, "");
const gaMeasurementId = process.env.GA_MEASUREMENT_ID || "";
const searchConsoleVerification = process.env.GOOGLE_SITE_VERIFICATION || "";
const formEndpoint = process.env.CONTACT_FORM_ENDPOINT || "";

module.exports = {
  name: "Fluvius Engenharia",
  shortName: "Fluvius",
  description: "Engenharia de Recursos Hídricos e Geotecnia para empreendimentos complexos.",
  baseUrl,
  basePath: basePath === "/" ? "" : basePath,
  locale: "pt_BR",
  language: "pt-BR",
  themeColor: "#1c2a6e",
  socialImage: "/assets/hero-dam.webp",
  logo: "/assets/logo-lockup.jpg",
  manifest: "/site.webmanifest",
  favicon: "/assets/favicon.svg",
  analytics: {
    status: gaMeasurementId ? "READY" : "BLOCKED_ANALYTICS_ID",
    gaMeasurementId,
    searchConsoleVerification
  },
  contact: {
    email: "contato@fluviusengenharia.com.br",
    whatsappLabel: "(31) 99350-1315",
    whatsappUrl: "https://wa.me/5531993501315",
    location: "Minas Gerais · Brasil",
    formStatus: formEndpoint ? "READY" : "BLOCKED_PROVIDER",
    formProvider: process.env.CONTACT_FORM_PROVIDER || "Indefinido",
    formEndpoint
  },
  environment: {
    siteEnv: process.env.SITE_ENV || "production",
    siteBaseUrlVariable: "SITE_BASE_URL",
    contactFormEndpointVariable: "CONTACT_FORM_ENDPOINT"
  }
};
