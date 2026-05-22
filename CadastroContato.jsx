import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { bd } from '../database/Banco';

export default function CadastroContato({ aoNavegar }) {

  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: ''
  });

  const buscarCep = async (cep) => {

    if (cep.length < 8) return;

    try {

      const res = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      const data = await res.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        return;
      }

      setForm({
        ...form,
        cep,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      });

    } catch (e) {
      console.log(e);
    }
  };

  const salvar = () => {

    try {

      bd.runSync(
        `INSERT INTO contatos
        (nome, telefone, email, cep, endereco, bairro, cidade, uf)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          form.nome,
          form.telefone,
          form.email,
          form.cep,
          form.endereco,
          form.bairro,
          form.cidade,
          form.uf
        ]
      );

      Alert.alert('Sucesso', 'Contato salvo');

      aoNavegar('lista');

    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Falha ao salvar');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Novo Contato</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, nome: t })}
      />

      <TextInput
        placeholder="Telefone"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, telefone: t })}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, email: t })}
      />

      {/* CEP */}
      <TextInput
        placeholder="CEP"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(t) => {
          setForm({ ...form, cep: t });
          if (t.length === 8) buscarCep(t);
        }}
      />

      <TextInput
        placeholder="Endereço"
        style={styles.input}
        value={form.endereco}
        onChangeText={(t) => setForm({ ...form, endereco: t })}
      />

      <TextInput
        placeholder="Bairro"
        style={styles.input}
        value={form.bairro}
        onChangeText={(t) => setForm({ ...form, bairro: t })}
      />

      <TextInput
        placeholder="Cidade"
        style={styles.input}
        value={form.cidade}
        onChangeText={(t) => setForm({ ...form, cidade: t })}
      />

      <TextInput
        placeholder="UF"
        style={styles.input}
        value={form.uf}
        onChangeText={(t) => setForm({ ...form, uf: t })}
      />

      <Button title="Salvar" onPress={salvar} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  titulo: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  }
});