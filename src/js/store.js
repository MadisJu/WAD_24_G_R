import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    incrementLikes(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.like_count++;
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => { post.like_count = 0; });
    },
  },
  actions: {
    async fetchPosts({ commit }) {
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
    incrementLikes({ commit }, postId) {
      commit('incrementLikes', postId);
    },
    resetLikes({ commit }) {
      commit('resetLikes');
    },
  },
  getters: {
    allPosts: state => state.posts,
  },
}); 