import React,{ Component } from 'react';
import { View, FlatList , Text} from 'react-native';
import { Tile } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes : state.dishes
    }
}

class Menu extends Component {


    
    render() {
        const renderMenuItem = ({item,index}) => {
            return(
                <Tile 
                key={index}
                title={item.name}
                featured
                caption={item.description}
                onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{uri:baseUrl + item.image}}
                />
            )
        }
        
        if(this.props.dishes.isLoading) {
            return (
                <Loading />
            )
        }
        else if(this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        else{
            return(
                <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
            )
        }
        
    }
    
}

export default connect(mapStateToProps)(Menu);