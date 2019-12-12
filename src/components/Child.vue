<template>
  <div>
    {{text}}
    <input v-model="x">
    <button @click="onDelete">delete</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: ['text'],
  data () {
    return {
      x: 'hi'
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
