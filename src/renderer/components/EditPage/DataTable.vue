<template>
  <div>
    <div class="headMenu">
      <button @click="isDragMode = !isDragMode">{{isDragMode ? '入力' : '移動・削除' }}</button>
    </div>
    <table>
      <tr>
        <th v-for="format in formats" :key="format.id">{{format.name}}</th>
      </tr>
      <tr v-for="(row, i) in data" :key="i" :draggable="isDragMode"
        @click="changeDragTarget(i)" @dragstart="startDrag(i, $event)" @dragover="dropover" @dragenter="dragenter(i)" @dragleave="dragleave"  @drop="drop(i)" @dragend="dragend"
       :class="{ 'drag-target': dragTarget[i], 'drop-target': dropTargetIndex == i }">
        <td v-for="format in formats" :key="format.id" @dblclick="editOne(format, i);">
          <MultiDisp v-if="editing != i + ': ' + format.id" :format="format" :data="row" :html-values="htmlValues" :image-values="imageValues"></MultiDisp>
          <span v-else>
            <MultiInput :format="format" :edit-data="row"></MultiInput>
            <button @click="editing = ''">ok</button></span>
        </td>
        <td v-if="isEditable" class="dragTriger">
          <button v-if="!isDragMode" @click="editRow(row);">Edit</button>
          <button v-if="isDragMode" @click="tryDeleteRow(i)">Delete</button>
          <span v-if="isDragMode">::</span>
        </td>
      </tr>
      <tr v-if="isEditable">
        <td><button @click="addItem">Add</button></td>
      </tr>
    </table>
    <EditForm ref="editForm" :formats="formats" @update="updateRow" @add="addItem"></EditForm>
  </div>
</template>

<script>
import MultiDisp from './MultiDisp.vue'
import MultiInput from './MultiInput.vue'
import EditForm from './EditForm.vue'

export default {
  name: 'DataTable',
  props: [ 'formats', 'data', 'isEditable' ],
  data: function () {
    return {
      editing: '',
      editData: {},
      isDragMode: false,
      dragTarget: {},
      dropTargetIndex: -1
    }
  },
  methods: {
    editOne: function (format, i) {
      if (!this.isEditable) { return }
      this.editing = i + ': ' + format.id
    },
    addItem: function (item = {}) {
      item = JSON.parse(JSON.stringify(item))
      for (let format of this.formats) {
        let FormatType = format.type
        item[format.id] = item[format.id] || new FormatType()
      }
      this.data.push(item)
      this.editData = item
    },
    editRow: function (target) {
      this.editData = target
      this.$refs.editForm.setEditData(target)
      this.$refs.editForm.show()
    },
    updateRow: function (data) {
      for (let key in data) {
        this.editData[key] = data[key]
      }
    },
    tryDeleteRow: function (rowIndex) {
      if (confirm('delete OK?')) {
        this.data.splice(rowIndex, 1)
      }
    },
    outputJson: function () {
      return JSON.stringify(this.data, this.formats.map(t => t.id)).split('},').join('},\n')
    },

    changeDragTarget: function (i) {
      if (!this.isDragMode) { return }
      this.$set(this.dragTarget, i, !this.dragTarget[i])
    },
    startDrag: function (i, e) {
      if (!this.dragTarget[i]) {
        this.dragTarget = {}
        this.$set(this.dragTarget, i, true)
      }
    },
    dropover: function (e) {
      e.preventDefault()
    },
    dragenter: function (i) {
      setTimeout(() => {
        this.dropTargetIndex = i
      }, 1)
    },
    dragleave: function (i) {
      this.dropTargetIndex = -1
    },
    drop: function (targetIndex) {
      let dragIndexs = []
      for (let i in this.dragTarget) { dragIndexs.push(i) }
      dragIndexs = dragIndexs.sort()
      let dragTarget = dragIndexs.map(i => this.data[i])
      dragIndexs.reverse().forEach((i) => {
        this.data.splice(i, 1)
        if (i < targetIndex) { targetIndex-- }
      })
      this.data.splice(targetIndex, 0, ...dragTarget)
      this.dragTarget = {}
      this.dropTargetIndex = -1
    },
    dragend: function () {
      this.dragTarget = {}
      this.dropTargetIndex = -1
    }
  },
  computed: {
    htmlValues: function () {
      let obj = {}
      for (let format of this.formats) {
        let obj2 = obj[format.id] = {}
        if (!format.select) { continue }
        for (let selectItem of format.select) {
          if (!selectItem.html) { continue }
          let names = [ selectItem.value ].concat(selectItem.alias || [])
          for (let name of names) {
            obj2[name] = selectItem.html
          }
        }
      }
      return obj
    },
    imageValues: function () {
      let obj = {}
      for (let format of this.formats) {
        let obj2 = obj[format.id] = {}
        if (!format.select) { continue }
        for (let selectItem of format.select) {
          if (!selectItem.image) { continue }
          let names = [ selectItem.value ].concat(selectItem.alias || [])
          for (let name of names) {
            obj2[name] = selectItem.image
          }
        }
      }
      return obj
    }
  },
  components: {
    MultiDisp,
    MultiInput,
    EditForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

headMenu {
  position: fixed;
  top: 0px;
}

table {
  width: 100%;
	border-collapse: collapse;
	text-align: left;
	line-height: 1.5;
}
table th {
  background: #fdd;
	padding: 4px;
	font-weight: bold;
	vertical-align: top;
	border: 1px solid #ccc;
  text-align: center;
}
table td {
  background: #fff9f9;
	padding: 4px;
	vertical-align: top;
	border: 1px solid #ccc;
}

.drag-target {
  transform: translate3d(1px,1px,0px);
  box-shadow:1px 1px 4px 0px rgba(0,0,0,0.5);
}
.drop-target {
  border-top:#990000 2px solid;
}
</style>
