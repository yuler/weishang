<template>
<div id="header" class="header">
	<header class="myheader">
	<a class="backButton button" style="visibility: visible;"></a>
	<h1 id="pageTitle">主页</h1>
	<a id="" class="icon user my-user"></a>
	</header>
	</div>
</template>

<style>
.header{
    position: relative;
    overflow: hidden;
    display: block;
    z-index: 250;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 44px;
    left: 0;
    right: 0;
 background: #155882;
        border: none;
        border-bottom: 1px solid #155882;
        color: white;
}
.header h1{
    text-shadow: none;
    position: absolute;
    width: 45%;
    z-index: 1;
    height: 44px;
    font-size: 18px;
    font-weight: bold;
    left: 27.5%;
    color: inherit;
    padding: 10px 0;
    text-shadow: rgba(0,0,0,0.8) 0 -1px 0;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.myheader{
    display: block;
    height: 100%;
}
.my-user {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
}


</style>

<script>

</script>
