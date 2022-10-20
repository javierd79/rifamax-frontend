const URL = 'https://rifa-max.com';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST', // Metodo HTTP -> POST = Create (C de CRUD)
    headers: { 'Content-Type': 'application/json' }, // headers -> Tipo de Aplicacion
    body: JSON.stringify(loginPayload) // JSON que enviaremos al server
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    console.log(loginPayload)
    let response = await fetch(`${URL}/api/v1/login`, requestOptions);
    let data = await response.json();
  
    if(data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data, private: false });
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('name', JSON.stringify(data.user.name));
      localStorage.setItem('user', JSON.stringify(data.user.username));
      localStorage.setItem('role', JSON.stringify(data.user.role));
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('exp', JSON.stringify(data.exp));
      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.message, private: true });
    console.log(data.message);
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error, private: true });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT', private: true });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('name');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}