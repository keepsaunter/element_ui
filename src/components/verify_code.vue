<style lang='less'>
	.verify-code {
		.input_verify_code {
			width: 100%;
			display: flex;
			input {
				width: inherit;
				border-radius: 0;
			}
			.verify-code-btn {
				white-space: nowrap;
		    display: flex;
		    align-items: center;
		    width: 200px;
		    text-align: center;
		    justify-content: center;
				cursor: pointer;
				color: #fff;
				user-select: none;
				background-color: #56bd88;
				&.btn-disable {
					background-color: #C7CCD3;
					cursor: not-allowed;
				}
			}
		}
	}
</style>
<template>
	<div class="verify-code">
		<el-row class="tt-l3">{{code_title}}</el-row>
		<el-row class="input_verify_code">
			<el-input class="form-input" v-model="verify_code_input" @input="verifyCodeInput" maxlength=4></el-input>
			<div :class="'verify-code-btn '+(!can_req||interval_time? 'btn-disable':'')" @click="reqVerifyCode(this)">{{interval_time?interval_time+'s 后重新获取':'获取验证码'}}</div>
		</el-row>
	</div>
</template>
<script>
	export default {
		props: {
			code_input: {
				default: ''
			},
			code_title: {
				default: '验证码'
			},
			can_req: {	//外部设置初始时能否获取验证码
				default: true
			}
		},
		data: () => {
			return {
				verify_code_input: this.code_input,
				interval_time: 0,
				interval_timer: null
			}
		},
		methods: {
			verifyCodeInput: function() {
				this.$emit('update:code_input', this.verify_code_input);
			},
			reqVerifyCode: function() {
				if(this.can_req && this.interval_time === 0) {
					this.$emit('reqPhoneVerify');
					this.interval_time = 60;
					this
					this.interval_timer = setInterval(() => {
						this.interval_time --;
						if(this.interval_time == 0) {
							clearInterval(this.interval_timer);
						}
					}, 1000);
				}
			}
		},
		beforeDestory() {
			if(this.interval_timer) {
				clearInterval(this.interval_timer);
			}
		}
	}
</script>