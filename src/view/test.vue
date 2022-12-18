<template>
    <div>
        test
    </div>
</template>


<script>

import { showNotify } from 'vant';
import { onMounted } from 'vue';

export default {

    setup() {
        onMounted(() => {
            showNotify({ type: 'success', message: '已获取到医生数据', background: '#23FD32', position: "top", lockScroll: true,})
        });
        return {
    };
    }

}


</script>