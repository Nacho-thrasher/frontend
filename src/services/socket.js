import { io } from 'socket.io-client';

let socket = null;

// Crear una instancia de Socket.io
export const initializeSocket = (token) => {
  if (socket) {
    socket.disconnect();
  }

  // Crear nueva conexión con el token de autenticación
  socket = io('http://localhost:8080', {
    auth: {
      token
    }
  });

  // Manejar eventos de conexión
  socket.on('connect', () => {
    console.log('Conectado al servidor Socket.io');
  });

  socket.on('connect_error', (error) => {
    console.error('Error de conexión Socket.io:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Desconectado del servidor Socket.io:', reason);
  });

  return socket;
};

// Obtener la instancia actual de Socket.io
export const getSocket = () => {
  return socket;
};

// Suscribirse a eventos del asistente
export const subscribeToAssistant = (callback) => {
  if (!socket) return false;
  
  socket.on('assistant_response', (data) => {
    callback(data);
  });
  
  return true;
};

// Suscribirse a actualizaciones de reproducción
export const subscribeToPlayback = (callback) => {
  if (!socket) return false;
  
  socket.on('playback_update', (data) => {
    callback(data);
  });
  
  return true;
};

// Desconectar Socket.io
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initializeSocket,
  getSocket,
  subscribeToAssistant,
  subscribeToPlayback,
  disconnectSocket
};
