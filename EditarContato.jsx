import React, { useState, useEffect } from 'react';
import {
  View,
 Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import { bd } from '../database/Banco';

export default function EditarContato({ contato, aoNavegar }) {

  const [form, setForm] = useState({
    id: '',
    nome: '',
    celular: '',
    email: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: ''
  });

  useEffect(() => {

    if (!contato) return;

    setForm({
      id: contato.id || '',
      nome: contato.nomeCompleto || '',
      celular: contato.celular || '',
      email: contato.email || '',
      cep: contato.cep || '',
      endereco: contato.endereco || '',
      bairro: contato.bairro || '',
      cidade: contato.cidade || '',
      uf: contato.uf || '',
      numero: contato.numero || '',
      complemento: contato.complemento || ''
    });

  }, [contato]);

  if (!contato) {
    return (
      <View style={estilos.container}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Nenhum contato selecionado
        </Text>

        <Button
          title="Voltar"
          onPress={() => aoNavegar('lista')}
        />
      </View>
    );
  }

  const buscarCEP = async (cepInformado) => {

    const valorLimpo = cepInformado.replace(/\D/g, '');

    setForm(prev => ({
      ...prev,
      cep: valorLimpo
    }));

    if (valorLimpo.length === 8) {

      try {

        const resposta = await fetch(
          `https://viacep.com.br/ws/${valorLimpo}/json/`
        );

        const dados = await resposta.json();

        if (!dados.erro) {

          setForm(prev => ({
            ...prev,
            endereco: dados.logradouro || '',
            bairro: dados.bairro || '',
            cidade: dados.localidade || '',
            uf: dados.uf || ''
          }));

        } else {

          Alert.alert('Erro', 'CEP não encontrado');

        }

      } catch (error) {

        Alert.alert('Erro', 'Falha ao buscar CEP');

      }
    }
  };

  const salvarAlteracoes = () => {

    try {

      bd.runSync(
        `
        UPDATE contatos SET
          nomeCompleto = ?,
          celular = ?,
          email = ?,
          cep = ?,
          endereco = ?,
          bairro = ?,
          cidade = ?,
          uf = ?,
          numero = ?,
          complemento = ?
        WHERE id = ?
        `,
        [
          form.nome,
          form.celular,
          form.email,
          form.cep,
          form.endereco,
          form.bairro,
          form.cidade,
          form.uf,
          form.numero,
          form.complemento,
          form.id
        ]
      );

      Alert.alert('Sucesso', 'Contato atualizado');

      aoNavegar('lista');

    } catch (e) {

      console.log(e);

      Alert.alert('Erro', 'Falha ao atualizar');

    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.container}>

      <Text style={estilos.titulo}>
        Editar Contato
      </Text>

      <TextInput
        placeholder="Nome"
        value={form.nome}
        style={estilos.input}
        onChangeText={(t) =>
          setForm({ ...form, nome: t })
        }
      />

      <TextInput
        placeholder="Celular"
        value={form.celular}
        style={estilos.input}
        keyboardType="phone-pad"
        onChangeText={(t) =>
          setForm({ ...form, celular: t })
        }
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        style={estilos.input}
        keyboardType="email-address"
        onChangeText={(t) =>
          setForm({ ...form, email: t })
        }
      />

      <TextInput
        placeholder="CEP"
        value={form.cep}
        style={estilos.input}
        keyboardType="numeric"
        maxLength={8}
        onChangeText={buscarCEP}
      />

      <TextInput
        placeholder="Endereço"
        value={form.endereco}
        style={estilos.input}
        editable={false}
      />

      <TextInput
        placeholder="Bairro"
        value={form.bairro}
        style={estilos.input}
        editable={false}
      />

      <TextInput
        placeholder="Cidade"
        value={form.cidade}
        style={estilos.input}
        editable={false}
      />

      <TextInput
        placeholder="UF"
        value={form.uf}
        style={estilos.input}
        editable={false}
      />

      <TextInput
        placeholder="Número"
        value={form.numero}
        style={estilos.input}
        onChangeText={(t) =>
          setForm({ ...form, numero: t })
        }
      />

      <TextInput
        placeholder="Complemento"
        value={form.complemento}
        style={estilos.input}
        onChangeText={(t) =>
          setForm({ ...form, complemento: t })
        }
      />

      <Button
        title="Salvar"
        onPress={salvarAlteracoes}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Cancelar"
          color="red"
          onPress={() => aoNavegar('lista')}
        />
      </View>

    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff'
  }
});