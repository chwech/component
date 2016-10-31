'use strict';
import './dataWindow/dataWindow.css';
import $ from 'jquery'; //成功
//import {$} from 'jquery';//报错
import {dataWindow} from './dataWindow/dataWindow';
console.log(dataWindow)
$(document).ready( ()=>{
	const div = document.createElement('div');
	div.innerHTML = "<h1>hello world</h1>"
	document.body.appendChild(div);
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
