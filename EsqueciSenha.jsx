import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';

import { bd } from '../database/Banco';

export default function EsqueciSenha({ aoNavegar }) {

  const [login, setLogin] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const redefinirSenha = () => {

    try {

      const usuario = bd.getFirstSync(
        'SELECT * FROM usuarios WHERE login = ?',
        [login]
      );

      if (!usuario) {

        Alert.alert(
          'Erro',
          'Usuário não encontrado'
        );

        return;
      }

      bd.runSync(
        'UPDATE usuarios SET senha = ? WHERE id = ?',
        [novaSenha, usuario.id]
      );

      Alert.alert(
        'Sucesso',
        'Senha redefinida'
      );

      aoNavegar('login');

    } catch (erro) {

      console.log(erro);

      Alert.alert(
        'Erro',
        'Erro ao redefinir senha'
      );
    }
  };

  return (

    <View style={estilos.container}>

      <Text style={estilos.titulo}>
        Redefinir Senha
      </Text>

      <TextInput
        placeholder="Login"
        style={estilos.input}
        value={login}
        onChangeText={setLogin}
      />

      <TextInput
        placeholder="Nova Senha"
        secureTextEntry
        style={estilos.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <Button
        title="Redefinir"
        onPress={redefinirSenha}
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