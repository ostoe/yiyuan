<template>
    <van-tabbar v-model="active" active-color="#ee0a24" @change="buttomOnChange">
        <van-tabbar-item icon="home-o" >待标记</van-tabbar-item>
        <van-tabbar-item icon="search" >已标记</van-tabbar-item>
    </van-tabbar>
    <div v-if="active == 0">
        
        <van-sticky :offset-top="0">
            <van-row gutter="20">
                
                <van-col span="20"><van-search
                    v-model="searchValue"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch">
                    <template #action>
                        <!-- <div @click="onClickButton">搜索</div> -->
                        <div>搜索</div>
                    </template>
                    </van-search></van-col>
                <van-col span="4"><van-button plain hairline color="#7232dd" type="primary" @click="submit">提交</van-button></van-col>
                
            </van-row>
        </van-sticky>
        <van-row>
            <van-col span="4"><van-button>您的姓名:</van-button></van-col>
            <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo.name}}</van-tag></van-col>
            <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">Code</van-tag></van-col>
            <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo.code}}</van-tag></van-col>
            <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">部门</van-tag></van-col>
            <van-col span="4"><van-tag color="#ffe1e1" text-color="#ad0000">{{docterInfo.deptName}}</van-tag></van-col>
        </van-row>

<!-- 列表单元开始 -->
    <div style="margin-left:2%; margin-right:2%">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row justify="space-between" style="background-color: #AFEEEE; box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1); margin-top:3%; margin-right:1%; padding:14px; border-radius: 10px;"  v-for="item in patients" :key="item" :title="item">
                <!-- <van-cell class="van-cell-text"> -->
                    <van-col span="14" style="margin-top: 0%; margin-right: 0%; ">
                        <van-row justify="space-between" span="7">
                            <van-col span="6"> <van-tag plain type="primary" size="large">{{item.areaName}}</van-tag> </van-col>
                            <van-col span="6"> {{item.pi}} </van-col>
                            <van-col span="6"> {{item.ruyuandate.substring(0, 10)}} </van-col>
                        </van-row>
                        <van-row justify="space-between" span="9">
                            <van-col span="4"> <van-tag plain type="primary" size="large">{{item.patientName}}</van-tag> </van-col>
                            <van-col span="4"> {{item.age}} </van-col>
                            <van-col span="4"> {{item.gender}} </van-col>
                            <van-col span="4"> {{item.bedNo}} </van-col>
                        </van-row>
                        <van-row justify="space-between" span="7">
                            <van-col style=""> {{item.clinicDiagName}} </van-col>
                        </van-row>

                    </van-col>
                    <van-col span="4">
                        <van-row>
                            <van-button size="mini" style="margin-top: 0%; margin-right: 0%;">抗原</van-button>
                            <van-radio-group v-model="item.ky">
                            <van-radio name="1" checked-color="#ee0a24">阳</van-radio>
                            <van-radio name="2" checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
                            </van-radio-group>
                        </van-row>
                        <van-row>
                            <van-button size="mini" style="margin-top: 0%; margin-right: 0%;">核酸</van-button>
                            <van-radio-group v-model="item.hs">
                            <van-radio name="1" checked-color="#ee0a24" style="margin-top: 0%;">阳</van-radio>
                            <van-radio name="2" checked-color="#32CD32" style="margin-top: 0%;">阴</van-radio>
                            </van-radio-group>
                        </van-row>
                    </van-col>
                    <van-col span="4">
                        <!-- 这里加载和提交都需要转义 -->
                        <!-- <van-switch v-model="item.yang_2_ying">
                            <template #node>
                                <div class="icon-wrapper">
                                <van-icon :name="checked ? 'success' : 'cross'" />
                                </div>
                            </template>
                        </van-switch> -->
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
<!-- 列表单元结束 -->

    </div>
    <div v-else>
        text2
    </div>

</template>




<script>
// import router from '../router'
import { useRoute } from "vue-router";
import { ref , onMounted} from 'vue';
import axios from 'axios'
import {showNotify, showToast }from 'vant'

export default {
  setup() {
    const active = ref(0); // 0 or 1
    const route = useRoute();
    const searchValue = ref("")
    // const patients = ref([]);
    const patients = ref([{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"刘华伟","pi":"97041742","pv":"22304164","ruyuandate":"2022-12-13 09:14:34","wardCode":"810","wardName":"86病区","age":43,"gender":"男性","bedNo":"G0501","clinicDiagName":"左侧膝关节前十字韧带完全断裂","idcard":"362329197901264818","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"李正明","pi":"97041762","pv":"22308181","ruyuandate":"2022-12-14 17:19:48","wardCode":"810","wardName":"86病区","age":67,"gender":"男性","bedNo":"G0102","clinicDiagName":"右侧肩袖损伤","idcard":"310229195508211212","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"8266","doctorName":"万方","patientName":"刘明芮","pi":"97041763","pv":"22308203","ruyuandate":"2022-12-14 17:21:24","wardCode":"810","wardName":"86病区","age":18,"gender":"女性","bedNo":"G0602","clinicDiagName":"右侧膝关节前十字韧带损伤","idcard":"500112200404170424","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""},{"areaName":"江苏路分部","hospitalCode":"02","deptCode":"4845","deptName":"运动医学","doctorCode":"7335","doctorName":"张鹏","patientName":"何琳","pi":"97041777","pv":"22313773","ruyuandate":"2022-12-15 17:17:41","wardCode":"810","wardName":"86病区","age":49,"gender":"女性","bedNo":"G0502","clinicDiagName":"右侧肩袖损伤","idcard":"513027197309046221","phone":""}])

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const initData = ()=> {
        axios.get("http://201.xggong.com:12201/xs_datacenter/patient/byDoctor?doctorCode=7335")//TODO替换route+query
      .then(function (res) {
        if (res.status != 200) {showNotify({ type: 'warning', message: '"病人数据查询失败',background: '#32CD32',  position: 'top',});return}
        if (res.data.result && res.data.total != 0) {
            // 加载状态结束
            loading.value = true;
            // 数据全部加载完成
            finished.value = true;
            patients.value = res.data.result.rows.patients
        }
      })
    } // init over;
    const onSearch = ()=> {

    }

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

    };

    const docterInfo = ref({code: "N6283", deptCode: "448", deptName:"重症医学科", name: "伍宁"}); //TODO 去掉预留
    const buttomOnChange = (index) => {
        showToast(`标签 ${index}`);
        showToast(`a-${active.value}`);
    }

    onMounted(()=>{
      // `(${count})`
      axios.get("http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=7335").then(function(response){ 
    //   axios.get("http://201.xggong.com:12201/xs_datacenter/doctors/byCode?code=" + route.query.code).then(function(response){ // TODO先写死
            if (response.status == 200) {
                //[{code: "N6283", deptCode: "448", deptName:"重症医学科", name: "伍宁"}]
              if(response.data.result) {
                initData()
              }
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