window.addEventListener('load', function () {

    // 轮播图js
    var focus = document.querySelector('.focus');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    var banner = document.querySelector('.banner');
    //鼠标移动到banner模块，左右箭头显示，轮播图禁止自动轮播
    banner.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        //清除定时器
        clearInterval(timer);
        timer = null;
    });
    //鼠标离开banner模块，左右箭头显示，轮播图自动轮播
    banner.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            next.click();
        }, 2000);
    });

    //动态生成小圆点，根据图片数量来自动生成
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.promo-dot');


    //num定义序号，用来相应小圆点li中index和图片序号circle变化
    var num = 0;
    var circle = 0;
    //遍历小圆点的生成，根据图片输数量
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        //给所有小圆点绑定事件
        li.addEventListener('click', function () {
            //排他思想只给一个li 有className,其余清零
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = " ";
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            //点击小圆点图片也得跟着移动
            num = index;
            circle = index;

            animate(ul, -index * focusWidth);
        });
    }
    //把ol里面第一个小li设置类名为current
    ol.children[0].className = 'current';
    //克隆第一章图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //flag 节流阀
    //因为有些动画需要两秒才结束，使得小点反应有延迟，跨越两点点击只做一次动画转场
    var flag = true;
    //右箭头的监听事件
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // 走到复制的最后一张图片，快速回到左边
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            // 小圆点也跟着变化
            circle++;
            //到达底部也跟着返回第一张图片
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用跳转圆点函数
            circleChange();
        }
    });
    //左箭头按钮做法
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true; //开启节流阀
            });
            // 圆点也减
            circle--;
            if (circle < 0) {
                circle = ol.children.lenght - 1;
            }
            circleChange();
        }
    });

    //小圆点变化，当前圆点对应的图片样式变成current
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    //如果不动，默认一段时间触发一次右箭头点击事件
    var timer = setInterval(function () {
        next.click();
    }, 2000)
})