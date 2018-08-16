<style lang='less'>
@gray_color: #9da3a8;
@right_color: #56bd88;
.slider-verify{
    position: relative;
    text-align: center;
    border: 1px solid;
    box-sizing: border-box;
    border-color: @gray_color;
    color: @gray_color;
    .handler{
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 70px;
	    height: 100%;
	    box-sizing: border-box;
	    cursor: move;
	    font-weight: 900;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    color: #fff;
        background-color: @gray_color;
        &.right {
            background-color: @right_color;
        }
	    .default-handler {
	    	width: 3px;
	    	background-color: #fff;
	    	height: 50%;
	    	position: relative;
	    	&::before, &::after {
	    		content: '';
	    		width: 3px;
	    		height: 60%;
	    		background-color: #fff;
	    		position: absolute;
	    		top: 17%;
	    		left: 10px;
	    	}
	    	&::after {
	    		left: -10px;
	    	}
	    }
	    .right-handler {
	    	width: 32%;
	    	height: 20%;
	    	margin-top: -16%;
	    	border-left: 2px solid #fff;
	    	border-bottom: 2px solid #fff;
	    	transform: rotate(-42deg);
	    }
	}
	.drag_bg{
	    background-color: transparent;
	    height: 100%;
	    width: 0;
	}
	.drag_text{
	    position: absolute;
	    top: 0px;
	    width: 100%;
	    user-select: none;
        &.right {
            color: @right_color;
        }
	}
}
</style>
<template>
	<div class="slider-verify" :style="'height:'+e_height+';width:'+e_whidth+'px'">
	    <div class="drag_bg" :style="'width:'+handler_left+'px'"></div>
	    <div :class="'drag_text'+(confirmSuccess?' right':'')" :style="'line-height:'+e_height">{{confirmWords}}</div>
	    <div @mousedown="mousedownFn" :class="'handler'+(confirmSuccess?' right':'')" :style="'left:'+handler_left+'px;transition: left '+ani_time+'s ease-out;'">
	    	<div v-if="!confirmSuccess" class="default-handler"></div>
	    	<div v-else class="right-handler"></div>
	    </div>
	</div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: {
        	e_height: {
        		default: '50px'
        	},
        	e_whidth: {
        		default: '450'
        	}
        },
        data () {
            return {
                beginClientX:0,      /*距离屏幕左端距离*/
                ani_time: 0,
                mouseMoveStata:false,    /*触发拖动状态  判断*/
                maxwidth:this.e_whidth - 70,       /*拖动最大宽度，依据滑块宽度算出来的*/
                confirmWords:'请按住滑块，拖动到最右边',      /*滑块文字*/
                confirmSuccess:false,              /*验证成功判断*/
                handler_left: 0
            }
        },
        methods: {
            reset(){
                this.beginClientX = 0;
                this.confirmSuccess = false;
                this.handler_left = 0;
                document.body.addEventListener('mousemove', this.mousemoveHandle);
                document.body.addEventListener('mouseup', this.mouseupHandle);
            },
            mousedownFn(event) {
                this.mouseMoveStata = true;
                this.beginClientX = event.clientX;
            },
            successFunction(){
                document.body.removeEventListener('mousemove', this.mousemoveHandle);
                document.body.removeEventListener('mouseup', this.mouseupHandle);
                this.confirmWords = '验证通过'
                this.handler_left = this.maxwidth;
                this.confirmSuccess = true;
                this.$emit('onVerifyRes', true);
            },
            mousemoveHandle(event) {
                if(this.mouseMoveStata){
                    var width = event.clientX - this.beginClientX;
                    if(width>0 && width<=this.maxwidth){
                        this.handler_left = width;
                    }else if(width>this.maxwidth){
                        this.successFunction();
                    }
                }
            },
            mouseupHandle(event) {
                if(this.handler_left) {
                    this.mouseMoveStata = false;
                    var width = event ? event.clientX - this.beginClientX : 0;
                    if(width < this.maxwidth){
                        this.ani_time = 0.3;
                        this.handler_left = 0;
                        var self = this;
                        setTimeout(() => {
                            self.ani_time = 0;
                        }, this.ani_time);
                    }
                }
            }
        },
        mounted(){
            this.reset();
        }
    }
</script>