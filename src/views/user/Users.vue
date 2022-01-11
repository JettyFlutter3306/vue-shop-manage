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
            <el-button slot="append" icon="el-icon-search" @click="getUserList"/>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button
            type="primary"
            round
            @click="addDialogVisible = true"
          >
            <i class="el-icon-plus"/>
            添加新用户
          </el-button>
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <el-table
        :data="userList"
        v-loading = "this.$store.getters.getLoading"
        element-loading-text="拼命加载中..."
        stripe
      >
        <!--索引列-->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="角色" prop="role" width="200">
          <template slot-scope="scope">
            <el-tag size="small" type="info" v-for="item in scope.row.roleList">
              {{item.roleName}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status ? true : false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false" v-show="scope.row.username !== adminName">
              <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false" v-show="scope.row.username !== adminName">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteUserById(scope.row.id)"/>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false" v-show="scope.row.username !== adminName">
              <el-button type="warning" icon="el-icon-setting" circle @click="toAllotRoles(scope.row.id)"></el-button>
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
        :total="totalNum"
        background
      >
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog
      title="添加新用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="addUserForm"
        :rules="addUserFormRules"
        ref="addUserFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改用户-->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username"/>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
import {
  getUsersAPI,
  getUserByIdAPI,
  addUserAPI,
  deleteUserAPI,
  editUserAPI,
  updateUserStatusAPI,
} from "@/api/system/user";
import {getRolesAPI} from "@/api/system/role";

export default {
  name: "Users",
  data() {
    //验证邮箱的规则
    let checkEmail = (rule, value, rollback) => {
      //邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/;

      if (regEmail.test(value)) {
        return rollback();
      }

      rollback(new Error('请输入合法的邮箱!'));
    }

    //验证手机号的规则
    let checkMobile = (rule, value, rollback) => {
      //验证手机号的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return rollback();
      }

      rollback(new Error('请输入合法的手机号!'));
    }

    return {
      adminName: process.env.VUE_APP_ADMIN,
      addDialogVisible: false, //添加用户的对话框
      editDialogVisible: false, //修改用户的对话框
      setRoleDialogVisible: false, //分配角色的对话框
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
      editForm: {
        id: 1,
        username: '',
        email: '',
        mobile: '',
        roleName: '',
        status: true
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
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      editFormRules: {
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      userInfo: {}, //需要被分配角色的用户信息
      roleList: [], //所有的角色列表
      selectedRoleId: ''
    }
  },
  methods: {
    getUserList() {
      getUsersAPI(this.queryInfo).then((result) => {
        this.userList = result.data.records;
        this.totalNum = result.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.pageNum = newPageNum;
      this.getUserList();
    },
    userStatusChange(userInfo) {

      if(userInfo.username === process.env.VUE_APP_ADMIN){
        this.$message.error('非法操作!');

        return
      }

      //发起PUT请求,表示修改状态
      updateUserStatusAPI(userInfo).then((result) => {

        this.$message.success(result.msg);

        switch (userInfo.status){
          case 1: userInfo.status = 0;break;
          case 0: userInfo.status = 1;break;
        }
      });
    },
    addDialogClosed() { //监听添加用户对话框的关闭事件
      this.$refs.addUserFormRef.resetFields();
    },
    addUser() { //点击按钮,添加新用户
      this.$refs.addUserFormRef.validate((valid) => {
        if (!valid) {
          return;
        }

        addUserAPI(this.addUserForm).then(({data: result}) => {  //发起ajax请求
          this.$message.success(result.msg);

          this.getUserList();

          this.addDialogVisible = false;
        });
      });

    },
    showEditDialog(id) { //展示编辑用户的对话框

      getUserByIdAPI(id).then((result) => {

        this.editForm = result.data;
      });

      this.editDialogVisible = true;
    },
    editDialogClosed(){//监听修改用户对话框的关闭事件

      this.$refs.editFormRef.resetFields();
    },
    editUserInfo(){

      this.$refs.editFormRef.validate((valid) => {
        if(!valid){
          return;
        }

        editUserAPI(this.editForm).then((result) => {
          this.editDialogVisible = false;  //关闭对话框

          this.getUserList();  //刷新数据列表

          this.$message.success(result.msg);   //提示修改成功
        });
      });
    },
    deleteUserById(id){ //根据id删除用户,弹框进行询问用户是否删除数据
      this.$confirm('此操作将永久删除该用户,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        deleteUserAPI(id).then((result) => {

          this.$message({
            type: 'success',
            message: result.msg
          });

          this.getUserList();
        });

      }).catch((err) => console.log(err));
    },
    setRole(userInfo){

      this.userInfo = userInfo;

      getRolesAPI().then((result) => {  //在展示对话框之前获取角色列表
        this.roleList = result.data;
      });

      this.setRoleDialogVisible = true;
    },
    toAllotRoles(id) {
      this.$router.push(`/roles/allot/${id}`)
    }
  },
  created() {
    this.getUserList();
  }
}
</script>

<style lang="less" scoped>

</style>
