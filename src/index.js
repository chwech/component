'use strict';
import './dataWindow/dataWindow.css';
import $ from 'jquery'; //成功
//import {$} from 'jquery';//报错
import {dataWindow} from './dataWindow/dataWindow';
console.log(dataWindow)
$(document).ready( ()=>{
	var button = $(
		`<input type="button" value="alert弹窗"/>
		<input type="button" value="confirm弹窗"/>
		<input type="button" value="prompt弹窗"/>`);
	$("body").append(button);

	$("input[value='alert弹窗']").bind('click', ()=>{
		var _window = new dataWindow();
		_window.alert({
		title: '提示',
		content: 'alert弹窗',
		width: 500,
		height: 300,
		y: 50,
		buttonText: 'OK',
		hasCloseBtn: true,
		skinClassName: 'skin_a',
		handler:() =>{
			console.log('你点击了确定按钮');
		},
		closeHandler: () => {
			console.log('你点击了关闭按钮');
		}
	 }).on("alert", ()=>{
		console.log("alert事件")
		}).on("alert", ()=>{
			console.log("alert事件2")
		}).on("close", ()=>{
			console.log("close事件")
		}).on("close", ()=>{
			console.log("close事件2")
		});
	});

	$("input[value='confirm弹窗']").bind('click', ()=>{
		var _window = new dataWindow();
		_window.confirm({
		title: '系统消息',
		content: 'confirm弹窗。你确定要删除这个文件吗？',
		width: 500,
		height: 300,
		y: 50,
		skinClassName: 'skin_a',
		//confirm弹窗设置
		confirmBtnText: '是',
		cancelBtnText: '否' ,
		confirmHandler: ()=>{
			console.log('你点击了是');
		},
		cancelHandler: ()=>{
			console.log('你点击了否');
		}
	}).on("confirm", ()=>{
		console.log("confirm事件")
		}).on("confirm", ()=>{
			console.log("confirm事件2")
		}).on("cancel", ()=>{
			console.log("cancel事件")
		}).on("cancel", ()=>{
			console.log("cancel事件2")
		});
	});

	$("input[value='prompt弹窗']").bind('click', ()=>{
		var _window = new dataWindow();
		_window.prompt({
		title: '请输入你的名字',
		content: 'prompt弹窗。我们将会为你保密你输入的信息',
		width: 500,
		height: 300,
		y: 50,
		skinClassName: 'skin_a',
		//confirm弹窗设置
		promptBtnText: '输入',
		cancelBtnText: '取消' ,
		defaultValuePromptInput: '张三',
		promptBtnHandler: ()=>{
			console.log('你点击了输入');
		},
		cancelHandler: ()=>{
			console.log('你点击了取消');
		}
	}).on("prompt", ()=>{
		console.log("prompt事件")
		}).on("prompt", ()=>{
			console.log("prompt事件2")
		}).on("cancel", ()=>{
			console.log("cancel事件")
		}).on("cancel", ()=>{
			console.log("cancel事件2")
		});
	});
	
});
