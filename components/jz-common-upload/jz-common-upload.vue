<template>
	<view class="jz-common-upload">
		<uni-file-picker 
		    v-model="imageValue" 
		    fileMediatype="image" 
		    mode="grid" 
			:auto-upload="false"
			:limit="1"
		    @select="select" 
		    @progress="progress" 
		    @success="success" 
		    @fail="fail" 
		/>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				imageValue:[]
			}
		},
		watch:{
			imageValue(){
				console.log("imageValue",this.imageValue);
			}
		},
		methods:{
			select(){
				
			},
			progress(){
				
			},
			success(){
				
			},
			fail(){
				
			}
		}
	}
</script>
<style>
	.jz-common-upload{
		width: 100%;
	}
</style>
