<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box_card">
      <!--搜索与添加区域-->
      <el-row>
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button
            type="primary"
            round
            @click="addDialogVisible = true"
          >
            添加新用户
          </el-button>
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <el-table
        :data="userList"
        stripe
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog
      title="添加新用户"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!--内容主体区域-->
      <span>
        <el-form
          :model="addUserForm"
          :rules="addUserFormRules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserForm.mobile"></el-input>
          </el-form-item>


        </el-form>
      </span>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
export default {
  name: "Users",
  data(){
    return{
      addDialogVisible: false,
      userList: [],
      totalNum: 20,
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在6到20个字符之间', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在6到20个字符之间', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在6到20个字符之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getUserList(){
      this.userList = [
        {
          id: 1,
          username: '洛必达',
          email: 'mongo3306@icloud.com',
          mobile: 13778521693,
          roleName: '超级管理员',
          status: true
        },
        {
          id: 2,
          username: '川建国',
          email: 'trump@yahoo.com',
          mobile: 13985247512,
          roleName: '75岁老同志',
          status: false
        },
        {
          id: 1,
          username: '马保国',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '狂神说Java',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '技术胖',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '口语老炮马思瑞',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '陈大白',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '硬核的半佛仙人',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '罗翔说刑法',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '我是郭杰瑞',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        },
        {
          id: 1,
          username: '观察者网',
          email: 'mabaoguo@163.com',
          mobile: 13985247512,
          roleName: '69岁老同志',
          status: false
        }
      ]

    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;
    },
    handleCurrentChange(newPageNum){
      this.queryInfo.pageNum = newPageNum;
    },
    userStatusChange(userInfo){
      //发起PUT请求,表示修改状态
      this.$ajax.put('user/state',{
        id: userInfo.id,
        status: userInfo.status
      }).then(({data: result}) => {

        // userInfo.status = !userInfo.status;
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  created(){
    this.getUserList();
  }
}
</script>

<style lang="less" scoped>

</style>
