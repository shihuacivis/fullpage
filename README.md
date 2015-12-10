fullpage
========

兼容主流移动端及现代浏览器的fullpage划屏效果

与其它常见的fullpage插件比具备以下特性:
- 1. 精简小巧。基于简单够用的设计思路，几kb能完成的事情何苦用几十kb来做。
- 2. 不依赖jQuery或Zepto等常用库。
- 3. 初始化和开启步骤分离。页面的active动画可以晚于初始化执行。（应用场景举例：进行预加载工作或者其它任务之后可能有过场动画或延时之后再进入fullpage动画）
- 4. 手指滑动过程中，前后页面也会随之响应，更加适合页面场景连贯的项目。

a plugin of fullpage effect for common moblie browser (IOS / ANDROID) and morden pc browser.

feature compared with other's fullpage:
- 1. simple but enough for regular uses. only 4kb for min size(max for 7kb).
- 2. you can use it without jQuery or zepto.
- 3. you can start the active effect later than initialization work.
- 4. it will be effective when you touchmoving on the screen too, not only when touchended. in other words, it will gain a better performance when the backgrounds of your pages are continuous. 

## Usage

必需文件：
- fullpage.js
- fullpage.css


css样式

``` css

/* 初始化样式, 插件默认的页面容器类为.section */
/* tool uses '.section' for page container, so put init effect in it.  */
.section h3 {
	/* something you'd like to show original */
}

/* 插件默认向当前页添加active类，所以将划入后动画效果写在active类里 */
/* the page container the will be added '.active' automaticly */
.active.section h3{
	/* something you'd like to show when it comes to the screen */	
}

```

html结构：

``` html

	<div class="section-wrap" id="section-wrap">

	    <section class="section section-one">
	    </section>

	</div>

```

``` html

	<div class="section-wrap" id="section-wrap">

	    <section class="section section-one">
	    </section>

	</div>

```

js调用：

``` js

	// fullpage初始化
	fp1 = new fullpage({
		'id': '#section-wrap'                 // * 必填  页面的容器id
		, 'direction': 'Y'                    // * 必填  滚动的方向
		, 'startpage': 1                      // 选填 起始的页面，默认值为0
		, 'callback': function(index){        // 选填 页面滑动结束后的回调函数
		  console.log('当前页面：'+ index);  
		}
	});
	fp1.start(); // 开始执行初始页面的效果

```

## API接口

`prev()`  滑回上一页

`next()`  直接滑入下一页

`index()` 返回当前的页码(从0开始)

`go(idx)` 滑到第idx页
