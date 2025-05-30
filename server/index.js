const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Rota para registrar novo usuário
app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  const users = loadUsers();
  const userExists = users.find(u => u.email === email || u.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  users.push({
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password
  });

  saveUsers(users);

  res.status(201).json({ message: 'Usuário criado com sucesso' });
});

// Rota para login
app.post('/login', (req, res) => {
  const { identifier, email, username, password } = req.body;

  // Priorize o que vier primeiro: identifier, email ou username
  const loginId = identifier || email || username;

  if (!loginId || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  const users = loadUsers();

  const user = users.find(u =>
    (u.username.toLowerCase() === loginId.toLowerCase() ||
     u.email.toLowerCase() === loginId.toLowerCase()) &&
    u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  res.json({ token: 'fake-jwt-token', user });
});

// Rota GET para listar todos os usuários
app.get('/users', (req, res) => {
  try {
    const users = loadUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar usuários' });
  }
});

// Configuração do Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`✅ API rodando em http://localhost:${port}`);
  console.log(`📚 Swagger UI disponível em http://localhost:${port}/api-docs`);
});
