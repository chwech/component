'use strict';
import {widget} from './widget';
import $ from 'jquery';
class dataWindow extends widget{ //es6 class 继承。 用extends关键字。这里是 dataWindow 继承了 widget
	constructor(){
		super(); //子类的constructor()方法中，必须调用super()方法，否则新建实例时会报错。如果子类没有constructor()，这个方法会默认添加
		this.config = {
			//标题
			title: "系统消息",
			//默认宽高
			width: 500,
			height: 300,
			//
			hasAlertBtn: true,
			//是否有关闭按钮
			hasCloseBtn: false,
			//定制按钮标题
			buttonText: '确定',
			//模态
			hasMask: true,
			//定制皮肤
			skinClassName: null,
			//内容
			content:"",
			//确定按钮回调
			handler: null,
			//关闭按钮回调
			closeHandler: null
		};
	}
	//添加dom
	renderUI(){
		console.log(this);
		this.boundingBox = $(
		`<div class = "window_boundingBox">
		  <div class="window_header"> ${this.config.title} </div>
		  <div class="window_body"> ${this.config.content} </div>
		  <div class="window_footer">
		    <input class="window_alertBtn" type="button" value=${this.config.buttonText} />
		  </div>
		 </div>`
		);
		//模态
		if(this.config.hasMask){
			this.mask = $('<div class="window_mask"></div>');
			this.mask.appendTo('body');
		}
		//定制关闭按钮
		if(this.config.hasCloseBtn){
			this.boundingBox.append('<span class="window_closeBtn">×</span>');
		}
		this.boundingBox.appendTo("body");
	}
	// 绑定事件
	bindUI(){
		console.log(this.boundingBox);
		this.boundingBox.delegate(".window_alertBtn", "click", () => {
			console.log(this);
			this.fire("alert");
			this.destroy();
		}).delegate(".window_closeBtn", "click", () => {
			console.log(this);
			this.fire("close");
			this.destroy();
		});
		if(this.config.hasAlertBtn){
			console.log(this.config.handler)
			this.on("alert", this.config.handler);
		}
		if(this.config.hasCloseBtn){
			console.log(this.config.closeHandler)
			this.on("close", this.config.closeHandler)
		}
	}
	//样式处理
	syncUI(){
		console.log(this);
		//定制宽高, 位置
		this.boundingBox.css({
			width: this.config.width + 'px',
			height: this.config.height + 'px',
			left: (this.config.x || (window.innerWidth - this.config.width)/2) + "px",
			top: (this.config.y || (window.innnerHeight - this.config.height)/2) + "px"
		});
			//定制皮肤
		if(this.config.skinClassName){
			boundingBox.addClass(this.config.skinClassName);
		}
	}
	//销毁前的处理
	detructor(){
		console.log(this);
		this.mask && this.mask.remove()
	}
	alert(config){
		$.extend(this.config, config);
		this.render();
		return this;
	}
	confirm(){
	}
	prompt(){
	}
}
export {dataWindow};