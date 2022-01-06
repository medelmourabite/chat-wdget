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
            apiKey: "AIzaSyBWo1_xJKP_wbgZG35LhGEj9NDUvpwofdA",
            authDomain: "answerbucket-bc54b.firebaseapp.com",
            databaseURL: "https://answerbucket-bc54b.firebaseio.com",
            projectId: "answerbucket-bc54b",
            storageBucket: "answerbucket-bc54b.appspot.com",
            messagingSenderId: "608330836262",
            appId: "1:608330836262:web:66adfb20fb7668eea8b9e7",
        }
    },
}[process.env.REACT_APP_ENV];

console.error(process.env.REACT_APP_ENV, config);
export default config;