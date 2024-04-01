export type User = {
  id: number;
  token: string;
  username: string;
};

export function getUserLocalStorage(): User {
  //funcion que devuele el valor user del localstorage
  const object = localStorage.getItem("user");
  const user: User = object && JSON.parse(object);
  return user;
}
