import React,{ Component } from 'react';
import { View,Text,ScrollView,Image, StyleSheet } from 'react-native';
import { Input,CheckBox, Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore  from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from 'expo-asset';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { baseUrl } from '../shared/baseUrl';

const Tab = createBottomTabNavigator();

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username : '',
            password : '',
            remember : false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                 JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        }else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    render() {
        return(
            <View style = {styles.container}>
                <Input placeholder='Username'
                leftIcon={<Icon name='face' size={24}/>}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput} />

                <Input placeholder='Password'
                leftIcon={<Icon name='lock' size={24}/>}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput} />

                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />

                <View style={styles.formButton} >
                    <Button 
                    onPress={() => this.handleLogin()}
                    title='Login'
                    color="#512DA8"
                    />
                </View>

            </View>
        );

    }

}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username : '',
            password : '',
            firstname:'',
            lastname:'',
            email:'',
            remember : false,
            imageUrl : baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing : true,
                aspect : [5,5]
            });

            if(!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing : true,
                aspect : [5,5],
                quality : 1
            });

            if(!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                 { resize : { width: 400 } }
            ],
            { format : ImageManipulator.SaveFormat.PNG }
        );
        this.setState({ imageUrl : processedImage.uri})
    }
    handleRegister() {
        console.log(JSON.stringify(this.state));
        
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                 JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        }else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

        
    }

    render() {
        return(
            <ScrollView>
                <View style = {styles.container}>

                    <View
                    style={styles.imageContainer}>
                        <Image
                        source={{uri : this.state.imageUrl}}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} />

                        <Button title="Camera"
                        onPress={this.getImageFromCamera}
                        />

                        <Button title="Gallery"
                        onPress={this.getImageFromGallery}
                        />


                    </View>

                    <Input placeholder='Username'
                    leftIcon={<Icon name='face' size={24}/>}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} />

                    <Input placeholder='Password'
                    leftIcon={<Icon name='lock' size={24}/>}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} />

                    <Input placeholder='firstname'
                    leftIcon={<Icon name='face' size={24}/>}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput} />

                    <Input placeholder='lastname'
                    leftIcon={<Icon name='face' size={24}/>}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput} />

                    <Input placeholder='email'
                    leftIcon={<Icon name='email' size={24}/>}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput} />

                    <CheckBox title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                        />

                    <View style={styles.formButton} >
                        <Button 
                        onPress={() => this.handleRegister()}
                        title='Register'
                        color="#512DA8"
                        />
                    </View>
                </View>
            </ScrollView>
        );

    }
}

function Login() {
    return (
        <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor:'#512DA8',
            activeTintColor:'white'
            
        }}
        >
            <Tab.Screen name="Login" 
            component={LoginTab}
            options={{
                tabBarIcon: () => (
                <Icon name='input' size={24} />
                 )
            }}
            />
            <Tab.Screen name="Register" 
            options={{
                tabBarIcon: () => (
                <Icon name='portrait' size={24} />
                )
            }}component={RegisterTab} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container : {
        justifyContent : 'center',
        margin : 20
    },
    formInput : {
        margin : 20
    },
    formCheckbox : {
        margin  :40,
        backgroundColor : null
    },
    formButton : {
        margin  : 20
    },
    imageContainer : {
        flex:1,
        flexDirection : 'row',
        justifyContent : 'space-around', 
        margin:20

    },
    image:{
        margin: 10,
        width:80,
        height: 60
    }
})


export default Login;