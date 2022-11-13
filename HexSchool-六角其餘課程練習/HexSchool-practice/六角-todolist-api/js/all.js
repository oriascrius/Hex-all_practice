// 共用網域，可另外抽出共同使用
const apiUrl = `https://todoo.5xcamp.us`;

// token -> 登入後 取得的通行證
// let token = "";

// 優化使用空字串的方法，在 axios Config Defaults 可以查到以下
// 先放到 登入 API 回傳的 res 中，之後每個需要 token 的 api 都能省略掉
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 將 AUTH_TOKEN 改成 如下
// axios.defaults.headers.common['Authorization'] = res.headers.authorization;

// 註冊 api
function signUP(email, nickname, password) {
  axios
    .post(`${apiUrl}/users`, {
      user: {
        email: email,
        nickname: nickname,
        password: password,
      },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error.response));
}

// 登入 api
function login(email, password) {
  axios
    .post(`${apiUrl}/users/sign_in`, {
      user: {
        email: email,
        password: password,
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.headers.authorization);
      // token = res.headers.authorization;
      //   以下 需要 token 的 api 都能省略 token
      axios.defaults.headers.common["Authorization"] =
        res.headers.authorization;
    })
    .catch((error) => console.log(error.response));
}

// 取得 todo 列表
function getTodo() {
  axios
    .get(
      `${apiUrl}/todos`
      // {
      //   headers: {
      //     // token 會去全域 token 拿，而登入後，登入的 api 已經把 token 傳給全域了，全域就不是空字串，是有 token 的
      //     authorization: token,
      //   },}
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
}

// 新增 todo 列表
function addTodo(todo) {
  axios // 第一個放 網址
    .post(
      `${apiUrl}/todos`,
      {
        // 第二個放 新增物件
        todo: {
          content: todo,
        },
      }
      //   {
      //     // 第三個放 token
      //     headers: {
      //       authorization: token,
      //     },
      //   }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
}

// 編輯 todo 列表
function editTodo(todo, todoid) {
  axios // 第一個放 網址
    .put(
      `${apiUrl}/todos/${todoid}`,
      {
        // 第二個放 新增物件
        todo: {
          content: todo,
        },
      }
      //   {
      //     // 第三個放 token
      //     headers: {
      //       authorization: token,
      //     },
      //   }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
}

// 刪除 todo 列表
function deleteTodo(todoid) {
  axios // 第一個放 網址
    .delete(
      `${apiUrl}/todos/${todoid}`
      // {
      //   // 第二個放 token
      //   headers: {
      //     authorization: token,
      //   },
      // }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
}

// 切換 todo 事項狀態
function toggleTodo(todoid) {
  axios // 第一個放 網址
    .patch(
      `${apiUrl}/todos/${todoid}/toggle`,
      // 切換狀態 不放資料，但要放個空物件
      {}
      //   {
      //     // 第三個放 token
      //     headers: {
      //       authorization: token,
      //     },
      //   }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
}
