// https://www.jianshu.com/p/1675bcd396a2
<template>
  <quill-editor 
    v-model="content"
    ref="quillEditor"
    :options="editorOption"
    @ready="onEditorReady($event)"
    @blur="onEditorBlur($event)" 
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
    class="needsclick"
  >
  </quill-editor>
</template>
<script>
export default {
  name: 'textQuillEditor',
  data () {
    return {
      editorOption: {
        placeholder: "输入任何内容，支持html",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        },
        readOnly: false
      },
      content: '',
      readonly: false,
      contentStr: ''
    }
  },

  watch: {
    contentStr: function (val, oldVal) {
      this.content = this.htmlDecodeByRegExp(val)
    },
    readonly: function (val, oldVal) {
      // this.$set(this.editorOption, 'readonly', val)
      // false禁止编辑 true语序编辑
      this.$refs.quillEditor && this.$refs.quillEditor.quill.enable(!val)
    }
  },
  mounted () {
    this.content = this.htmlDecodeByRegExp(this.contentStr)
  },
  methods: {
    htmlDecodeByRegExp (str) {
      var s = '';
      if (str.length === 0) return '';
      s = str.replace(/&amp;/g, '&');
      s = s.replace(/&lt;/g, '<');
      s = s.replace(/&gt;/g, '>');
      s = s.replace(/&nbsp;/g, ' ');
      // eslint-disable-next-line no-useless-escape
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, '"');
      return s;
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
      // this.$emit('editorBlur', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
      // this.$emit('editorFocus', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
      // this.$emit('editorReady', this.content, editor)
    },
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
      // this.$emit('editorChange', html, text, editor)
    }
  }
}
</script>
<style lang="less" scoped>
// .needsclick {
//   padding: 15px;
// }
</style>