<template>
<div id="Login-form">
    <b>Welcome to PostIt</b>
    <router-link to="/register">Create an account</router-link>
    <p>or</p>
    <p>Please log in</p>
    <form id="login" @submit.prevent="validateForm">
        <input type="email" id="email" v-model="email" placeholder="Email" required autocomplete="off">
        <input type="password" id="password" v-model="password" placeholder="Password" required>
        <button type="submit" id="submit">Log in</button>
        <div v-if="errorMessages.length" class="error-messages">
        <p>The password is not valid:</p>
        <ul>
          <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
        </ul>
      </div>
    </form>
    <a href="/404">Forget password</a>
</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const password = ref("");
    const errorMessages = ref([]);

    const validatePassword = () => {
      errorMessages.value = [];
      
      if (password.value.length < 8 || password.value.length >= 15) {
        errorMessages.value.push("Must be at least 8 characters and less than 15 characters.");
      }
      if (!/[A-Z]/.test(password.value)) {
        errorMessages.value.push("Must include at least one uppercase alphabet character.");
      }
      if ((password.value.match(/[a-z]/g) || []).length < 2) {
        errorMessages.value.push("Must include at least two lowercase alphabet characters.");
      }
      if (!/[0-9]/.test(password.value)) {
        errorMessages.value.push("Must include at least one numeric value.");
      }
      if (!/^[A-Z]/.test(password.value)) {
        errorMessages.value.push("Must start with an uppercase alphabet character.");
      }
      if (!/_/.test(password.value)) {
        errorMessages.value.push('Must include the character "_"');
      }
    };

    const validateForm = () => {
      validatePassword();
      if (errorMessages.value.length === 0) {
        router.push('/')
      }
    };

    return {
      password,
      errorMessages,
      validatePassword,
      validateForm,
    };
  },
};
</script>

<style>
#Login-form {
    width: min-content;
    border-radius: 5px;
    background-color: var(--PurpleLight2);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    align-self: center;
    margin-top: 1rem;
}

#login {
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.error-messages {
    color: white;
}
</style>