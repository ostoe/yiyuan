<template>
    <div class="van-safe-area-top"></div>
  <div >
    <!-- <van-goods-bar> -->
    <van-row class="bottom_btns">
        <van-col span="5" offset="2">
            <van-button round hairline plain type="primary" size="normal" @click="callsearchDepat">选择<br/>科室</van-button>
            <van-popup v-model:show="show" round position="bottom">
            <van-cascader style="margin-bottom:22%;"
                v-model="cascaderValue"
                title="请选择所在科室"
                :options="deptOptions"
                @close="show = false"
                @finish="onFinish"
            />
            </van-popup>

        </van-col>
        <van-col span="7">
          <van-search style="border-radius: 10% / 50%;padding: 0%;" clear-icon shape="round" v-model="searchDepat" placeholder="搜索科室" />

        </van-col>
        <van-col span="5" offset="3">
            <van-button round type="primary" @click="submit">提交</van-button>
        </van-col>
    </van-row>
    <van-row style="margin-top: 15%">
      <van-search
      style="border-radius: 10% / 50%;padding: 0%;"
      shape="round"
        v-model="searchPatians"
        show-action
        label=""
        clearable
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
// import router from '../router'
import { useRoute } from "vue-router";
import { ref , onMounted} from 'vue';
import axios from 'axios'
import {showNotify }from 'vant'
export default {
  setup() {
    
    // const userCode = this.$route.params.userCode
      const userCode = 111;
      const route = useRoute();
    console.log(userCode)
    // axios.defaults.baseURL = window.g.baseURL
    const show = ref(false);
    const fieldValue = ref('');
    const searchPatians = ref('')
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const searchDepat = ref('');
    const patients = ref([]);
    var allDeptOptions = [];
    const deptOptions = ref([]);
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      return // never run0
      // show.value = false
      // console.log("cascaderValue", cascaderValue.value)
      // // let cascaderMap = {}
      // // for(let i=0; i<allDeptOptions.length, i++) {
      // //   if (allDeptOptions[i].value == cascaderValue.value){
      // //     cascaderMap = allDeptOptions[i];
      // //     break;
      // //   }
      // // }
      // console.log(selectedOptions[0])// {text: '外科', value: '2'}
      // // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      // // console.log(fieldValue.value)
      // axios.post('/api/doctor/getCurOfficePatient', 
      // { deptCode: cascaderValue.value , queryType: "zy", PatientName: ""} 
      // ).then(handleResponse)
    };
    const handleResponse = (response) => {
      if(response.status == 200) {
        // if (response.success) {
          let tmpJson = []
          if (response.data.result) {
            response.data.result.rows.forEach(ele=> {
            ele.hs = ele.hs == 0? '2': ele.hs + ""
            ele.ky = ele.ky == 0? '2': ele.ky + ""
            if (ele.yang_2_ying) {
              ele.yang_2_ying = ele.yang_2_ying != 1? ele.yang_2_ying + "": '2'
            } else {
              ele.yang_2_ying = '2'
            }
            tmpJson.push(ele)
            })
            patients.value = tmpJson
          }

        // } else {
        //   showNotify({ type: 'warning', message: '未查询到数据',background: '#32CD32',  position: 'top',})
        // }
          
      }
    }
    const callsearchDepat = () => {
      deptOptions.value = allDeptOptions.filter( function (e) {
        return e.text.search(searchDepat.value.trim()) != -1
      } )
      show.value = true
    }
    const onSearchPatians = () => {
      if (searchPatians.value.trim() == '') {
        // console.log("重新搜索")
        axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient', 
      // { deptCode: cascaderValue.value.value , queryType: "zy", PatientName: ""} 
      { deptName: cascaderValue.value.text , queryType: "zy", PatientName: ""} 
      ).then(handleResponse) // 重新检索
      } else {
        axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient', 
        { deptName: cascaderValue.value.text , queryType: "zy", PatientName: searchPatians.value.trim()} 
        ).then(handleResponse);
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
          console.log("l1", deptOptions.value.length)
          allDeptOptions = deptOptions.value;



          console.log("mount", route.query)// 拿到之后用这个查http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=b1018
          axios.get("http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=" + route.query.code).then(function(response){
            if (response.status == 200) {
              console.log("length", allDeptOptions.length)
              if(response.data.result) {
                let targetSelect = response.data.result['部门'];
                // console.log("-targetSelect", targetSelect, allDeptOptions[0] )
                // cascaderValue.value = {text: '妇产科', value: '14'}
                // for(let i=0; i<allDeptOptions.length; i++) {
                //   if (allDeptOptions[i].text == targetSelect) { // todo test
                //     cascaderValue.value = allDeptOptions[i]
                //     console.log("-", cascaderValue.value)
                    
                //     break;
                //   }
                // }
                cascaderValue.value = {text: targetSelect, value:'84564654'}
                axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient', 
                    { deptName: targetSelect , queryType: "zy", PatientName: ""} 
                    ).then(handleResponse)

              }
              
            }
          });


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
              let tmppatients1 = {
                    patient_name: "cgh333eh",
                    patient_sex: "男",
                    marked_by: "z医生",
                    ky_status: 30,
                    hs_status: 30,
                    yang_2_ying: 30,
                    idcard: "1111",
                    deptName: "",
                };
              let tmppatients = patients.value[i];
              tmppatients1.patient_name = patients.value[i].patientName;
              tmppatients1.ky_status = Number(tmppatients.ky);
              tmppatients1.hs_status = Number(tmppatients.hs);
              tmppatients1.yang_2_ying = Number(tmppatients.yang_2_ying);
              tmppatients1.idcard = patients.value[i].idcard;
              tmppatients1.deptName = patients.value[i].deptName;
              postPatientsJson.push(tmppatients1);
            }
        }
        axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/updatePatientNucleicStatus', {patientInfos: postPatientsJson})
        .then(response => {
          if (response.status == 200) {
            showNotify({ type: 'success', message: '提交成功',background: '#32CD32',  position: 'top',})

          } else {
            showNotify({ type: 'warning', message: '提交失败',background: '#dg4332',  position: 'top',})
          }
        })
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

// console.log(route.query);
      
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