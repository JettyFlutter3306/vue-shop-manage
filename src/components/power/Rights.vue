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
        <el-table-column prop="authName" label="权限名称" />
        <el-table-column prop="pathName" label="权限路径" />
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 1">等级一</el-tag>
            <el-tag type="success" v-if="scope.row.level === 2">等级二</el-tag>
            <el-tag type="warning" v-if="scope.row.level === 3">等级三</el-tag>
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
      rightsList: [
        {
          id: 1,
          authName: '商品管理',
          pathName: 'goods',
          level: 2
        },
        {
          id: 2,
          authName: '用户管理',
          pathName: 'users',
          level: 1
        }
      ] //权限列表
    }
  },
  methods: {
    getRightsList(){
      // this.$ajax.get('/right/').then(({data: result}) => {
      //
      // }).catch((error) => {
      //
      // });
    }
  },
  created(){
    this.getRightsList();
  }
}
</script>

<style scoped lang="less">

</style>
