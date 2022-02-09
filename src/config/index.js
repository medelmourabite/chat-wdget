const config = {
    local: {
        firebase: {
            apiKey: "AIzaSyBWo1_xJKP_wbgZG35LhGEj9NDUvpwofdA",
            authDomain: "answerbucket-bc54b.firebaseapp.com",
            databaseURL: "https://answerbucket-bc54b.firebaseio.com",
            projectId: "answerbucket-bc54b",
            storageBucket: "answerbucket-bc54b.appspot.com",
            messagingSenderId: "608330836262",
            appId: "1:608330836262:web:66adfb20fb7668eea8b9e7",
        }
    },
    rc2: {
        firebase: {
            apiKey: "AIzaSyBWo1_xJKP_wbgZG35LhGEj9NDUvpwofdA",
            authDomain: "answerbucket-bc54b.firebaseapp.com",
            databaseURL: "https://answerbucket-bc54b.firebaseio.com",
            projectId: "answerbucket-bc54b",
            storageBucket: "answerbucket-bc54b.appspot.com",
            messagingSenderId: "608330836262",
            appId: "1:608330836262:web:66adfb20fb7668eea8b9e7",
        }
    },
    v2: {
        firebase: {
            apiKey: "AIzaSyDc5seyupcncVQpFMwHjPrDR2sXSA7nolU",
            authDomain: "chat-widget-f0fbf.firebaseapp.com",
            projectId: "chat-widget-f0fbf",
            storageBucket: "chat-widget-f0fbf.appspot.com",
            messagingSenderId: "510264168275",
            appId: "1:510264168275:web:1f0938905a005bbd4ddba6"
        }
    },
}[process.env.REACT_APP_ENV];

export default config;
