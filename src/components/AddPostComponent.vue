<template>
    <div class="form-container">
      <form @submit.prevent="addPost" class="add-post-form">
        <div class="form-group">
          <label for="postTitle">Post Title</label>
          <textarea v-model="postTitle" id="postTitle" rows="1" placeholder="Enter post title" required></textarea>
        </div>
        <div class="form-group">
          <label for="postBody">Post Body</label>
          <textarea v-model="postBody" id="postBody" rows="4" placeholder="Enter post content" required></textarea>
        </div>
        <button type="submit" class="create-post-button">Create Post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddPostComponent",
    data() {
      return {
        postTitle: "", // Salvestab postituse pealkirja
        postBody: "", // Salvestab postituse sisu
      };
    },
    methods: {
      async addPost() {
        // Kontrollime, kas väljad on täidetud
        if (!this.postTitle || !this.postBody) {
          alert("Please fill in all fields!");
          return;
        }
  
        try {
          // POST päring serverisse
          const response = await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: this.postTitle,
              text: this.postBody,
              author_id: 1, // Vaikimisi autor ID (hiljem võib siduda kasutajaga)
            }),
          });
  
          if (response.ok) {
            alert("Post added successfully!");
            this.$router.push("/"); // Suuna pealehele
          } else {
            console.error("Failed to add post:", response.statusText);
            alert("Failed to add post. Please try again.");
          }
        } catch (error) {
          console.error("Error adding post:", error);
        }
      },
    },
  };
  </script>

<style>
/*--------------- Form Styles---------------*/
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.add-post-form {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    align-items: center;
    width: 300px;
}

.form-group {
    display: flex;
    align-items: flex-start;
}

textarea {
    width: 90%;
    padding: 10px;
    font-size: 14px;
}

input[type="file"] {
    padding: 5px;
    font-size: 14px;
    width: 100%;
}

.create-post-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin: 0 auto;
    display: block;
    text-align: center;
}

.create-post-button:hover {
    background-color: #0056b3;
}
</style>