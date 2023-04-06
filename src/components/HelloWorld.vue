<template>
  <div class="card" v-for="(item, index) in dataList" :key="index">
    <div class="card-header">
      <h4 class="card-title">{{ item.name }}</h4>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead class="text-primary">
            <tr>
              <th v-for="i in columns" :style="{ width: i.width }">
                {{ i.keyIndex }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in item.children">
              <td v-for="o in columns">{{ i[o.keyIndex] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const dataList = ref();
const columns = [
  {
    keyIndex: "description",
    width: "40%",
  },
  {
    keyIndex: "value",
    width: "30%",
  },
  {
    keyIndex: "obsolete",
    width: "20%",
  },
];

const list = async () => {
  fetch("./output.json")
    .then((response) => response.json())
    .then((data) => {
      const { groups } = data;
      console.log(groups);
      dataList.value = groups;
    });
};

onMounted(() => {
  list();
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
