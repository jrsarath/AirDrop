
package com.reactlibrary;

import java.util.HashMap;
import android.app.Activity;
import javax.annotation.Nullable;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.paytm.pgsdk.PaytmOrder;
import com.paytm.pgsdk.PaytmPGService;
import com.paytm.pgsdk.PaytmPaymentTransactionCallback;

public class RNPayTmModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNPayTmModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNPayTm";
  }

  @ReactMethod
  public void startPayment(ReadableMap options) {
    Activity currentActivity = getCurrentActivity();
    PaytmPGService Service;
    if(options.getString("mode").equals("Production")){
        Service = PaytmPGService.getProductionService();
    } else {
        Service = PaytmPGService.getStagingService("");
    }
    HashMap<String, String> paramMap = new HashMap<String, String>();
    paramMap.put("ORDER_ID", options.getString("ORDER_ID"));
    paramMap.put("MID", options.getString("MID"));
    paramMap.put("CUST_ID", options.getString("CUST_ID"));
    paramMap.put("CHANNEL_ID", options.getString("CHANNEL_ID"));
    paramMap.put("INDUSTRY_TYPE_ID", options.getString("INDUSTRY_TYPE_ID"));
    paramMap.put("WEBSITE", options.getString("WEBSITE"));
    paramMap.put("TXN_AMOUNT", options.getString("TXN_AMOUNT"));
    paramMap.put("EMAIL", options.getString("EMAIL"));
    paramMap.put("MOBILE_NO", options.getString("MOBILE_NO"));
    paramMap.put("CALLBACK_URL", options.getString("CALLBACK_URL"));
    paramMap.put("CHECKSUMHASH", options.getString("CHECKSUMHASH"));
    PaytmOrder Order = new PaytmOrder(paramMap);

/*
    PaytmMerchant Merchant = new PaytmMerchant(
        options.getString("generationUrl"),
        options.getString("validationUrl"));

    Service.initialize(Order, Merchant, null);
*/
    Service.initialize(Order, null);

    Service.startPaymentTransaction(getCurrentActivity(), true, true, new PaytmPaymentTransactionCallback() {
      @Override
      public void someUIErrorOccurred(String inErrorMessage) {
        Log.d("RNPayTm", "Some UI Error Occurred: " + inErrorMessage);
        WritableMap params = new WritableNativeMap();
        params.putString("status", "UIErrorOccurred");
        sendEvent( "PayTMResponse", params);
      }

      @Override
      public void onTransactionResponse(Bundle inResponse) {
        Log.d("RNPayTm", "Payment Transaction Response: " + inResponse);
        WritableMap params = Arguments.fromBundle(inResponse);
        params.putString("status", "Success");
        sendEvent( "PayTMResponse", params);
      }

      @Override
      public void networkNotAvailable() {
        Log.d("RNPayTm", "Network Not Available");
        WritableMap params = new WritableNativeMap();
        params.putString("status", "NetworkNotAvailable");
        sendEvent( "PayTMResponse", params);
      }

      @Override
      public void clientAuthenticationFailed(String inErrorMessage) {
        Log.d("RNPayTm", "Client Authentication Failed: " + inErrorMessage);
        WritableMap params = new WritableNativeMap();
        params.putString("status", "ClientAuthenticationFailed");
        sendEvent( "PayTMResponse", params );
      }

      @Override
      public void onErrorLoadingWebPage(int iniErrorCode, String inErrorMessage, String inFailingUrl) {
        Log.d("RNPayTm", "Error Loading WebPage: " + inErrorMessage);
        WritableMap params = new WritableNativeMap();
        params.putString("status", "ErrorLoadingWebPage");
        sendEvent( "PayTMResponse", params );
      }

      // had to be added: NOTE
      @Override
      public void onBackPressedCancelTransaction() {
        Log.d("RNPayTm", "Transaction cancelled: BackPressedCancelTransaction");
        WritableMap params = new WritableNativeMap();
        params.putString("status", "Cancel");
        sendEvent( "PayTMResponse", params);
      }

      @Override
      public void onTransactionCancel(String inErrorMessage, Bundle inResponse) {
        Log.d("RNPayTm", "Transaction cancelled: " + inErrorMessage);
        WritableMap params = Arguments.fromBundle(inResponse);
        params.putString("status", "Cancel");
        sendEvent( "PayTMResponse", params);
      }
    });
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
  reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

}
