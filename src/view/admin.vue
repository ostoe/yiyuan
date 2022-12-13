<template>
    <div class="van-safe-area-top"></div>
  <div>
    <van-row>
        <van-col span="10" offset="4">
            <van-button type="primary" >筛选</van-button>
        </van-col>
        <van-col span="10" offset="0">
            <van-button type="primary" @click="submit">导出excel</van-button>
        </van-col>
    
    
    </van-row>

    <van-row>
        <!-- <van-button size="mini" style="margin-top: 10%;">抗原</van-button> -->
        <van-radio-group v-model="hsAndky">
            <van-radio name="1" checked-color="#ee0a24">全部显示</van-radio>
            <van-radio name="2" checked-color="#32CD32">抗原阳+核酸阳</van-radio>
            <van-radio name="3" checked-color="#32CD32">抗原阳</van-radio>
            <van-radio name="4" checked-color="#32CD32">抗原阴</van-radio>
            <van-radio name="5" checked-color="#32CD32">核酸阳</van-radio>
            <van-radio name="6" checked-color="#32CD32">核酸阴</van-radio>
        </van-radio-group>
    </van-row>

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
                        {{item.patientName}}
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
                        {{item.wardName}}
                    </van-row>
                    <van-row style="margin-top: 20%;">
                        {{item.doctorName}}
                    </van-row>
                </van-col>
                <van-col span="7">
                    <van-row style="margin-top: 0%;">
                        <van-button size="mini" >抗原</van-button>
                        <van-col v-if="item.ky == '1'">
                            <van-icon name="passed" color="#32CD32"/>
                            阴
                        </van-col>
                        <van-col v-else-if="item.ky == '2'">
                            <van-icon name="clock-o" color="#ee0a24" />
                            阳
                        </van-col>
                        <van-col v-else>
                            <van-icon name="question-o" />
                            无效
                        </van-col>
                    </van-row>
                    <van-row style="margin-top: 5%;">
                        <van-button size="mini" >核酸</van-button>
                        <van-col v-if="item.hs == '1'">
                            <van-icon name="passed" color="#32CD32"/>
                            阴
                        </van-col>
                        <van-col v-else-if="item.hs == '2'">
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

import { ref } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

export default {
  setup() {
    const hsAndky = ref("0");
    const show = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套

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
                "ky": '1',
                "hs": '2',
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

    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      console.log(fieldValue.value)
    };

    const submit = () => {
        let excelData = [
					["序号","姓名","年龄","性别","手机","邮箱","金额","创建日期"],
					[1,"周一",28,"男","13888888881","1@q.com",4123.3,"2020-05-01"],
					[2,"崔二",25,"女","13888888882","2@q.com",23432,"2020-05-03"],
					[3,"张三",15,"男","13888888883","3@q.com",433.14,"2020-05-02"],
					[4,"李四",27,"男","13888888884","4@q.com",6523,"2020-05-01"],
					[5,"王五",18,"男","13888888885","5@q.com",411.36,"2020-05-04"],
					[6,"赵六",21,"男","13888888886","6@q.com",1234,"2020-05-08"],
					[7,"唐七",22,"女","13888888887","7@q.com",4321.75,"2020-05-05"],
					[8,"范八",19,"男","13888888888","8@q.com",4322,"2020-05-06"],
					[9,"薛九",31,"女","13888888889","9@q.com",56465,"2020-05-01"],
					[10,"闫十",45,"男","13888888810","10@q.com",7864,"2020-05-07"]
				]
                // ref: https://docs.sheetjs.com/docs/getting-started/example
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
          /* calculate column width */
        // const max_width = excelData.reduce((w, r) => Math.max(w, r.name.length), 10);
        // worksheet["!cols"] = [ { wch: max_width } ];
        XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
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

    return {
      list,
      onLoad,
      loading,
      finished,
      userInfo,
      show,
      hsAndky,
      onFinish,
      fieldValue,
      cascaderValue,
      submit,
      patients,

    };
  },
};

</script>
<style lang="less">
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