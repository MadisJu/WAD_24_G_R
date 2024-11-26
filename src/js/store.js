import { createStore } from 'vuex';

const initialPosts = [
    {
      "id": 1,
      "add_date": "2024-11-01",
      "post_caption": "A Nice day",
      "post_description": "Wooo its my birdthday",
      "image_url": "",
      "author_id": 1,
      "like_count": 7
    },
    {
      "id": 2,
      "add_date": "2024-10-31",
      "post_caption": "Delicious dinner",
      "post_description": "Had some yummy pasta",
      "image_url": "happy man.jpg",
      "author_id": 1,
      "like_count": 5
    },
    {
      "id": 3,
      "add_date": "2024-10-30",
      "post_caption": "Workout session",
      "post_description": "Feeling great after a solid workout.",
      "image_url": "inspiring-quote.png",
      "author_id": 1,
      "like_count": 8
    },
    {
      "id": 4,
      "add_date": "2024-10-29",
      "post_caption": "Nature walk",
      "post_description": "Enjoyed a peaceful walk in the park.",
      "image_url": "",
      "author_id": 1,
      "like_count": 6
    },
    {
      "id": 5,
      "add_date": "2024-10-28",
      "post_caption": "Thinking about christmas..",
      "post_description": "Merry crisler!!!",
      "image_url": "",
      "author_id": 1,
      "like_count": 9
    },
    {
      "id": 6,
      "add_date": "2024-10-27",
      "post_caption": "Movie night",
      "post_description": "Alone cause i dont have friends",
      "image_url": "",
      "author_id": 1,
      "like_count": 4
    },
    {
      "id": 7,
      "add_date": "2024-10-26",
      "post_caption": "Coffee time",
      "post_description": "Im such a swiftieee!!!",
      "image_url": "",
      "author_id": 1,
      "like_count": 3
    },
    {
      "id": 8,
      "add_date": "2024-10-25",
      "post_caption": "Art exhibition",
      "post_description": "Visited an inspiring art exhibition.",
      "image_url": "tartu2022.jpg",
      "author_id": 1,
      "like_count": 10
    },
    {
      "id": 9,
      "add_date": "2024-10-24",
      "post_caption": "Cooking experiment",
      "post_description": "I burned my kitchen down :3",
      "image_url": "",
      "author_id": 1,
      "like_count": 2
    },
    {
      "id": 10,
      "add_date": "2024-10-23",
      "post_caption": "Road trip",
      "post_description": "Walked to the nearest rimi!!!!!!! Sale on magnum ice cream!!!",
      "image_url": "",
      "author_id": 1,
      "like_count": 1
    }
];

export default createStore(
  {
  state: 
  {
    posts: initialPosts,
  },
  mutations: 
  {
    incrementLikes(state, postId) 
    {
      const post = state.posts.find(p => p.id === postId);
      if (post) 
      {
        post.likes++;
      }
    },
    resetLikes(state) 
    {
      state.posts.forEach(post => { post.likes = 0; });
    },
    setPosts(state, posts) 
    {
      state.posts = posts;
    },
  },
  actions: 
  {
    incrementLikes({ commit }, postId) 
    {
      commit('incrementLikes', postId);
    },
    resetLikes({ commit }) 
    {
      commit('resetLikes');
    },
    fetchPosts({ commit }) 
    {
      commit('setPosts', initialPosts);
    },
  },
  getters: 
  {
    allPosts: state => state.posts,
  },
}); 