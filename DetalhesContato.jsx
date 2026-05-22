import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import * as Linking from 'expo-linking';

import {
  FontAwesome,
  MaterialIcons,
  Ionicons
} from '@expo/vector-icons';

export default function DetalhesContato({ contato, aoNavegar }) {

  if (!contato) {
    return (
      <View style={estilos.conteudo}>
        <Text>Nenhum contato selecionado.</Text>

        <Button
          title="Voltar"
          onPress={() => aoNavegar('lista')}
        />
      </View>
    );
  }

  const abrirLigacao = () =>
    Linking.openURL(`tel:${contato.celular}`);

  const abrirSMS = () =>
    Linking.openURL(`sms:${contato.celular}`);

  const abrirEmail = () =>
    Linking.openURL(`mailto:${contato.email}`);

  const abrirWhatsApp = () => {

    const celularLimpo =
      contato.celular.replace(/\D/g, '');

    const url =
      `whatsapp://send?phone=55${celularLimpo}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        'Erro',
        'WhatsApp não encontrado'
      );
    });
  };

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
    >

      <Text style={estilos.titulo}>
        Detalhes do Contato
      </Text>

      <View style={estilos.cartao}>

        <Text style={estilos.label}>
          Nome Completo:
        </Text>

        <Text style={estilos.infoNome}>
          {contato.nomeCompleto}
        </Text>

        <Text style={estilos.label}>
          E-mail:
        </Text>

        <View style={estilos.linhaAcao}>

          <View style={estilos.containerTexto}>
            <Text
              style={estilos.info}
              numberOfLines={1}
            >
              {contato.email}
            </Text>
          </View>

          <TouchableOpacity
            onPress={abrirEmail}
            style={estilos.botaoIcone}
          >
            <MaterialIcons
              name="email"
              size={28}
              color="#dc3545"
            />
          </TouchableOpacity>

        </View>

        <Text style={estilos.label}>
          Celular:
        </Text>

        <View style={estilos.linhaAcao}>

          <View style={estilos.containerTexto}>
            <Text style={estilos.info}>
              {contato.celular}
            </Text>
          </View>

          <View style={estilos.grupoIcones}>

            <TouchableOpacity
              onPress={abrirLigacao}
              style={estilos.botaoIcone}
            >
              <Ionicons
                name="call"
                size={28}
                color="#28a745"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={abrirWhatsApp}
              style={estilos.botaoIcone}
            >
              <FontAwesome
                name="whatsapp"
                size={30}
                color="#25D366"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={abrirSMS}
              style={estilos.botaoIcone}
            >
              <MaterialIcons
                name="chat"
                size={28}
                color="#007bff"
              />
            </TouchableOpacity>

          </View>

        </View>

        <Text style={estilos.label}>
          Localização:
        </Text>

        <Text style={estilos.infoEndereco}>
          {`${contato.endereco}, ${contato.numero}
${contato.bairro}
${contato.cidade} - ${contato.uf}
CEP: ${contato.cep}`}
        </Text>

      </View>

      <View style={estilos.areaBotao}>
        <Button
          title="Voltar para Lista"
          color="#666"
          onPress={() => aoNavegar('lista')}
        />
      </View>

    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },

  conteudo: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333'
  },

  cartao: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 5
  },

  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 15,
    fontWeight: 'bold'
  },

  infoNome: {
    fontSize: 20,
    color: '#222',
    fontWeight: '600',
    marginBottom: 5
  },

  info: {
    fontSize: 16,
    color: '#444'
  },

  infoEndereco: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 5
  },

  linhaAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10,
    width: '100%'
  },

  containerTexto: {
    flex: 1,
    marginRight: 10
  },

  grupoIcones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },

  botaoIcone: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginLeft: 5
  },

  areaBotao: {
    marginTop: 30
  }
});