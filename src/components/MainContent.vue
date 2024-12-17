<template>
    <div id="Content">
            <div id="Forum-display">
                <div id="Side-banner">
                    <div>
                        <a id="Ad-link" href="https://www.x-legend.com/online/grandfantasia/" target="_blank"> 
                            <img src="../assets/AD.png">
                        </a>
                    </div>
                </div>
                <div id="Forum">
                    <button class="Like-button" @click="deleteAllPosts">Delete All Posts</button>
                    <div v-if="allPosts.length > 0">
                        <div v-for="post in allPosts" :key="post.id " @click="goToPost(post.ID)">
                            <PostComponent 
                                :ID="Number(post.ID)" 
                                :title="post.title" 
                                :text="post.text" 
                                :date="post.date" 
                                :likes="post.like_count" 
                            />
                        </div>
                    </div>
                    <div v-else>
                        <p>No posts available.</p>
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
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import PostComponent from './PostComponent.vue';
import { mapGetters, mapActions } from 'vuex';

export default 
{
    name: 'MainContent',
    components:
    {        
        PostComponent,
    },  
    computed:
    {
        ...mapGetters(['allPosts']),
    },
    setup()
    {
        const router = useRouter();

        const goToPost = (id) => {
            router.push(`/post/${id}`);
        };

        return { goToPost };
    },
    methods:
    {
        ...mapActions(['resetLikes', 'fetchPosts', 'deleteAllPosts']),
        async deleteAllPosts() {
            await this.$store.dispatch('deleteAllPosts');
            this.fetchPosts(); // Refresh the posts after deletion
        }
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<style>
/*--------------- Main Content Layout---------------*/
#Content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
}

#Forum-display {
    display: grid;
    grid-template-columns: 15% 65% 15%;
    gap: 2.5%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-x: hidden;
}


/*--------------- Forum Stylings---------------*/
#Forum {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    padding-right: 20px;
    align-items: stretch;
}

#Forum::-webkit-scrollbar 
{
    display: none;
}

/*--------------- Side Banner and Advertisement Stylings---------------*/
#Side-banner {
    background-color: var(--Background2);
    border-radius: 5px;
    max-height: 80vh;
    position: sticky;
    top: 20px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

#Side-banner > div {
    height: 80vh;
    width: 100%;
    border: 3px solid var(--PurpleLight1);
    overflow: hidden;
    border-radius: 5px;
}

#Ad-link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#Ad-link img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

#Side-banner img:hover {
    transform: scale(1.1);
}

</style>