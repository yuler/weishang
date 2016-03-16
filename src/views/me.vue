<template>
<div class="viewports">
    <div class="container info-pannel">
        <div class="floor-item split-line">
            <div class="user-info margin-space">
                <span class="user-pic">
                    <img src="/src/assets/i/user-pic.png">
                </span>
                <span class="info-text">
                    <div class="user-address">北京市朝阳区山博水攻D503北京市朝阳区山博水攻D503</div>
                    <div class="user-phone">
                        <i class="icon phone"></i><span class="phone">12345678</span>
                    </div>
                </span>
                <div class="user-pannel"><i class="icon user"></i><span class="user-name">用户名</span></div>
                <div class="control-pannel"><i class="icon settings"></i> <span>编辑</span></div>
            </div>
        </div>
        <div class="floor-item floor-space">
            <div class="detail-box margin-space">
                <div class="box-item split-line">
                    <span class="cash-tag">账上余额:</span>
                    <span class="cash-number">￥1532</span>
                    <span class="btn btn-info">提现</span>
                </div>
                <div class="box-item ">
                    <span class="cash-tag">未完成订单:</span>
                    <span class="cash-number">3 个</span>
                    <span class="btn btn-info">查看</span>
                </div>
            </div>
        </div>
        <div class="floor-item">
            <div class="detail-box margin-space">
                <div class="box-item split-line">
                    <span class="blank-tag">银行卡信息</span>
                    <span class="add-card">
                        <i class="icon add"></i>添加
                    </span>
                </div>
                <div class="box-item">
                    <span class="bank-name">工商银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">交通银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
                <div class="box-item">
                    <span class="bank-name">广发银行</span>
                    <span class="card-number">622848115875587898</span>
                    <span class="card-remove"><i class="icon remove"></i></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
/*.info-v{background-color: #E2E2E2}*/
.info-pannel .user-info{margin-top: 18px;position: relative;}
.info-pannel .user-info .user-pic{width: 70px;height: 70px;overflow: hidden;line-height: 70px;text-align: center;display: inline-block;position: absolute;}
.info-pannel .user-pic img{max-width: 100%;max-height: 100%;}
.info-pannel .user-info{}
.info-pannel .info-text{width: 100%;overflow: hidden;height: 38px;margin-left:88px;}
.info-pannel .user-info .user-address{    margin-left: 85px;font-size: 16px;color: #666666;}
.info-pannel .user-phone i{list-style: none;font-style: normal;}
.info-pannel .user-phone{font-size: 15px;color: #666666; padding-left: 85px;margin-top: 10px;}
.info-pannel .control-pannel{position: absolute;right: 32px;font-size: 14px;color: #A0A0A0;bottom: 5px;}
.info-pannel .control-pannel i{font-style: normal}
.info-pannel .detail-box{}
.info-pannel .box-item{font-size: 16px;color: #666666;padding: 16px 0 16px 0;}
.info-pannel .box-item .cash-number{font-size: 15px;}
.info-pannel .box-item .btn-info{float: right;padding:4px 15px;}
.info-pannel .box-item .add-card,.card-remove{float: right;}
.info-pannel .box-item .bank-name{display: inline-block;width: 75px;}
</style>