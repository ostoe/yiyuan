<template>
  <van-tabbar v-model="active" active-color="#ee0a24" @change="buttomOnChange">
    <van-tabbar-item icon="home-o" :badge="patients.length" :badge-props='{ color: "#F08080" }'>待标记</van-tabbar-item>
    <van-tabbar-item icon="search" :badge="patientsWithTag.length"
      :badge-props='{ color: "#90DD90" }'>已标记</van-tabbar-item>
  </van-tabbar>
  <div v-if="active == 0">
    <van-sticky :offset-top="0">
      <van-row gutter="20">
        <van-col span="20"><van-search v-model="searchValue" show-action placeholder="搜索住院/门诊号/姓名"
            @update:model-value="onSearch" @search="onSearchWithEnter">
            <template #action>
              <!-- <div @click="onClickButton">搜索</div> -->
              <!-- <div>搜索</div> -->
            </template>
          </van-search></van-col>
        <van-col span="4"><van-button plain hairline color="#4169E1" type="primary"
            @click="submit">提交</van-button></van-col>

      </van-row>
    </van-sticky>
    <van-divider content-position="left"
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0px', margin: '8px' }">医生信息</van-divider>
    <van-row justify="space-between">
      <van-col span="3"><van-tag color="#ffe1e1" text-color="#ad0000">您的<br />姓名</van-tag></van-col>
      <van-col span="3">{{ docterInfo['姓名'] }}</van-col>
      <van-col span="1"><van-tag color="#ffe1e1" text-color="#ad0000">部门</van-tag></van-col>
      <van-col span="6">{{ docterInfo['部门'] }}</van-col>
      <van-col span="1"><van-tag color="#ffe1e1" text-color="#ad0000">工号</van-tag></van-col>
      <van-col span="3">{{ docterInfo['工号'] }}</van-col>
      <!-- <van-col span="3"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo['姓名']}}</van-tag></van-col> -->
      <!-- <van-col span="3">部门</van-col>
            <van-col span="3"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo['部门']}}</van-tag></van-col>
            <van-col span="3">工号</van-col>
            <van-col span="3"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo['工号']}}</van-tag></van-col> -->
      <!-- <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">部门</van-tag></van-col> -->
    </van-row>

    <!-- 列表单元开始 -->
    <van-divider content-position="left"
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0px', margin: '8px' }">患者信息</van-divider>
    <div style="margin-left:2%; margin-right:2%">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row justify="space-around"
          style="background-color: #F0F8FF; box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1); margin-top:1%; margin-right:1%; padding:14px; border-radius: 10px;"
          v-for="item, index in patients" :key="item" :title="item">
          <!-- <van-cell class="van-cell-text"> -->
          <van-col span="17" style="margin-top: 0%; margin-right: 0%; " justify="20">
            <van-row justify="space-between" span="7">
              <van-col span="8"> <van-tag plain type="primary" size="large">{{ item.wardName }}</van-tag> </van-col>
              <van-col span="6" offset="-1"> <van-tag round type="primary">{{ item.pi }} </van-tag></van-col>
              <van-col span="8"> <van-tag round type="primary">{{ item.ruyuandate.substring(0, 10) }}</van-tag>
              </van-col>
            </van-row>
            <van-row justify="space-between" span="9" style="margin-top: 8%;">
              <van-col span="8"> <van-tag plain type="primary" size="large">{{ item.patientName }}</van-tag> </van-col>
              <van-col span="2"> {{ item.age }} </van-col>
              <van-col span="4"> {{ item.gender }} </van-col>
              <van-col span="6"> {{ item.bedNo }} </van-col>
            </van-row>
            <van-row justify="space-between" span="7" style="margin-top: 10%;">
              <van-col> {{ item.clinicDiagName }} </van-col>
            </van-row>
          </van-col>
          <van-col span="4">
            <van-row>
              <van-button size="mini" style="margin-top: 0%; margin-right: 0%;">抗原</van-button>
              <van-radio-group v-model="item.ky_status">
                <van-radio name="1" checked-color="#ee0a24">阳</van-radio>
                <van-radio name="2" checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
              </van-radio-group>
            </van-row>
            <van-row>
              <van-button size="mini" style="margin-top: 0%; margin-right: 0%;">核酸</van-button>
              <van-radio-group v-model="item.hs_status">
                <van-radio name="1" checked-color="#ee0a24" style="margin-top: 0%;">阳</van-radio>
                <van-radio name="2" checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
              </van-radio-group>
            </van-row>
          </van-col>
          <van-col span="3">
            <!-- 这里加载和提交都需要转义 -->
            <!-- <van-switch v-model="item.yang_2_ying">
                            <template #node>
                                <div class="icon-wrapper">
                                <van-icon :name="checked ? 'success' : 'cross'" />
                                </div>
                            </template>
                        </van-switch> -->
            <van-row>
              <div>是否阳转阴</div>
              <!-- <van-button size="mini" style="margin-top: 10%;">阳转阴</van-button> -->
              <van-switch v-model="item.yang_2_ying" @change="yang2yingChange(item.pi, index, item.yang_2_ying)"
                size="15px" />
              <!-- <van-radio-group v-model="item.yang_2_ying">
                                <van-radio name="1" checked-color="#32CD32">是</van-radio>
                                <van-radio name="2" checked-color="#ee0a24">否</van-radio>
                            </van-radio-group> -->
            </van-row>
          </van-col>

          <!-- </van-cell> -->
          <!-- <van-divider /> -->
        </van-row>
      </van-list>
    </div>
    <!-- 列表单元结束 -->

  </div>
  <div v-else>
    <van-divider content-position="left" hairline
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0px', margin: '8px' }">已标记信息</van-divider>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-row justify="space-between"
        style="background-color: #F0F8FF; box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1); margin-top:1%; margin-right:1%; padding:14px; border-radius: 10px;"
        v-for="item, index in patientsWithTag" :key="item" :title="item">
        <!-- <van-cell class="van-cell-text"> -->
        <van-col span="17" style="margin-top: 0%; margin-right: 0%; " justify="20">
          <van-row justify="space-between" span="7">
            <van-col span="8"> <van-tag plain type="primary" size="large">{{ item.wardName }}</van-tag> </van-col>
            <van-col span="6" offset="-1"> <van-tag round type="primary">{{ item.pi }} </van-tag></van-col>
            <van-col span="8"> <van-tag round type="primary">{{ item.ruyuandate.substring(0, 10) }}</van-tag>
            </van-col>
          </van-row>
          <van-row justify="space-between" span="9" style="margin-top: 8%;">
            <van-col span="8"> <van-tag plain type="primary" size="large">{{ item.patientName }}</van-tag> </van-col>
            <van-col span="2"> {{ item.age }} </van-col>
            <van-col span="4"> {{ item.gender }} </van-col>
            <van-col span="6"> {{ item.bedNo }} </van-col>
          </van-row>
          <van-row justify="space-between" span="7" style="margin-top: 10%;">
            <van-col> {{ item.clinicDiagName }} </van-col>
          </van-row>
        </van-col>
        <van-col span="7">
          <van-row style="margin-top: 10%;">
            <van-button size="mini">抗原</van-button>
            <van-col v-if="item.ky_status == '2'">
              <van-icon name="passed" color="#32CD32" />
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
          <van-row style="margin-top: 10%;">
            <van-button size="mini">核酸</van-button>
            <van-col v-if="item.hs_status == '2'">
              <van-icon name="passed" color="#32CD32" />
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
        </van-col>

        <!-- </van-cell> -->
        <!-- <van-divider /> -->
      </van-row>
    </van-list>

  </div>

</template>




<script>
// import router from '../router'
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { showNotify, showToast, showConfirmDialog } from 'vant'

export default {

  setup() {
    const active = ref(0); // 0 or 1
    const route = useRoute();
    const searchValue = ref("")
    const patientsWithTag = ref([])
    // const patients = ref([]);
    // var rawPatients = [{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""}]
    var rawPatients = []
    var iptTimer = null;
    const patients = ref([])
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    var searchJsonTemplate = { queryType: iszhuyuan, doctorCode: route.query.code, patientName: "", pi: "" }
    var iszhuyuan = "";


    const onSearchWithEnter = (value) => {
      console.log("onSearchWithEnter", value);

      let sj = { ...searchJsonTemplate }
      sj.queryType = iszhuyuan
      let tvalue = value.trim()
      if (/^\d+$/.test(tvalue)) { // 数字
        // console.log("搜索住院号", value)
        sj.pi = tvalue
      } else if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}/.test(tvalue)) {
        // console.log("搜索姓名", value)
        sj.patientName = tvalue
      }
      console.log("sj: ", sj)
      axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient", sj).then(function (res) {
        if (res.status != 200) { showNotify({ type: 'warning', message: '"病人数据查询失败', background: '#32CD32', position: 'top', }); return }
        if (res.data.result && res.data.total != 0) { //TODO下拉刷新数据
          // 加载状态结束
          loading.value = true;
          // 数据全部加载完成
          finished.value = true;
          patients.value = []
          res.data.result.rows.forEach(ele => {
            if (ele.marked_by) {
              ele.ky_status = Number(ele.ky_status) == 1 ? "1" : "2";
              ele.hs_status = Number(ele.hs_status) == 1 ? "1" : "2";
              // ele.yang_2_ying = ele.yang_2_ying ? 1 : 0
            }
            patients.value.push(ele);
          })
          // showNotify({ type: 'warning', message: '获取医生数据成功', background: '#F23D32', position: 'top', })
        }
      });

    }


    const initData = () => {
      // axios.get("http://201.xggong.com:12201/xs_datacenter/patient/byDoctor?doctorCode=" + route.query)// ref code=7355
      axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient", {
        "queryType": iszhuyuan,
        "doctorCode": route.query.code,  // 先写死 route.query
      })
        // ).then(function(response){
        .then(function (res) {
          if (res.status != 200) { showNotify({ type: 'warning', message: '"病人数据查询失败', background: '#32CD32', position: 'top', }); return }
          if (res.data.result && res.data.total != 0) { //TODO下拉刷新数据
            // 加载状态结束
            loading.value = true;
            // 数据全部加载完成
            finished.value = true;

            res.data.result.rows.forEach(ele => {
              if (ele.marked_by) {
                ele.ky_status = Number(ele.ky_status) == 1 ? "1" : "2";
                ele.hs_status = Number(ele.hs_status) == 1 ? "1" : "2";
                // ele.yang_2_ying = ele.yang_2_ying ? 1 : 0
              }
              // rawPatients.push(ele);
            })
            rawPatients = res.data.result.rows
            // console.log("rawPatients", rawPatients)
            // int 2 str

            patients.value = rawPatients
            showNotify({ type: 'success', message: '已获取到患者数据', background: '#23FD32', position: 'top', })
          }
        })
    } // init over;

    const onSearchrow = (value) => {
      let tvalue = value.trim()
      if (/^\d+$/.test(tvalue)) { // 数字
        // console.log("搜索住院号", value)
        patients.value = rawPatients.filter(function (ele) {
          return ele.pi.search(tvalue) != -1
        })
      } else if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}/.test(tvalue)) {
        console.log("搜索姓名", value)
        patients.value = rawPatients.filter(function (ele) {
          return ele.patientName.search(tvalue) != -1
        })
      } else {
        patients.value = rawPatients
      }

    }

    const onSearch = (value) => {
      clearTimeout(iptTimer); // 清除上一个定时器
      iptTimer = setTimeout(() =>
        onSearchrow(value)
        , 700);
    }

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

    };

    const yang2yingChange = (pi, index, yang_2_ying) => {
      console.log("value", pi, index, yang_2_ying) // 97041763 2 true
      // if(value)
      if (yang_2_ying) {
        patients.value[index].hs_status = "2"
        patients.value[index].ky_status = "2"
      }
      // patients.value
    };

    const submit = () => {
      console.log("will submit")
      let postPatientsJson = []
      let willSubPatientsJson = []
      for (let i = 0; i < patients.value.length; i++) {
        // console.log('a', patients.value[i].hs_status, typeof patients.value[i].hs_status)
        if (patients.value[i].hs_status != "1" && patients.value[i].hs_status != "2") { //校验？
          console.log("skip")
          willSubPatientsJson.push(patients.value[i])
          // showNotify({ type: 'danger', message: '信息未完全填写' ,background: '#ffe1e1',  position: 'top'})
          continue;
        } else {
          let tmppatients = { ...patients.value[i] };
          tmppatients.marked_by = docterInfo.value["姓名"]
          tmppatients.ky_status = Number(tmppatients.ky_status);
          tmppatients.hs_status = Number(tmppatients.hs_status);
          tmppatients.yang_2_ying = tmppatients.yang_2_ying ? 1 : 0
          postPatientsJson.push(tmppatients);
        }
      }
      console.log("postPatientsJson", postPatientsJson)
      axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/updatePatientNucleicStatus', { total: postPatientsJson.length, patientInfos: postPatientsJson })
        .then(response => {
          if (response.status == 200) {
            showNotify({ type: 'success', message: '提交成功', background: '#32CD32', position: 'top', })

          } else {
            showNotify({ type: 'warning', message: '提交失败', background: '#dg4332', position: 'top', })
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
      console.log("submit")
      patients.value = willSubPatientsJson
    }

    const docterInfo = ref({})//{ code: "N6283", deptCode: "448", deptName: "重症医学科", name: "伍宁" }); //TODO 去掉预留
    const buttomOnChange = (index) => {
      console.log(" index ", index, "active.value", active.value)
      if (index == 1) {// update marked data
        let d1 = {
         marked_by: docterInfo.value['姓名']
        }
        axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getMarkedPatient", d1).then(res=> {
          console
          if (res.status == 200) {
            patientsWithTag.value = res.data.patientInfos
          }
        })
      }

    }

    onMounted(() => {
      // `(${count})`

      showConfirmDialog({
        title: '请选择',
        message:
          '选择 门诊 ：住院',
        confirmButtonText: "住院", // 确认就是住院
        confirmButtonColor: "#1E90FF",
        // showCancelButton: true,
        cancelButtonText: "门诊",
        cancelButtonColor: "#ee0a24"
      })
        .then(() => {
          // on confirm
          console.log("住院")
          iszhuyuan = "zy";
          initData()
        })
        .catch(() => {
          // on cancel
          console.log("门诊")
          iszhuyuan = "mz";
          initData()
        });
      if (!route.query.code) {
        showNotify({ type: 'warning', message: '获取医生数据失败', background: '#F23D32', position: 'top', })
      }
      axios.get("http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=" + route.query.code).then(function (response) {  //先用官网的数据
        if (response.status != 200) { showNotify({ type: 'warning', message: '"医生数据查询失败', background: '#32CD32', position: 'top', }); return }
        //[result  = {code: "N6283", deptCode: "448", deptName:"重症医学科", name: "伍宁"}]
        if (response.data.result) {

          showNotify({ type: 'success', message: '已获取到医生数据', background: '#23FD32', position: "top", })
          docterInfo.value = response.data.result
          console.log(docterInfo.value)
        }

      })
    });

    return {
      active,
      buttomOnChange,
      docterInfo,
      onLoad,
      finished,
      list,
      loading,
      patients,
      onSearch,
      searchValue,
      submit,
      yang2yingChange,
      onSearchWithEnter,
      patientsWithTag
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