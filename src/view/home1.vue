<template>
  <!-- style="height: 100%; width: 100%; position: fixed;"   -->
    <van-tabbar v-model="active" active-color="#ee0a24" @change="buttomOnChange">
      <van-tabbar-item icon="home-o" :badge="patients.length" :badge-props='{ color: "#F08080" }'>待标记</van-tabbar-item>
      <van-tabbar-item icon="search" :badge="patientsWithTag.length"
        :badge-props='{ color: "#90DD90" }'>已标记</van-tabbar-item>
    </van-tabbar>
    <van-pull-refresh style="min-height: 90vh;" v-model="pullDownloading" @refresh="pullDownRefresh" success-text="刷新成功">
      <div>
    <div v-if="active == 0">
        
      <van-sticky :offset-top="0">
        <van-row justify="space-between" style="background-color:#FFFFFF">
          <van-col span="19"><van-search v-model="searchValue" show-action placeholder="搜索住院/门诊号/姓名"
              @update:model-value="onSearch" @search="onSearchWithEnter">
              <template #action>
              </template>
            </van-search></van-col>
          <van-col span="5" style="text-align:center; padding: 5px;"><van-button plain hairline
              @click="submit">提交</van-button></van-col>
        </van-row>
      </van-sticky>
      <van-divider content-position="left"
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0px', margin: '4px' }">医生信息</van-divider>
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
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0px', margin: '4px' }">患者信息</van-divider>

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
                <van-col span="8"> <van-tag plain type="primary" size="large">{{ item.patientName }}</van-tag>
                </van-col>
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
                  <van-radio :name=1 checked-color="#ee0a24">阳</van-radio>
                  <van-radio :name=2 checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
                </van-radio-group>
              </van-row>
              <van-row>
                <van-button size="mini" style="margin-top: 0%; margin-right: 0%;">核酸</van-button>
                <van-radio-group v-model="item.hs_status">
                  <van-radio :name=1 checked-color="#ee0a24" style="margin-top: 0%;">阳</van-radio>
                  <van-radio :name=2 checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
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
                  :active-value=1 :inactive-value=0 size="15px" />
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
              <van-col v-if="item.ky_status == 2">
                <van-icon name="passed" color="#32CD32" />
                阴
              </van-col>
              <van-col v-else-if="item.ky_status == 1">
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
              <van-col v-if="item.hs_status == 2">
                <van-icon name="passed" color="#32CD32" />
                阴
              </van-col>
              <van-col v-else-if="item.hs_status == 1">
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
    </van-pull-refresh>
  
</template>




<script>
// import router from '../router'
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';
import axios from 'axios'
// import { showNotify, showToast } from 'vant'

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {

  setup() {
    const pageNum = ref(1)
    const pullDownloading = ref(false);
    const active = ref(0); // 0 or 1
    const route = useRoute();
    const searchValue = ref("")
    const patientsWithTag = ref([])
    // const patients = ref([]);
    // var rawPatients = [{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""}]
    var rawPatients = [] // 未提交的原始数据
    var iptTimer = null;
    const patients = ref([])
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    var iszhuyuan = "zy";
    var searchJsonTemplate = { queryType: iszhuyuan, doctorCode: '', patientName: "", pi: "", searchKey: "", pageNum: 1 }

    const $toast = useToast();

    const showNotify = (data) => {
      if (data.type == "success") {
        $toast.success(data.message, {position: 'top', duration: 1500})
      } else if (data.type == "warning") {
        $toast.warning(data.message, {position: 'top', duration: 1500})
      } else if (data.type == "info") {
        $toast.info(data.message, {position: 'top', duration: 1500})

      }else if (data.type == "error") {
        $toast.error(data.message, {position: 'top', duration: 1500})
      }else{ //detalt
        $toast.default(data.message, {position: 'top', duration: 1500})
      }
    }


    // 按下回车搜索  // 更新/去重rawPa数据， 下拉刷新合并数据
    const onSearchWithEnter = (value) => {
      console.log("onSearchWithEnter", value);
      clearTimeout(iptTimer);
      let sj = { ...searchJsonTemplate }
      sj.queryType = iszhuyuan
      let tvalue = value.trim()
      if (/^\d+$/.test(tvalue)) { // 数字
        // console.log("搜索住院号", value)
        // sj.pi = tvalue
        sj.searchKey = tvalue
      } else if (/[\u4e00-\u9fa5_a-zA-Z_]{0,10}/.test(tvalue)) {
        // console.log("搜索姓名", value)
        // sj.patientName = tvalue
        sj.searchKey = tvalue
      } else {
        // 输入有误
        showNotify({ type: 'warning', message: '"输入有误，请输入住院号/中英文姓名', position: 'top', })
        return;
      }


      console.log("sj: ", sj)

      commonPullPatientsData(sj)

    }

        // 搜索已缓存数据  rawPatients 和  patients.value仅仅在此处有用，其他时间均====
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

    const commonPullPatientsData = (data, isPullRefresh = false) => {
      axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient", data)
        .then(function (res) {
          if (res.status != 200) { showNotify({ type: 'warning', message: '"病人数据查询失败', background: '#32CD32', position: 'top', }); return }
          if (res.data.result && res.data.total != 0) {
            // 加载状态结束
            loading.value = true;
            // 数据全部加载完成
            finished.value = true;
            res.data.result.rows.forEach(ele => {
              if (ele.marked_by) {
                // ele.ky_status = Number(ele.ky_status) == 1 ? "1" : "2";
                // ele.hs_status = Number(ele.hs_status) == 1 ? "1" : "2";
                // ele.yang_2_ying = ele.yang_2_ying ? 1 : 0  // ####TODOTODOTODO
                if (ele.yang_2_ying == 1) {
                  ele.ky_status = 2; ele.hs_status = 2;
                }
              }
            })
            // TODO 搜索完了刷新的时候，还拼不拼数据，这时候可能不是全的。  2. 搜索框为空的时候回车搜搜什么？
            // rawPatients = deepClone(res.data.result.rows)
            // console.log('isPullRefresh', isPullRefresh, res.data.result.rows)
            if (!searchValue.value.trim()) {// 没有搜索
              // console.log('rawPatients---------', rawPatients, rawPatients.length)
              // console.log('res.data.result.rows', res.data.result.rows, res.data.result.rows.length)

              rawPatients = rawPatients.concat(res.data.result.rows);
              // console.log('rawPatients contactd---------', rawPatients, rawPatients.length)
              patients.value = deepClone(rawPatients)
              // console.log('line 290', rawPatients, patients.value)
            } else { // 搜索出来的不更新原数据
              patients.value = res.data.result.rows;
            }
            if (isPullRefresh) {
              pageNum.value += 1;
              pullDownloading.value = false;
            }
            // showToast({ message: '已获取到患者数据', position: 'bottom', "z-index": 9999, type: "success " });
            showNotify({ type: 'success', message: '已获取到患者数据', background: '#23FD32' , lockScroll: true, "z-index": 9999,})
          }
        })
    }

    const pullDownRefresh = () => {

      let sj = { ...searchJsonTemplate }
      sj.queryType = iszhuyuan
      sj.pageNum = pageNum.value + 1 // 

      console.log(" search sj: ", sj)
      commonPullPatientsData(sj, true)
    };



    const onSearch = (value) => {
      clearTimeout(iptTimer); // 清除上一个定时器
      iptTimer = setTimeout(() =>
        onSearchrow(value)
        , 700);
    }

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log("need 异步更新数据")

    };

    const yang2yingChange = (pi, index, yang_2_ying) => {
      console.log("value", pi, index, yang_2_ying, typeof yang_2_ying) // 97041763 2 true
      // if(value)
      if (yang_2_ying) {
        patients.value[index].hs_status = 2
        patients.value[index].ky_status = 2
      }
      // patients.value
    };

    const submit = () => {
      console.log("will submit")

      let postPatientsJson = []
      let willSubPatientsJson = []
      for (let i = 0; i < patients.value.length; i++) {
        // console.log('a', patients.value[i].hs_status, typeof patients.value[i].hs_status)
        if ((patients.value[i].hs_status != 1 && patients.value[i].hs_status != 2) || (patients.value[i].ky_status != 1 && patients.value[i].ky_status != 2)) { //校验？
          console.log("skip")
          willSubPatientsJson.push(patients.value[i])
          // showNotify({ type: 'danger', message: '信息未完全填写' ,background: '#ffe1e1',  position: 'top'})
          continue;
        } else {
          if (patients.value[i].hs_status == 1 || patients.value[i].ky_status == 1) {
            patients.value[i].yang_2_ying = 0
          }

          let tmppatients = { ...patients.value[i] };
          tmppatients.marked_by = docterInfo.value["姓名"]
          // tmppatients.ky_status = Number(tmppatients.ky_status);
          // tmppatients.hs_status = Number(tmppatients.hs_status);
          // console.log("ky & hs type: ", tmppatients.ky_status, typeof tmppatients.ky_status, typeof tmppatients.yang_2_ying)
          // tmppatients.yang_2_ying = tmppatients.yang_2_ying ? 1 : 0
          postPatientsJson.push(tmppatients);
        }
      }
      if (searchValue.value.trim()) { // 搜索后提交 当前patients.value缓存 只从rawPatients中去除提交的部分
        let newrawPatients = [];
        // 
        for (var j = 0; j < rawPatients.length; j++) {
          let y = rawPatients[j]
          let isRemoveEle = false
          for (var i = 0; i < postPatientsJson.length; i++) {
            let x = postPatientsJson[i]
            if (x.age == y.age && x.areaName == y.areaName && x.assistantDoctorCode == y.assistantDoctorCode
              && x.attendingDoctorCode == y.attendingDoctorCode && x.bedNo == y.bedNo && x.clinicDiagName == y.clinicDiagName &&
              x.clinicDoctorCode == y.clinicDoctorCode && x.deptCode == y.deptCode && x.deptName == y.deptName && x.directorDoctorCode == y.directorDoctorCode &&
              x.doctorCode == y.doctorCode && x.doctorName == y.doctorName && x.gender == y.gender && x.hospitalCode == y.hospitalCode &&
              x.idcard == y.idcard && x.patientName == y.patientName && x.phone == y.phone && x.pi == y.pi && x.pv == y.pv && x.ruyuandate == y.ruyuandate &&
              x.wardCode == y.wardCode && x.wardName == y.wardName) {
                isRemoveEle = true;
              break;
            }
          }
          if (!isRemoveEle) {
            newrawPatients.push(y);
          }
        }
        rawPatients = newrawPatients
        patients.value = willSubPatientsJson

      } else { // 普通提交 patiants.value 是=== rawPatients的，因此;
        patients.value = willSubPatientsJson
        rawPatients = deepClone(willSubPatientsJson)

        console.log("submit content---", rawPatients, rawPatients.length)
        console.log("submit content---", patients.value, patients.value.length)
      }

      console.log("postPatientsJson", postPatientsJson)
      axios.post('http://124.223.49.85:1112/NucleicPatientMark/doctor/updatePatientNucleicStatus', { total: postPatientsJson.length, patientInfos: postPatientsJson })
        .then(response => {
          if (response.status == 200) {
            // showToast('提示内容');
            console.log("提交log")
            showNotify({ type: 'success', message: '提交成功', background: '#32CD32',  position: 'top'})

          } else {
            showNotify({ type: 'warning', message: '提交失败', background: '#dg4332', position: 'top'})
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
      console.log("submit")
      // if (searchValue.value.trim()) {// 搜索后提交 
      //   searchValue
      // }

    }

    const docterInfo = ref({})//{ code: "N6283", deptCode: "448", deptName: "重症医学科", name: "伍宁" }); //TODO 去掉预留
    const buttomOnChange = (index) => {
      console.log(" index ", index, "active.value", active.value)
      if (index == 1) {// update marked data
        let d1 = {
          marked_by: docterInfo.value['姓名']
        }
        axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getMarkedPatient", d1).then(res => {
          console
          if (res.status == 200) {
            patientsWithTag.value = res.data.patientInfos
          }
        })
      }
    }

    onMounted(() => {
      // `(${count})`
      // showConfirmDialog({
      //   title: '请选择',
      //   message:
      //     '选择 门诊 ：住院',
      //   confirmButtonText: "住院", // 确认就是住院
      //   confirmButtonColor: "#1E90FF",
      //   // showCancelButton: true,
      //   cancelButtonText: "门诊",
      //   cancelButtonColor: "#ee0a24"
      // })
      //   .then(() => {
      //     // on confirm
      //     console.log("住院")
      //     iszhuyuan = "zy";
      //     initData()
      //   })
      //   .catch(() => {
      //     // on cancel
      //     console.log("门诊")
      //     iszhuyuan = "mz";
      //     initData()
      //   });
      if (!route.query.code) {
        showNotify({ type: 'warning', message: '获取医生数据失败', background: '#F23D32', position: 'top', });
      } else {
        searchJsonTemplate.doctorCode = route.query.code
        axios.get("http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=" + route.query.code).then(function (response) {  //先用官网的数据
          if (response.status != 200) { showNotify({ type: 'warning', message: '"医生数据查询失败', background: '#32CD32', position: 'top', lockScroll: true,}); return }
          //[result  = {code: "N6283", deptCode: "448", deptName:"重症医学科", name: "伍宁"}]
          if (response.data.result) {

            showNotify({ type: 'success', message: '已获取到医生数据', background: '#23FD32', position: "top", lockScroll: true,})
            docterInfo.value = response.data.result
            iszhuyuan = "zy";
            // init data
            searchJsonTemplate.doctorCode = route.query.code
            let sj = { ...searchJsonTemplate }
            commonPullPatientsData(sj)

            console.log(docterInfo.value)
          }

        })// then end
      }
    });


    function isObjectValueEqual(a, b) {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        var propA = a[propName];
        var propB = b[propName];
        if (propA !== propB) {
          return false;
        }
      }
      return true;
    }

    const deepClone =(a) => {
      let l = []
      a.forEach(ele => {
        l.push({...ele})
      });
      return l
    }

    function deepClone1(target) {
      // WeakMap作为记录对象Hash表（用于防止循环引用）
      const map = new WeakMap()
      // 判断是否为object类型的辅助函数，减少重复代码
      function isObject(target) {
        return (typeof target === 'object' && target) || typeof target === 'function'
      }
      function clone(data) {
        // 基础类型直接返回值
        if (!isObject(data)) {
          return data
        }
        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
          return new data.constructor(data)
        }
        // 处理函数对象
        if (typeof data === 'function') {
          return new Function('return ' + data.toString())()
        }
        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
          return exist
        }
        // 处理Map对象
        if (data instanceof Map) {
          const result = new Map()
          map.set(data, result)
          data.forEach((val, key) => {
            // 注意：map中的值为object的话也得深拷贝
            if (isObject(val)) {
              result.set(key, clone(val))
            } else {
              result.set(key, val)
            }
          })
          return result
        }
        // 处理Set对象
        if (data instanceof Set) {
          const result = new Set()
          map.set(data, result)
          data.forEach(val => {
            // 注意：set中的值为object的话也得深拷贝
            if (isObject(val)) {
              result.add(clone(val))
            } else {
              result.add(val)
            }
          })
          return result
        }
        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)
        // 新对象加入到map中，进行记录
        map.set(data, result)
        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
          const val = data[key]
          if (isObject(val)) {
            // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
            result[key] = clone(val)
          } else {
            result[key] = val
          }
        })
        return result
      }
      return clone(target)
    }

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
      patientsWithTag,
      pullDownloading, pullDownRefresh
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


#message-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;

    /* 采用flex弹性布局，让容器内部的所有消息可以水平居中，还能任意的调整宽度 */
    display: flex;
    flex-direction: column;
    align-items: center;
}
#message-container .message {
    background: #fff;
    margin: 10px 0;
    padding: 0 10px;
    height: 40px;
    box-shadow: 0 0 10px 0 #eee;
    font-size: 14px;
    border-radius: 3px;

    /* 让消息内部的三个元素（图标、文本、关闭按钮）可以垂直水平居中 */
    display: flex;
    align-items: center;
}
#message-container .message .text {
    color: #333;
    padding: 0 20px 0 5px;
}
#message-container .message .close {
    cursor: pointer;
    color: #999;
}

/* 给每个图标都加上不同的颜色，用来区分不同类型的消息 */
#message-container .message .icon-info {
    color: #0482f8;
}
#message-container .message .icon-error {
    color: #f83504;
}
#message-container .message .icon-success {
    color: #06a35a;
}
#message-container .message .icon-warning {
    color: #ceca07;
}
#message-container .message .icon-loading {
    color: #0482f8;
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














// const initData = () => {
  //   // axios.get("http://201.xggong.com:12201/xs_datacenter/patient/byDoctor?doctorCode=" + route.query)// ref code=7355
  //   axios.post("http://124.223.49.85:1112/NucleicPatientMark/doctor/getCurOfficePatient", {
  //     "queryType": iszhuyuan,
  //     "doctorCode": route.query.code,  // 先写死 route.query
  //   })
  //     // ).then(function(response){
  //     .then(function (res) {
  //       if (res.status != 200) { showNotify({ type: 'warning', message: '"病人数据查询失败', background: '#32CD32', position: 'top', }); return }
  //       if (res.data.result && res.data.total != 0) { //TODO下拉刷新数据
  //         // 加载状态结束
  //         loading.value = true;
  //         // 数据全部加载完成
  //         finished.value = true;

  //         res.data.result.rows.forEach(ele => {
  //           if (ele.marked_by) {
  //             ele.ky_status = Number(ele.ky_status) == 1 ? "1" : "2";
  //             ele.hs_status = Number(ele.hs_status) == 1 ? "1" : "2";
  //             // ele.yang_2_ying = ele.yang_2_ying ? 1 : 0  // 
  //           }
  //         })
  //         rawPatients = res.data.result.rows
  //         patients.value = res.data.result.rows
  //         showToast({ message: '已获取到患者数据', position: 'top', });
  //         // showNotify({ type: 'success', message: '已获取到患者数据', background: '#23FD32', position: 'top', })
  //       }
  //     })
  // } // init over;



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
      pageNum.value += 1;
      pullDownloading.value = false;
    }
  }) //then end;