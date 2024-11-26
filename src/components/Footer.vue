<template>
    <header class="app-header">
      <nav>
        <router-link to="/">Home</router-link> | 
        <router-link to="/signup">Signup</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
  <style scoped>
  .app-header {
    background-color: #f8f9fa;
    padding: 10px;
    text-align: center;
  }
  nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
  }
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  