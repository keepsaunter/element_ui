<style lang='less'>
	.cus-input {
		.input-error {
        input {
            border-color: #f00 !important;
        }
    }
		input[type=number] {  
	    -moz-appearance:textfield;
		}
		input[type=number]::-webkit-inner-spin-button,  
		input[type=number]::-webkit-outer-spin-button {  
		    -webkit-appearance: none;
		}
		.error-span {
	    position: absolute;
	    top: 50%;
	    margin-top: -5px;
	    left: 100%;
	    line-height: 10px;
	    white-space: nowrap;
	    &::before {
		    content: '✖';
		    color: red;
		    margin: 0 6px 0 20px;
			}
			&.isok::before {
    		content: '✔';
				color: #56bd88;
			}
	  }
	}
</style>
<template>
	<el-row :id="'input_'+name" class="cus-input">
		<el-input :placeholder="placeHolder" @keyup.native="keyupHandle" :title="has_err_span?'':v_input_error" :type="type" @keypress.native="keypressHandle" :class="'form-input'+(v_input_error?' input-error':'')" :maxlength="maxlength" v-model="v_input_val" @change="inputHandle(1)" @input="inputHandle(2)">
			<template slot="append"><slot name="append"></slot></template>
		</el-input>
		<div :class="'error-span'+(v_input_error?'':' isok')" v-if="has_err_span && v_input_error!=null">{{v_input_error}}</div>
	</el-row>
</template>
<script>
	export default {
		props: {
			name: '',
			v_input: '',
			v_input_error: {
				default: null
			},
			has_err_span: {	//是否显示错误信息
				default: false
			},
			type: {
				default: 'text'
			},
			no_space: {	//不支持空格输入
				default: false
			},
			no_chinese: {	//不支持中文输入
				default: true
			},
			maxlength: '',
			max_decimals_len: '',	//最大小数位
			right_length: '',	//延迟检测时设置一个提前检测的输入长度
			placeHolder: '',
			delay_check: {	//是否延迟检测，第一次检测在失去焦点后
				default: true
			}
		},
		data(){
			return {
				v_input_val: this.v_input
			}
		},
		watch: {
			v_input_val() {
				this.$emit('update:v_input', this.v_input_val);
			}
		},
		methods: {
			keyupHandle() {
				if(this.v_input_val && this.no_chinese) {
					this.v_input_val = this.v_input_val.replace(/[\u4e00-\u9fa5]/g, '');
				}
			},
			keypressHandle(event){
				var res = true;
				if(this.type=='number') {
					var t_decimals_len = this.max_decimals_len;
					var t_v_input_val = this.v_input_val;
					var v_index = t_v_input_val?t_v_input_val.indexOf('.'):-1;
					if(t_decimals_len && t_v_input_val) {
						if(~v_index && (t_v_input_val.length - v_index) > t_decimals_len) {
							res = false;
							this.$message({
		            type: 'warning',
		            message: '小数位长度不超过'+t_decimals_len+'位'
		          });
						}
					}
					var reg_exp = t_decimals_len==0 || (t_v_input_val && ~v_index) ? /[\d]/ : /[\d\.]/;
					res = res && reg_exp.test(String.fromCharCode(event.keyCode));
				}else if(this.no_space) {
					res = event.keyCode != 32
				}
				if(!res) {
					event.preventDefault();
				}
				return res;
			},
			inputHandle(type) {
				var temp_v_input = this.v_input_val;
				if(temp_v_input == null) return null;
				if(this.delay_check && ((type == 1 && this.v_input_error != null) || (type == 2 && this.v_input_error == null && temp_v_input.length!=this.right_length)))
					return null;
				//触发错误检测
				this.$nextTick(()=>{this.$emit('errorCheck');})
			},
		}
	}
</script>