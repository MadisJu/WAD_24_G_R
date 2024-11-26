<template>
<div id="Login-form">
    <b>Welcome to PostIt</b>
    <a href="/404">Create an account</a>
    <p>or</p>
    <p>Please log in</p>
    <form id="login" @submit.prevent="checkPassword">
        <input type="email" id="email" v-model="email" placeholder="Email" required autocomplete="off">
        <input type="password" id="password" v-model="password" placeholder="Password" required>
        <button type="submit" id="submit">Log in</button>
    </form>
    <a href="/404">Forget password</a>
</div>
</template>

<script setup lang="js">
import { ref } from "vue";

const email = ref("");
const password = ref("");

function checkPassword() {
    const checks = {
        length: password.value.length >= 8 && password.value.length < 15,
        startsWithUppercase: /^[A-Z]/.test(password.value),
        hasTwoLowercase: /[a-z].*[a-z]/.test(password.value),
        hasNumeric: /\d/.test(password.value),
        includesUnderscore: /_/.test(password.value),
    };

    const failedConditions = Object.entries(checks)
        .filter(([, isValid]) => !isValid)
        .map(([key]) => key);

    if (failedConditions.length === 0) {
        console.log("Password is valid")
    } else {
        console.log("Failed conditions:", failedConditions)
    }
}

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
</style>