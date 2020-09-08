import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Body, Input, Button} from 'native-base';




class Home extends Component{
  constructor(props){
      super(props);
      this.state={
          isLoading:false,
          astroidId:'',
          astroidIdList:[],
          astroidData:[]
      }
  }
  astroidInput=(input)=>{
    this.setState({astroidId:input});
  }
  
  async getId(id){
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=qzR9oSCAAaQsXUcAXMQzZZORQ5KCK7hI2k6Tj5HK`)
    .then((response)=> response.json())
    .then((Json) => {
        this.setState({
            astroidData: Json,
           isLoading:false
        })
        this.props.navigation.navigate("List" , {astroidDetail:this.state.astroidData})
    })
    .catch((error)=>{
       alert('Data not Found');
       console.log(error);
    })
  }
getAstroidId=()=>{
      this.setState({isLoading:true});
     return fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=qzR9oSCAAaQsXUcAXMQzZZORQ5KCK7hI2k6Tj5HK')
     .then((response)=> response.json())
     .then((Json) => {
         this.setState({
            astroidIdList: Json.near_earth_objects,
            isLoading:false
         })
     })
     .catch((error)=>{
        alert('Data not Found');
        console.log(error , "error");
     })
     
  }
  renderItem=(data)=>{
      return(
          <TouchableOpacity style={styles.listContent} onPress={()=>this.getId(data.item.id)}>
              <Text style={styles.listContentText}>{data.item.id}</Text>
          </TouchableOpacity>
      )
  }
  render(){
      
      return(
          
              <View style={styles.pageContent}>
                     <TextInput 
                     placeholder="Enter Astroid Id"
                     borderBottomColor="#000"
                     onChangeText={this.astroidInput}/> 
                    <Button block={true} disabled={this.state.astroidId == "" ? true : false} 
                    onPress={()=>this.getId(this.state.astroidId)}>
                        <Text style={styles.submitText}>
                            Submit
                        </Text>
                    </Button>
                    <View style={styles.space}></View>
                    <Button block onPress={()=>this.getAstroidId()}>
                        <Text style={styles.submitText}>
                            Random Astroid ID
                        </Text>
                    </Button>
                    
              
              <View style={styles.listBox}>
                
                <FlatList 
                    data={this.state.astroidIdList}
                    renderItem={item => this.renderItem(item)}
                />
              </View>
              </View>
      )
  }
}
export default Home;
const styles = StyleSheet.create({
    submitText:{
        color:"#fff",
        fontSize:18,
        fontWeight:'bold'
    },
    space:{
        padding:10
    },
    listBox:{
        paddingHorizontal:20,
        height:440,
        paddingVertical:20
    },
    listContent:{
       padding:10,
       borderBottomWidth:1,
       borderBottomColor:"#ccc"
    },
    listContentText:{
        fontSize:16
    },
    pageContent:{
        padding:20
    }
});