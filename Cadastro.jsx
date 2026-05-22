import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import { bd } from '../database/Banco';

export default function Cadastro({ aoNavegar }) {

  const [form, setForm] = useState({
    nome: '',
    login: '',
    senha: ''
  });

  const cadastrar = () => {

    if (
      !form.nome ||
      !form.login ||
      !form.senha
    ) {

      Alert.alert(
        'Erro',
        'Preencha todos os campos'
      );

      return;
    }

    try {

      bd.runSync(
        'INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)',
        [form.nome, form.login, form.senha]
      );

      Alert.alert(
        'Sucesso',
        'Usuário cadastrado'
      );

      aoNavegar('login');

    } catch (erro) {

      console.log(erro);

      Alert.alert(
        'Erro',
        'Erro ao cadastrar'
      );
    }
  };

  return (

    <View style={estilos.container}>

      <Text style={estilos.titulo}>
        Cadastro
      </Text>

      <TextInput
        placeholder="Nome"
        style={estilos.input}
        onChangeText={(texto) =>
          setForm({ ...form, nome: texto })
        }
      />

      <TextInput
        placeholder="Login"
        style={estilos.input}
        onChangeText={(texto) =>
          setForm({ ...form, login: texto })
        }
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={estilos.input}
        onChangeText={(texto) =>
          setForm({ ...form, senha: texto })
        }
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Voltar"
        onPress={() => aoNavegar('login')}
      />

    </View>
  );
}

const estilos = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});