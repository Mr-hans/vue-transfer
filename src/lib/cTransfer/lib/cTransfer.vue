<template>
  <div v-if="show">
    <div class="box">
      <div class="left float-left list-box">
        <div class="header">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >选择人员</el-checkbox>
        </div>
        <input type="text" class="seach" placeholder="请输入关键字搜索" v-model="seach" />
        <div class="list">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="item in personArry"
              :label="item.key+','+item.label"
              :key="item.key"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="midddle float-left">
        <div class="botton-middle" @click="addLeft">
          <el-button :circle="true" class="el-icon-arrow-left"></el-button>
        </div>
        <div class="botton-middle" @click="addRight">
          <el-button :circle="true" class="el-icon-arrow-right"></el-button>
        </div>
      </div>
      <div v-for="item in selectedArry" :key="item.id"></div>
      <div class="rigght float-left list-box">
        <div class="header">已选人员</div>
        <input type="text" class="seach" placeholder="请输入关键字搜索" v-model="selectSeach" />
        <div class="list">
          <el-checkbox-group v-model="checkedPeason" @change="handleCheckedPeason">
            <el-checkbox
              v-for="item in selectedArrysed"
              :label="item.key+','+item.label"
              :key="item.key"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="aduit">
      <el-button type="primary" @click.native="confirms">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    personArry: {
      type: Array
    },
    selectedArry: {
      type: Array
    },
    // 组件的显示隐藏
    show: {
        type: Boolean,
        required: true,
        default: false
    },
  },
  model: {
      prop: 'show',
      event: 'change'
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      checkedPeason: [],
      isIndeterminate: true,
      seach: "", //搜索
      selectAtty: [], //选择的数组
      selectedAtty: [], //右侧选择的数组
      selectedArrys: this.selectedArry,
      selectSeach: "" //已选搜索
    };
  },
  created() {
    // console.log(this.selectedArrys, 3333333333333);
    // debugger
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val);

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      this.selectAtty = value.map(item => {
        let arr = item.split(",");
        return {
          label: arr[1],
          key: arr[0]
        };
      });
    },
    handleCheckedPeason(value) {
      this.selectedAtty = value.map(item => {
        let arr = item.split(",");
        return {
          label: arr[1],
          key: arr[0]
        };
      });
      console.log(this.selectedAtty);
    },
    // 向左添加
    addLeft() {
      this.checkedPeason = [];
      this.selectedAtty.forEach(e => {
        let datas = this.selectedArrys.filter(item => item.key != e.key);
        this.selectedArrys = datas;
      });
      this.selectAtty.forEach(e => {
        let datas = this.selectedArrys.filter(item => item.key != e.key);
        this.selectAtty = datas;
      });
    },
    // 向右添加
    addRight() {
      this.checkedCities = [];
      this.selectAtty.forEach(e => {
        let datas = this.personArry.filter(item => item.key != e.key);
        this.personArry = datas;
      });

      let oldArr = this.selectedArrys.concat(this.selectAtty);
      let oldArrKeys = {};
      this.selectedArrys = oldArr.filter(item => {
        if (!oldArrKeys[item.key]) {
          oldArrKeys[item.key] = true;
          return item;
        }
      });
      // console.log(oldArrKeys)
    },

    // 搜素数据
    seachPeason(str) {
      let newObj = [];
      for (let val in this.selectedArrys) {
        console.log(this.selectedArrys[val].label.indexOf(str.trim()));
        if (this.selectedArrys[val].label.indexOf(str.trim()) > -1) {
          var seachObj = {
            label: this.selectedArrys[val].label,
            key: this.selectedArrys[val].key
          };
          newObj.push(seachObj);
        }
      }
      return newObj;
    },
    //确定
    confirms() {
      let data = [];
      this.selectedArrysed.forEach(item => {
        data.push(item.key);
      });
      this.$emit("confirms", data);
    }
  },
  computed: {
    // 计算显示的数据形式
    selectedArrysed() {
      let _search = this.selectSeach;
      console.log(this.selectedArrys);
      if (_search) {
        return this.seachPeason(_search);
      } else {
        console.log(this.selectedArrys);
        return this.selectedArrys;
      }
    }
  },
  watch: {
    seach(val) {
      if (this.seach.trim()) {
        this.$emit("seach", this.seach);
      }
    },
   
  }
};
</script>

<style>
.box {
  width: 100%;
  height: 320px;
}
.float-left {
  float: left;
}
.list-box {
  width: 260px;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  
  
  
}
.header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
  }
.list {
    height: 200px;
    padding: 5px 20px;
    overflow-x: auto;
    
  }
.list li {
      line-height: 30px;
      cursor: pointer;
    }
.list-box .seach {
    width: 200px;
    height: 32px;
    border: 1px solid #ebeef5;
    margin: 10px 20px;
    border-radius: 38px;
    padding: 0 20px;
    color: #555;
  }
.midddle {
  width: 100px;
  height: 300px;
  padding-top: 80px;
  
}
.botton-middle {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
.aduit {
  display: flex;
  padding: 0 100px;
  justify-content: flex-end;
}
/* 去掉列表默认样式 */
ul,
ol,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
input {
  appearance: none;
  outline: none;
}
.el-checkbox {
  display: block;
  height: 30px;
  margin-left: 0;
}
</style>