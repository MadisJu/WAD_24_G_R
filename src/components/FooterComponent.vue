<template>
  <footer class="app-footer">
    <p id="Team-info">Team R</p>
    <p>&copy; 2024 PostIt idk something. All rights revoked.</p>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
/*--------------- Footer Stylings---------------*/
footer {
    display: flex;
    align-content: center;
    background: linear-gradient(179deg, var(--PurpleLight3) 0%, var(--Background2) 60%);
    position: relative;
    bottom: 0;
    padding: 20px;
    margin-top: auto;
    height: 30px;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--Background2);
    color: white;
    text-align: center;
}


/*--------------- Team Info Stylings---------------*/
#Team-info {
    text-align: center;
}

#Team-info + img {
    max-width: 50px;
    max-height: 50px;
    border-radius: 3px;
}

#Team-info ~ a {
    font-size: small;
}
</style>
  