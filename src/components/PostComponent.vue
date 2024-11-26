<template>
  <div class="Post">
    <div class="Post-header">
      <div class="Post-header-left">
        <img class="Profile-image" src="../assets/profile/Default.jpg" alt="Profile Image">
      </div>
      <h3 class="post-title">{{ postCaption }}</h3>
      <span class="post-date">{{ addDate }}</span>
    </div>
    <div class="Post-content">
      <p class="post-description">{{ postDescription }}</p>
      <img v-if="imageUrl" class="Post-image" :src="imageUrl" alt="Post Image">
    </div>
    <div class="Post-misc">
      <button class="Like-button" @click="likePost">👍 Like ({{ likes }})</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default 
{
  props: 
  {
    postId: Number,
  },
  computed: 
  {
    ...mapGetters(['allPosts']),
    post() {
      return this.allPosts.find(p => p.id === this.postId);
    },
    postCaption() {
      return this.post ? this.post.post_caption : '';
    },
    addDate() {
      return this.post ? this.post.add_date : '';
    },
    postDescription() {
      return this.post ? this.post.post_description : '';
    },
    imageUrl() {
      return this.post ? this.post.image_url : '';
    },
    likes() {
      return this.post ? this.post.like_count : 0;
    },
  },
  methods: 
  {
    ...mapActions(['incrementLikes']),
    likePost() {
      this.incrementLikes(this.postId);
    },
  },
};
</script>

<style scoped>
/*--------------- Post Stylings---------------*/
.Post {
    width: 100%;
    border-radius: 5px;
    background: linear-gradient(170deg, var(--Post-background), var(--Background));
    display: flex;
    flex-direction: column;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--Background);
}

.Post-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-bottom: 15px;
}

.Post-header-left {
    display: flex;
    align-items: center;
}

.post-title {
    text-align: center;
    margin: 0;
    font-size: 1.4em;
    color: var(--Text);
}

.post-date {
    color: var(--Text);
    font-size: 0.9em;
}

.Post-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
}

.post-description {
    margin-left: 60px;  /* Aligns with the profile picture */
    color: var(--Text);
}

.Post-image {
    max-width: 60%;
    margin-left: 60px;  /* Aligns with the profile picture */
}

.Post-misc {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}
</style> 