import React,{ Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    
    render() {
        const renderMenuItem = ({item,index}) => {
            return(
                <ListItem 
                key={index}
                title={item.name}
                hideChevron={true}
                subtitle={item.description}
                onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
                leftAvatar={{ source: require('./images/uthappizza.png')}}
                />
            )
        }
        
        return(
            <FlatList 
            data={this.state.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
        )
    }
    
}

export default Menu;