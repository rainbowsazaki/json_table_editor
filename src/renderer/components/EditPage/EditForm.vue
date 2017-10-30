<template>
  <div v-if="isVisible" class="editForm">
    <div v-for="format in formats" :key="format.id">
      {{format.name}}:
      <MultiInput :format="format" :edit-data="editData"></MultiInput>
    </div>
    <button @click="hide">Cancel</button>
    <button @click="update(); hide();">Update</button>
    <button @click="add">Add</button>
  </div>


</template>

<script>

import MultiInput from './MultiInput.vue'

export default {
  name: 'EditForm',
  props: [ 'formats' ],
  data: function () {
    return {
      isVisible: false,
      editData: {}
    }
  },
  created: function () {
    for (let format of this.formats) {
      let FormatType = format.type
      this.editData[format.id] = new FormatType()
    }
  },
  methods: {
    setEditData: function (target) {
      this.editData = JSON.parse(JSON.stringify(target))
      for (let format of this.formats) {
        let FormatType = format.type
        this.editData[format.id] = this.editData[format.id] || new FormatType()
      }
    },
    update: function () {
      this.$emit('update', this.editData)
    },
    add: function () {
      this.$emit('add', this.editData)
    },
    show: function () { this.isVisible = true },
    hide: function () { this.isVisible = false }
  },
  components: {
    MultiInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editForm {
  border: 1px solid #666;
  background: #eee;
  opacity: 1;
  margin: auto;
  position: fixed;
  left: 2px;
  top: 2px;
  padding: 4px;
}


</style>


