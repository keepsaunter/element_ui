<style>
	#app {
		padding-top: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
<template>
  <div id="app">
    <router-view/>
    <btnGroup :selected.sync="btn_selected" style="width: 500px;margin-bottom: 50px;" :texts="['多层筛选','自定义输入框','手机验证码','滑动验证模拟']"></btnGroup>
    <multiFilter v-if="btn_selected===0"></multiFilter>
    <cusInput v-if="btn_selected===1" type="text" no_space="true" has_err_span="true" :v_input.sync="v_input" :v_input_error.sync="v_input_error" @errorCheck="inputCheck"></cusInput>
    <verifyCode v-if="btn_selected===2" :code_input.sync="verifycode_input" @reqPhoneVerify="reqPhoneVerify"></verifyCode>
    <sliderVerify v-if="btn_selected===3"></sliderVerify>
  </div>
</template>

<script>
import multiFilter from 'components/multi_filter.vue';
import btnGroup from 'components/btn_group.vue';
import cusInput from 'components/cus_input.vue';
import verifyCode from 'components/verify_code.vue';
import sliderVerify from 'components/slider_verify.vue';
export default {
  name: 'App',
  data:()=>({
  		btn_selected: 0,
  		v_input: null,
  		v_input_error: null,

  		verifycode_input: ''
  }),
  methods: {
  	inputCheck() {
  		this.v_input_error = this.v_input=='test' ? '' : 'value != test';
  	},
  	reqPhoneVerify() {

  	}
  },
  components: {
  	multiFilter,
  	btnGroup,
  	cusInput,
  	verifyCode,
  	sliderVerify
  }
}
</script>