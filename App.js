import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { inicializarBanco } from './src/database/Banco';

import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import EsqueciSenha from './src/screens/EsqueciSenha';
import CadastroContato from './src/screens/CadastroContato';
import ListaContatos from './src/screens/ListaContatos';
import DetalhesContato from './src/screens/DetalhesContato';
import EditarContato from './src/screens/EditarContato';

export default function App() {

  const [telaAtual, setTelaAtual] = useState('login');
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  useEffect(() => {

    inicializarBanco();

  }, []);

  const renderizarTela = () => {

    switch (telaAtual) {

      case 'login':
        return <Login aoNavegar={setTelaAtual} />;

      case 'cadastro':
        return <Cadastro aoNavegar={setTelaAtual} />;

      case 'esqueciSenha':
        return <EsqueciSenha aoNavegar={setTelaAtual} />;

      case 'cadastroContato':
        return <CadastroContato aoNavegar={setTelaAtual} />;

      case 'lista':
        return (
          <ListaContatos
            aoNavegar={setTelaAtual}
            setContatoSelecionado={setContatoSelecionado}
          />
        );

      case 'detalhes':
        return (
          <DetalhesContato
            contato={contatoSelecionado}
            aoNavegar={setTelaAtual}
          />
        );

      case 'editar':
        return (
          <EditarContato
            contato={contatoSelecionado}
            aoNavegar={setTelaAtual}
          />
        );

      case 'inicio':
        return (

          <View style={estilos.inicio}>

            <Text style={estilos.boasVindas}>
              Sistema de Contatos
            </Text>

            <Button
              title="Ver Lista de Contatos"
              onPress={() => setTelaAtual('lista')}
            />

            <View style={{ height: 10 }} />

            <Button
              title="Novo Contato"
              color="green"
              onPress={() => setTelaAtual('cadastroContato')}
            />

            <View style={{ height: 20 }} />

            <Button
              title="Sair"
              color="red"
              onPress={() => {
                setContatoSelecionado(null);
                setTelaAtual('login');
              }}
            />

          </View>
        );

      default:
        return <Login aoNavegar={setTelaAtual} />;
    }
  };

  return renderizarTela();
}

const estilos = StyleSheet.create({

  inicio: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },

  boasVindas: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
});