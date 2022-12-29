exports = module.exports = exports = module.exports = function() {
  var mod = {
    requestCallback: async function(callback, errorCallback, type, url, method, data, headers) {
      if (!app.has(type)) type = "static";
      if (config.api.log.url) console.log(url);
      var proxyUrl = config.luminati.url[type];
      var result = await app.utils.proxy.fetch(proxyUrl, url, method, data, headers);
      var text = await result.text()
      if (result.status === 200) {
        if (typeof callback === "function") await callback(text);
      } else {
        if (typeof errorCallback === "function") await errorCallback("Could not load url " + url, text);
      }
    }
  };
  return mod;
}