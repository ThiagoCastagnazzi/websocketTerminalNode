const net = require("net");

const porta = 3001;
const clientes = []; // Array para armazenar todas as conexões de clientes

// Criar um servidor de socket
const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  // Adicionar o novo cliente à lista de clientes
  clientes.push(socket);

  // Enviar uma mensagem de boas-vindas para o cliente
  socket.write("Bem-vindo ao chat!\n");

  // Lidar com mensagens do cliente
  socket.on("data", (mensagem) => {
    const mensagemString = mensagem.toString().trim(); // Remover espaços em branco extras
    console.log(`Cliente ${clientes.indexOf(socket) + 1}: ${mensagemString}`);

    clientes.forEach((cliente) => {
      if (cliente === socket) {
        cliente.write(`Mensagem recebida com sucesso !`);
      }
    });
  });

  // Lidar com a desconexão do cliente
  socket.on("close", () => {
    console.log("Cliente desconectado");

    // Remover o cliente desconectado da lista de clientes
    const index = clientes.indexOf(socket);
    if (index !== -1) {
      clientes.splice(index, 1);
    }
  });
});

// Começar a escutar por novas conexões
server.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}`);
});
