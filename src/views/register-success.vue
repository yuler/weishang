<!--认证成功-->

<template>
    <div class='viewport'>
        <div class='container'>
            <div class='floor-item margin-t'>
                <div class='success-pannel'><span class="success-icon"><img src='/src/assets/i/success-icon.png' /></span></div>
                <div class="success-tag">注册成功</div>
                <div class="success-tag2">您的账户处于未认证状态无法使用系统查价购买等功能。</div>
                <a href='#'><div class="success-tag3">>>>点击前往认证平台完成认证<<<</div></a>
                <div class="success-tag2">认证费:<span class="authorized-change">￥100</span></div>

                 <div class="info">
                            <div class="info-container">
                                <span class="tuijian-pic"><img src="/src/assets/i/role.png"></span>
                                <span class="tuijian-info">
                                    <span>推荐人</span>
                                    <span class="name">李老大</span>
                                </span>
                            </div>
                        </div>
            </div>
            <div class='floor-item company-info'>
                <div class="success-tag2">产品名称或公司</div>
                <div class="success-tag2">@copyright</div>
                <a href='#'><div class="success-tag4">>>>跳过认证<<<</div></a>
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
    .success-tag2 .authorized-change{
        font-size:18px;
        color:#F1730D;
    }
    .success-tag3{
            font-size:15px;
                    color:#5C5BF4;
                    text-align: center;
                    margin-top:50px;
        }
     .success-tag4{
                 font-size:15px;
                         color:#5C5BF4;
                         text-align: center;
                         margin-top:10px;
             }
     .company-info{
        position:absolute;
        bottom:10px;
     }

      .info {
         height: 180px;
         text-align: center;
         position: relative;
         border-bottom: solid 1px #B0B0B0;
         margin: 0;
     }
     .register-pannel .info-container{

     width: 125px;

     height: 125px;

     text-align: center;

     position: absolute;

     top: 50%;

     margin-top: -66px;

     left: 50%;

     margin-left: -66px;

     border: solid 10px #EDEDED;

     border-radius: 3px;

     vertical-align: middle;
     }
     .register-pannel .tuijian-pic{
         display: inline-block;
         width: 44px;
         height: 44px;
         overflow: hidden;
         margin-top: 5px;
     }
     .register-pannel .tuijian-pic img{
         max-width: 100%;
         max-height: 100%;
     }
     .register-pannel .tuijian-info {
         display: inline-block;
         font-size: 15px;
         color: #636363;
         margin-top: -4px;
     }
     .register-pannel span.tuijian-info{
         display: inline-block;
     }
     .register-pannel .tuijian-info .name{
         font-size: 17px;
         color: #313131;
     }
</style>