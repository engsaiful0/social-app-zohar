import Cookies from 'js-cookie';


export function checkIfUserIsLoggedIn() {
  const token = Cookies.get('token');
  //console.log('token'+token);
  if(token!=''&& token!==undefined)
  {
    return true;
  }else{
    return false;
  }
}
