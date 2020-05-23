import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View , Platform } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Stack Navigator
const HomeNavigator = createStackNavigator();

// Drawer NAvigator
const MainNavigator = createDrawerNavigator();

// *** Task 3 *** /
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();


class Main extends Component {
    
    // Used for Menu and Dishdetail
    createMenuNavigator = () => {
        return(
            <MenuNavigator.Navigator>
                <MenuNavigator.Screen
                    name="Menu"
                    component={Menu}
                    options={{ title : 'Menu',
                    headerStyle: {backgroundColor: '#512DA8' },
                    headerTintColor:'#fff' }}
                />
                <MenuNavigator.Screen
                    name="Dishdetail"
                    component={Dishdetail}
                    options={{ title : 'Dish detail',
                    headerStyle: {backgroundColor: '#512DA8' },
                    headerTintColor:'#fff' }} 
                />
            </MenuNavigator.Navigator>
        )
    }
    // Used for Home screen 
    createHomeNavigator = () => {
        return(
            <HomeNavigator.Navigator>
                <HomeNavigator.Screen
                    name="Home"
                    component={Home}
                    options={{ title : 'Home',
                    headerStyle: {backgroundColor: '#512DA8' },
                    headerTintColor:'#fff' }}
                />
            </HomeNavigator.Navigator>
        )
    }

    /****TAsk 1*** */
    // Contact Component
    createContactNavigator = () => {
        return(
            <ContactNavigator.Navigator>
                <ContactNavigator.Screen
                    name="Contact"
                    component={Contact}
                    options={{ title : 'Contact Us',
                    headerStyle: {backgroundColor: '#512DA8' },
                    headerTintColor:'#fff' }}
                />
            </ContactNavigator.Navigator>
        )
    }
    /****TAsk 2*** */
    // About Component
    createAboutNavigator = () => {
        return(
            <AboutNavigator.Navigator>
                <AboutNavigator.Screen
                    name="About"
                    component={About}
                    options={{ title : 'About Us',
                    headerStyle: {backgroundColor: '#512DA8' },
                    headerTintColor:'#fff' }}
                />
            </AboutNavigator.Navigator>
        )
    }

    render() {
        return (
            <NavigationContainer  style={{flex:1,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator.Navigator
                drawerStyle={{
                    backgroundColor: '#D1C4E9',
                    width: 240,
                  }}
                  >
                    {/* Here children props accepts function */}
                    <MainNavigator.Screen name="Home" 
                        children={this.createHomeNavigator}
                        
                    />
                    <MainNavigator.Screen name='Menu' 
                    children={this.createMenuNavigator}/>
                    
                    {/* ***TAsk 3*** */}
                    <MainNavigator.Screen name='About Us' 
                    children={this.createAboutNavigator}/>
                    
                    <MainNavigator.Screen name='Contact Us' 
                    children={this.createContactNavigator}/>
                    
                </MainNavigator.Navigator>
            </NavigationContainer>
        )
    }
}

export default Main;