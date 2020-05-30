import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

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
                </Card>
            </Animatable.View>
        </View>
    )
}

export default Contact;