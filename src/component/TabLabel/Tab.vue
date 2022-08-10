<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
    editable
  >
    <el-tab-pane
      :key="item.name"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {

    }
  },
  methods: {
    clickTab(target) {
      this.$router.push(`${target.name}`)
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue

      if (targetName === 'home') {
        return
      }

      if (activeName === targetName) {
        tabs.forEach((v, index) => {
          if(v.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]

            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      this.$router.push(`${activeName}`)
    }
  },
  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      }
    }
  }

}
</script>

<style scoped>

</style>
