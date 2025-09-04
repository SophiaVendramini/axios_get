import React, {useEffect, useState} from "react"
import{View, Text, ScrollView,StyleSheet, Button} from "react-native";
import api from './src/devices/api';

//declaração do componente principal da aplicação "App"
export default function App(){
  //users e setUsers são as variaveis e as funções de atualização respectivamente
  const [users, setUsers] = useState([]);

  const API = "http://10.110.12.39:3000/users"

  async function fetchUsers (){
    try{
      const response = await api.get(API)

      setUsers(response.data);
    }catch(error){
      // se ocorrer erro (ex: falha de conexão), exibe no console
      console.error("Error GET:", error.message);
    }
  };
  useEffect(()=> {
    fetchUsers ();
  },[])

  const _render = () => {
      const vet = [];

      users.map((item, index)=>{
        vet.push(
          <View key={index}>
          <Text style={styles.item}>ID: {item.id} Nome: {item.name} Email: {item.email}</Text>
          </View>
        )
      })
      return vet;
  }
  return(
    <View style = {styles.container}>
      <Text style={styles.title}>GET - Listar usuários</Text>
      <Button title = "Recarregar Lista" onPress={fetchUsers}/>
      <ScrollView>
        {_render()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {flex: 1, padding: 20, marginTop: 40},
  title: {fontSize: 22, fontWeight: "bold", marginBottom:10},
  item: {fontSize: 12, marginTop: 10}
})
