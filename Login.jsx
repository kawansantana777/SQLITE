import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

import { bd } from '../database/Banco';

export default function Login({ aoNavegar }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [estaBloqueado, setEstaBloqueado] = useState(false);

  useEffect(() => {

    if (tentativas >= 3) {

      setEstaBloqueado(true);

      const timer = setTimeout(() => {

        setTentativas(0);
        setEstaBloqueado(false);

      }, 15000);

      return () => clearTimeout(timer);
    }

  }, [tentativas]);

  const tentarConectar = () => {

    if (estaBloqueado) {

      Alert.alert(
        'Acesso Bloqueado',
        'Tente novamente depois.'
      );

      return;
    }

    try {

      const busca = bd.getFirstSync(
        'SELECT * FROM usuarios WHERE login = ? AND senha = ?',
        [usuario, senha]
      );

      if (busca) {

        console.log(busca.id);

        setTentativas(0);

        Alert.alert(
          'Sucesso',
          `Bem-vindo ${busca.nome}`
        );

        aoNavegar('inicio');

      } else {

        setTentativas(t => t + 1);

        Alert.alert(
          'Erro',
          'Login ou senha incorretos.'
        );
      }

    } catch (erro) {

      console.log(erro);

      Alert.alert(
        'Erro',
        'Erro ao fazer login'
      );
    }
  };

  return (

    <View style={estilos.container}>

      <Text style={estilos.titulo}>
        Sistema de Contatos
      </Text>

      <TextInput
        placeholder="Usuário"
        style={estilos.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={estilos.input}
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title="Conectar"
        onPress={tentarConectar}
        disabled={estaBloqueado}
      />

      <TouchableOpacity
        onPress={() => aoNavegar('esqueciSenha')}
      >
        <Text style={estilos.link}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => aoNavegar('cadastro')}
      >
        <Text style={estilos.link}>
          Se cadastrar
        </Text>
      </TouchableOpacity>

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

  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 15,
  },
});