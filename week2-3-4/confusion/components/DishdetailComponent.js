import React,{ Component } from 'react';
import { View, Text, ScrollView, FlatList,Modal,Button,StyleSheet } from 'react-native';
import { Card,Rating,Input } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite : (dishId) => dispatch(postFavorite(dishId)),
    // **Task 2***
    postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})

function RenderDish(props){
    const dish = props.dish;

    if(dish!=null) {
        return (
            <Card featuredTitle={dish.name}
            image={{uri : baseUrl + dish.image}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>

                {/* Material icon */}
                <View style={styles.iconView}>
                    <Icon 
                    raised
                    reverse
                    name= { props.favorite ? 'favorite' : 'favorite-border' }
                    color='#f50'
                    onPress={ () => props.favorite ? console.log('Already liked') : props.fav()}
                    size={30} />

                    {/****  Task 1*** */}
                    <Icon 
                    raised
                    reverse
                    name='create'
                    color='#512DA8'
                    size={30}
                    onPress={() => props.onPress()}/>
                </View>
            </Card>
        );
    }else{
        return(
            <View></View>
        )
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{margin : 10}}>
                <Text style={{fontSize: 14}} >{item.comment}</Text>
                <Text style={{fontSize: 12}} >{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ',' + item.date }</Text>
            </View>
        )
    }

    return(
        <Card title='Comments'>
            <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}


class Dishdetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rating :3,
            author : '',
            comment : '',
            showModal:false
        }
    }

    makeFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    
    toggleModal() {
        this.setState({ showModal : !this.state.showModal})
    }

    // ***Task 2***
    handleComment(dishId) {

        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment)
        console.log(dishId,this.state.rating,this.state.author,this.state.comment)
        this.resetForm()
        
    }
    resetForm() {
        this.setState ({
            rating :null,
            author : '',
            comment : '',
            showModal:false
        })
    }

    render () {
        const dishId = this.props.route.params.dishId;

        return (
            <ScrollView>
                <RenderDish  dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)}
                fav={()=> this.makeFavorite(dishId)}
                onPress={() => this.toggleModal()}
                
                />
                <RenderComments  comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
                />

            {/* ***Task 1*** */}
            <Modal animationType={'slide'}
                transparent={false}
                visible = {this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()}
            
            >
                <View style={styles.modal} >
                    <Rating showRating ratingCount={5} 
                    startingValue={1}
                    onFinishRating={(rating) => this.setState({rating : rating})}
                    />
                    <View style={styles.modalInput}>
                        <Icon name='face' size={24} /><Input  placeholder="author" onChangeText={(text) => this.setState({author : text})}/>
                    </View>
                    <View style={styles.modalInput}>
                        <Icon name='create' size={24} /><Input  placeholder='Add comment...' onChangeText={(text) => this.setState({comment : text})}/>
                    </View>
                    
                    <View style={styles.modalButton}>
                        <Button onPress={() => {this.handleComment(dishId); this.toggleModal()}} title="Submit" color="#512DA8" />
                    </View>
                    <View style={styles.modalButton}>
                        <Button onPress={() => this.toggleModal()} title="Close" color="gray" />
                    </View>
                </View>

            </Modal>
    
            </ScrollView>
        )
    }
   
}

const styles= StyleSheet.create({
    modal:{
        fontSize : 18 , 
        margin: 10, 
         flex:2
    },
    iconView : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    modalInput : {
        flexDirection : 'row'
    },
    modalButton : {
        marginVertical : 5
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);
