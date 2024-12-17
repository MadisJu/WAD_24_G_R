<template>
  <div id="Register-form">
    <b>Welcome to PostIt</b>
    <p>Create an account</p>
    <form id="register" @submit.prevent="validateForm">
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Email"
        required
        autocomplete="off"
      />
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Username"
        required
        autocomplete="off"
      />
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit" id="submit">Register</button>
      <div v-if="errorMessages.length" class="error-messages">
        <p>The password is not valid:</p>
        <ul>
          <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const password = ref("");
    const email = ref("");
    const username = ref("");
    const errorMessages = ref([]);
    const successMessage = ref("");
    const router = useRouter();

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

    // user registration
    const register = async () => {
      try {
        const data = {
          email: email.value,
          username: username.value,
          password: password.value,
        };

        const response = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // cookies
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const result = await response.json();
        console.log("Server response:", result);

        // Save token if received
        if (result.token) {
          localStorage.setItem("authToken", result.token);
          successMessage.value = "Registration successful! Redirecting...";
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        errorMessages.value = ["Registration failed. Please try again."];
      }
    };

    const validateForm = () => {
      validatePassword();
      if (errorMessages.value.length === 0) {
        register();
      }
    };

    return {
      email,
      username,
      password,
      errorMessages,
      successMessage,
      validateForm,
    };
  },
};
</script>

<style>
#Register-form {
  width: min-content;
  border-radius: 5px;
  background-color: var(--PurpleLight2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 1rem;
  align-self: center;
}

#register {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.error-messages {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: green;
  margin-top: 1rem;
}
</style>
