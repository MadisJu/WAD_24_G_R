import { createStore } from 'vuex';

export default createStore({
  state: 
  {
    posts: [],
  },
  mutations: 
  {
    setPosts(state, posts) 
    {
      state.posts = posts;
    },
    incrementLikes(state, ID) 
    {
      const post = state.posts.find(p => p.id === ID);
      if (post) {
        post.like_count++;
      }
    },
    resetLikes(state) 
    {
      state.posts.forEach(post => { post.like_count = 0; });
    },
  },
  actions: {
    async fetchPosts({ commit }) 
    {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          credentials: 'include'
        });
        const posts = await response.json();
        commit('setPosts', posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async updateLikes({ commit, dispatch }, ID) 
    {
      try 
      {
        console.log(`Updating likes for ID: ${ID}`);
        const response = await fetch(`http://localhost:3000/api/posts/${ID}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          commit('incrementLikes', ID);
          await dispatch('fetchPosts');
        } else {
          console.error('Failed to update likes:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    },
    incrementLikes({ commit }, ID) 
    {
      commit('incrementLikes', ID);
    },
    resetLikes({ commit }) 
    {
      commit('resetLikes');
    },
    async deleteAllPosts({ commit }) 
    {
      try 
      {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {

          commit('setPosts', []); // Clear the posts in the store
        } else 
        {
          console.error('Failed to delete all posts:', response.statusText);
        }
      } 
      catch (error) 
      {
        console.error('Error deleting all posts:', error);
      }
    }
  },
  getters: 
  {
    allPosts: state => state.posts,
  },
}); 