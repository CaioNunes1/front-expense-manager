// auth.ts
  
  export const getUserId = (): number | null => {
    const userId = localStorage.getItem('userId');
    //console.log('userId from localStorage:', userId); // Adicione um log para verificar o valor
    return userId ? parseInt(userId, 10) : null;
  };
  /* (): number | null: Especifica que a função retorna
   um valor que pode ser um número (number) ou null.*/

   /*parseInt(userId, 10): Converte 
   a string userId para um número inteiro usando a base 10 (decimal). O 
   parseInt é usado para interpretar a string como um número. */
  
  export const removeUserId = (): void => {
    localStorage.removeItem('userId');
  };
  