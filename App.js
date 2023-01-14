import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, SafeAreaView, Image } from 'react-native';

export default function App() {
  const [alcool, setAlcool] = useState(0);
  const [gasolina, setGasolina] = useState(0);
  const [melhor, setMelhor] = useState();

  const [visibleModal, setVisibleModal] = useState(false);

  function calcular() {
    if(alcool === 0 || gasolina === 0) {
      alert('Preencha todos os campos')
      return;
    }

    let calc = alcool/gasolina;

    if(calc < 0.7)
      setMelhor('Álcool');
    else
      setMelhor('Gasolina');

    setVisibleModal(true);
  }

  function zerar() {
    setAlcool(0);
    setGasolina(0);
    setMelhor('');
    setVisibleModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="hidden" />
      <View style={styles.home}>
        
        <View style={styles.imgArea} >
          <Image 
            source={require('./src/logo.png')}
            style={styles.img}
          />

          <Text style={styles.pergunta}>Qual a melhor opção?</Text>
        </View>

        <View style={styles.inputControl}>
          <Text style={styles.labels}>Álcool (preço por litro)</Text>
          <TextInput
            style={styles.inputs}
            value={alcool}
            placeholder='Preço do Álcool'
            onChangeText={ (texto)=> setAlcool(texto) }
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputControl}>
          <Text style={styles.labels}>Gasolina (preço por litro)</Text>
          <TextInput
            style={styles.inputs}
            value={gasolina}
            placeholder='Preço da Gasolina'
            onChangeText={ (texto)=> setGasolina(texto) }
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity style={styles.btnCalc} onPress={ calcular } >
          <Text style={styles.textBtnCalc}>Calcular</Text>
        </TouchableOpacity>

        {
          melhor !== '' && (
            <Modal transparent={false} animationType="slide" visible={visibleModal}>
              <SafeAreaView style={styles.container}>
                <StatusBar style="hidden" />
                <View style={styles.home}>
          
                  <View style={[styles.imgArea, {marginBottom: 25}]} >
                    <Image 
                      source={require('./src/gas.png')}
                      style={styles.img}
                    />
                    <Text style={styles.resposta}>Compensa usar {melhor} </Text>
                  </View>

                  <View style={styles.precosControl}>
                    <Text style={styles.precos}>Com os preços:</Text>
                    <Text style={styles.precosTipos}>Álcool: R$ {alcool}</Text>
                    <Text style={styles.precosTipos}>Gasolina: R$ {gasolina}</Text>
                  </View>

                  <TouchableOpacity style={styles.btnReset} onPress={ zerar } >
                    <Text style={styles.textBtnReset}>Calcular Novamente</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
          )
        }

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  home: {
    flex: 1,
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  imgArea: {
    marginTop: 100,
    marginBottom: 100,
    alignItems: 'center'
  },
  img: {
    width: 150,
    height: 150,
  },
  pergunta: {
    marginTop: 25,
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: 'bold'
  },
  inputControl: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  labels: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  inputs: {
    width: '100%',
    padding: 8,
    backgroundColor: '#FAFAFA',
    fontSize: 17,
    fontWeight: '600',
    borderRadius: 5
  },
  btnCalc: {
    marginRight: 15,
    marginLeft: 15,
    width: '100%',
    backgroundColor: '#FF0043',
    padding: 15,
    borderRadius: 5

  },
  textBtnCalc: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  resposta: {
    marginTop: 25,
    color: '#30ef5a',
    fontSize: 25,
    fontWeight: 'bold'
  },
  precosControl: {
    alignItems: 'center'
  },
  precos: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FAFAFA',
    marginBottom: 15
  },
  precosTipos: {
    fontSize: 15,
    color: '#FAFAFA',
    marginBottom: 5
  },
  btnReset: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FF0043',
    borderRadius: 5,
    padding: 5,
    margin: 15,
    width: '75%',
  },
  textBtnReset: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FF0043'
  }
});
