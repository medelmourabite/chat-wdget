const config = {
    dev: {
        firebase: {
            apiKey: "AIzaSyBWo1_xJKP_wbgZG35LhGEj9NDUvpwofdA",
            projectId: "answerbucket-bc54b",
        }
    },
    v2: {
        firebase: {
            apiKey: "AIzaSyDc5seyupcncVQpFMwHjPrDR2sXSA7nolU",
            projectId: "chat-widget-f0fbf",
        }
    },
}[process.env.REACT_APP_ENV];

export default config;
