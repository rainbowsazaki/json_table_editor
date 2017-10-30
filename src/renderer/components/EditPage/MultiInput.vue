<template>
  <span v-if="format.type === Number"><input type="number" v-model.number="editData[format.id]" style="width:4em;" /></span>
  <span v-else-if="format.type === Array" class="array">
    <ArrayItemEdit v-for="i in format.select" v-if="!i.isSub" :key="i.value" :format="format" :i="i" :editData="editData" @change="sortArrayData" />
    <ArrayItemEdit v-for="i in format.select"v-if="isDispSub && i.isSub" :key="i.value" :format="format" :i="i" :editData="editData" @change="sortArrayData" />
    <span v-if="hasSubItem" @click="isDispSub=!isDispSub">{{isDispSub ? '-' : '+'}}</span>
  </span>
  <span v-else-if="format.type === String && format.select">
    <select name="format.id" v-model="editData[format.id]">
        <option v-for="i in format.select" :key="i.value || i" :value="i.value || i">{{i.value || i}}</option>
    </select>
  </span>
  <span v-else><input v-model="editData[format.id]" /></span>
</template>

<script>
import ArrayItemEdit from './ArrayItemEdit.vue'

export default {
  name: 'MultiInput',
  props: [ 'format', 'editData' ],
  data: function () {
    return {
      isDispSub: false
    }
  },
  created: function () {
    if (this.format.type === Array) {
      // alias check
      this.editData[this.format.id] = this.editData[this.format.id].map(
        d => {
          for (let item of this.format.select) {
            if (!item.value) { continue }
            if (item.value === d || item.alias === d || (item.isArray && item.indexOf(d) !== -1)) { return item.value }
          }
        }
      )
      this.sortArrayData()
    }
  },
  methods: {
    sortArrayData: function () {
      if (this.format.type !== Array) { return }
      this.editData[this.format.id] = this.editData[this.format.id].sort((a, b) => this.selectIndexs[a] - this.selectIndexs[b])
    }
  },
  computed: {
    selectIndexs: function () {
      if (!this.format.select) { return {} }
      let obj = {}
      for (let i in this.format.select || []) {
        let value = this.format.select[i]
        value = value.value || value
        obj[value] = i
      }
      return obj
    },
    hasSubItem: function () {
      return (this.format.select && this.format.select.some(n => n.isSub))
    }
  },
  components: {
    ArrayItemEdit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
