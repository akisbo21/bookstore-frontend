const Api = function (nuxt, host) {
  const self = this;
  self.host = host;
  self.nuxt = nuxt;

  self.handleCatch = (resp) => {
    console.log("api error", resp);
    throw new Error(resp);
  };

  self.upload = async (url, file) => {
    const form = new FormData();
    form.set("file", file);
    console.log("api.js",form)
    const resp = await fetch(`${self.host}${url}`, {
      method: "POST",
      body: form,
    })
    .then((response) => {
      return response.json();
    })
    .catch(self.handleCatch);
    return resp;
  };

  self.post = async (url, data, json = true) => {
    const headers = {
      
    };

    if (json) {
      headers["Content-type"] = "application/json";
    }

    const resp = await fetch(`${self.host}${url}`, {
      method: "POST",
      body: json ? JSON.stringify(data) : data,
      headers: headers,
    })
      .then((response) => {
        console.log("api.js", response);
        return response.json();
      })
      .catch(self.handleCatch);

    return resp;
  };

  self.get = async (url, options = {}) => {
    const qs = options.params ? `?${new URLSearchParams(options.params).toString()}` : ''
    return await fetch(`${self.host}${url}${qs}`, { signal: options.signal })
        .then((response) => {
          return response.json()
        })
        .catch((e) => {
          if (e && e.name === 'AbortError') {
            return null
          }
          return self.handleCatch(e)
        })
  }

  self.delete = async (url) => {
    const resp = await fetch(`${self.host}${url}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete category.");
        }
        return response.json();
      })
      .catch(self.handleCatch);
  
    return resp;
  };
  
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("api", new Api(nuxtApp, nuxtApp.$config.public.api.site));
});
