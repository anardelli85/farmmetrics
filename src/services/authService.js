const authService = {
    login: (username, password) => {
      return username === 'a.nardelli' && password === 'pegaso2024!';
    },
    isAuthenticated: () => {
      // Logica per gestire l'autenticazione
      return true; 
    },
  };
  
  export default authService;
  