<template>
<div class="viewport">
    <div class="container register-pannel">
        <div class="input-item">
            <input type="tel" maxlength="11" minlength="11" placeholder="请输入您的手机号码" id="phoneNumber" />
        </div>
        <div class="input-item">
            <input type="text" placeholder="请输入验证码" id="checkCode" class="code-input" />
            <span class="btn code-btn" id="getCode">获取验证码</span>
        </div>
        <div class="input-item">
            <input type="password" placeholder="请输入您的密码" id="passWord1" />
        </div>
        <div class="input-item">
            <input type="password" placeholder="请再次输入您的密码" id="passWord2" />
        </div>
        <div class="input-item info">
            <div class="info-container">
                <span class="tuijian-pic"><img src="/src/assets/i/role.png"></span>
                <span class="tuijian-info">
                    <span>推荐人</span>
                    <span class="name">李老大</span>
                </span>
            </div>
        </div>
        <div class="input-item">
           <span class="btn submit-btn" id="registerCommit">注册</span>
        </div>
    </div>
</div>
</template>

<style>
.register-pannel .input-item{
    margin: 30px 15px;
    height: 40px;
    line-height: 40px;
}
.register-pannel .input-item input{
    height: 100%;
    width:100%;
    border-radius:5px;
    border:solid 1px #AAAAAA;
}
.register-pannel .input-item .code-input{
     width: 63%!important;
    display: inline-block;
}

.register-pannel .code-btn{
    margin-left:10px;
    position:absolute;

}
.register-pannel .submit-btn{
    width: 100%;
    padding:0;
}
.register-pannel .info{
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