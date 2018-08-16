<style lang='less'>
	.btn-group {
		background-color: #D7D7D7;
		color: #fff;
		white-space: nowrap;
		display: flex;
		width: 100%;
		cursor: pointer;
		user-select: none;
		.btn {
			padding: 8px 0px;
			text-align: center;
			flex-grow: 1;
			&.selected {
				background-color: #668CD8;
			}
		}
	}
</style>
<template>
	<div class="btn-group">
		<div :class="'btn'+(!selected_isarray&&selected==index||(selected_isarray&&~selected.indexOf(index)) ? ' selected':'')" v-for="(item, index) in texts" @click="triggerChange(index)">{{item}}</div>
	</div>
</template>
<script>
	export default {
		props: {
			texts: {
				default: () => []
			},
			mult_select: {
				default: false
			},
			selected: {
				default: '0'
			}
		},
		computed: {
			selected_isarray() {
				return Object.prototype.toString.call(this.selected)=='[object Array]';
			}
		},
		methods: {
			triggerChange(index) {
				if(index != undefined) {
					var t_selected = this.selected;
					if(this.selected_isarray) {
						var search_index = t_selected.indexOf(index);
						if(~search_index) {
							if(this.mult_select){
								t_selected.splice(search_index, 1);
							}
						}else {
							if(!this.mult_select){
								t_selected = [];
							}
							t_selected.push(index);
						}
						this.$emit('update:selected', t_selected);
					}else {
						if(t_selected != index) {
							this.$emit('update:selected', index)
						}
					}
				}
			}
		}
	}
</script>