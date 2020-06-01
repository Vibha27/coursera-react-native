import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Favorite from './FavoriteComponent';
import Login from './LoginComponent';
import { View , Platform , Image,StyleSheet,Text,SafeAreaView } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import Reservation from './ReservationComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
  
// Stack Navigator
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoriteNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

// Drawer NAvigator
const MainNavigator = createDrawerNavigator();

// Used for Menu and Dishdetail
const createMenuNavigator = ({navigation}) => {
    return(
        <MenuNavigator.Navigator>
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{ title : 'Menu',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
                }}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ title : 'Dish detail',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff'
             }} 
            />
        </MenuNavigator.Navigator>
    )
}
// Used for Home screen 
const createHomeNavigator = ({navigation}) => {
    return(
        <HomeNavigator.Navigator>
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{ title : 'Home',
                headerStyle: {backgroundColor: '#512DA8' } ,
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
 
            }}
            />
        </HomeNavigator.Navigator>
    )
}

// Contact Component
const createContactNavigator = ({navigation}) => {
    return(
        <ContactNavigator.Navigator>
            <ContactNavigator.Screen
                name="Contact"
                component={Contact}
                options={{ title : 'Contact Us',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
             }}
            />
        </ContactNavigator.Navigator>
    )
}

// About Component
const createAboutNavigator = ({navigation}) => {
    return(
        <AboutNavigator.Navigator>
            <AboutNavigator.Screen
                name="About"
                component={About}
                options={{ title : 'About Us',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
            }}
            />
        </AboutNavigator.Navigator>
    )
}

// Reservation Component
const createReservationNavigator = ({navigation}) => {
    return(
        <ReservationNavigator.Navigator>
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={{ title : 'Reservation',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
            }}
            />
        </ReservationNavigator.Navigator>
    )
}

// Favorite Component
const createFavoriteNavigator = ({navigation}) => {
    return(
        <FavoriteNavigator.Navigator>
            <FavoriteNavigator.Screen
                name="Reservation"
                component={Favorite}
                options={{ title : 'Favorite',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
            }}
            />
        </FavoriteNavigator.Navigator>
    )
}

// Contact Component
const createLoginNavigator = ({navigation}) => {
    return(
        <LoginNavigator.Navigator>
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={{ title : 'Login',
                headerStyle: {backgroundColor: '#512DA8' },
                headerTintColor:'#fff',
                headerLeft: () => (
                    <Icon
                        onPress={() => navigation.toggleDrawer()}
                        name="menu"
                        color="#fff"
                        size={30}
                        style={{marginStart:10}}
                    />
                  )
             }}
            />
        </LoginNavigator.Navigator>
    )
}

const CustomDrawerContentComponent = (props) => {
    return(
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container}
            forceInset = {{ top: 'always', horizontal:'never'}} >

                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Confusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
    }

    render() {
        return (
            <NavigationContainer  style={{flex:1,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator.Navigator
                initialRouteName="Home"
                drawerStyle={{
                    backgroundColor: '#D1C4E9'
                }}
                drawerContent = {(props) => <CustomDrawerContentComponent {...props} /> }

                  >
                      <MainNavigator.Screen name='Login'
                    options={{ drawerLabel: 'Login',
                    drawerIcon: (({focused}) => 
                    <Icon name="input" size={24} color="#900" />)
                    
                    }}
                    component={createLoginNavigator}/>
                    

                    <MainNavigator.Screen name="Home"
                
                    options={{ drawerLabel: 'Home',
                    drawerIcon: (({focused}) => 
                    <Icon name="home" size={24} color="#900" />)
                    
                    }}
                    component={createHomeNavigator}
                        
                    />
                    <MainNavigator.Screen name='Menu'
                    options={{ drawerLabel: 'Menu',
                    drawerIcon: (({focused}) => 
                    <Icon name="list" size={24} color="#900" />)
                    
                    }}
                    component={createMenuNavigator}/>
                    
                    <MainNavigator.Screen name='About Us'
                    options={{ drawerLabel: 'About Us',
                    drawerIcon: (({focused}) => 
                    <Icon name="info" size={24} color="#900" />)
                    
                    }}
                    component={createAboutNavigator}/>
                    
                    <MainNavigator.Screen name='Contact Us'
                    options={{ drawerLabel: 'Contact Us',
                    drawerIcon: (({focused}) => 
                    <Icon name="contacts" size={24} color="#900" />)
                    
                    }}
                    component={createContactNavigator}/>
                    

                    <MainNavigator.Screen name='Favorite'
                    options={{ drawerLabel: 'Favorite',
                    drawerIcon: (({focused}) => 
                    <Icon name="favorite" size={24} color="#900" />)
                    
                    }}
                    component={createFavoriteNavigator}/>
                    
                    <MainNavigator.Screen name='Reservation'
                    options={{ drawerLabel: 'Reservation',
                    drawerIcon: (({focused}) => 
                    <Icon name="restaurant" size={24} color="#900" />)
                    
                    }}
                    component={createReservationNavigator}/>
                    
                    
                </MainNavigator.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1
    },
    drawerHeader : {
        backgroundColor : '#512DA8',
        height : 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection : 'row'
    },
    drawerHeaderText : {
        color: 'white',
        fontSize : 24,
        fontWeight : 'bold'
    },
    drawerImage: {
        margin : 10,
        width : 80,
        height : 60
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Main);