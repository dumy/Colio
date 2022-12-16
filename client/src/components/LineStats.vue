<template>
    <div>
        <div class="row">
            <div class="d-flex justify-content-between p-2">
                <div class="text-start">
                    <h5>{{ title }}</h5>
                </div>
                <div class="text-end">
                    <h5>{{ DataLine }} %</h5>
                </div>

            </div>
        </div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="dataStyle" :aria-valuenow="DataLine" aria-valuemin="0"
                aria-valuemax="100"></div>
        </div>

    </div>
</template>
  
<script setup>

import { ref, watchEffect } from 'vue'

const props = defineProps({
    title: String,
    DataLine: Number,
})

let dataStyle = ref();
let color = ref();

watchEffect(() => {
    if (props.DataLine < 15) {
        color.value = 'green'
    }
    else if (props.DataLine < 50) {
        color.value = 'yellow'
    }
    else {
        color.value = 'red'
    }

    dataStyle.value = "width: " + props.DataLine + "%; background-color: " + color.value + ";";
})






</script>
  
<style scoped>

</style>