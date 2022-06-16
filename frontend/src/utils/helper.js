// get proper error message form axios catch block
export const getErrorMsg = (error, navigate) => {
  const {message, response, errors} = error.response.data;
  console.log('==== error helper ===', message);
  if (response === 400) {
    let errorsMsg = '<ul>';
    errors.forEach(error => {
      errorsMsg += `<li>${error.message}</li>`;
    });
    errorsMsg += `</ul>`;
    return errorsMsg;
  } else if (response === 401) {
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }
  return message;
}
