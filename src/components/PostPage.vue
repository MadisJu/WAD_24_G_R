<template>
    <div class="post-page" v-if="post">
        <div class="content">
            <div id="Side-banner">
                <div>
                    <a id="Ad-link" href="https://www.x-legend.com/online/grandfantasia/" target="_blank"> 
                        <img src="../assets/AD.png">
                    </a>
                </div>
            </div>
            <div class="post-details">
                <h1>{{ post.Title }}</h1>
                <span class="post-date">{{ post.Date }}</span>
                <p>{{ post.Text }}</p>
                <img v-if="imageUrl" class="Post-image" :src="imageUrl" alt="Post Image">
                <div class="actions">
                    <button class="action-button" @click="updatePost">Update</button>
                    <button class="action-button delete" @click="deletePost">Delete</button>
                </div>
                <div class="Post-misc">
                  <button class="Like-button" @click="likePost">👍 Like ({{ post.Likes }})</button>
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
import {mapActions } from 'vuex';

export default {
name: 'PostPage',
props: ['id'],
data() 
{
    return {
        post: null,
    };
},
computed:
{
  imageUrl() 
  {
    try
    {
      return require(`@/assets/postImages/${this.post.ID}.jpg`);
    }
      catch (error)
    {
      return '';
    }
  }
},
methods: 
{
  ...mapActions(['incrementLikes', 'updateLikes']),
  async fetchPost() 
  {
    try 
    {
      const response = await fetch(`http://localhost:3000/api/posts/${this.id}`);
      if (response.ok) 
      {
          this.post = await response.json();
      } else 
      {
          console.error('Failed to fetch post:', response.statusText);
      }
    } 
    catch (error) 
    {
        console.error('Error fetching post:', error);
    }
    },
  async deletePost() 
  {
    try 
    {
        const response = await fetch(`http://localhost:3000/api/posts/${this.id}`, 
        {
            method: 'DELETE',
        });
        if (response.ok) 
        {
            this.$router.push('/');
        } else 
        {
            console.error('Failed to delete post:', response.statusText);
        }
    } catch (error) 
    {
        console.error('Error deleting post:', error);
    }
  },
  updatePost() 
  {
    const updatedTitle = prompt('Enter new title for the post:', this.post.Title);
    const updatedText = prompt('Enter new text for the post:', this.post.Text);

    if (updatedTitle && updatedText) {
      this.submitUpdatedPost(updatedTitle, updatedText);
    }
  },
  async submitUpdatedPost(title, text) {
    console.log('Sending update request:', { title, text }); // Kontrollime andmeid
    try {
    const response = await fetch(`http://localhost:3000/api/posts/${this.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text }), // Saadame serverisse uued andmed
    });
    const result = await response.json();
    console.log('Update response:', result);

    if (response.ok) {
      this.post = await response.json(); // Laeme tagasi värskendatud postituse
      alert('Post updated successfully!');
    } else {
      console.error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    }
  },

  async likePost() 
  {
    await this.updateLikes(this.post.ID);
    this.post.likes += 1;
  },
},

mounted() 
{
  this.fetchPost();
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

.post-image {
    max-width: 100%;
    margin-top: 15px;
    border-radius: 5px;
  }
  </style>
  