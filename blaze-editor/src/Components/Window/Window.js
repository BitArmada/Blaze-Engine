import './Window.css';
import React from 'react';

// import { VscClose } from "react-icons/vsc";
// import { VscChromeMaximize } from "react-icons/vsc";
// import { VscChromeMinimize } from "react-icons/vsc";

var _count = 0;
var focused = 0;

class Window extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			x: props.x ?? 0,
			y: props.y ??  0,
			width: props.width ?? 400,
			height: props.height ??200,
			title: props.title ?? 'Blaze Window',
		}
		this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)+_count;
		//Window.prototype.focused = this.id;
		
		_count++;
	}
	drag(event){

		// focus on this window
		focused = this.id;
		
		var offX = event.clientX-this.state.x;
		var offY = event.clientY-this.state.y;

		var mousemoveListener = mousemove.bind(this);
		var mouseupListener = mouseUp.bind(this);
		
		document.addEventListener('mousemove', mousemoveListener);
		document.addEventListener('mouseup', mouseupListener);

		function mousemove(e){
			this.setState({
				x: e.clientX-offX,
				y: e.clientY-offY,
			});
		}

		function mouseUp(){
			document.removeEventListener('mousemove', mousemoveListener);
			document.removeEventListener('mouseup', mouseupListener);
		}
	}

	resizeCursor(e){
		var offX = e.clientX-this.state.x;
		var offY = e.clientY-this.state.y;

		var resizeDir = this.getResizeDirection(offX, offY);
		
		if(resizeDir.left && resizeDir.bottom){
			e.target.style.cursor = 'nesw-resize';
		}else if(resizeDir.right && resizeDir.bottom){
			e.target.style.cursor = 'nwse-resize';
		}else if(resizeDir.left || resizeDir.right){
			e.target.style.cursor = 'ew-resize';
		}else if(resizeDir.bottom){
			e.target.style.cursor = 'ns-resize';
		}else{
			e.target.style.cursor = 'auto';
		}
	}

	getResizeDirection(x, y){
		var out = {
			left: false,
			right: false,
			bottom: false,
		};
		if(x<8){
			out.left = true;
		}
		if(x > this.state.width-8){
			out.right = true;
		}
		if(y > this.state.height-8){
			out.bottom = true;
		}
		return out;
	}

	resize(e){
		var offX = e.clientX-this.state.x;
		var offY = e.clientY-this.state.y;

		var resizeDir = this.getResizeDirection(offX, offY);

		var mousemoveListener = mousemove.bind(this);
		var mouseupListener = mouseUp.bind(this);
		
		document.addEventListener('mousemove', mousemoveListener);
		document.addEventListener('mouseup', mouseupListener);

		var startState = this.state;
		
		function mousemove(ev){
			var x = ev.clientX-this.state.x;
			var y = ev.clientY-this.state.y;
			if(resizeDir.bottom && resizeDir.right){
				this.setState({
					width: x,
					height: y,
				});
			}else if(resizeDir.bottom && resizeDir.left){
				this.setState({
					x: ev.clientX-offX,
					width: startState.width-(ev.clientX-startState.x),
					height: y
				});
			}else if(resizeDir.bottom){
				this.setState({
					height: y,
				});
			}else if(resizeDir.left){
				this.setState({
					x: ev.clientX-offX,
					width: startState.width-(ev.clientX-startState.x)
				});
			}else if(resizeDir.right){
				this.setState({
					width: x,
				});
			}
		}

		function mouseUp(){
			document.removeEventListener('mousemove', mousemoveListener);
			document.removeEventListener('mouseup', mouseupListener);
		}
	}

	maximize(){
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
			x: 0,
			y: 0,
		})
	}
	
	render(){
		const style = {
			position: 'absolute',
			zIndex: Math.random()*100,//(this.id == focused) ? '-1': '1',
			width: this.state.width,
			height: this.state.height,
			top: `${this.state.y}px`,
			left: `${this.state.x}px`,
			borderRadius: '5px',
			// border: '5px solid red',
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: 'var(--secondary-bg-color)',
			display: 'flex',
			flexFlow: 'column',
			boxShadow: '0px 0px 20px -5px black',
		}
		return (
			<div style={style}>
				<div className = 'window__frame' onMouseDown = {this.drag.bind(this)}>
					{this.state.title}
					<div className = 'window__options'>
						{/* <button className = 'window__option'>
							<VscChromeMinimize/>
						</button>
						<button className = 'window__option' onClick = {this.maximize.bind(this)}>
							<VscChromeMaximize/>
						</button>
						<button className = 'window__option'>
							<VscClose/>
						</button> */}
					</div>
				</div>
				<div
					className = 'window__body'
					onMouseMove = {this.resizeCursor.bind(this)}
					onMouseDown = {this.resize.bind(this)}
					>
					
					{this.props.children}
					
				</div>
			</div>
		);
	}
}

export default Window;