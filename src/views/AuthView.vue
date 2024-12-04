<template>
  <my-alert></my-alert>
  <div class="auth-container">
    <div class="auth-container__content">
      <form @submit.prevent class="auth-form">
        <h2 for="auth">Let's get acquainted</h2>
        <my-input
          v-model.trim="inputValue"
          type="text"
          placeholder="Your name"
        ></my-input>
        <my-button color @click="handleSubmit('logIn')">SignIn</my-button>
      </form>
    </div>
    <div class="auth-container__greet">
      <div class="welcome-item">
        <h1 class="welcome-item--heading">Welcome to Assigna!</h1>
        <p class="welcome-item--info">
          Nice to see you in my test project. This small application uses Vue 3
          Composition API, Vite, Scss, Axios, Router, Pinia, and Mitt. It
          features various things like pretty simple pagination, filtering,
          search with debouncer and error handling. You can get to know me and
          explore my other projects through the links below.
        </p>
        <div class="welcome-item__buttons-container">
          <my-button @click="handleSubmit('GitHub')">GitHub</my-button>
          <my-button @click="handleSubmit('CodePen')">Habr</my-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useDataStore } from "@/store/index";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyAlert from "@/components/UI/MyAlert.vue";

const dataStore = useDataStore();
const inputValue = ref("");

const handleSubmit = (action) => {
  switch (action) {
    case "logIn":
      if (inputValue.value) {
        dataStore.logIn(inputValue.value);
      } else {
        dataStore.handleError("Enter username");
      }
      break;
    case "GitHub":
      window.open("https://github.com/StickToYourGuns", "_blank");
      break;
    case "CodePen":
      window.open("https://career.habr.com/moe_chloretz", "_blank");
      break;
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  @include flex-center;
  height: 60vh;
  width: 60%;
  max-width: 750px;
  &__content {
    width: 45%;
    height: 100%;
    background-color: $white-color;
    box-shadow: $main-shadow;
    z-index: 1;
    padding: 70px 40px;
    border-radius: $radius-default;
  }
  &__greet {
    @include flex-center;
    height: 90%;
    width: 55%;
    background-color: $other-color3;
    box-shadow: $main-shadow;
    padding: 40px 40px 40px 20px;
    border-radius: 0 $radius-mini $radius-mini 0;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .welcome-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    &__buttons-container {
      display: flex;
      justify-content: space-evenly;
      gap: 10px;
    }
  }

  .greet {
    color: $text-color;
  }
}

@media screen and (max-width: 700px) {
  .auth-container {
    flex-direction: column;
    height: 90vh;
    width: 90%;
    &__content {
      width: 100%;
      padding: $padding-small;
    }
    &__greet {
      @include flex-center;
      width: 80%;
      padding: $padding-mini $padding-small $padding-small $padding-small;
      border-radius: 0 0 $radius-mini $radius-mini;
    }
  }
}
</style>