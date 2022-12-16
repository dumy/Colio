import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useServerStore = defineStore("server", () => {
  const servers = ref([]);
  const serverId = ref(null);
  const detail = ref([]);
  const cpu = ref(0);
  const memory = ref(0);

  const serverDetail = reactive({
    detail: '',
    cpu: 0,
    memory: 0,
    storage:[],
    sessions:[],
    kill: 0
  })

  async function allServer() {
    try {
      const data = await axios.get("http://localhost:3000/server");
      servers.value = data.data;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function detailServer(id) {
    try {
      const data = await axios.post("http://localhost:3000/server/detail",{
        params: {
          ServerID: id
        },
      });
      serverDetail.detail = data.data[0];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function mssqlCPU(id) {
    try {
      const data = await axios.post("http://localhost:3000/server/mssql/CPU",{
        params: {
          ServerID: id
        },
      });
      serverDetail.cpu = data.data.cpuUsed;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function mssqlMemory(id) {
    try {
      const data = await axios.post("http://localhost:3000/server/mssql/memory",{
        params: {
          ServerID: id
        },
      });
      serverDetail.memory = data.data.usedProcetage;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function mssqlStorage(id) {
    try {
      const data = await axios.post("http://localhost:3000/server/mssql/storage",{
        params: {
          ServerID: id
        },
      });
      serverDetail.storage = data.data;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function sessions(id) {
    try {
      const data = await axios.post("http://localhost:3000/server/mssql/sessions",{
        params: {
          ServerID: id
        },
      });
      serverDetail.sessions = data.data;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  async function kill(id, spid) {
    console.log(spid, id);
    try {
      const data = await axios.post("http://localhost:3000/server/mssql/session/kill",{
        params: {
          ServerID: id,
          spid: spid
        },
        
      });
      serverDetail.kill = 1;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  

  return { servers, allServer, detailServer,mssqlCPU,mssqlMemory, serverDetail,mssqlStorage,sessions,kill };
});
