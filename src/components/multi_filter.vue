<style lang='less'>
	.cus-popover {
		margin: 10px auto;
		width: 300px;
		user-select: none;
		.el-select {
			display: unset;
		}
		.el-form-item {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		input {
			width: 100%;
			height: 32px;
		}
	}
	.multi-selector {
		display: inline-block;
		padding: 5px;
		border: 1px solid #999690;
		border-radius: 3px;
		min-height: 23px;
		padding-right: 32px;
		position: relative;
		user-select: none;

		.filter-tag {
			background-color: #999690;
			color: #fff;
			cursor: pointer;
			height: 22px;
			line-height: 21px;
			&:hover {
				background-color: #777470;
			}
		}
		.search-btn {
			position: absolute;
			right: 1%;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
		}
	}
</style>
<template>
	<el-popover
	  placement="bottom"
	  width="330"
	  v-model="popover_show"
	  trigger="click">
	  <div class="cus-popover">
	  	<el-form label-width="80px" label-position="left">
			  <el-form-item label="日期">
		    	<el-date-picker
			      type="date"
			      v-model="date"
			      class="form-input"
			      :editable="false"
			      format="yyyy-MM-dd"
			      placeholder="选择日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="订单状态">
			  	<el-select v-model="order_status_index" class="form-input" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in status_data"
				      :key="item.k"
				      :label="item.t"
				      :value="index">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="订单编号">
			    <el-input v-model="order_num" class="form-input"></el-input>
			  </el-form-item>
			  <div style="display:flex;padding-top: 15px;">
			  	<div style="flex-grow:1">
			  		<el-button type="text" size="mini" @click="clearSelect">清空筛选项</el-button>
			  	</div>
			  	<div>
			  		<el-button size="mini" @click="selectCancel">取消</el-button>
			  		<el-button type="primary" size="mini" @click="selectComfirm">确定</el-button>
			  	</div>
			  </div>
			</el-form>
	  </div>
	  <div slot="reference" class="multi-selector" :style="'min-width:'+cWidth">
			<el-tag size="mini" class="filter-tag" v-if="date">{{date|dateFormat3}}</el-tag>
			<el-tag size="mini" class="filter-tag" v-if="order_status_index!==''">{{order_status_text}}</el-tag>
			<el-tag size="mini" class="filter-tag" v-if="order_num!=''">{{order_num}}</el-tag>
			<iconSearch class="search-btn"></iconSearch>
		</div>
	</el-popover>
</template>
<script>
	import iconSearch from 'components/icon_folder_search.vue'
	export default {
		props: {
			cWidth: {
				default: '260px'
			}
		},
		data(){
			return {
				date:'',
				order_status_index: '',
				order_num: '',
				status_data: [
					{ k:0,t:'已取消' },
					{ k:1,t:'等待付款' },
					{ k:2,t:'已完成'}
				],
				selected_arr_bak: {},
				popover_show: false
			}
		},
		computed: {
			order_status_text() {
				return this.order_status_index==='' ? '' : this.status_data[this.order_status_index].t;
			}
		},
		methods: {
			clearSelect() {
				this.selected_arr_bak = {};
				this.date = this.order_status_index = this.order_num = '';
			},
			selectComfirm() {
				this.popover_show = false;
				this.selected_arr_bak = {
					date: this.date,
					order_status_index: this.order_status_index,
					order_num: this.order_num
				}
				//触发父组件事件
				this.$emit('filterChange', this.selected_arr_bak);
			},
			selectCancel() {
				this.date = this.selected_arr_bak.date,
				this.order_status_index=this.selected_arr_bak.order_status_index,
				this.order_num = this.selected_arr_bak.order_num,
				this.popover_show = false;
			}
		},
		components: {
			iconSearch
		}
	}
</script>