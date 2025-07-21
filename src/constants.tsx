export const baseUrl = "http://localhost:8000/";
export const baseUrlMedia = "http://localhost:8000";
export const baseWsUrl = "ws://localhost:8000/";

//export const baseUrl = "http://92.112.194.239:6161/";
//export const baseUrlMedia = "http://92.112.194.239:6161";
//export const baseWsUrl = "ws://92.112.194.239:6161/";



//export const baseUrl = "http://localhost:5050/";
//export const baseWsUrl = "ws://localhost:5050/";

//export const userToken = localStorage.getItem('token');
export const userToken = localStorage.getItem('token');
export const userID = localStorage.getItem('user_id');
export const adminID = localStorage.getItem('admin_id');

export const userEmail = localStorage.getItem('email');

export const username = localStorage.getItem('username');
export const firstName = localStorage.getItem('first_name');
export const lastName = localStorage.getItem('last_name');


export const userPhoto = localStorage.getItem('photo');


export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  