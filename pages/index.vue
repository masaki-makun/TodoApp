<template>
  <section class="container">
    <h1 class="title">TodoApp</h1>

    <div class="filter">
      <button
        :class="['button', 'button--gray', { 'is-active': !find_flag }]"
        @click="flagReset()"
      >
        全て
      </button>
      <button
        :class="[
          'button',
          'button--gray',
          { 'is-active': find_flag && find_state == '作業前' }
        ]"
        @click="find('作業前')"
      >
        作業前
      </button>
      <button
        :class="[
          'button',
          'button--gray',
          { 'is-active': find_flag && find_state == '作業中' }
        ]"
        @click="find('作業中')"
      >
        作業中
      </button>
      <button
        :class="[
          'button',
          'button--gray',
          { 'is-active': find_flag && find_state == '完了' }
        ]"
        @click="find('完了')"
      >
        完了
      </button>
    </div>
    <div class="table-wrap">
      <table class="lists">
        <thead class="lists-head">
          <tr class="lists-tr">
            <th class="lists-th">State</th>
            <th class="lists-th">Task</th>
            <th class="lists-th">Date</th>
            <th class="lists-th">Delete</th>
          </tr>
        </thead>
        <tbody class="lists-body">
          <tr
            class="lists-tr"
            v-for="(todo, index) in displayTodoList"
            :key="index"
          >
            <td class="lists-td">
              <button
                :class="[
                  'button',
                  {
                    'button--yet': todo.state == '作業前',
                    'button--progress': todo.state == '作業中',
                    'button--done': todo.state == '完了'
                  }
                ]"
                @click="changeState(todo)"
              >
                {{ todo.state }}
              </button>
            </td>
            <td class="lists-td">{{ todo.content }}</td>
            <td class="lists-td">{{ todo.date }}</td>
            <td class="lists-td table-button-wrap">
              <button
                :class="['button', 'button-delete']"
                @click="deleteTodo(todo)"
              >
                <fa class="icon" :icon="faTrashAlt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-area">
      <input
        maxlength="8"
        type="text"
        name="add-name"
        class="input-name"
        id="add-name"
        placeholder="タスクを入力してください"
        v-model="content"
      />
      <button
        id="add-button"
        class="button button--add"
        @mouseover="inputActive()"
        @click="addTodo()"
      ></button>
    </div>
  </section>
</template>

<script>
import Vuex from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      content: "",
      find_flag: false,
      find_state: ""
    };
  },
  computed: {
    ...mapState({
      todoList(state) {
        return state.todoList;
      }
    }),
    displayTodoList() {
      if (this.find_flag) {
        let arr = [];
        let data = this.todoList;
        data.forEach(el => {
          if (el.state == this.find_state) {
            arr.push(el);
          }
        });
        return arr;
      } else {
        return this.todoList;
      }
    },
    faMapMarkerAlt() {
      return faMapMarkerAlt;
    },
    faTrashAlt() {
      return faTrashAlt;
    }
  },
  methods: {
    addTodo() {
      if (!this.content == "") {
        this.$store.commit("addTodo", { content: this.content });
        this.content = "";
      }
    },
    deleteTodo(todo) {
      this.$store.commit("deleteTodo", todo);
    },
    changeState(todo) {
      this.$store.commit("changeState", todo);
    },
    find(findState) {
      this.find_state = findState;
      this.find_flag = true;
    },
    flagReset() {
      this.find_flag = false;
    },

    inputActive() {
      let target = document.querySelector(".input-name");
      let addClass = "input-active";
      if (target.classList.contains(addClass) && target.value == "") {
        target.classList.remove(addClass);
      } else {
        target.classList.add(addClass);
      }
    }
  }
};
</script>

<style lang="scss">
$font: "Aarial", sans-serif;
$background: #05060c;
$black: #141414;
$rightGray: #eef0f2;
$gray: #989cad;
$blue: #0051e6;
$navy: #313436;
$yellow: #eec643;
$red: #df6231;
$transition1: all 0.3s ease;
$borderRadius1: 10px;
$borderRadius2: 15px;
body {
  color: $rightGray;
  font-family: $font;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-gap: 2rem;
  background: $black;
  padding: 2rem;
}

.title {
  font-family: "Arial", sans-serif;
  display: block;
  font-weight: 600;
  font-size: 60px;
  color: $rightGray;
  letter-spacing: 1px;
  margin-bottom: 5rem;
}
.filter {
  background: $navy;
  padding: 15px;
  border-radius: 15px;
}
.filter,
.add-area {
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-gap: 1rem;
  width: 600px;
  min-width: 200px;
}
.add-area {
  position: relative;
}
.input-name {
  border: none;
  outline: none;
  padding: 4px 10px;
  border-radius: $borderRadius2;
  background: $rightGray;
  width: 0;
  height: 30px;
  opacity: 0;
  transition: $transition1;
  position: fixed;
  bottom: 6rem;
  z-index: 10;
  &.input-active {
    opacity: 1;
    width: 400px;
    min-width: 200px;

    z-index: 10;
  }
}
.lists {
  border-collapse: separate;
  border-spacing: 0;
  width: 600px;
  min-width: 200px;
  min-height: 300px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 15px;
  overflow: hidden;
}
.lists-head {
  min-width: 100%;
}
.lists-body {
  padding: 10px 5px;
  transition: all 0.5s ease;
}
.lists-head .lists-tr {
  background: $navy;
  transition: $transition1;
  padding: 20px 0;
}
.lists-head .lists-th {
  text-align: center;
  padding: 20px;
  width: 200px;
}
.lists-body .lists-td {
  text-align: center;
  padding: 20px;
  width: 200px;
  vertical-align: middle;
}
.lists-body .lists-tr {
  background: $navy;
  transition: $transition1;
  padding: 15px;
  &:hover {
    opacity: 0.9;
  }
}
.lists-head .lists-th + .lists-th {
  border-left: 1px solid transparent;
}
.lists-body .lists-tr:last-child .lists-th,
.lists-body .lists-tr:last-child .lists-td {
  border-bottom: none;
}

.lists-td,
.lists-th {
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid rgba(#fff, 0.3);
}

.lists-th {
  font-weight: 600;
  font-size: 18px;
}
.lists-td {
  font-weight: 600;
  font-size: 15px;
}
.button {
  padding: 2px 10px;
  background: #eef0f2;
  height: 30px;
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 600;
  &:hover {
    opacity: 0.7;
  }
}
.button--delete {
  background: $rightGray;
  color: #fff;
}
.button--yet {
  background: green;
  color: #fff;
}
.button--progress {
  background: $blue;
  color: #fff;
}
.button--done {
  background: $red;
  color: #fff;
}
.button--add {
  background: $blue;
  color: #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2.2rem;
  position: fixed;
  right: 2rem;
  padding: 1rem;
  bottom: 5rem;
  z-index: 100;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 50px;
    transform: translate(-50%, -50%);
    content: "+";
    cursor: pointer;
    z-index: 10;
  }
}
.is-active {
  background: $red;
  color: #fff;
}
.table-button-wrap {
  margin-right: 10px;
}
</style>
