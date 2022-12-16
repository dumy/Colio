<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <img :src="detailDB.img" alt="" style="width: 80px" />
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">{{ detailDB.MACHINENAME }}</h6>
                            <span>{{ detailDB.SQLSERVEREDITION }}</span>
                        </div>
                    </div>
                    <div class="badge"><span>MSSQL</span></div>
                </div>
                <div class="mt-5">
                    <!-- <h3 class="heading">Senior Product<br />Designer-Singapore</h3> -->
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Version
                            <span>
                                {{ detailDB.PRODUCTLEVEL }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Nr. License
                            <span>
                                {{ detailDB.NUMLICENSES == null ? "*" : detailDB.NUMLICENSES }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Time Work
                            <span> {{ detailDB.worktime }} days </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Clustered
                            <span>
                                {{ detailDB.ISCLUSTERD }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Databases
                            <span>
                                {{ detailDB.databases }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Views
                            <span>
                                {{ detailDB.views }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Procedures
                            <span>
                                {{ detailDB.procedures }}
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Functions
                            <span>
                                {{ detailDB.functions }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script setup>
const props = defineProps({
    detailDB: Object,
    default(rawProps) {
        return { message: 'hello' }
    }
})


// onMounted(() => {
//     const detailDB = ref(props.detailDB)
// })



</script>
  
<style scoped>
body {
    background-color: #eee;
}

.card {
    border: none;
    border-radius: 10px;
}

.c-details span {
    font-weight: 300;
    font-size: 13px;
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px;
}

.badge span {
    background-color: #fffbec;
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: #fed85d;
    justify-content: center;
    align-items: center;
}

.text1 {
    font-size: 14px;
    font-weight: 600;
}

.text2 {
    color: #a5aec0;
}
</style>
  