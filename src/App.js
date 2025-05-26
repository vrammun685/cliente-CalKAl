import React from 'react';
import { AuthProvider } from './auth/AuthContext';  // Contexto de autenticación
import AppRouter from './routers/AppRouter';       // Tu enrutador principal

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;