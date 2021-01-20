<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <el-table
        :data="rightsList"
        stripe
      >
        <el-table-column type="index" label="#"/>
        <el-table-column prop="rightName" label="权限名称" />
        <el-table-column label="权限路径">
          <template slot-scope="scope">
            {{scope.row.parentId !== 0 ? (scope.row.rootPath+'/'+scope.row.secondPath) : scope.row.rootPath}}
          </template>
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 0">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === 1">等级二</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === 2">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data(){
    return{
      rightsList: [] //权限列表
    }
  },
  methods: {
    getRightsList(){
      this.$ajax.get('right/').then(({data: result}) => {

        this.rightsList = result.data;
      }).catch((error) => console.log(error));
    }
  },
  created(){
    this.getRightsList();
  }
}
</script>

<style scoped lang="less">

</style>
