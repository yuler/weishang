<!--认证成功-->

<template>
    <div class='viewports'>
        <div class='container'>
            <div class='floor-item margin-t'>
                <div class='success-pannel'><span class="success-icon"><img src='/src/assets/i/success-icon.png' /></span></div>
                <div class="success-tag">认证成功</div>
                <div class="success-tag2">您已完成认证</div>
                <a href='#'><div class="success-tag3">>>>前往首页<<<</div></a>
            </div>
            <div class='floor-item company-info'>
                <div class="success-tag2">产品名称或公司</div>
                <div class="success-tag2">@copyright</div>
            </div>
        </div>
    </div>
</template>

<style>
    .success-pannel{
        text-align:center;
        width:100%;
    }
    .success-icon{
        width:80px;
        height:80px;
        display:inline-block;
    }
    .success-icon img{
        width:100%;
        height:auto;
    }
    .success-tag{
        font-size:20px;
        color:#42B445;
        text-align: center;
        margin-top:5px;
    }
    .success-tag2{
        font-size:12px;
                color:#A1A1A1;
                text-align: center;
                margin-top:10px;
    }
    .success-tag3{
            font-size:15px;
                    color:#5C5BF4;
                    text-align: center;
                    margin-top:50px;
        }
     .company-info{
        position:absolute;
        bottom:10px;
     }
</style>