<template>
    <div class="van-safe-area-top"></div>
  <div>
    <!-- <van-goods-bar> -->
    <van-row class="bottom_btns">
        <van-col span="5" offset="2">
            <van-button @click="callsearchDepat">选择科室</van-button>
            <van-popup v-model:show="show" round position="bottom">
            <van-cascader style="margin-bottom:22%;"
                v-model="cascaderValue"
                title="请选择所在地区"
                :options="deptOptions"
                @close="show = false"
                @finish="onFinish"
            />
            </van-popup>

        </van-col>
        <van-col span="7">
          <van-search clear-icon v-model="searchDepat" placeholder="搜索科室" />

        </van-col>
        <van-col span="5" offset="3">
            <van-button type="primary" @click="submit">提交</van-button>
        </van-col>
    </van-row>
    <van-row style="margin-top: 15%">
      <van-search
        v-model="searchPatians"
        show-action
        label=""
        placeholder="搜索病人"
      >
        <template #action>
          <div @click="onSearchPatians">搜索</div>
        </template>
      </van-search>
    </van-row>
  <!-- </van-goods-bar> -->
  <van-row ></van-row>
    <div style="margin-left:2%; margin-right:2%">
        <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-row style="box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1); margin-top:5%; margin-right:1%; padding:14px; border-radius: 10px;"  v-for="item in patients" :key="item" :title="item">
            <!-- <van-cell class="van-cell-text"> -->
                    
                <van-col span="5">
                    <van-row style="margin-top: 10%;">
                      <van-tag plain type="primary" size="large">{{item.patientName}}</van-tag>
                    </van-row>
                    <van-row style="margin-top: 20%;">
                      <van-tag round type="success">{{item.areaName}}</van-tag>
                    </van-row>
                </van-col>
                <van-col span="5">
                    <van-row style="margin-top: 10%;font-size: 14px;">
                      <van-tag type="primary">{{item.ruyuandate}}</van-tag>
                        
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.deptName}}
                    </van-row>
                </van-col>
                <van-col span="4">
                    <van-row style="margin-top: 10%;">
                        {{item.wardName}}
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.doctorName}}
                    </van-row>

                </van-col>
                <van-col span="6">
                    <van-row>
                        <van-button size="mini" style="margin-top: 10%; margin-right: 10%;">抗原</van-button>
                        <van-radio-group v-model="item.ky">
                        <van-radio name="1" checked-color="#ee0a24">阳</van-radio>
                        <van-radio name="2" checked-color="#32CD32" style="margin-top: 5%;">阴</van-radio>
                        </van-radio-group>
                    </van-row>
                    <van-row>
                        <van-button size="mini" style="margin-top: 5%; margin-right: 10%;">核酸</van-button>
                        <van-radio-group v-model="item.hs">
                        <van-radio name="1" checked-color="#ee0a24" style="margin-top: 5%;">阳</van-radio>
                        <van-radio name="2" checked-color="#32CD32" style="margin-top: 5%;">阴</van-radio>
                        </van-radio-group>
                    </van-row>
                </van-col>
                <van-col v-if="searchPatians != ''" span="4">
                    <van-row>
                        <van-button size="mini" style="margin-top: 10%;">阳转阴</van-button>
                        <van-radio-group v-model="item.yang_2_ying">
                        <van-radio name="1" checked-color="#32CD32">是</van-radio>
                        <van-radio name="2" checked-color="#ee0a24">否</van-radio>
                        </van-radio-group>
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

import { ref , onMounted} from 'vue';
import axios from 'axios'
import {showNotify }from 'vant'
export default {

  setup() {
    // axios.defaults.baseURL = window.g.baseURL
    const show = ref(false);
    const fieldValue = ref('');
    const searchPatians = ref('')
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const searchDepat = ref('');
    const patients =  ref([
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "1钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
                "yang_2_ying": 0,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "3钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            }
        ]);
    var allDeptOptions = [];
    const deptOptions = ref([]);
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false
      console.log("cascaderValue", cascaderValue.value)
      let cascaderMap = {}
      // for(let i=0; i<allDeptOptions.length, i++) {
      //   if (allDeptOptions[i].value == cascaderValue.value){
      //     cascaderMap = allDeptOptions[i];
      //     break;
      //   }
      // }
      console.log(selectedOptions[0])// {text: '外科', value: '2'}
      // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      // console.log(fieldValue.value)
      axios.post('/api/doctor/getCurOfficePatient', 
      { deptNum: Number(cascaderValue.value) , queryType: "", PatientName: ""} 
      ).then(function (response){
        if(response.status == 200) {
          patients.value = response.data;
        }
      })
    };
    const callsearchDepat = () => {
      deptOptions.value = allDeptOptions.filter( function (e) {
        return e.text.search(searchDepat.value.trim()) != -1
      } )
      show.value = true
    }
    const onSearchPatians = () => {
      if (searchPatians.value.trim() == '') {
        console.log("重新搜索")
        axios.post('/api/doctor/getCurOfficePatient', 
      { deptNum: Number(cascaderValue.value) , queryType: "", PatientName: ""} 
      ).then(function (response){
        if(response.status == 200) {
          patients.value = response.data;
        }
      }) // 重新检索
      } else {
        axios.post('/api/doctor/getCurOfficePatient', 
        { deptNum: 0, queryType: "", PatientName: searchPatians.value.trim()} 
        ).then(function (response){
          if(response.status == 200) {
            patients.value = response.data;
          }
      });
      }
      
    }
    const getAllData = () => {// docs 
      let hospitalRawURL = window.g.hospitalRawURL;
      // `(${count})`
      axios.get(hospitalRawURL)
      .then(function (response) {
        // response.json
        if(response.status == 200) {
          // console.log(response.data.result); [{code: "N6283", deptCode: "448", deptName:"重症医学科", name: "伍宁"}]
          let depts = {}
          response.data.result.forEach(ele => {
            depts[ele.deptCode] = ele.deptName
          });
          Object.entries(depts).forEach(ele => {
            deptOptions.value.push({ text: ele[1], value: ele[0] })
          })
          // patients.value = response.data;
          console.log(deptOptions.value.length)
          allDeptOptions = deptOptions.value;
        } else {

          return
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const submit = () => {
      let postPatientsJson = []
        for(let i=0; i<patients.value.length; i++) {
            if (patients.value[i].hs == 999 || patients.value[i].ky == 999) {
                showNotify({ type: 'danger', message: '信息未完全填写' ,background: '#ffe1e1',  position: 'top'})
                return
            } else {
              let tmppatients = patients.value[i];
              tmppatients.ky = Number(tmppatients.ky);
              tmppatients.hs = Number(tmppatients.hs);
              tmppatients.yang_2_ying = Number(tmppatients.yang_2_ying);
              postPatientsJson.push(tmppatients)
            }
        }
        axios.post('/api/doctor/updatePatientNucleicStatus', postPatientsJson)
        .then(response => (
          showNotify({ type: 'success', message: '提交成功',background: '#32CD32',  position: 'top',})
        ))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
        console.log(patients.value)
        console.log("submit")
    }

    const userInfo = ref({name: "tfx", auth: "123", time: "222"});
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

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
      getAllData();
    });

    return {
      list,
      onLoad,
      loading,
      finished,
      userInfo,
      show,
      deptOptions,
      onFinish,
      fieldValue,
      cascaderValue,
      submit,
      patients,
      callsearchDepat,
      searchDepat,
      onSearchPatians,
      searchPatians,
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
  position: fixed;
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