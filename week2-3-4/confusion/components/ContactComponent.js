import React from 'react';
import { View, Text } from 'react-native';
import { Card,Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

function SendMail() {
    MailComposer.composeAsync({
        recipients : ['svibha081@gmail.com'],
        subject : 'Enquiry',
        body : 'To whom it may concern :'
    });
}

function Contact() {
    return (
        <View style={{ flex: 1}}>
            <Animatable.View animation="fadeInDown" >
                
                <Card title="Contact Information">
                    <Text style={{margin:10}}>
                    121, Clear Water Bay Road {'\n'}
                    Clear Water Bay, Kowloon {'\n'}
                    HONG KONG {'\n'}
                    Tel: +852 1234 5678 {'\n'}
                    Fax: +852 8765 4321 {'\n'}
                    Email:confusion@food.net
                    </Text>
                    <Button 
                    title = 'Send Email'
                    buttonStyle = {{ backgroundColor : '#512DA8'}}
                    onPress = {SendMail}/>
                </Card>
            </Animatable.View>
        </View>
    )
}

export default Contact;