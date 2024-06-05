const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors());

// Configuração do Body Parser para lidar com JSON
app.use(bodyParser.json());

// Mock de dados de agendamentos (substitua pelo banco de dados real)
let appointments = [];

// Rota para criar um novo agendamento
app.post("/appointments", (req, res) => {
  const { date, time, clientName, phoneNumber } = req.body;

  // Verifique se todos os campos obrigatórios foram fornecidos
  if (!date || !time || !clientName || !phoneNumber) {
    return res
      .status(400)
      .json({
        message: "Por favor, forneça todas as informações necessárias.",
      });
  }

  // Crie um novo agendamento
  const newAppointment = {
    id: appointments.length + 1,
    date,
    time,
    clientName,
    phoneNumber,
  };

  // Adicione o novo agendamento à lista de agendamentos
  appointments.push(newAppointment);

  return res.status(201).json(newAppointment);
});

// Inicialize o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
