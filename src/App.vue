<template>
    <div id="app">
        <h3 class="index-title">仿某ui穿梭框vue插件</h3>
        <button @click="btn">点击显示框</button>
        <!--支付密码弹窗-->
        <el-dialog title="选择" :visible.sync="dialogOperation" :close-on-click-modal="false">
			<cTransfer 
                :personArry="personArry" 
                :selectedArry="selectedArry"
                @seach="seach"
                @confirms="confirms"
                v-model="isArry"
            />
          
		</el-dialog>
        
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            isArry: false,
            personArry:[],
            selectedArry:[],
            dialogOperation:false,
        }
    },
    methods: {
        btn() {
          this.isArry = true;
          this.dialogOperation = true;
        },
        // 搜索
        seach(val) {
          console.log(val)
        },
        //确认
        confirms() {
          console.log('确认')
        }
    }
}
</script>

<style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      user-select: none;
    }
</style>