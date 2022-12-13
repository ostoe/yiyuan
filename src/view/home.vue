<template>
    <div class="van-safe-area-top"></div>
  <div>
    <van-row>
        <van-col span="10" offset="4">
            <van-button @click="show = true">选择科室</van-button>
            <van-popup v-model:show="show" round position="bottom">
            <van-cascader style="margin-bottom:22%;"
                v-model="cascaderValue"
                title="请选择所在地区"
                :options="options"
                @close="show = false"
                @finish="onFinish"
            />
            </van-popup>

        </van-col>
        <van-col span="10" offset="0">
            <van-button type="primary" @click="submit">提交</van-button>
        </van-col>
    
    
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
                    <van-row>
                        <van-button size="mini" style="margin-top: 10%;">抗原</van-button>
                        <van-radio-group v-model="item.ky">
                        <van-radio name="1" checked-color="#ee0a24">阳</van-radio>
                        <van-radio name="2" checked-color="#32CD32">阴</van-radio>
                        </van-radio-group>
                    </van-row>
                    <van-row>
                        <van-button size="mini" style="margin-top: 5%;">核酸</van-button>
                        <van-radio-group v-model="item.hs">
                        <van-radio name="1" checked-color="#ee0a24">阳</van-radio>
                        <van-radio name="2" checked-color="#32CD32">阴</van-radio>
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

import { ref } from 'vue';
export default {
  setup() {

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
    const options = [
        {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
      },
      {
        text: '浙江省',
        value: '330000',
        children: [{ text: '杭州市', value: '330100' }],
      },
      {
        text: '江苏省',
        value: '320000',
        children: [{ text: '南京市', value: '320100' }],
      },
    ];
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      console.log(fieldValue.value)
    };

    const submit = () => {
        for(let i=0; i<patients.value.length; i++) {
            if (patients.value[i].hs ==999 || patients.value[i].ky == 999) {
                // console.log("-")
                // Notify('有未选择项');
                alert("信息未填写完");
                return
            }
        }
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
      options,
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