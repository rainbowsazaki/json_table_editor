<template>
  <span v-if="format.type === String && htmlValues[format.id][data[format.id]]" v-html="htmlValues[format.id][data[format.id]]" :title="data[format.id]"></span>
  <span v-else-if="format.type === String">{{data[format.id]}}</span>
  <div v-else-if="format.type === Number" style="text-align: right;">{{data[format.id]}}</div>
  <span v-else-if="format.type === Array && format.allDisp">
      <span v-for="t in format.select" :key="t.value || t" class="array-item" :class="[{ 'not-selected': (data[format.id].indexOf(t.value || t) == -1) }]">
          <img v-if="t.image" :src="t.image" :title="t.value"/>
          <span v-else-if="t.html" v-html="t.html" :title="t.value"></span>
          <span v-else>{{t.value || t}}</span>
      </span>
  </span>
  <span v-else-if="format.type === Array">
      <span v-for="t in data[format.id]" :key="t" class="array-item">
          <img v-if="imageValues[format.id][t]" :src="imageValues[format.id][t]" :title="t" />
          <span v-else-if="htmlValues[format.id][t]" v-html="htmlValues[format.id][t]" :title="t"></span>
          <span v-else class="text">{{t}}</span>
      </span>
    </span>
</template>

<script>
export default {
  name: 'MultiDisp',
  props: [ 'format', 'data', 'htmlValues', 'imageValues' ],
  data: function () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.array-item img {
  width: 24px;
  height: 24px;
}

.array-item .text {
  border: 1px solid #999;
  border-radius: 8px;
  padding: 2px;
  margin: 2px;
}


.not-selected {
  opacity: 0.2;
}


.not-selected img {
  opacity: 1.0;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}


</style>
