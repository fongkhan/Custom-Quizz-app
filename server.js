// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const players = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'join') {
      const playerName = data.playerName;
      players.set(ws, playerName);
    } else if (data.type === 'answer') {
      const playerName = players.get(ws);
      const answer = data.answer;
      // Traitement de la réponse et gestion des scores
      // Diffusion des réponses aux autres joueurs
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'answer', playerName, answer }));
        }
      });
    }
  });
});