<template>
  <div class="container">
    <form v-if="isRegistrationVisible">
      <h1 class="container__title">Регистрация</h1>
      <div class="container__main-flex">
        <span class="container__text">Заполните Ваши данные</span>
        <div class="container__inputs-and-dropdown-flex">
          <div class="container__inputs-flex">
            <input
              v-model="username"
              placeholder="Имя"
              type="text"
              class="container__input"
            />
            <input
              v-model="email"
              placeholder="Email"
              type="text"
              class="container__input"
            />
          </div>
          <div class="container__dropdown">
            <button class="container__dropdown-btn">
              <span class="container__dropdown-btn-text">Должность</span>
              <img
                class="container__dropdown-btn-arrow"
                src="imgs/dropdown-arrow.svg"
                alt=""
              />
            </button>
            <ul class="container__dropdown-list">
              <li
                class="container__dropdown-list-item"
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                @click="chooseOption(option.value)"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
          <div class="container__inputs-flex">
            <input
              v-model="password"
              placeholder="Пароль"
              type="password"
              class="container__input container__input-password"
            />
            <button
              @click="togglePassword"
              class="container__password-toggle-btn"
            >
              <img
                src="imgs/showed.svg"
                alt=""
                class="container__input-password-showed-icon"
              />
              <img
                src="imgs/hided.svg"
                alt=""
                class="container__input-password-hided-icon"
              />
            </button>
            <input
              v-model="password_repeat"
              placeholder="Повторите пароль"
              type="password"
              class="container__input container__input-password-repeat"
            />
            <button
              @click="togglePasswordRepeat"
              class="container__password-repeat-toggle-btn"
            >
              <img
                src="imgs/showed.svg"
                alt=""
                class="container__input-password-repeat-showed-icon"
              />
              <img
                src="imgs/hided.svg"
                alt=""
                class="container__input-password-repeat-hided-icon"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="container__toggle-switch-and-question-and-subtext-main-flex">
        <div class="container__toggle-switch-and-question-flex">
          <label class="container__toggle-switch">
            <input type="checkbox" id="toggle" checked />
            <span class="container__slider"></span>
          </label>
          <span class="container__question"
            >Хотите чтобы Ваш профиль видели другие участники платформы?
          </span>
        </div>
        <span class="container__subtext"
          >Включает профиль для просмотра другими пользователями по ссылке</span
        >
      </div>
      <div
        class="container__checkbox-and-checkbox-text-and-sign-up-btn-main-flex"
      >
        <div class="container__checkbox-and-checkbox-text-flex">
          <input type="checkbox" class="container__checkbox" />
          <span class="container__checkbox-text"
            >Регистрируясь, Вы соглашаетесь с
            <span class="container__checkbox-text-span"
              >политикой конфиденциальности</span
            >
            и обработкой
            <span class="container__checkbox-text-span"
              >персональных данных</span
            ></span
          >
        </div>
        <button @click="signUp()" class="container__sign-up-btn">
          Зарегистрироваться
        </button>
      </div>
    </form>
    <span
      v-if="!isRegistrationVisible"
      class="container__registartion-succed-text"
      >Регистрация успешно завершена</span
    >
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";
export default {
  name: "RegistrationForm",
  data() {
    return {
      options: [
        { value: 1, name: "frontend-разработчик" },
        { value: 2, name: "backend-разработчик" },
        { value: 3, name: "fullstack-разработчик" },
      ],
      publicMode: true,
      username: "",
      role: 0,
      email: "",
      password: "",
      password_repeat: "",
      isRegistrationVisible: true,
    };
  },
  methods: {
    chooseOption(option) {
      this.role = option;
    },
    togglePassword() {
      const passwordInput = document.querySelector(
          ".container__input-password"
        ),
        eyeOpenIcon = document.querySelector(
          ".container__input-password-showed-icon"
        ),
        eyeClosedIcon = document.querySelector(
          ".container__input-password-hided-icon"
        );
      if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        eyeOpenIcon.style.display = "block";
        eyeClosedIcon.style.display = "none";
      } else {
        passwordInput.setAttribute("type", "password");
        eyeOpenIcon.style.display = "none";
        eyeClosedIcon.style.display = "block";
      }
    },
    togglePasswordRepeat() {
      const passwordInput = document.querySelector(
          ".container__input-password-repeat"
        ),
        eyeOpenIcon = document.querySelector(
          ".container__input-password-repeat-showed-icon"
        ),
        eyeClosedIcon = document.querySelector(
          ".container__input-password-repeat-hided-icon"
        );
      if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        eyeOpenIcon.style.display = "block";
        eyeClosedIcon.style.display = "none";
      } else {
        passwordInput.setAttribute("type", "password");
        eyeOpenIcon.style.display = "none";
        eyeClosedIcon.style.display = "block";
      }
    },
    async signUp() {
      if (document.querySelector(".container__checkbox").checked) {
        iziToast.settings({
          position: "bottomRight",
        });
        try {
          if (
            this.username &&
            this.role &&
            this.email &&
            this.password &&
            this.password_repeat
          ) {
            // Если все поля заполнены, устанавливаем this.isRegistrationVisible в false
            this.isRegistrationVisible = false;
            await axios.post("http://localhost:5000/mokovbly/post/zapros", {
              public: this.publicMode,
              username: this.username,
              role: this.role,
              email: this.email,
              password: this.password,
              password_repeat: this.password_repeat,
            });
          } else {
            // Если хотя бы одно из полей не заполнено, выводим сообщения об ошибке
            if (!this.username) {
              iziToast.warning({
                title: "Important message",
                message: "Please enter username.",
              });
            }
            if (!this.role) {
              iziToast.warning({
                title: "Important message",
                message: "Please choose the role.",
              });
            }
            if (!this.email) {
              iziToast.warning({
                title: "Important message",
                message: "Please enter email.",
              });
            }
            if (!this.password) {
              iziToast.warning({
                title: "Important message",
                message: "Please enter password.",
              });
            }
            if (!this.password_repeat) {
              iziToast.warning({
                title: "Important message",
                message: "Please repeat password.",
              });
            }
          }
        } catch (error) {
          console.error("Моковый пост запрос:", error);
        }
      } else {
        iziToast.settings({
          position: "bottomRight",
        });
        iziToast.info({
          title: "Important message",
          message:
            "Согласитесь с политикой конфиденциальности, чтобы продолжить!",
        });
      }
    },
  },
  mounted() {
    const dropDownBtn = document.querySelector(".container__dropdown-btn"),
      dropDownList = document.querySelector(".container__dropdown-list"),
      dropDownListItems = document.querySelectorAll(
        ".container__dropdown-list-item"
      ),
      dropdownText = document.querySelector(".container__dropdown-btn-text");
    dropDownBtn.addEventListener("click", function (e) {
      dropDownList.classList.toggle("container__dropdown-list--visible");
      this.classList.add("container__dropdown-btn--active");
    });
    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener("click", function () {
        dropdownText.innerText = this.innerText;
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab" || e.key === "Escape") {
        dropDownBtn.classList.remove("container__dropdown-btn--active");
        dropDownList.classList.remove("container__dropdown-list--visible");
      }
    });

    document.getElementById("toggle").addEventListener("change", function () {
      if (this.checked) {
        this.publicMode = true;
      } else {
        this.publicMode = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 2.5rem auto;
  padding: 0 2rem;
  background: #fff;
  padding: 1.063rem 0.938rem 4.063rem 1.938rem;
  border-radius: 0.938rem;
  width: 90%;
}
.container__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.188rem;
  font-weight: 700;
  color: #000;
  margin: 0rem;
}
.container__main-flex {
  position: relative;
  margin-top: 2.125rem;
  margin-bottom: 3.313rem;
}
.container__main-flex::before {
  content: "";
  position: absolute;
  border: 1px solid #d9d9d9;
  width: 100%;
  margin-top: -1.063rem;
  left: -1.938rem;
  width: calc(100% + 2.876rem);
}
.container__main-flex::after {
  content: "";
  position: absolute;
  border: 1px solid #d9d9d9;
  width: 100%;
  margin-top: 1.875rem;
  left: -1.938rem;
  width: calc(100% + 2.876rem);
}
.container__text {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
}
.container__inputs-and-dropdown-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.125rem;
}
.container__inputs-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.container__input {
  border: 1px solid #e6e6eb;
  border-radius: 0.688rem;
  height: 39px;
  padding: 0.625rem;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #9292a0;
}
.container__input:focus {
  outline: 2px solid #497ada;
}
.container__password-toggle-btn {
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 1rem;
  right: 0.625rem;
  padding: 0rem;
  width: fit-content;
}
.container__password-repeat-toggle-btn {
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 4.4rem;
  right: 0.625rem;
  padding: 0rem;
  width: fit-content;
}
.container__input-password-showed-icon {
  width: 21px;
  height: 10px;
}
.container__input-password-hided-icon {
  display: none;
  width: 21px;
  height: 12px;
  margin-top: -0.05rem;
}
.container__input-password-repeat-showed-icon {
  width: 21px;
  height: 10px;
}
.container__input-password-repeat-hided-icon {
  display: none;
  width: 21px;
  height: 12px;
  margin-top: -0.05rem;
}
.container__dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e6e6eb;
  border-radius: 0.5rem;
  height: 39px;
  padding: 0.5rem;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #9292a0;
  white-space: nowrap;
}
.container__dropdown-btn img {
  pointer-events: none;
}
.container__dropdown-btn:focus,
.container__dropdown-btn--active {
  outline: none;
}
.container__dropdown-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 0.75rem;
  border: 1.5px solid #f3f5f7;
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
  background: #fff;
  margin-top: 0.5rem;
  padding: 0.5rem;
  list-style-type: none;
}
.container__dropdown-list {
  display: none;
}
.container__dropdown-list--visible {
  display: flex;
}
.container__dropdown-list-item {
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #6c7275;
  padding: 0.5rem;
}
.container__dropdown-list-item:hover {
  border-radius: 0.5rem;
  background-color: #f3f5f7;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #141718;
  cursor: pointer;
}
.container__toggle-switch-and-question-and-subtext-main-flex {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
.container__toggle-switch-and-question-flex {
  display: flex;
  gap: 0.313rem;
}
.container__toggle-switch {
  position: relative;
  display: inline-block;
  width: 39px;
  height: 19px;
  flex-shrink: 0;
}
.container__toggle-switch input {
  display: none;
}
.container__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}
.container__slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .container__slider {
  background-color: #3586ff;
}
input:checked + .container__slider:before {
  transform: translateX(22px);
}
.container__question {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
}
.container__subtext {
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #000;
}
.container__checkbox-and-checkbox-text-and-sign-up-btn-main-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.875rem;
}
.container__checkbox-and-checkbox-text-flex {
  display: flex;
  gap: 0.872rem;
}
.container__checkbox[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19px;
  height: 17px;
  border: 1px solid #e6e6eb;
  flex-shrink: 0;
  border-radius: 0.313rem;
  outline: none;
  cursor: pointer;
}
.container__checkbox:checked {
  background: #3586ff;
  border: 1px solid transparent;
}
.container__checkbox::before {
  content: "";
  position: absolute;
  width: 9px;
  height: 7px;
  background-image: url("/public/imgs/tick.svg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
}
.container__checkbox:checked::before {
  opacity: 1;
}
.container__checkbox-text {
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #000;
}
.container__checkbox-text-span {
  color: #3586ff;
}
.container__sign-up-btn {
  background: rgba(73, 122, 218, 0.2);
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  color: #497ada;
}
.container__registartion-succed-text {
  display: block;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #000;
  margin-top: 2rem;
}
/* 1024px = 64em */
@media (min-width: 64em) {
  .container__inputs-flex {
    flex-direction: row;
    gap: 0.875rem;
  }
  .container__input {
    width: 100%;
  }
  .container__dropdown {
    width: 49.2%;
    margin-left: auto;
  }
  .container__subtext {
    margin-left: 2.75rem;
  }
  .container__checkbox-and-checkbox-text-flex {
    align-items: center;
  }
  .container__checkbox-and-checkbox-text-and-sign-up-btn-main-flex {
    flex-direction: row;
  }
  .container__sign-up-btn {
    width: 302px;
  }
  .container__password-toggle-btn {
    left: 45.8%;
  }
  .container__password-repeat-toggle-btn {
    margin-top: 1rem;
  }
  .container__input-password {
    position: relative;
  }
}
</style>
