<template>
    <div class="post-page">
      <div class="content">
        <div id="Side-banner">
            <div>
              <a id="Ad-link" href="https://www.x-legend.com/online/grandfantasia/" target="_blank"> 
                <img src="../assets/AD.png">
              </a>
            </div>
          </div>
        <div class="post-details">
          <h1>{{ post?.post_caption }}</h1>
          <span class="post-date">{{ post?.add_date }}</span>
          <p>{{ post?.post_description }}</p>
          <img
            v-if="post?.image_url"
            class="post-image"
            :src="require(`@/assets/postImages/${post.image_url}`)"
            alt="Post Image"
          />
          <div class="actions">
            <button class="action-button">Update</button>
            <button class="action-button delete">Delete</button>
          </div>
        </div>
        <div id="Side-banner">
          <div>
            <a id="Ad-link" href="https://kebabstop.ee/menuu/" target="_blank"> 
              <img src="../assets/AD2.jpg">
            </a>
          </div>
        </div>
      </div>
      <footer></footer> <!-- Footer -->
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'PostPage',
    props: ['id'], // Props route'ist
    computed: {
      ...mapGetters(['allPosts']),
      post() {
        return this.allPosts.find((p) => p.id == this.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .post-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .content {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .post-details {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    background: var(--Background2);
    color: var(--Text);
    padding: 20px;
    border-radius: 10px;
  }
  
  .post-date {
    font-size: 0.9em;
    color: var(--PurpleLight1);
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  .action-button {
    background-color: var(--PurpleLight3);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .action-button.delete {
    background-color: var(--Background);
  }
  
  .side-banner {
    background-color: var(--Background3);
    height: 100%;
  }
  
  .post-image {
    max-width: 100%;
    margin-top: 15px;
    border-radius: 5px;
  }
  </style>
  