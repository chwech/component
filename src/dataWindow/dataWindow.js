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
			closeHandler: null,
			//confirm弹窗设置
			confirmBtnText: '确定',
			cancelBtnText: '取消' ,
			confirmHandler: null,
			cancelHandler: null,
			//prompt弹窗
			promptBtnText: '确定',
			isPromptInputPassword: false,
			defaultValuePromptInput: "",
			maxlengthPromptInput: 10,
			promptBtnHandler:null
		};
	}
	//添加dom
	renderUI(){
		console.log(this);
		var footerContent = "";
		var bodyContent = "";
		switch(this.config.winType){
			case "alert":
				footerContent = `<input type = "button" value = ${this.config.buttonText} class = "window_alertBtn">`;
				break;
			case "confirm":
				footerContent = `<input type = "button" value = ${this.config.confirmBtnText} class = "window_confirmBtn">
					               <input type = "button" value = ${this.config.cancelBtnText} class = "window_cancelBtn">`;
				break;
			case "prompt":
				this.config.content = `<p class="window_promptInputWrapper">
													${this.config.content}
													<input type= ${this.config.isPromptInputPassword?"password":"text"} value= ${this.config.defaultValuePromptInput} maxlength= ${this.config.maxlengthPromptInput} class="window_promptInput"/>
											 </p>`;
				footerContent = `<input type="button" value= ${this.config.promptBtnText} class="window_promptBtn" />
				                 <input type="button" value= ${this.config.cancelBtnText} class="window_cancelBtn" />`;
				break;				                 
		}
		this.boundingBox = $(
		`<div class = "window_boundingBox">
		  <div class="window_header"> ${this.config.title} </div>
		  <div class="window_body"> ${this.config.content} </div>
		  <div class="window_footer"> ${footerContent} </div>
		 </div>`
		);
		this._promptInput = this.boundingBox.find(".window_promptInput");
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
		console.log(this);
		this.boundingBox.delegate(".window_alertBtn", "click", () => {
			console.log(this);
			this.fire("alert");
			this.destroy();
		}).delegate(".window_closeBtn", "click", () => {
			console.log(this);
			this.fire("close");
			this.destroy();
		}).delegate(".window_confirmBtn", "click", ()=>{
			this.fire("confirm");
			this.destroy();
		}).delegate(".window_cancelBtn", "click", ()=>{
			this.fire("cancel");
			this.destroy();
		}).delegate(".window_promptBtn", "click", ()=>{
			this.fire("prompt", this._promptInput.val());
			this.destroy();
		});
		//自定义事件
		if(this.config.handler){
			this.on("alert", this.config.handler);
		}
		if(this.config.closeHandler){
			this.on("close", this.config.closeHandler);
		}
		if(this.config.confirmHandler){
			this.on("confirm", this.config.confirmHandler);
		}
		if(this.config.cancelHandler){
			this.on("cancel", this.config.cancelHandler);
		}
		if(this.config.promptBtnHandler){
			this.on("prompt", this.config.promptBtnHandler);
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
			this.boundingBox.addClass(this.config.skinClassName);
		}
	}
	//销毁前的处理
	destructor(){
		console.log(this.mask);
		this.mask && this.mask.remove();
	}
	alert(config){
		$.extend(this.config, config, {winType: "alert"});
		this.render();
		return this;
	}
	confirm(config){
		$.extend(this.config, config, {winType: "confirm"});
		this.render();
		return this;
	}
	prompt(config){
		$.extend(this.config, config, {winType: "prompt"});
		this.render();
		this._promptInput.focus();//输入框自动获得焦点
		return this;
	}
}
export {dataWindow};