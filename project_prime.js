const rlc = require('readline-sync');

class Usar {
  constructor(name, age, DataReg) {
    this.name = name;
    this.age = age;
    this.DataReg = DataReg;
  }
}

class TableUser {
  constructor() {
    this.Usar = [];
  }

  newPlayer(name, age, DataReg) {
    let ADD = new Usar(name, age, DataReg);
    this.Usar.push(ADD);
    return ADD;
  }
}
class ModelsADIVERSOS
{
 PulaLinha(numero){for(var i = 0; i < numero; i++)console.log("-------");}
}

const Outras = new ModelsADIVERSOS();

const instancia = new TableUser(); // persistente

function Navegate(Num) {
  switch (Num) {
    case "0": LerTbela(); break;
    case "1": AddUserArray(); break;
    case "2": DropUser(); break;
    case "3": NewUser(); break;
    case "4": WriteListPackage(); break;
    case "6": return;
    default: console.log("Opção inválida");
  }
}

function LerTbela() {
  console.log("Usuários cadastrados:");
  console.table(instancia.Usar);
}

function AddUserArray() {
  const objeto1 = { name: "Alice", age: 20, DataReg: "10/12/2004" };
  instancia.newPlayer(objeto1.name, objeto1.age, objeto1.DataReg);
  console.log("Usuário adicionado.");
}

function DropUser() {
  const index = rlc.questionInt("Digite o índice do usuário a remover: ");
  if (index >= 0 && index < instancia.Usar.length) {
    instancia.Usar.splice(index, 1);
    console.log("Usuário removido.");
  } else {
    console.log("Índice inválido.");
  }
}

function NewUser() {
  const name = rlc.question("Nome: ");
  const age = rlc.questionInt("Idade: ");
  const DataReg = rlc.question("Data de registro: ");
  instancia.newPlayer(name, age, DataReg);
  console.log("Novo usuário criado.");
}

function WriteListPackage() {
  console.log("Exportando lista...");
  console.log(JSON.stringify(instancia.Usar, null, 2));
}

const Num = rlc.question("O que vc gostaria de fazer? ");
Navegate(Num);
