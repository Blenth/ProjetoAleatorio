const moment = require("moment");
const time = moment().format("DD/MM/YYYY HH:MM");
console.log(time);
var coletor =[];
const rlc = require('readline-sync');
var sair = "0";
var list = {};

while(sair == "0")
{
  [" 0 : ver tabela geral "," 1 : formulario de um funcionario "," 2 : adicionar alguen? "," 3 : dados especifico ", "4 : return"].forEach(dado =>{ console.log(dado);});
  //rlc.question("O que vc gostaria de faze?");
  //rlc.question('digite seu nome: ')
  //rlc.question('digite sua idade: ')
  var Ação = rlc.question("O que vc gostaria de faze?");;
  switch(Ação)
  {
    case "0" : Vertabela("./lista_storage.json");  break;
    case "1" : dhas('./lista_storage.json', rlc.question('numero formulario de do Client?: ')); break;
    case "2" : Manage(rlc.question('digite seu nome: '), rlc.question('digite sua idade: ')); break;
    case "3" : Read("./lista_storage.json", rlc.question('numero formulario de do Client?: '));  break;
    case "4" : return;
  }
  sair = rlc.question('Quer sair?,  0 => fica , 1 => sair: ');
}

//rlc.question('Quer sair? 0 fica 1 sair: ')

function Vertabela(local)
{
  try{
  const dadoss = require("./Dados.json");
  if(dadoss.Local != '')
    {
      
      PulaLinha(2);
      switch(dadoss.constructor.name)
      {
      case "Object": console.log("0 " + dadoss.Local); break;
      case "Array": var i = 0;dadoss.forEach(dado =>{ console.log(i +' '+ dado.Local); i++}); break;
      default: console.log("Tipo nao reconhecido"); break;
      }
      PulaLinha(2);
    }
  else console.log("pasta vazia!!");}
  catch(es){console.log("PASTA VAZIA :   (" + es + ")")}
}
 function Create(arquivo,jsonContent,LocalStorage)
{
  
  const fsd = require('fs');
  const { strict } = require("assert"); 
  
   fsd.writeFile(arquivo, jsonContent, 'utf8', (err) => 
  {
    if (err)console.error('Ocorreu um erro ao gravar o arquivo JSON:', err);
    console.log('O arquivo JSON foi criado e gravado com sucesso. ' + arquivo);
  });
  var Collect;
  
  try { const Data = require(LocalStorage); Collect = Data;}
  catch(ex)   
  {
    const fast = JSON.stringify({"Local" : arquivo}, null, 2);
    fsd.writeFile(LocalStorage,fast, "utf8", (err) =>{console.error('Ocorreu um erro ao gravar o arquivo JSON:', err)})
    console.log("arquivo vasia, sendo carregada");
    return;
  } 

  if( Collect != ''){
  switch(Collect.constructor.name)
  {
    case "Object": 
    {
      const fast = JSON.stringify([{"Local" : Collect.Local},{"Local": arquivo}], null, 2);
      fsd.writeFile(LocalStorage,fast, "utf8", (err) =>{console.error('Ocorreu um erro ao gravar o arquivo JSON:', err)})
    break;
    }
    case "Array":
    {
      const novo = Collect.concat({"Local": arquivo});
      console.log(novo);
      fsd.writeFile(LocalStorage,JSON.stringify(novo, null, 1), "utf8", (err) =>{console.error('Ocorreu um erro ao gravar o arquivo JSON:', err)})
    break;
    }
  }}
  else
  {
    const fast = JSON.stringify({"Local" : arquivo}, null, 2);
    fsd.writeFile(LocalStorage,fast, "utf8", (err) =>{console.error('Ocorreu um erro ao gravar o arquivo JSON:', err)})
     console.log("arquivo vasio, sendo carregada");
    }
}


function ApgarElemento(valor)
{
  jQuery('./lista_storage.json').each(function (index){
    if(json[index].FirstName == valor){
        json.splice(index,1);
        return false;
    }
});
}


function LerResult(LocalStorage)
{
const fss = require('fs');
const { strict } = require("assert");
const d = fss.readFileSync(LocalStorage, "utf8")
console.log("---");
console.log(d);
}



function Manage(nome, idade)
{
  coletor.unshift(nome,idade);
const arquivo = './coletor/'+ nome+"-" +idade +'.json';
const dados = [{
  nome: nome,
  idade: idade,
  geral: coletor.join("--"),
  local: arquivo,
  Date: Date.now() // com parênteses
}];

const jsonContent = JSON.stringify(dados, null, 2);
Create(arquivo, jsonContent, "./lista_storage.json");
LerResult(arquivo);
}


function CarregarJson(Storage, NewObject) {
  const fs = require('fs');
  const data = JSON.parse(fs.readFileSync(Storage, 'utf8'));
  data[NewObject[0]] = NewObject[1];
  fs.writeFileSync(Storage, JSON.stringify(data, null, 2));
}


function Read(LocalStorage, Posição)
{
  const fs = require('fs');
if (fs.existsSync(LocalStorage)) {
  const data = JSON.parse(fs.readFileSync(LocalStorage, 'utf8'));
  console.log(data[Posição]);
} else {
  console.log("Arquivo não encontrado.");
}

}





function dhas(LocalStorage, Posição) {
  const fs = require('fs');
  const paths = JSON.parse(fs.readFileSync(LocalStorage, "utf8"));
  const filePath = paths[Posição]?.Local;

  if (filePath && fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log(content);
  } else {
    console.log("Arquivo não encontrado.");
  }
}

function PulaLinha(numero){for(var i = 0; i < numero; i++)console.log("-------");}






//var f = Object.getPrototypeOf(dadoss);
///const data = require('./Dados.json');
//data.forEach(element => {console.log(element.nome,element.idade);});
//var p = String.jsonwebtoken();
//const rlc = readline.createInterface({input: process.stdin,output: process.stdout});
//rlc.question('Qual o seu nome? ');
//rlc.question('Qual a sua idade? ');
//import { PrismaClient } from '@prisma/client'
//  const prisma = new PrismaClient()
//var p = (coletor =! null)? "" : "";
//const { request } = require("http");
//const { Client } = require("undici-types");
//d.forEach(Eleme=>{console.log(Eleme)});
//const location = './'+ coletor[0]+"-" +coletor[1] +'.json';
//const p = require('./joao-20.json');
//console.log(p);
