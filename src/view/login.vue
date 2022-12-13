<template>
  <div class="loginbox">
    <!-- <van-col> -->
      <van-form @submit="onSubmit" label-width="3.2em">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="工号"
            label="工号"
            placeholder="工号"
            :rules="[{ required: true, message: '请填写工号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

    <!-- </van-col> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import router from '../router'
export default {

  setup() {
    const username = ref('');
    const password = ref('');
    const onSubmit = (values) => {
        // if(username.value.trim() == ''){
        //   // console.log('ffff');
        //     return
				// }
				// if(!username.value.match(/^\d{3,}$/)){
        //   // console.log('submit');
				// 	return
				// }
				// if(!password.value.match(/^\w{6,}$/)){
        //   // console.log('submit2');
				// 	return
				// }
      window.sessionStorage.setItem('token', "TODOTOKEN______TOKEN")
      console.log('submit', values);
      // this.$router.push
      console.log(router)
      router.push("/home")
      // console.log(this.$router.push("/home"));
      
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
// const user =
// import userApi from '@/api/userApi'
// import { mapGetters } from 'vuex'
// export default {
//   data () {
//     return {
//       user: {
//         name: '',
//         password: ''
//       }
//     }
//   },
//   computed: {
//     ...mapGetters(['token'])
//   },
//   methods: {
//     async userLogin () {
//       let res = await userApi.login(this.user)
//       if (res) {
//         this.$store.dispatch('setToken', res.result.token)
//         this.$router.push({ path: this.redirect || '/' })
//       }
//     }
//   }
// }
</script>
<style  >
.user-name {
  font-size: 60px;
  height: 120px;
}
.loginbox {
  /* width: 500px;
	height: 200px; */
  /* border: 1px solid rgb(255, 254, 254); */
  /* height: 60%; */
  border-radius: 3px;
  box-shadow: 0px 0px 4px #fffcfc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>