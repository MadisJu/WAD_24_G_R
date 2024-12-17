<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <p class="phone-number">+37254583087</p>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
};
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.phone-number {
  font-size: 2em;
  margin-top: 20px;
}
</style>
