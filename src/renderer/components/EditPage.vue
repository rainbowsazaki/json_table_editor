<template>
  <div>
    <data-table ref="dataTable" custom-class="storyInfos" is-editable="true" :formats="formats" :data="storyInfos"></data-table>
    <div>
      <button @click="saveJson">save</button>
      <button @click="loadJson">load</button>        
    </div> 
    <button @click="loadFormatDialog">loadFormat</button>
    <textarea v-if="jsonCheckArea" v-model="jsonCheckArea" style="width:100%; height: 15em;"></textarea>
    <button @click="checkJson">checkJson</button>
  </div>
</template>

<script>

import DataTable from './EditPage/DataTable.vue'

const remote = require('electron').remote
const dialog = remote.dialog
const path = require('path')

// const os = require('os')
const fs = require('fs') // もちろんfsモジュールも

const SAVE_PATH_BASE = 'hoge'

export default {
  name: 'EditPage',
  data: function () {
    return {
      formats: [],
      storyInfos: [],
      jsonCheckArea: '',
      rootPath: ''
    }
  },
  created: function () {
    const formatPath = '/Users/rainbowsazaki/Documents/web_project/electron_first/static/aaaa/format.json'
    this.loadFormat(formatPath)
  },
  methods: {
    /**
     * テキストエリアにJSONを表示する。
     */
    checkJson: function () {
      this.jsonCheckArea = this.$refs.dataTable.outputJson()
    },
    /**
     * データをJSONで保存する。
     */
    saveJson: function () {
      this.save(this.$refs.dataTable.outputJson())
    },
    /**
     * 保存されているJSONを読み込む。
     */
    loadJson: function () {
      this.load(data => {
        this.storyInfos = data
      })
    },
    save: function (contents) {
      if (!this.rootPath) { return }
      fs.writeFile(this.rootPath + '/' + SAVE_PATH_BASE + '.json', contents)
      fs.writeFile(this.rootPath + '/' + SAVE_PATH_BASE + '_' + Date.now() + '.json', contents)
    },
    load: function (callback) {
      fs.readFile(this.rootPath + '/' + SAVE_PATH_BASE + '.json', (err, data) => {
        if (err) {}
        callback(JSON.parse(data))
      })
    },
    loadFormat: function (filePath) {
      fs.readFile(filePath, (err, data) => {
        if (err) {}
        this.rootPath = path.dirname(filePath)
        let obj = JSON.parse(data)
        this.checkFormat(obj)
        this.storyInfos = []
        this.formats = obj
        this.loadJson()
      })
    },
    checkFormat: function (format) {
      const TYPE_OBJS = {
        'array': Array,
        'boolean': Boolean,
        'number': Number,
        'string': String
      }
      format.forEach(n => {
        // .type check
        if (typeof (n.type) === 'string') {
          let type = TYPE_OBJS[n.type.toLowerCase()]
          if (type) {
            n.type = type
          } else {
            this.errLog('type error', n)
          }
        }
        // select image load
        if (n.select) {
          n.select.forEach(m => {
            if (m.image) {
              let imagePath = this.rootPath + '/' + m.image
              try {
                let imageBase64 = fs.readFileSync(imagePath, 'base64')
                m.image = 'data:image/png;base64,' + imageBase64
              } catch (e) {
                this.errLog('image load error', n, 'select', m.value)
              }
            }
          })
        }
      })
    },
    loadFormatDialog: function () {
      dialog.showOpenDialog(null, {
        properties: ['openFile'],
        filters: [{
          name: 'テキストファイル',
          extensions: [ 'json', 'js' ]
        }]
      }, (files) => {
        files.forEach(file => {
          this.loadformat(file)
        })
      })
    },
    errLog: function errorLog (message, target, ...sub) {
      let outputMessage = `${message} : ${target.id}`
      if (sub) { outputMessage += ' : ' + sub.join(' : ') }
      alert(outputMessage)
    }
  },
  components: {
    DataTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
