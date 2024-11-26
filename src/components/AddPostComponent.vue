<template>
<div class="form-container">
        <form class="add-post-form" action="../../index.html">
            <div class="form-group">
                <label for="postBody">Post body</label>
                <textarea id="postBody" name="postBody" rows="4" cols="20"></textarea>
            </div>
            <div class="form-group">
                <label for="postImage">Select file</label>
                <input type="file" id="postImage" name="postImage">
            </div>
            <button type="submit" class="create-post-button">Create post</button>
        </form>
</div>
</template>

<script>
export default
{
    name: "AddPostComonent"
}
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