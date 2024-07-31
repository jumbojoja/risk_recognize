<template>
    <div id="banner_div">
        <div id="banner_left">
            <img class="banner_img" src="../assets/home_page/logo.png">
            <span id="banner_title">多模态检测平台</span>
        </div>
    </div>
</template>

<style>
#banner_div{
    width: 100%;
    height: 64px;
    /* background-color: rgb(152, 131, 131); */
    background-color: #ddf0ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

#banner_left{
    display: flex;
    align-items: center;
}

#banner_title{
    width: 224px;
    height: 64px;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
</style>
