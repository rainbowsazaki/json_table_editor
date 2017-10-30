<template>
  <span>
    <input type="checkbox" :name="format.id" :value="i.value || i" :id="'check_' + format.id + '_' + (i.value || i)" v-model="editData[format.id]" @change="$emit('change')" /><label :for="'check_' + format.id + '_' + (i.value || i)" class="checkbox">
      <img v-if="i.image" :src="i.image" :title="i.value" />
      <span v-else-if="i.html" v-html="i.html" :title="i.value"></span>
      <span v-else>{{i.value || i}}</span>
    </label>
  </span>
</template>

<script>
export default {
  name: 'ArrayItemEdit',
  props: [ 'format', 'i', 'editData' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.array img {
  width: 24px;
  height: 24px;
}

input[type=checkbox], 
input[type=radio]  {
  display: none;
}


.checkbox img {
  opacity: 0.4;
  -webkit-filter: grayscale(70%);
  filter: grayscale(70%);
}

.checkbox span {
  box-sizing: border-box;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
  position: relative;
  display: inline-block;
  margin: 2px;
  padding: 2px;
  border-radius: 8px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #f6f4f2;
  opacity: 0.5;
}


input[type=checkbox]:checked + .checkbox span, 
input[type=radio]:checked + .checkbox span {
    border-color: #ed6;
    background-color: #ffee99;
    opacity: 1;
}

input[type=checkbox]:checked + .checkbox , 
input[type=radio]:checked + .checkbox  {
  border-color: #ed6;
  background-color: #ffee99;
  opacity: 1;
    
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}

</style>
