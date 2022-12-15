<template>
    <div class="van-safe-area-top"></div>
  <div>
    <!-- <div > -->
    <van-row class="bottom_btns">
        <van-col span="10" offset="4">
            <van-button type="primary" @click="selectType">筛选</van-button>
        </van-col>
        <van-col span="10" offset="0">
            <van-button type="primary" @click="submit">导出excel</van-button>
        </van-col>
    </van-row>
    <van-row style="margin-top: 15%"></van-row>
    <van-row style="margin-left: 5%;border: 5%;">
        <!-- <van-button size="mini" style="margin-top: 10%;">抗原</van-button> -->
        
        <van-radio-group v-model="hsAndky" direction="horizontal" >
            <van-radio name="1" checked-color="#32CD32" style="margin-top: 3px">全部显示</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson0}}</van-tag>
            <van-radio name="2" checked-color="#32CD32" style="margin-top: 3px">抗原阳+核酸阳</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson1}}</van-tag>
            <van-radio name="3" checked-color="#32CD32" style="margin-top: 3px">抗原阳</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson2}}</van-tag>
            <van-radio name="4" checked-color="#32CD32" style="margin-top: 6px">抗原阴</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson3}}</van-tag>
            <van-radio name="5" checked-color="#32CD32" style="margin-top: 6px">核酸阳</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson4}}</van-tag>
            <van-radio name="6" checked-color="#32CD32" style="margin-top: 6px">核酸阴</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson5}}</van-tag>
            <van-radio name="7" checked-color="#32CD32" style="margin-top: 6px">阳转阴</van-radio> <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right:10px; margin-left: -10px;">{{countJson6}}</van-tag>
        </van-radio-group>
    </van-row>
  <!-- </div> -->
    <div style="margin-left:2%; margin-right:2%">
        <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-row style="box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1); margin-top:5%; margin-right:1%; padding:14px; border-radius: 10px;"  v-for="item in patients" :key="item" :title="item">
            <!-- <van-cell class="van-cell-text"> -->
                    
                <van-col span="6">
                    <van-row style="margin-top: 10%;">
                        {{item.patient_name}}
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.areaName}}
                    </van-row>
                </van-col>
                <van-col span="6">
                    <van-row style="margin-top: 10%;font-size: 14px;">
                        {{item.ruyuandate}}
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.deptName}}
                    </van-row>
                </van-col>
                <van-col span="5">
                    <van-row style="margin-top: 10%;">
                        {{item.ward_name}}
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.doctorName}}
                    </van-row>
                </van-col>
                <van-col span="7">
                    <van-row style="margin-top: 10%;">
                        <van-button size="mini" >抗原</van-button>
                        <van-col v-if="item.hs_status == '2'">
                            <van-icon name="passed" color="#32CD32"/>
                            阴
                        </van-col>
                        <van-col v-else-if="item.hs_status == '1'">
                            <van-icon name="clock-o" color="#ee0a24" />
                            阳
                        </van-col>
                        <van-col v-else>
                            <van-icon name="question-o" />
                            无效
                        </van-col>
                    </van-row>
                    <van-row style="margin-top: 10%;">
                        <van-button size="mini" >核酸</van-button>
                        <van-col v-if="item.ky_status == '2'">
                            <van-icon name="passed" color="#32CD32"/>
                            阴
                        </van-col>
                        <van-col v-else-if="item.ky_status == '1'">
                            <van-icon name="clock-o" color="#ee0a24" />
                            阳
                        </van-col>
                        <van-col v-else>
                            <van-icon name="question-o" />
                            无效
                        </van-col>
                    </van-row>
                </van-col>
            <!-- </van-cell> -->
            <!-- <van-divider /> -->
        </van-row>
        </van-list>
    </div>
  </div>


    <div class="van-safe-area-bottom"></div>
</template>




<script>

import { ref, onMounted } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
import axios from 'axios';
import {showNotify }from 'vant'
XLSX.set_fs(fs);

export default {
  setup() {
    const hsAndky = ref("1");
    const show = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const patients =  ref([]);
    const countJson0 = ref(0);
    const countJson1 = ref(0);
    const countJson2 = ref(0);
    const countJson3 = ref(0);
    const countJson4 = ref(0);
    const countJson5 = ref(0);
    const countJson6 = ref(0);
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      console.log(fieldValue.value)
    };

    const selectType = () => {
      let targetJson =  { }// ky: 0, hs: 0, yang_2_ying: 0 }
       switch (hsAndky.value) {
        case "1":
          {targetJson.all = 1; break; }
        case "2":
          {targetJson.ky_status = 1; targetJson.hs_status = 1; break; } //都阳
        case "3":
          {targetJson.ky_status = 1;  break; }
        case "4":
          { targetJson.ky_status = 2; break; }
        case "5":
          {targetJson.hs_status = 1; break; }
        case "6":
          {targetJson.hs_status = 2; break; }
        case "7":
          {targetJson.yang_2_ying = 1;break; }
       }
       axios.post("/api/admin/printCurOfficePatient", targetJson).then(handleResponse);

    }

    const submit = () => {
      
      let excelData = [['姓名', '科室', '区域', '入院日期', '病区', '医生姓名', '抗原', '核酸', '阳转阴']]
      patients.value.forEach(ele => {
        let ky = Number(ele.ky_status) == 1? "是": "否";
        let hs = Number(ele.hs_status) == 1? "是": "否";
        let yang_2_ying = Number(ele.yang_2_ying) == 1? "是": "否";
        excelData.push([ele.patient_name, ele.deptName, ele.areaName, ele.ruyuandate, ele.ward_name, ele.doctorName, ky, hs, yang_2_ying,])
      });
                // ref: https://docs.sheetjs.com/docs/getting-started/example
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
          /* calculate column width */
        // const max_width = excelData.reduce((w, r) => Math.max(w, r.name.length), 10);
        // worksheet["!cols"] = [ { wch: max_width } ];
      let preFixNameList = ['全部显示', '抗原阳+核酸阳', '抗原阳', '抗原阴', '核酸阳', '核酸阴', '阳转阴']
        let preFixName = preFixNameList[Number(hsAndky.value)-1]
        let time = new Date()
        let timeNow = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDay();
        console.log(timeNow, preFixName); // 23-7-2022
        XLSX.writeFile(workbook, preFixName + timeNow + ".xlsx", { compression: true });
        console.log(patients.value)
        console.log("submit")
    }

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const handleResponse = (response) => {
      if(response.status == 200) {
        if (response.total_num != 0) {
          // let tmpJson = []
          // response.data.patient_info.forEach(ele=> {
          //   ele.hs = ele.hs == 0? '2': ele.hs + ""
          //   ele.ky = ele.ky == 0? '2': ele.ky + ""
          //   ele.yang_2_ying = ele.yang_2_ying != 1? ele.yang_2_ying + "": '2'
          //   tmpJson.push(ele)
          // })
          // console.log("info", response.data.patient_info)
          patients.value = response.data.patient_info
        } else {
          showNotify({ type: 'warning', message: '未查询到数据',background: '#32CD32',  position: 'top',})
        }
          
      }
    }

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    onMounted(() => {
      axios.post("/api/admin/printCurOfficePatient", {all : 1 }).then(function (response) {
        if(response.status == 200) {
        if (response.total_num != 0) {
          // let tmpJson = []
          // response.data.patient_info.forEach(ele=> {
          //   ele.hs = ele.hs == 0? '2': ele.hs + ""
          //   ele.ky = ele.ky == 0? '2': ele.ky + ""
          //   ele.yang_2_ying = ele.yang_2_ying != 1? ele.yang_2_ying + "": '2'
          //   tmpJson.push(ele)
          // })
          console.log("info", response.data.patient_info)
          patients.value = response.data.patient_info
          countJson0.value = patients.value.length;
          countJson1.value = 0;
          countJson2.value = 0;
          countJson3.value = 0;
          countJson4.value = 0;
          countJson5.value = 0;
          countJson6.value = 0;
          console.log(patients.value);
          patients.value.forEach(ele => {
            if (ele.ky_status == 1) {
              countJson2.value += 1;
              if (ele.hs_status == 1) {
                countJson1.value += 1;
                countJson4.value += 1;
              } else {
                countJson5.value += 1;
              }
            } else {
              countJson3.value += 1;
              if (ele.hs_status == 1) {
                countJson4.value += 1;
              } else {
                countJson5.value += 1;
              }
            }

            if (ele.yang_2_ying == 1) {
              countJson6.value += 1;
            }

          });


        } else {
          showNotify({ type: 'warning', message: '未查询到数据',background: '#32CD32',  position: 'top',})
        }
          
      }
      });
      
      

    });

    return {
      list,
      onLoad,
      loading,
      finished,
      show,
      hsAndky,
      onFinish,
      fieldValue,
      cascaderValue,
      submit,
      patients,
      selectType,
      countJson0,
      countJson1,countJson2,countJson3,countJson4,countJson5,countJson6,
    };
  },
};

</script>
<style lang="less">
.bottom_btns {
  width: 100%;
  height: 2rem;
  display: flex;
   margin-top: 0.3rem;
  // position: absolute;
  // bottom: 0;
  align-items: flex-end;
  position: flex;
  top: 0;
  z-index: 999;

  .export {
      height: 50%;
      width: 100%;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.3rem;
  }

  .print {
      height: 50%;
      width: 100%;
      background-color: #5172F3;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.3rem;
  }
}
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>