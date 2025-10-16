const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const moment = require('moment');

const STORAGE_PATH = './storage/lista_storage.json';
const COLETOR_DIR = './storage/coletor';

if (!fs.existsSync(COLETOR_DIR)) fs.mkdirSync(COLETOR_DIR, { recursive: true });

let sair = false;

function menu() {
  console.clear();
  console.log(`📅 ${moment().format("DD/MM/YYYY HH:mm")}`);
  console.log("\n=== MENU ===");
  console.log("0 - Ver tabela geral");
  console.log("1 - Ver formulário de um funcionário");
  console.log("2 - Adicionar novo funcionário");
  console.log("3 - Ver dados específicos");
  console.log("4 - Sair");
}

function lerJSON(caminho) {
  try {
    const data = fs.readFileSync(caminho, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function salvarJSON(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf8');
}

function listarTabela() {
  const lista = lerJSON(STORAGE_PATH);
  if (lista.length === 0) return console.log("📂 Nenhum registro encontrado.");
  console.log("\n📋 Lista de arquivos:");
  lista.forEach((item, i) => console.log(`${i} - ${item.Local}`));
}

function adicionarFuncionario() {
  const nome = readline.question("Nome: ");
  const idade = readline.questionInt("Idade: ");
  const arquivo = path.join(COLETOR_DIR, `${nome}-${idade}.json`);
  const dados = {
    nome,
    idade,
    data: moment().format("DD/MM/YYYY HH:mm"),
    local: arquivo
  };

  salvarJSON(arquivo, [dados]);

  let lista = lerJSON(STORAGE_PATH);
  if (!Array.isArray(lista)) lista = [lista];
  lista.push({ Local: arquivo });
  salvarJSON(STORAGE_PATH, lista);

  console.log("✅ Funcionário adicionado com sucesso.");
}

function verFormulario() {
  const lista = lerJSON(STORAGE_PATH);
  if (lista.length === 0) return console.log("Nenhum formulário disponível.");
  const index = readline.questionInt("Número do formulário: ");
  const item = lista[index];
  if (!item || !fs.existsSync(item.Local)) return console.log("❌ Formulário não encontrado.");
  const dados = lerJSON(item.Local);
  console.log("\n📄 Dados do formulário:");
  console.log(dados);
}

function verDadosEspecificos() {
  const lista = lerJSON(STORAGE_PATH);
  const index = readline.questionInt("Número do formulário: ");
  const item = lista[index];
  if (!item || !fs.existsSync(item.Local)) return console.log("❌ Arquivo não encontrado.");
  const dados = lerJSON(item.Local);
  console.log("\n🔍 Dados específicos:");
  dados.forEach(d => console.log(`Nome: ${d.nome}, Idade: ${d.idade}, Data: ${d.data}`));
}

while (!sair) {
  menu();
  const opcao = readline.question("\nEscolha uma opção: ");
  console.clear();

  switch (opcao) {
    case "0": listarTabela(); break;
    case "1": verFormulario(); break;
    case "2": adicionarFuncionario(); break;
    case "3": verDadosEspecificos(); break;
    case "4": sair = true; break;
    default: console.log("❗ Opção inválida.");
  }

  if (!sair) readline.question("\nPressione ENTER para continuar...");
}
