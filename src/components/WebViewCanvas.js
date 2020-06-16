import WebView from 'react-native-webview';
import { View } from 'react-native';
import React, { useState, useRef } from 'react';

const WebViewCanvas = ({width, height, style, onCanvasLoad}) => {
  const webView = useRef(null);
  const [webViewSource] = useState(`
    <html>
      <head></head>
      <body style="margin: 0;">
        <canvas width="${width}" height="${height}" />
      </body>
    </html>
  `);

  const onLoad = () => {
    webView.current.injectJavaScript(`
      var canvas = document.querySelector('canvas');
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      try {
        (${onCanvasLoad.toString()}).apply(null, [canvas, window.ReactNativeWebView.postMessage]);
      } catch (e) {
        window.ReactNativeWebView.postMessage('error: ' + e.message);
      }
    `);
  };

  return (
    <View style={{...style, width, height }}>
        <WebView
          style={{ width: '100%', height: '100%' }}
          ref={webView}
          originWhitelist={["*"]}
          source={{ html: webViewSource }}
          onLoad={onLoad}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />
      </View>
  );
};

export default WebViewCanvas;
