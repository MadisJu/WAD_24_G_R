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
                    <div v-for="post in allPosts" :key="post.id"> <!--Got thisfrom the intermet!-->
                         <PostComponent :postId="post.id" :content="post.post_caption" />
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
import { mapGetters, mapActions } from 'vuex';
import PostComponent from './PostComponent.vue';

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
    methods:
    {
        ...mapActions(['resetLikes']),
        resetLikes()
        {
            this.resetLikes();
        }
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