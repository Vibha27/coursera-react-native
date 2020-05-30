import React,{ Component } from 'react';
import { Loading } from './LoadingComponent';
import { ScrollView , Text, FlatList} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders : state.leaders
    }
}
 
function History() {
    return(
        <Animatable.View animation="fadeInDown">
            <Card title="Our History">
                <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. {'\n\n'}
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
        </Animatable.View>
    )
}
class About extends Component {

    
    render() {
        const renderLeaders = ({item,index}) => {
            return(
                <Animatable.View transition="fadeIndown" delay={1000}>
                    <ListItem 
                    key={index}
                    title={item.name}
                    hideChevron={true}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri : baseUrl + item.image}}}

                    />
                </Animatable.View>
            )
        }
        
        if(this.props.leaders.isLoading) {
            return (
                <ScrollView>
                        <History />
                            <Card title="Corporate Leadership">
                                <Loading />
                            </Card>
                </ScrollView>
            );
        }
        else if(this.props.leaders.errMess){
            return (
                <ScrollView>
                <History />
                    <Card title="Corporate Leadership">
            <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else{

            return(
                <ScrollView>
                    <History />
                    <Card title="Corporate Leadership">
                        <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeaders}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
    
            )
        }
        
    }
    
}

export default connect(mapStateToProps)(About);