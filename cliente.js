const net = require("net");
const readline = require("readline");

// Criar um cliente de socket
const client = net.createConnection({
  host: "localhost",
  port: 3001,
});

// Interface para leitura de linha do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Lidar com mensagens do servidor
client.on("data", (mensagem) => {
  const mensagemString = mensagem.toString().trim(); // Remover espaços em branco extras
  if (mensagemString === "Mensagem recebida com sucesso !") {
    console.log("Mensagem enviada com sucesso!");
  } else {
    console.log(`Servidor: ${mensagemString}`);
  }
});

// Lidar com a desconexão do servidor
client.on("close", () => {
  console.log("Conexão fechada");

  // Fechar a conexão com o servidor
  client.end();
});

client.on("error", () => {
  console.log("Erro ao conectar ao servidor");
});

// Lidar com a entrada do usuário
rl.on("line", (input) => {
  // Enviar a mensagem para o servidor
  client.write(input);
});

// Fechar o cliente quando a entrada do usuário for encerrada
rl.on("close", () => {
  client.end();
});

// Fechar a interface de leitura de linha quando a conexão com o servidor for encerrada
client.on("end", () => {
  rl.close();
});
