<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users'}">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>分配角色</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        :props="{ key: 'roleId', label: 'roleName'}"
        :data="data"
        :titles="['其余角色','已有角色']"
        :button-texts="['移除角色','分配角色']"
        @change="handleChange"
      >
      </el-transfer>
    </el-card>
  </div>
</template>

<script>
import {allotRolesAPI, getRolesAPI, getRolesByUserIdAPI} from "@/api/system/role";

export default {
  name: "AllotRoles",
  data() {
    return {
      uid: '',
      value: [],
      data: []
    }
  },
  methods: {
    getRoleListById(uid) {
      getRolesAPI().then((result) => {
        this.data = result.data;
      })

      getRolesByUserIdAPI(uid).then((result) => {
        this.value = []
        result.data.forEach(v => {
          this.value.push(v.roleId)
        })
      })
    },
    handleChange(value, direction, movedKeys) {
      allotRolesAPI(this.uid, value).then((result) => {
        this.$message.success(result.msg)
        this.getRoleListById(this.uid)
      })
    }
  },
  created() {
    this.uid = this.$route.params.id;

    this.getRoleListById(this.uid);
  }
}
</script>

<style scoped>

</style>
