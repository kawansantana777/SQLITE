import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Linking
} from 'react-native';

import {
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';

import { bd } from '../database/Banco';

export default function ListaContatos({
  aoNavegar,
  setContatoSelecionado
}) {

  const [contatos, setContatos] = useState([]);

  const carregarContatos = () => {
    try {
      const dados = bd.getAllSync(
        'SELECT * FROM contatos ORDER BY nomeCompleto ASC'
      ) || [];

      setContatos(dados);

    } catch (e) {
      console.log(e);
      setContatos([]);
    }
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  const excluirContato = (id) => {
    Alert.alert(
      'Excluir',
      'Deseja remover?',
      [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: () => {
            try {
              bd.runSync('DELETE FROM contatos WHERE id = ?', [id]);
              carregarContatos();
            } catch (e) {
              console.log(e);
            }
          }
        }
      ]
    );
  };

  // ✅ ABRIR WHATSAPP
  const abrirWhatsApp = (telefone) => {
    if (!telefone) return;

    const numero = telefone.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/55${numero}`);
  };

  // ✅ ABRIR EMAIL
  const abrirEmail = (email) => {
    if (!email) return;

    Linking.openURL(`mailto:${email}`);
  };

  const renderItem = ({ item }) => {
    if (!item) return null;

    return (
      <View style={estilos.item}>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setContatoSelecionado(item);
            aoNavegar('detalhes');
          }}
        >
          <Text style={estilos.nome}>
            {item.nomeCompleto || 'Sem nome'}
          </Text>

          <Text style={estilos.sub}>
            {item.telefone || ''} | {item.email || ''}
          </Text>
        </TouchableOpacity>

        <View style={estilos.acoes}>

          {/* WhatsApp */}
          <TouchableOpacity onPress={() => abrirWhatsApp(item.telefone)}>
            <FontAwesome5 name="whatsapp" size={20} color="green" />
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity onPress={() => abrirEmail(item.email)}>
            <MaterialCommunityIcons name="email" size={22} color="#007bff" />
          </TouchableOpacity>

          {/* Editar */}
          <TouchableOpacity
            onPress={() => {
              setContatoSelecionado(item);
              aoNavegar('editar');
            }}
          >
            <FontAwesome5 name="pen" size={18} color="#007bff" />
          </TouchableOpacity>

          {/* Excluir */}
          <TouchableOpacity onPress={() => excluirContato(item.id)}>
            <MaterialCommunityIcons name="trash-can" size={22} color="red" />
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  return (
    <View style={estilos.container}>

      <Text style={estilos.titulo}>
        Meus Contatos
      </Text>

      <FlatList
        data={contatos}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : String(index)
        }
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Voltar"
          onPress={() => aoNavegar('inicio')}
        />
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center'
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold'
  },

  sub: {
    fontSize: 12,
    color: '#666'
  },

  acoes: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  }
});