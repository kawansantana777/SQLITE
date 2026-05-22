import * as SQLite from 'expo-sqlite';

export const bd = SQLite.openDatabaseSync('banco_v4.db');

export function inicializarBanco() {

  try {

    bd.execSync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        login TEXT,
        senha TEXT
      );
    `);

    bd.execSync(`
      CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        telefone TEXT,
        email TEXT,
        cep TEXT,
        endereco TEXT,
        bairro TEXT,
        cidade TEXT,
        uf TEXT
      );
    `);

    console.log('Banco inicializado');

  } catch (erro) {
    console.log('Erro banco:', erro);
  }
}