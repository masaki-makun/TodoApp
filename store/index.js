import Vuex from "vuex";
export const state = {
  todoList: [
    { content: "学習", state: "作業中", date: "2021-04-13 14:00" },
    { content: "片付け", state: "作業中", date: "2021-04-13 08:00" },
    { content: "筋トレ", state: "作業中", date: "2021-04-13 06:00" }
  ],
  options: [
    { id: 0, label: "作業前" },
    { id: 1, label: "作業中" },
    { id: 2, label: "完了" }
  ]
};
export const mutations = {
  addTodo(state, obj) {
    let d = new Date();
    let fmt =
      d.getFullYear() +
      "-" +
      ("00" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + d.getDate()).slice(-2) +
      " " +
      ("00" + d.getHours()).slice(-2) +
      ":" +
      ("00" + d.getMinutes()).slice(-2);
    state.todoList.unshift({
      content: obj.content,
      state: "作業前",
      date: fmt
    });
  },
  deleteTodo(state, obj) {
    for (let i = 0; i < state.todoList.length; i++) {
      let ob = state.todoList[i];
      if (obj.date == ob.date && obj.content == ob.content) {
        if (confirm('"+ob.content+"を削除しますか？')) {
          state.todoList.splice(i, 1);
          return;
        }
      }
    }
  },
  changeState(state, obj) {
    for (let i = 0; i < state.todoList.length; i++) {
      let ob = state.todoList[i];
      if (ob.content == obj.content && obj.date == obj.date) {
        let nowState;
        for (let j = 0; j < state.options.length; j++) {
          if (state.options[j].label == ob.state) {
            nowState = state.options[j].id;
          }
        }
        nowState++;
        if (nowState >= state.options.length) {
          nowState = 0;
        }
        obj.state = state.options[nowState].label;
      }
    }
  },

};
