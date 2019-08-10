#import "RNPayTm.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@implementation RNPayTm

UIViewController* rootVC;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startPayment: (NSDictionary *)details)
{
    NSHTTPCookieStorage *storage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *cookie in [storage cookies]) {
        [storage deleteCookie:cookie];
    }
    [[NSUserDefaults standardUserDefaults] synchronize];

    NSMutableDictionary *orderDict = [NSMutableDictionary new];
    NSString* mode = details[@"mode"];

    orderDict[@"MID"] = details[@"MID"];
    orderDict[@"CHANNEL_ID"] = details[@"CHANNEL_ID"];
    orderDict[@"INDUSTRY_TYPE_ID"] = details[@"INDUSTRY_TYPE_ID"];
    orderDict[@"WEBSITE"] = details[@"WEBSITE"];
    orderDict[@"TXN_AMOUNT"] = details[@"TXN_AMOUNT"];
    orderDict[@"ORDER_ID"] = details[@"ORDER_ID"];
    orderDict[@"EMAIL"] = details[@"EMAIL"];
    orderDict[@"MOBILE_NO"] = details[@"MOBILE_NO"];
    orderDict[@"CUST_ID"] = details[@"CUST_ID"];
    orderDict[@"CHECKSUMHASH"] = details[@"CHECKSUMHASH"];
    orderDict[@"CALLBACK_URL"] = details[@"CALLBACK_URL"];

    PGOrder *order = [PGOrder orderWithParams:orderDict];

    PGTransactionViewController* txnController = [[PGTransactionViewController alloc] initTransactionForOrder:order];

    if ([mode isEqualToString:@"Staging"]) {
        txnController.serverType = eServerTypeStaging;
        txnController.loggingEnabled = YES;
        txnController.useStaging = YES;
    } else if ([mode isEqualToString:@"Production"]) {
        txnController.serverType = eServerTypeProduction;
    } else
        return;

    txnController.merchant = [PGMerchantConfiguration defaultConfiguration];
    txnController.title = @"Paytm payment";
    txnController.delegate = self;

    rootVC = [[[[UIApplication sharedApplication] delegate] window] rootViewController];

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.4 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [rootVC presentViewController:txnController animated:YES completion:nil];
    });
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"PayTMResponse"];
}

//this function triggers when transaction gets finished
-(void)didFinishedResponse:(PGTransactionViewController *)controller response:(NSString *)responseString {
    [self sendEventWithName:@"PayTMResponse" body:@{@"status":@"Success", @"response":responseString}];
    [controller dismissViewControllerAnimated:YES completion:nil];
}

//this function triggers when transaction gets cancelled
-(void)didCancelTrasaction:(PGTransactionViewController *)controller {
    //    [_statusTimer invalidate];
    NSString *msg = [NSString stringWithFormat:@"UnSuccessful"];
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Cancel transaction" message:msg preferredStyle:UIAlertControllerStyleAlert];

    [alertController addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        [self sendEventWithName:@"PayTMResponse" body:@{@"status":@"Cancel", @"response":msg}];
        [rootVC dismissViewControllerAnimated:YES completion:nil];
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        [controller dismissViewControllerAnimated:YES completion:nil];
    }]];

    [controller presentViewController:alertController animated:YES completion:nil];

    //    [[[UIAlertView alloc] initWithTitle:@"Transaction Cancel" message:msg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
    //    [self sendEventWithName:@"PayTMResponse" body:@{@"status":@"Cancel", @"response":msg}];
    //    [controller dismissViewControllerAnimated:YES completion:nil];
}

//Called when a required parameter is missing.
-(void)errorMisssingParameter:(PGTransactionViewController *)controller error:(NSError *) error {
    [controller dismissViewControllerAnimated:YES completion:nil];
}

@end
