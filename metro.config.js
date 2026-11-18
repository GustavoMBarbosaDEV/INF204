const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Permite carregar o arquivo .wasm usado pelo SQLite na web
config.resolver.assetExts.push("wasm");

// Cabecalhos necessarios para o SharedArrayBuffer (SQLite na web)
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    middleware(req, res, next);
  };
};

module.exports = config;
