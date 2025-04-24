"use client";

import React from "react";

class ChatwootWidget extends React.Component {
  componentDidMount() {
    // Add Chatwoot Settings
    // @ts-ignore
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right", // This can be left or right
      locale: "en", // Language to be set
      type: "standard", // [standard, expanded_bubble]
    };

    (function (d, t) {
      var BASE_URL = "https://app.chatwoot.com";
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      // @ts-ignore
      g.src = BASE_URL + "/packs/js/sdk.js";
      // @ts-ignore
      g.defer = true;
      // @ts-ignore
      g.async = true;
      // @ts-ignore
      s.parentNode.insertBefore(g, s);
      g.onload = function () {
        // @ts-ignore
        window.chatwootSDK.run({
          websiteToken: "FSzAr6KLHD51yzU4zH6E6pfk",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }

  render() {
    return null;
  }
}

export default ChatwootWidget;
