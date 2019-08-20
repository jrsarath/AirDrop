
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.gamesetter.BuildConfig;
import com.gamesetter.R;

// @philly25/react-native-paytm
import com.reactlibrary.RNPayTmPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-google-signin
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// react-native-image-base64
import fr.snapp.imagebase64.RNImgToBase64Package;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-payumoney
import superinfotech.suraj.reactnativepayumoney.PayumoneyPackage;
// react-native-restart
import com.avishayil.rnrestart.ReactNativeRestartPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNPayTmPackage(),
      new RNCameraPackage(),
      new RNFirebasePackage(),
      new RNGestureHandlerPackage(),
      new RNGoogleSigninPackage(),
      new RNImgToBase64Package(),
      new LinearGradientPackage(),
      new PayumoneyPackage(),
      new ReactNativeRestartPackage(),
      new SplashScreenReactPackage(),
      new VectorIconsPackage()
    ));
  }
}
