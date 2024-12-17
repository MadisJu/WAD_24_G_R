<template>
<header>
    <div id="Nav-Container">
        <div class="Navbar-button">
            <a class="Navbar-Link" href="#" @click.prevent="goToHome">Home</a>
        </div>
        <p>|</p>
        <div class="Navbar-button">
            <a class="Navbar-Link" href="#" @click.prevent="goToPost">Add a post</a>
        </div>
    </div>
    <div class="Navbar-button" @click="toggleDropdown">
        <img src="../assets/profile/Default.jpg" alt="Profiilipilt" class="Profile-image">
        <div id="Dropdown" class="DropdownItems">
            <a>Username</a>
            <a>Email</a>
            <a @click.prevent="logout">Logout</a>
        </div>
    </div>
</header>
</template>

<script>

import { useRouter } from 'vue-router';
import auth from '../js/auth';

export default 
{
    name: 'NavHeader',
    methods: 
    {
        toggleDropdown() 
        {
            document.getElementById("Dropdown").classList.toggle("show");
        },
        async logout() {
            try {
                const response = await fetch("http://localhost:3000/auth/logout", {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    auth.user.authenticated = false;
                    this.goToLogin();
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    },
    setup() 
    {
        const router = useRouter();

        const goToHome = () => 
        {
            router.push('/')
        }
        const goToPost = () =>
        {
            router.push('/post')
        }
        const goToLogin = () =>
        {
            router.push('/signup')
        }

        return {goToHome,goToPost, goToLogin};
    },
}

</script>

<style>
header {
    background: linear-gradient(179deg, var(--PurpleLight3), var(--Background));
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 15px;
    z-index: 1000;
    height: 50px;
}

.Navbar-button {
    display: flex;
    overflow: visible;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
}

.Navbar-Link {
    padding: 0.5rem;
    text-decoration: none;
    max-height: 100%;
    text-align: center;
    margin: auto;
}

.Navbar-Link:hover {
    transform: scale(1.3);
    color: var(--PurpleLight1);
    transition: all 0.3s ease-in-out;
}

.Navbar-Link > button {
    background-color: transparent;
    border: none;
}

#Nav-Container {
    display: flex;
    overflow: hidden;
    align-items: center;
}

.DropdownItems {
    display: none;
    position: absolute;
    right: 0;
    background-color: var(--Background2);
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    margin-top: 12rem;
    border-radius: 5px;
}

.DropdownItems a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
    background: transparent;
}

.DropdownItems a:hover {
    background: var(--Background4);
    color: var(--PurpleLight1);
    transition: all 0.3s ease;
}

.show {
    display: block;
}

</style>