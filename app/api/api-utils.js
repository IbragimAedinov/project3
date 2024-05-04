export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};
const normalizeDataObject = (obj) => {
  return {
    ...obj,
    category: obj.categories,
    users: obj.users_permissions_users,
  };
};
export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};
export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id} `);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
};
export const getNormalizedGamesDataByCategory = async (url, category) => {
  try {
    const data = await getData(`${url}?categories.name=${category}`);
    if (!data.length) {
      throw new Error("Нет игр в категории");
    }
    return isResponseOk(data) ? normalizeData(data) : data;
  } catch (error) {
    return error;
  }
};
export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const getJWT = () => {
  return localStorage.getItem("jwt");
};

export const removeJWT = () => {
  localStorage.removeItem("jwt");
};
export const checkIfUserVoted = (users, id) => {
  return users.find((user) => user.id === id);
};
export const authorize = async (url, data) => {
  //пост-запрос
  try {
    console.log(data);
    // fetch-запрос к серверу
    const response = await fetch(url, {
      method: "POST", // указываем метод POST
      headers: { "Content-Type": "application/json" },
      // В headers добавляем информацию о передаваемом
      // в теле запроса типе данных
      body: JSON.stringify(data), //В тело запроса добавляем приведённый к строке
      // объект с данными пользователя
    });

    if (response.status !== 200) {
      throw new Error("Ошибка авторизации");
    } // Проверяем, что с ответом сервера всё ок, и, если нет, кидаем ошибку

    const result = await response.json(); // Сохраняем в константу result полученные данные

    return result; // Возвращаем данные
  } catch (error) {
    return error; // Если выше произошла ошибка, то возвращаем данные об ошибке
  }
};
export const vote = async (url, jwt, usersArray) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users_permissions_users: usersArray }),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка голосования");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
const handleVote = async () => {
  const jwt = getJWT();
  if (jwt) {
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(currentUser.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );

    if (isResponseOk(response)) {
      setIsVoted(true);
      setGame(() => {
        return {
          ...game,
          users: [...game.users, currentUser],
        };
      });
    }
  }
};
export const setJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};
export const setVoteToGame = async (url, jwt, users) => {
  try {
    const body = { users_permissions_users: users };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
