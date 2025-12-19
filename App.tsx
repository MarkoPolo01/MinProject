import React, {useRef} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const token = 'token';

  const sendToken = () => {
    if (!webViewRef.current) { return; }

    webViewRef.current.postMessage(token);
  };

  const handleMessage = async e => {
    const message = e.nativeEvent.data;

    switch (message) {
      case 'refreshToken':
        sendToken();
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
        onLoadEnd={() => { sendToken(); }}
        setSupportMultipleWindows={false}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
}

export default App;
