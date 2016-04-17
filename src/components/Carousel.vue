<template>
  <div id="slider" class="silder-wrapper">
    <ul id='image_slider' class="new-silde" data-slide-ul="firstUl">
      <li data-ul-child="child" class="silde-li active"><img src='/static/i/activity.png'></li>
      <li><img src='/static/i/activity.png'></li>
    </ul>
    <div class="focus-btn" data-small-btn="smallbtn">
    	<!-- <span ></span> -->
    </div>
  </div>
</template>

<script>

var slide = (function() {

    var slide = function(elem) {
        return new Slide(elem);
    };

    // 创建一个对象
    function Slide(elem) {
        this.elem = elem;
        this.oBox = document.querySelector(elem);
        this.aLi = document.querySelectorAll(elem + ' [data-ul-child=child]');
        this.oUl = document.querySelector(elem + ' [data-slide-ul=firstUl]');
        console.log( this.oUl);
        this.now = 0;
        this.on0ff = false;
    }

    // 拓展实例方法
    Slide.prototype = {
        init: function(options) {

            var options = options || {},
                aLi = this.aLi;
            this.defaults = {
                startIndex: 0,
                loop: false,
                smallBtn: false,
                number: false,
                laseMoveFn: false,
                location: false,
                preDef: 'lnr',
                autoPlay: false,
                autoHeight: false,
                preFn: null,
                lastImgSlider: false,
                playTime: 6000,
                verticalCenter:false,  /*是否设置垂直居中*/
                fullScreen:true,    /*是否满屏*/
                total:0,    /*最大总数*/
                slideLen:200    /*滑动最大距离*/
            };

            // 对参数处理
            Slide.extend(this.defaults, options);
            // 默认图片展示第几张
            this.now = this.defaults.startIndex;

            //初始化页码
            this.initBtn();

            // 初始化
            this.liInit();
            this.bind();

            /*
             * 禁止一张图片滚动
             * */
            if(this.aLi.length<2){
                if(this.defaults.smallBtn){
                    this.oSmallBtn.style.display='none';
                }
                if (this.defaults.number) {
                    this.pageNub.style.display='none';
                }
                this.defaults.autoPlay=false;
                this.defaults.loop=false;
            }
            // 是否自动播放
            if (this.defaults.autoPlay) {
                this.pause();
                this.play();
            }
        },
        initBtn:function(){
            this.aLi = document.querySelectorAll(this.elem + ' [data-ul-child=child]');
            var aLi=this.aLi;
            // 是否是小按钮形式
            if (this.defaults.smallBtn) {
                this.oSmallBtn = document.querySelector(this.elem + ' [data-small-btn="smallbtn"]');
                this.oSmallBtn.innerHTML = this.addSmallBtn();
                this.btns = document.querySelectorAll(this.elem + ' [data-ol-btn="btn"]');

                for (var i = 0; i < this.btns.length; i++) {
                    this.btns[i].className = '';
                }

                this.btns[Slide.getNow(this.now, aLi.length)].className = 'active';
            }

            // 数字形式
            if (this.defaults.number) {
                this.pageNub=document.getElementById('page-nub');
                this.slideNub = document.getElementById('slide-nub');
                this.slideSum = document.getElementById('slide-sum');

                this.slideNub.innerHTML = (this.now + 1)%(this.aLi.length);
                this.slideSum.innerHTML = this.aLi.length;
            }

            this.total=this.aLi.length;
            if (this.aLi.length == 2||this.aLi.length == 3) {
                // 2015年9月25日17:51:53  shenpeng 修改
                if (this.defaults.loop) {
                    this.oUl.innerHTML += this.oUl.innerHTML;
                }
                this.aLi = document.querySelectorAll(this.elem + ' [data-ul-child=child]');

                this.need = true;
            }
        },
        bind: function() {

            var oBox = this.oBox,
                device = Slide._device();

            if (!device.hasTouch) {
                oBox.style.cursor = 'pointer';
                oBox.ondragstart = function(ev) {
                    if (ev) {
                        return false;
                    }
                    return true;
                };
            }
            var supportsOrientationChange = "onorientationchange" in window;
            var resize = supportsOrientationChange ? "orientationchange" : "resize";

            window.addEventListener(resize, this);
            /*
             * 禁止一张图片滚动
             * */
            if(this.aLi.length<2){
                if(this.defaults.smallBtn){
                    this.oSmallBtn.style.display='none';
                }
                if (this.defaults.number) {
                    this.pageNub.style.display='none';
                }
                return
            }

            oBox.addEventListener(device.startEvt, this);
            window.addEventListener('touchcancel', this);
            if(navigator.userAgent.indexOf('baidubrowser')){
                window.addEventListener('focusin',this);
                window.addEventListener('focusout',this);
            }else{
                window.addEventListener('blur', this);
                window.addEventListener('focus', this);
            }

        },
        liInit: function() {

            var aLi = this.aLi,
                length = aLi.length,
                liwidth=this.aLi[0].offsetWidth,
                liheight=this.aLi[0].offsetHeight,
                oUl = this.oUl,
                w = this.oBox.offsetWidth,
                boxW=320,
                now = this.now,
                that = this;

            if (this.defaults.preFn) {
                this.defaults.preFn()
            }

            for (var i = 0; i < length; i++) {

                Slide.setStyle(aLi[i], {
                    WebkitTransition: 'all 0ms ' + 'ease',
                    transition: 'all 0ms ' + 'ease',
                    height:'auto'
                })
            }

            if(this.defaults.fullScreen){
                oUl.style.width = w * length + 'px';

                if (this.defaults.autoHeight) {

                    boxW = this.oBox.offsetWidth;
                    if (boxW >= 640) {
                        boxW = 640;
                    }else if(boxW <= 320){
                        boxW = 320;
                    }

                    for (var i = 0; i < length; i++) {
                        aLi[i].style.width = boxW + 'px';
                    }


                    var pic = aLi[0].getElementsByTagName('img')[0];

                    if (pic) {
                        var img = new Image();

                        img.onload = function() {

                            that.oBox.style.height = aLi[0].offsetHeight + 'px';
                            that.oUl.style.height = aLi[0].offsetHeight + 'px';

                            /*
                             * 增加父容器的垂直居中
                             * */
                            if(that.oBox.style.height.replace('px','')>=document.documentElement.clientHeight||!that.defaults.verticalCenter){
                                that.oBox.parentNode.style.top='50px';
                                that.oBox.parentNode.style.marginTop=0;
                                //$('.scroll-imgs').css('top','50px').css('marginTop',0);
                            }else{
                                that.oBox.parentNode.style.top='50%';
                                that.oBox.parentNode.style.marginTop='-50%';
                                //$('.scroll-imgs').css('top','50%').css('marginTop','-50%');
                            }
                            for(var i=0;i<aLi.length;i++){
                                aLi[i].style.height = aLi[0].offsetHeight + 'px';
                            }
                        };
                        img.src = pic.src;
                    } else {

                        this.oBox.style.height = aLi[0].offsetHeight + 'px';
                    }

                }
            } else{
                boxW = this.oBox.offsetWidth;
                if (boxW >= 640) {
                    boxW = 640;
                }else if(boxW <= 320){
                    boxW = 320;
                }
                liwidth=(boxW/320)*225;
                liheight=(boxW/320)*150;
                for (var i = 0; i < length; i++) {
                    aLi[i].style.width = liwidth + 'px';
                    aLi[i].style.height = liheight + 'px';
                }
                oUl.style.width = liwidth * length + 'px';
                this.oBox.style.height = liheight + 'px';
                this.oUl.style.height = liheight + 'px';
                aLi[0].style.padding='0';
                w=liwidth;
            }

            // 循环切换li的初始化
            if (this.defaults.loop) {

                for (var i = 0; i < length; i++) {

                    Slide.setStyle(aLi[i], {
                        position: 'absolute',
                        left: 0,
                        top: 0
                    });

                    if (i == Slide.getNow(now, length)) {

                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + 0 + 'px, 0px, 0px)',
                            transform: 'translate3d(' + 0 + 'px, 0px, 0px)',
                            zIndex: 10
                        });

                    } else if (i == Slide.getPre(now, length)) {
                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            transform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            zIndex: 10
                        });

                    } else if (i == Slide.getNext(now, length)) {
                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + w + 'px, 0px, 0px)',
                            transform: 'translate3d(' + w + 'px, 0px, 0px)',
                            zIndex: 10
                        });

                    } else if (i == Slide.getNextNew(now, length)) {
                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            transform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            zIndex: 10
                        });

                    } else {

                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            transform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            zIndex: 9
                        });
                    }

                }

                // 不循环切换切换li的初始化
            } else {
                for (var i = 0; i < length; i++) {

                    Slide.setStyle(aLi[i], {
                        WebkitTransform: 'translate3d(' + now * -w + 'px, 0px, 0px)',
                        transform: 'translate3d(' + now * -w + 'px, 0px, 0px)'
                    });

                }
            }
        },
        handleEvent: function(ev) {
            var device = Slide._device(),
                oBox = this.oBox;

            switch (ev.type) {
                case device.startEvt:
                    if (this.defaults.autoPlay) this.pause();
                    this.startHandler(ev);
                    break;
                case device.moveEvt:
                    if (this.defaults.autoPlay) this.pause();
                    this.moveHandler(ev);
                    break;
                case device.endEvt:
                    if (this.defaults.autoPlay) {
                        this.pause();
                        this.play();
                    }
                    this.endHandler(ev);
                    break;
                case 'touchcancel':
                    if (this.defaults.autoPlay) {
                        this.pause();
                        this.play();
                    }
                    this.endHandler(ev);
                    break;
                case 'orientationchange':
                    this.orientationchangeHandler();
                    break;
                case 'resize':
                    this.orientationchangeHandler();
                    break;
                case 'focus':
                    if (this.defaults.autoPlay) {
                        this.pause();
                        this.play();
                    }
                    break;
                case 'blur':
                    if (this.defaults.autoPlay) {
                        this.pause();
                    }
                    break;
                case 'focusin':
                    if (this.defaults.autoPlay) {
                        this.pause();
                        this.play();
                    }
                    break;
                case 'focusout':
                    if (this.defaults.autoPlay) {
                        this.pause();
                    }
                    break;

            }
        },
        //触摸开始
        startHandler: function(ev) {
            this.on0ff = true;
            var device = Slide._device(),
                hasTouch = device.hasTouch,
                oBox = this.oBox,
                now = this.now,
                aLi = this.aLi

            oBox.addEventListener(device.moveEvt, this);
            oBox.addEventListener(device.endEvt, this);


            this.downTime = Date.now();
            this.downX = hasTouch ? ev.targetTouches[0].pageX : ev.clientX - oBox.offsetLeft;
            this.downY = hasTouch ? ev.targetTouches[0].pageY : ev.clientY - oBox.offsetTop;

            // 获取初始transform 值
            this.startT = Slide.getTranX(aLi[Slide.getNow(now, aLi.length)]);


            this.startNowT = Slide.getTranX(aLi[Slide.getNow(now, aLi.length)]);
            this.startPreT = Slide.getTranX(aLi[Slide.getPre(now, aLi.length)]);
            this.startNextT = Slide.getTranX(aLi[Slide.getNext(now, aLi.length)]);
            this.startNextN = Slide.getTranX(aLi[Slide.getNextNew(now, aLi.length)]);
            Slide.stopPropagation(ev);


        },
        //移动开始
        moveHandler: function(ev) {
            var oBox = this.oBox,
                device = Slide._device();

            if (this.on0ff) {

                var hasTouch = device.hasTouch;
                var nowX = hasTouch ? ev.targetTouches[0].pageX : ev.clientX - oBox.offsetLeft;
                var nowY = hasTouch ? ev.targetTouches[0].pageY : ev.clientY - oBox.offsetTop;
                var aLi = this.aLi,
                    length = aLi.length,
                    now = this.now,
                    w = aLi[0].offsetWidth;


                // 全部阻止
                if (this.defaults.preDef == 'all') {
                    // ev.preventDefault();
                    Slide.stopDefault(ev);
                }

                for (var i = 0; i < length; i++) {

                    Slide.setStyle(aLi[i], {
                        WebkitTransition: 'all 0ms ' + 'ease',
                        transition: 'all 0ms ' + 'ease'
                    })
                }

                if (Math.abs(nowX - this.downX) < Math.abs(nowY - this.downY)) {

                    // 阻止上下滑动才默认事件
                    if (this.defaults.preDef == 'tnd' && this.defaults.preDef != 'all') {

                        // ev.preventDefault();
                        Slide.stopDefault(ev);
                    }


                } else {


                    if (Math.abs(nowX - this.downX) > 10) {

                        // 阻止左右滑动才默认事件
                        if (this.defaults.preDef == 'lnr' && this.defaults.preDef != 'all') {

                            // ev.preventDefault();
                            Slide.stopDefault(ev);
                        }

                        if (this.defaults.loop) {

                            nowT = (this.startNowT + nowX - this.downX).toFixed(4);
                            var preT = (this.startPreT + nowX - this.downX).toFixed(4);
                            var nextT = (this.startNextT + nowX - this.downX).toFixed(4);
                            var nextN = (this.startNextN + nowX - this.downX).toFixed(4);

                            Slide.move(aLi[Slide.getNow(now, length)], nowT, 10,this.defaults.fullScreen);

                            Slide.move(aLi[Slide.getPre(now, length)], preT, 10,this.defaults.fullScreen);

                            Slide.move(aLi[Slide.getNext(now, length)], nextT, 10,this.defaults.fullScreen);

                            Slide.move(aLi[Slide.getNextNew(now, length)], nextN, 10,this.defaults.fullScreen);

                        } else {

                            var nowT = Slide.getTranX(aLi[now]);

                            if (nowT > 0) {
                                var tansX = ((this.startT + nowX - this.downX) / 3).toFixed(4);

                                 for (var i = 0; i < length; i++) {

                                    Slide.move(aLi[i], tansX);

                                }

                            } else if (Math.abs(nowT) >= Math.abs((length - 1) * w)) {

                                var tansX = (this.startT + (nowX - this.downX) / 3).toFixed(4);

                                for (var i = 0; i < length; i++) {
                                    Slide.move(aLi[i], tansX);
                                }

                                // 在最后一张图片滑动的时候传入的fn 并且传出位移
                                if (this.defaults.laseMoveFn && typeof this.defaults.laseMoveFn == 'function') {

                                    var x = (tansX - this.startT).toFixed(4);

                                    this.defaults.laseMoveFn(x);

                                }

                            } else {
                                var tansX = (this.startT + nowX - this.downX).toFixed(4);

                                for (var i = 0; i < length; i++) {
                                    Slide.move(aLi[i], tansX);
                                }

                            }

                        }

                    }

                }
                // 非常重要
            } else {
                oBox.removeEventListener(device.moveEvt, this);
                oBox.removeEventListener(device.endEvt, this);

            }
            Slide.stopPropagation(ev);

        },
        //移动结束
        endHandler: function(ev) {
            ev.stopPropagation();
            this.on0ff = false;
            var endTime = Date.now(),
                device = Slide._device(),
                hasTouch = device.hasTouch,
                oBox = this.oBox,
                endX = hasTouch ? ev.changedTouches[0].pageX : ev.clientX - oBox.offsetLeft,
                endY = hasTouch ? ev.changedTouches[0].pageY : ev.clientY - oBox.offsetTop,
                aLi = this.aLi,
                w = aLi[0].offsetWidth,
                endT = Slide.getTranX(aLi[Slide.getNow(this.now, aLi.length)]);



            if (endX - this.downX < 30 && endX - this.downX >= 0 && Math.abs(endY - this.downY) < 30) {
                this.tab(endT, '+=');

                return 'click';

            } else if (endX - this.downX > -30 && endX - this.downX <= 0 && Math.abs(endY - this.downY) < 30) {
                this.tab(endT, '-=');

                return 'click';
            } else {



                if(Math.abs(endY - this.downY)-Math.abs(endX - this.downX)>30&&endX - this.downX<0)
                {

                    this.tab(endT, '-=');
                    return;
                }

                if(Math.abs(endY - this.downY)-Math.abs(endX - this.downX)>30&&endX - this.downX>0)
                {

                    this.tab(endT, '+=');
                    return;
                }

                if (endX < this.downX) {


                    if (this.downX - endX > w / 3 || endTime - this.downTime < 200) {
                        this.now++;
                        this.tab(endT, '++');
                        return 'left';
                    } else {

                        this.tab(endT, '+=');
                        return 'stay';
                    }


                } else {


                    if (endX - this.downX > w / 3 || endTime - this.downTime < 200) {
                        this.now--;
                        this.tab(endT, '--');
                        return 'right';
                    } else {
                        this.tab(endT, '-=');
                        return 'stay';
                    }

                }
            }
            Slide.stopPropagation(ev);
            // 释放掉监听
            oBox.removeEventListener(device.moveEvt, this);
            oBox.removeEventListener(device.endEvt, this);

        },
        //结束后的动画
        tab: function(endT, sign, timer) {
            var aLi = this.aLi,
                length = aLi.length,
                w = aLi[0].offsetWidth,
                oBox = this.oBox,
                device = Slide._device(),
                that = this,
                now = this.now;
                $(aLi[Slide.getNow(that.now, length)]).addClass("active").siblings().removeClass("active");
            if (this.defaults.loop) {

                if (now < 0) {
                     now = length - 1;
                    this.now = length - 1;
                }

                for (var i = 0; i < length; i++) {

                    if (i == Slide.getPre(now, length)) {

                        var runing;

                        switch (sign) {
                            case '++':
                                runing = 300;
                                break;
                            case '--':
                                runing = 0;
                                break;
                            case '+=':
                                runing = 0;
                                break;
                            case '-=':
                                runing = 300;
                                break;
                            default:
                                break;
                        }
                        Slide.setStyle(aLi[Slide.getPre(now, length)], {
                            WebkitTransform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            transform: 'translate3d(' + -w + 'px, 0px, 0px)',
                            zIndex: 10,
                            WebkitTransition: 'all ' + runing + 'ms ' + 'ease',
                            transition: 'all ' + runing + 'ms ' + 'ease'
                        });
                        if(!that.defaults.fullScreen){
                            Slide.setStyle(aLi[Slide.getPre(now, length)],{
                                padding:'0.4%'
                            })
                        }


                    } else if (i == Slide.getNow(now, length)) {

                        Slide.setStyle(aLi[Slide.getNow(now, length)], {
                            WebkitTransform: 'translate3d(' + 0 + 'px, 0px, 0px)',
                            transform: 'translate3d(' + 0 + 'px, 0px, 0px)',
                            zIndex: 10,
                            WebkitTransition: 'all ' + 300 + 'ms ' + 'ease',
                            transition: 'all ' + 300 + 'ms ' + 'ease'
                        });
                        if(!that.defaults.fullScreen){
                            Slide.setStyle(aLi[Slide.getNow(now, length)],{
                                padding:'0'
                            })
                        }
                    } else if (i == Slide.getNext(now, length)) {
                        var runing=300;

                      /*  switch (sign) {
                            case '++':
                                runing = 0;
                                break;
                            case '--':
                                runing = 300;
                                break;
                            case '+=':
                                runing = 300;
                                break;
                            case '-=':
                                runing = 0;
                                break;
                            default:
                                break;
                        }*/

                        Slide.setStyle(aLi[Slide.getNext(now, length)], {
                            WebkitTransform: 'translate3d(' + w + 'px, 0px, 0px)',
                            transform: 'translate3d(' + w + 'px, 0px, 0px)',
                            zIndex: 10,
                            WebkitTransition: 'all ' + runing + 'ms ' + 'ease',
                            transition: 'all ' + runing + 'ms ' + 'ease'

                        })
                        if(!that.defaults.fullScreen){
                            Slide.setStyle(aLi[Slide.getNext(now, length)],{
                                padding:'0.4%'
                            })
                        }
                    }else if (i == Slide.getNextNew(now, length)) {
                        var runing;

                        switch (sign) {
                            case '++':
                                runing = 0;
                                break;
                            case '--':
                                runing = 300;
                                break;
                            case '+=':
                                runing = 300;
                                break;
                            case '-=':
                                runing = 0;
                                break;
                            default:
                                break;
                        }

                        Slide.setStyle(aLi[Slide.getNextNew(now, length)], {
                            WebkitTransform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            transform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            zIndex: 10,
                            WebkitTransition: 'all ' + runing + 'ms ' + 'ease',
                            transition: 'all ' + runing + 'ms ' + 'ease'

                        })
                        if(!that.defaults.fullScreen){
                            Slide.setStyle(aLi[Slide.getNextNew(now, length)],{
                                padding:'0.4%'
                            })
                        }
                    } else {

                        Slide.setStyle(aLi[i], {
                            WebkitTransform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            transform: 'translate3d(' + w*2 + 'px, 0px, 0px)',
                            zIndex: 9,
                            WebkitTransition: 'all ' + 0 + 'ms ' + 'ease',
                            transition: 'all ' + 0 + 'ms ' + 'ease'

                        })
                    }

                }


            } else {

                for (var i = 0; i < length; i++) {

                    Slide.setStyle(aLi[i], {
                        WebkitTransition: 'all ' + 300 + 'ms ' + 'ease',
                        transition: 'all ' + 300 + 'ms ' + 'ease'
                    })

                }

                if (now <= 0) {
                    now = 0;
                    this.now = 0;

                }
                if (now > length - 1) {

                    if (timer) {
                        now = 0;
                        this.now = 0;
                    } else {
                        now = length - 1;
                        this.now = length - 1;
                    }

                }

                for (var j = 0; j < length; j++) {
                    Slide.setStyle(aLi[j], {
                        WebkitTransform: 'translate3d(' + (-now * w) + 'px, 0px, 0px)',
                        transform: 'translate3d(' + (-now * w) + 'px, 0px, 0px)'
                    })
                }
            }


            // 是否是小按钮情况
            if (this.defaults.smallBtn) {
                for (var i = 0; i < this.btns.length; i++) {
                    this.btns[i].className = '';
                };

                if (this.need) {

                    this.btns[Slide.getNow(now, length / 2)].className = 'active';
                } else {
                    this.btns[Slide.getNow(now, length)].className = 'active';
                }

            }

            // 是否是数字情况
            if (this.defaults.number) {

                this.slideNub.innerHTML = ((Slide.getNow(now, length) + 1)%this.total==0?this.total:(Slide.getNow(now, length) + 1)%this.total);
            }



            aLi[Slide.getNow(now, length)].addEventListener("webkitTransitionEnd", end, false);
            aLi[Slide.getNow(now, length)].addEventListener("transitionend", end, false);

            // transitionend 回调参数
            function end() {

                // 判断是否达到跳转页面的条件
                if (that.defaults.location) {

                    if (endT < -(length - 1) * w - w / 5) {

                        // window.location.href = that.defaults.location;

                        if (that.defaults.lastImgSlider && typeof that.defaults.lastImgSlider == 'function') {
                            that.defaults.laseMoveFn(0);
                            that.defaults.lastImgSlider();
                        }

                    }
                }
                aLi[Slide.getNow(that.now, length)].removeEventListener("webkitTransitionEnd", end, false);
                aLi[Slide.getNow(that.now, length)].removeEventListener("transitionend", end, false);

            }

        },
        // 开启定时器
        play: function() {
            var that = this;
            that.timer = setInterval(function() {
                that.now++;
                that.tab(null, '++', true);
            }, this.defaults.playTime)
        },
        // 关闭定时器
        pause: function() {
            var that = this;
            clearInterval(that.timer);
        },
        // 屏幕翻转
        orientationchangeHandler: function() {
            var that = this;
            setTimeout(function() {
                that.liInit();
                // that.tab(null, '++', true);
            }, 300);
        },
        // 填充轮播图底部小按钮
        addSmallBtn: function(){
            var smallBtnHtml = '',
                aLi = this.aLi;
            for (var i = 0; i < aLi.length; i++) {
                if(i==this.defaults.startIndex){
                    smallBtnHtml+= '<span class="active" data-ol-btn="btn"></span>';
                }else{
                    smallBtnHtml+= '<span data-ol-btn="btn"></span>';
                }
            }
            return smallBtnHtml;
        },
        show:function(){
            this.oBox.style.display='inline-block';
        },
        hide:function(){
            this.oBox.style.display='none';
        }
    };

    // 静态方法  只写了浅拷贝 够用了
    Slide.extend = function(target, source) {

        for (name in source) {
            if (source[name] !== undefined) target[name] = source[name]
        }

    };

    // Slide 添加工具方法
    Slide.extend(Slide, {
        // 设置样式
        setStyle: function(obj, json) {

            for (name in json) {
                obj.style[name] = json[name];
            }
        },
        // 获取 translateX 值
        getTranX: function(obj) {
            var getT = obj.style.WebkitTransform || obj.style.transform;
            var getIndex = getT.indexOf('translate3d(');
            var nowT = parseInt(getT.substring(getIndex + 12, getT.length - 13));
            return nowT;
        },
        // 判断是否是移动发设备
        _device: function() {
            var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
            // var startEvt = hasTouch ? 'touchstart' : 'mousedown';
            // var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
            // var endEvt = hasTouch ? 'touchend' : 'mouseout';
            var startEvt = 'touchstart';
            var moveEvt = 'touchmove';
            var endEvt = 'touchend';

            return {
                hasTouch: hasTouch,
                startEvt: startEvt,
                moveEvt: moveEvt,
                endEvt: endEvt
            };
        },
        getNow: function(n, length) {
            return n % length
        },
        getPre: function(n, length) {
            if (n % length - 1 < 0) {
                var pre = length - 1
            } else {
                var pre = n % length - 1;
            }
            return pre;
        },
        getNext: function(n, length) {

            /*if (n % length + 1 > length - 1) {
                var next = 0;
            } else {
                var next = n % length + 1
            }*/
            var next=(n+1) % length;
            return next;
        },
        getNextNew: function(n, length) {
            var next = (n+2) % length;
            return next;
        },
        move: function(obj, x, index,tag) {
            var zIndex = index || null;
            if (zIndex) obj.style.zIndex = zIndex;

            Slide.setStyle(obj, {
                WebkitTransform: 'translate3d(' + x + 'px, 0px, 0px)',
                transform: 'translate3d(' + x + 'px, 0px, 0px)'
            });
            if(!tag){
                var num=parseFloat(x)/100;
                if(num>0.4){
                    num=0.4;
                }else if(-0.4<num<0){
                    num=(-num);
                }else if(num<=-0.4){
                    num=0.4
                }
                Slide.setStyle(obj, {
                    padding: num+'%'
                });
            }
        },
        stopDefault: function(ev) {

            if (ev && ev.preventDefault)
                ev.preventDefault();
            else
                window.event.returnValue = false;
            return false;
        },
        stopPropagation: function(ev) {

            if (ev && ev.stopPropagation)
                ev.stopPropagation();
            else
                ev.cancelBubble = true;
        }

    });


    return slide;
})();
export default {
	ready() {
		slide('#slider').init({
	    loop:true,
	    smallBtn:true,
	    autoPlay:true,
	    autoHeight:true,
	    playTime:3000
		});
	}
}	

</script>

<style>
.slider-floor {
    padding: 0px;
}

.slider-wrapper{
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    position: relative;
    height: auto;
}
.new-slide{
    margin:0;
    padding: 0;
    position: relative;
    overflow: hidden;
    height: 90px;
}
.new-slide:after{
    clear: both;
    content: ".";
    height: 0px;
    visibility: hidden;
    display: block;
    font-size: 0px;
}
.slide-li {
    width: 100%;
    visibility: visible;
    background-color: #fff;
    float: left;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
}
.slide-li img{
    display: block;
    overflow: hidden;
    width:100%;
}
.focus-btn{
    overflow: hidden;
    text-align: center;
    position: absolute;
    bottom:0;
    left: 0;
    z-index: 11;
    width: 100%;
}
.focus-btn span{
    border-radius: 7px;
    -webkit-border-radius: 7px;
    -ms-border-radius: 7px;
    height: 7px;
    width: 7px;
    background: #FFF;
    margin:0 4px;
    display: inline-block;
    opacity: 0.2;
}
.focus-btn .active{ opacity:1; }
.slider {
    background: #fff;
    position: relative;
}
</style>