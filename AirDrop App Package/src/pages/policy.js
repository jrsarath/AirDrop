import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { ScrollIntoView, wrapScrollView, wrapScrollViewConfigured } from 'react-native-scroll-into-view';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';
const CustomScrollView = wrapScrollView(ScrollView);

export default class PolicyScreen extends Component {
    render() {
        return (
            <Screen>
                <Header text='Policies' />
                <CustomScrollView style={styles.main} ref="scrollView">
                    <View style={styles.forgot}>
                        <Title style={{width: '100%',color:'#f44336',fontSize: 25,marginBottom:15}}>Quick Links</Title>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => this.terms.scrollIntoView({ align: 'top',insets: {top: 10} })}>
                            <Subtitle style={styles.textWhite}>Terms</Subtitle>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => this.privacy.scrollIntoView({ align: 'top',insets: {top: 10} })}>
                            <Subtitle style={styles.textWhite}>Privacy</Subtitle>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => this.refund.scrollIntoView({ align: 'top',insets: {top: 10} })}>
                            <Subtitle style={styles.textWhite}>Refund</Subtitle>
                        </TouchableOpacity>
                    </View>
                    <ScrollIntoView ref={ref => (this.terms = ref)} onMount={false} style={{marginTop:20}}>
                        <Title style={styles.title}>Terms & Conditions</Title>
                        <Subtitle style={styles.subtitle}>This Terms & Conditions explains how information about you is collected, used, and disclosed by GameSetter.in  to  any parent or subsidiary (collectively, “GameSetter,” “our”, “us” or “we”) when you access or use GameSetter  website, mobile applications, and other products and services (collectively, the“Services”) or otherwise interact with us.  This policy applies to GameSetter , website, applications, and other technologies (we collectively refer to these as “Services”).</Subtitle>
                        <Title style={styles.titleAlt}>Information Collection and Use</Title>
                        <Subtitle style={styles.subtitle}>
                            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Email Address, Mobile Number. The information that we request will be retained by us and used as described in this privacy policy.
                            {"\n\n"}
                            The app does use third party services that may collect information used to identify you.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Accessing and updating your information</Title>
                        <Subtitle style={styles.subtitle}>
                            We aim to provide you with a reasonable opportunity to access, update, and delete to your account. In some cases, we may have to keep that information for legitimate business or legal purposes. When updating your information, we may ask you to verify your identity before we can act on your request.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Cookies</Title>
                        <Subtitle style={styles.subtitle}>
                            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.These are sent to your browser from the websites that you visit and are stored on your device 's internal memory.
                            {"\n\n"}
                            This Service does not use these“ cookies” explicitly.However, the app may use third party code and libraries that use“ cookies” to collect information and improve their services.You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Information security</Title>
                        <Subtitle style={styles.subtitle}>
                            We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold and undertake reasonable security measures with appropriate confidentiality, integrity, and availability protections. However, since no software or storage system is 100% secure, we cannot guarantee for the security of your information associated with the Services, or any other service for that matter. You can help protect your account information by using unique and hard-to-guess passwords. We generally store data for as long as we have a valid business purpose or if we are legally required to do so.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Changes</Title>
                        <Subtitle style={styles.subtitle}>
                            Our Privacy Policy may change from time to time. We will post any Policy changes on this page, including material changes. Please check back periodically to view changes to our privacy policy.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Questions ?</Title>
                        <Subtitle style={styles.subtitle}>
                            If you have questions, please contact us at support@GameSetter.in
                        </Subtitle>
                    </ScrollIntoView>
                    <ScrollIntoView ref={ref => (this.privacy = ref)} onMount={false} style={{marginTop:40}}>
                        <Title style={styles.title}>Privacy Policy</Title>
                        <Title style={styles.titleAlt}>Information Collection and Use</Title>
                        <Subtitle style={styles.subtitle}>
                            For a better experience,
                            while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Email Address, Mobile Number.The information that we request will be retained by us and used as described in this privacy policy.
                            {"\n\n"}
                            The app does use third party services that may collect information used to identify you.
                            {"\n\n"}
                            Link to privacy policy of third party service providers used by the app
                            {"\n\n"}
                            • Google Play Services{"\n"}
                            • Firebase Analytics{"\n"}
                            • PayU Money{"\n"}
                        </Subtitle>
                        <Title style={styles.titleAlt}>Log Data</Title>
                        <Subtitle style={styles.subtitle}>
                            We want to inform you that whenever you use our Service, in a
                            case ofan error in the app we collect data and information(through third party products) on your phone called Log Data.This Log Data may include information such as your device Internet Protocol(“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Cookies</Title>
                        <Subtitle style={styles.subtitle}>
                            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.These are sent to your browser from the websites that you visit and are stored on your device 's internal memory.
                            {"\n\n"}
                            This Service does not use these“ cookies” explicitly.However, the app may use third party code and libraries that use“ cookies” to collect information and improve their services.You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Service Providers</Title>
                        <Subtitle style={styles.subtitle}>
                            We may employ third - party companies and individuals due to the following reasons: 
                            {"\n\n"}
                            • To facilitate our Service;{"\n"}
                            • To provide the Service on our behalf;{"\n"}
                            • To perform Service - related services; or{"\n"}
                            • To assist us in analyzing how our Service is used.
                            {"\n\n"}
                            We want to inform users of this Service that these third parties have access to your Personal Information.The reason is to perform the tasks assigned to them on our behalf.However, they are obligated not to disclose or use the information
                            for any other purpose.

                        </Subtitle>
                        <Title style={styles.titleAlt}>Security</Title>
                        <Subtitle style={styles.subtitle}>
                            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Links to Other Sites</Title>
                        <Subtitle style={styles.subtitle}>
                            This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Children’s Privacy</Title>
                        <Subtitle style={styles.subtitle}>
                            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Changes to This Privacy Policy</Title>
                        <Subtitle style={styles.subtitle}>
                            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
                        </Subtitle>
                        <Title style={styles.titleAlt}>Contact Us</Title>
                        <Subtitle style={styles.subtitle}>
                            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
                        </Subtitle>
                    </ScrollIntoView>
                    <ScrollIntoView ref={ref => (this.refund = ref)} onMount={false}style={{marginTop:40}}>
                        <Title style={styles.title}>Our Refund Policy</Title>
                        <Subtitle style={styles.subtitle}>
                            Our focus is complete customer satisfaction. In the event, if you are displeased with the services provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine rules of each match before joining it, it provides all the details about the match.
                            {"\n"}
                            In case of dissatisfaction from our services, clients have the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows:
                            {"\n"}
                        </Subtitle>
                        <Subtitle style={styles.subtitle}>
                            We will try our best to create the suitable design concepts for our clients. In case any client is not completely satisfied with our rules and match we can provide a refund.
                            {"\n\n"}
                            If paid by credit card & debit card, refunds will be issued to the original credit card & debit card provided at the time of joining match and in case of payment gateway name payments refund will be made to the same account.
                        </Subtitle>
                    </ScrollIntoView>
                    <Text>{"\n\n"}</Text>
                </CustomScrollView>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        padding: 20,
    },
    textCon: {
        padding: 20,
        paddingBottom: 10
    },
    title: {
        color:'#f44336', 
        fontSize: 25
    },
    titleAlt: {
        color: '#f44336',
        fontSize: 17,
        marginTop: 15,
        fontWeight: 'bold'
    },
    subtitle: {
        color:'#4a4a4a',
        marginTop: 5,
        lineHeight:20
    },
    forgot: {
        color: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    forgotbtn: {
        height: 40,
        width: '30%',
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d47a1',
    },
    textWhite: {
        color: '#fff'
    }
})