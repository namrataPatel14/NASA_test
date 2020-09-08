import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Container, Content, Body, CardItem,Card } from 'native-base';
class List extends Component{
  constructor(props){
      super(props);
      this.state={
          isLoading:false
      }
  }
  render(){
    const astroidDataUpdated = this.props.route.params.astroidDetail;
    console.log(astroidDataUpdated , "astroidDataUpdated");
      return(
          <View style={styles.cardItem}>
              
                         <Text style={{fontSize:16}}><Text style={{fontWeight:'bold'}}>Name:</Text>{" "}{astroidDataUpdated.name}</Text>
                         <Text style={{fontSize:16}}><Text style={{fontWeight:'bold'}}>Nasa_jpl_url:</Text>{" "}{astroidDataUpdated.nasa_jpl_url}</Text>
                         <Text style={{fontSize:16}}><Text style={{fontWeight:'bold'}}>Is_potentially_hazardous_asteroid:</Text>{" "}{astroidDataUpdated.is_potentially_hazardous_asteroid.toString()}</Text>
                      
                  
          </View>
      )
  }
}
export default List;
const styles = StyleSheet.create({
    cardItem:{
        borderWidth:1,
        borderColor:"#ccc",
        padding:15,
        margin:15
    }
})