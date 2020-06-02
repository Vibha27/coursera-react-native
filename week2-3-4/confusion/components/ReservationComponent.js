import React,{ Component } from 'react';
import {Platform, Text,View,ScrollView, StyleSheet,Picker,Switch,Button,Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests : 1,
            smoking : false,
            date: '',
            showModal : false
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));

        Alert.alert(
            'Reservation OK ?',
            'Number of Guests : ' + this.state.guests + '\nSmoking ? : ' + this.state.smoking + '\nDate and Time : ' + this.state.date ,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {this.resetForm(); this.toggleModal()}
                },
                {
                    type: 'OK',
                    onPress : () => {
                        this.obtainNotificationPermission(this.state.date)
                        this.addReservationToCalendar(this.state.date)
                        this.resetForm(); 
                        this.toggleModal()}
                }
            ] ,
            {cancelable : false}      
        )

        this.toggleModal()
    }

    resetForm() {
        this.setState({
            guests : 1,
            smoking : false,
            date: ''
        })
    }
    toggleModal() {
        this.setState({ showModal : !this.state.showModal})
    }

    async obtainNotificationPermission(date) {
        let permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
            
        }else{
            Notifications.createChannelAndroidAsync('default',{
                name : 'default',
                sound : true
            });
            Notifications.presentLocalNotificationAsync({
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
                android : {
                    channelId : 'default',
                    color : '#512DA8'
                }
            });
        }
        return permission;
    }
    
    async obtainCalenderPermission() {
        let calenderPermission = await Permissions.askAsync(Permissions.CALENDAR);

        if(calenderPermission.status === 'granted') 
            return calenderPermission
    }

    async addReservationToCalendar(date) {

        await this.obtainCalenderPermission();
        
        const defaultCalendarSource =
            Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        // for android we need to create id
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        console.log(`Your new calendar ID is: ${newCalendarID}`);

        Calendar.createEventAsync(newCalendarID,{
            title : 'Con Fusion Table Reservation',
            startDate : Date.parse(date) ,
            endDate : Date.parse(date) + (2*60*60*1000) ,
            timeZone : 'Asia/Hong_Kong',
            location : '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
        .then((event) => {
            console.log("Calendar.createEventAsync success: ", event);
            Alert.alert("Added To Calendar");
        })
        .catch((error) => {
            console.log("Calendar.createEventAsync failure: ", error);
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Guests
                        </Text>
                        <Picker style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue,itemIndex) => this.setState({guests : itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                            
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Smoking/Non-Smoking ?
                        </Text>
                        <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Date and Time
                        </Text>
                        <DatePicker style={{ flex: 2, marginRight: 20}}
                        date= {this.state.date}
                        mode='datetime'
                        format= ''
                        CustomStyle={{
                            dateIcon : {
                                position : 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput : {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({date : date})}}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                        title="Reserve"
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel="Learn more.."
                        />
                    </View>
                    
                </Animatable.View>
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    formRow : {
        alignItems : 'center',
        justifyContent : 'center',
        flex: 1,
        flexDirection : 'row',
        margin : 20
    },
    formLabel : {
        fontSize :18,
        flex: 2
    
    },
    formItem : {
        flex: 1
    },
    modal : {
        justifyContent : 'center',
        margin : 20
    },
    modalTitle : {
        fontSize : 24,
        fontWeight: 'bold',
        backgroundColor:'#512DA8',
        color: 'white',
        textAlign:'center',
        marginBottom : 20
    },
    modalText : {
        fontSize: 18,
        margin :10
    }
})
export default Reservation;