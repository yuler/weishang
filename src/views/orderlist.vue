<template>
    <div class="viewports">
        <div class="container order-pannel">
            <div class="floor-item">
                                <ul class="title-pannel">
                                    <li class="title-item current-active">求发货</li>
                                    <li class="title-item">进行中</li>
                                    <li class="title-item">已完成</li>
                                </ul>
                            </div>
             <div class="floor-item">
                <ul class="order-list">
                    <li class="split-line">
                        <div class="order-number">
                            <span>订单编号:</span>
                            <span class="number">123232423534543534</span>
                        </div>
                        <div class="order-content margin-space-s">
                            <span class="order-pic">
                                <img src="/src/assets/i/order-pic.png" />
                            </span>
                            <div class="order-info">
                                <div class="order-name">商品名称</div>
                                <div class="order-attr">红色</div>
                                <div class="order-receiver">王武</div>
                                <div class="order-phone">18739782776</div>
                            </div>
                            <span class="order-num">X1</span>
                        </div>
                        <div class="order-sp">
                            <span class="order-status">未发货</span>
                            <span class="order-price">￥36.5</span>
                        </div>
                    </li>
                     <li class="split-line">
                                            <div class="order-number">
                                                <span>订单编号:</span>
                                                <span class="number">123232423534543534</span>
                                            </div>
                                            <div class="order-content margin-space-s">
                                                <span class="order-pic">
                                                    <img src="/src/assets/i/order-pic.png" />
                                                </span>
                                                <div class="order-info">
                                                    <div class="order-name">商品名称</div>
                                                    <div class="order-attr">红色</div>
                                                    <div class="order-receiver">王武</div>
                                                    <div class="order-phone">18739782776</div>
                                                </div>
                                                <span class="order-num">X1</span>
                                            </div>
                                            <div class="order-sp">
                                                <span class="order-status">未发货</span>
                                                <span class="order-price">￥36.5</span>
                                            </div>
                                        </li>

                </ul>
             </div>

        </div>
    </div>
</template>

<style>
    .order-pannel{
        font-size:16px
    }
    .order-pannel .title-item{
    	width:33.3%;
    	border-right:solid 1px #C8C8C8;
    	box-sizing: border-box;
    }
    .order-pannel .order-list{
        font-size:14px;
        color:#7C7C7C;
    }
    .order-pannel .order-list li{
        height:137px;
        overflow:hidden;
    }
    .order-pannel .order-number{
        border-bottom:dashed 1px #e1e1e1;
        padding:7px 7px 7px 7px;
    }
    .order-pannel .order-content{
        position:relative;
    }
    .order-pannel .order-pic{
        width:71px;
        height:71px;
        display:inline-block;
        float:left;
        overflow:hidden;
    }
    .order-pannel .order-pic img{
        width:100%;
        height:auto;
    }
    .order-pannel .order-info{
        margin-left:80px;
        margin-right:60px;
    }
    .order-pannel .order-info div{
        margin-top:3px;
    }
    .order-pannel .order-info .order-name{
    color:#979797;

    }
    .order-pannel .order-info .order-attr{
        font-size:11px;
         color:#BCBCBC;
    }
    .order-pannel .order-info .order-receiver{
    color:#979797;
    }
    .order-pannel .order-info .order-phone{
    color:#979797;
    }
    .order-pannel .order-num{
        display:inline-block;
        position:absolute;
        right: 25px;
            top: 35px;
    }
    .order-pannel .order-sp{

    }
    .order-pannel .order-sp .order-status{
        margin-left:26px;
        font-size:12px;
        color:#BCBCBC;
    }
    .order-pannel .order-sp .order-price{
        float:right;
        font-size:15px;
        margin-right:10px;
        color:#F27115;
    }
</style>