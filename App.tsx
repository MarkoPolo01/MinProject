import React, {useRef} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  const webViewRef = useRef<WebView>(null);

  const injectJsCode = () => {
    const token = 'token';
    return `
    (function() {
      window.ReactNativeWebView.postMessage(
        JSON.stringify('${token}')
      );
    })();
  `;
  };

  const handleMessage = async e => {
    const message = e.nativeEvent.data;

    switch (message) {
      case 'refreshToken':
        // локика по получению токена
        webViewRef?.current?.injectJavaScript(injectJsCode());
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'https://dzen.ru/'}} // нужно заменить на локалхост локально поднятого приложения + добавить логи
        style={{flex: 1}}
        ref={webViewRef}
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        javaScriptEnabled
        startInLoadingState
        showsHorizontalScrollIndicator={false}
        renderLoading={() => (
          <View style={{flex: 1}}>
            <ActivityIndicator size="large" />
          </View>
        )}
        mediaPlaybackRequiresUserAction
        allowsInlineMediaPlayback
        onError={e => console.log(e)}
        onHttpError={e => console.log(e)}
        scrollEnabled
        allowsBackForwardNavigationGestures
        injectedJavaScript={injectJsCode()}
        setSupportMultipleWindows={false}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
}

export default App;
