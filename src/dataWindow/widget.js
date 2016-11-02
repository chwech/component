import $ from 'jquery';
class widget{
	
	constructor(){
		this.boundingBox = null; // 属性：最外层容器
	}
	//自定义事件
	on(type, handler){
		if(typeof this.handlers[type] == "undefined"){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
		return this;// 级联
	}

	fire(type, data){
		if(this.handlers[type] instanceof Array){
			let handlers = this.handlers[type];
			for (let i = 0, len = handlers.length; i < len; i++) {
				handlers[i](data);
			}
		}
	}
	//接口：添加dom节点
	renderUI(){
	}
	//接口：监听事件
	bindUI(){
	}
	// 接口：初始化组件属性
	syncUI(){
	}
	//接口：销毁前的处理函数
	destructor(){
	
	}
	// 方法：渲染组件
	render(container){
		this.renderUI();
		this.handlers = {};
		this.bindUI();
		this.syncUI();
		$(container || document.body).append(this.boundingBox);
	}
	destroy(){
		this.destructor();
		this.boundingBox.off(); //删除事件
		this.boundingBox.remove();
	}
}
export {widget};