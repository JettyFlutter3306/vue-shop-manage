<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <!--添加角色按钮区-->
      <el-row>
        <el-col :span="2">
          <el-button type="success" round>
            <i class="el-icon-plus"/>
            添加角色
          </el-button>
        </el-col>
      </el-row>

      <!--角色列表区域-->
      <el-table
        :data="roleList"
        stripe
      >
        <!--展开行-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vertical_center'] " v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag closable
                        @close="removeRightById(scope.row,item3.id)">
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级和三级权限-->
              <el-col :span="19">
                <el-row :class="['bdbottom',i2 === 0 ? '' : 'bdbottom','vertical_center']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success"
                            closable
                            @close="removeRightById(scope.row,item2.id)"
                    >
                      {{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="18">
                    <el-tag v-for="(item3,i3) in item2.children"
                            :key="item3.id"
                            type="warning"
                            closable
                            @close="removeRightById(scope.row,item3.id)"
                    >
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--索引列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除角色" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteUserById(scope.row.id)"/>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-info" circle @click="showSetRightDialog"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分配权限的对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!--内容主体区域-->

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Roles",
  data(){
    return{
      roleList: [
        {
          id: 1,
          roleName: '超级管理员',
          roleDesc: '最屌的管理员',
          children: [
            {
              id: 1,
              authName: '商品管理',
              children: [
                {
                  id: 2,
                  authName: '商品列表',
                  children: [
                    {
                      id: 2,
                      authName: '添加商品',
                      children: []
                    },
                    {
                      id: 3,
                      authName: '修改商品',
                      children: []
                    },
                    {
                      id: 4,
                      authName: '删除商品',
                      children: []
                    },
                  ]
                }
              ]
            },
            {
              id: 5,
              authName: '用户管理',
              children: [
                {
                  id: 6,
                  authName: '添加用户',
                  children: []
                },
                {
                  id: 7,
                  authName: '修改用户',
                  children: []
                },
                {
                  id: 8,
                  authName: '删除用户',
                  children: []
                },
              ]
            },
            {
              id: 9,
              authName: '角色管理',
              children: [
                {
                  id: 10,
                  authName: '添加角色',
                  children: []
                },
                {
                  id: 11,
                  authName: '修改角色',
                  children: []
                },
                {
                  id: 12,
                  authName: '删除角色',
                  children: []
                },
              ]
            },
          ]
        },
        {
          id: 2,
          roleName: '管理员',
          roleDesc: '普通的管理员',
          children: [
            {
              id: 1,
              authName: '商品管理',
              children: [
                {
                  id: 2,
                  authName: '添加商品',
                  children: []
                },
                {
                  id: 3,
                  authName: '修改商品',
                  children: []
                },
                {
                  id: 4,
                  authName: '删除商品',
                  children: []
                },
              ]
            },
            {
              id: 5,
              authName: '用户管理',
              children: [
                {
                  id: 6,
                  authName: '添加用户',
                  children: []
                },
                {
                  id: 7,
                  authName: '修改用户',
                  children: []
                },
                {
                  id: 8,
                  authName: '删除用户',
                  children: []
                },
              ]
            },
            {
              id: 9,
              authName: '角色管理',
              children: [
                {
                  id: 10,
                  authName: '添加角色',
                  children: []
                },
                {
                  id: 11,
                  authName: '修改角色',
                  children: []
                },
                {
                  id: 12,
                  authName: '删除角色',
                  children: []
                },
              ]
            },
          ]
        },
        {
          id: 3,
          roleName: '职员',
          roleDesc: '屌丝儿',
          children: [
            {
              id: 1,
              authName: '商品管理',
              children: [
                {
                  id: 2,
                  authName: '添加商品',
                  children: []
                },
                {
                  id: 3,
                  authName: '修改商品',
                  children: []
                },
                {
                  id: 4,
                  authName: '删除商品',
                  children: []
                },
              ]
            },
            {
              id: 5,
              authName: '用户管理',
              children: [
                {
                  id: 6,
                  authName: '添加用户',
                  children: []
                },
                {
                  id: 7,
                  authName: '修改用户',
                  children: []
                },
                {
                  id: 8,
                  authName: '删除用户',
                  children: []
                },
              ]
            },
            {
              id: 9,
              authName: '角色管理',
              children: [
                {
                  id: 10,
                  authName: '添加角色',
                  children: []
                },
                {
                  id: 11,
                  authName: '修改角色',
                  children: []
                },
                {
                  id: 12,
                  authName: '删除角色',
                  children: []
                },
              ]
            },
          ]
        },
      ], //所有的角色列表
      setRightDialogVisible: false, //权限分配对话框的关闭和打开
      rightsList: [] //所有的权限的列表
    }
  },
  methods: {
    getRoleList(){
      // this.$ajax.get('role').then(({data: result}) => {
      //
      // }).catch((err) => {
      //
      // });
    },
    removeRightById(role,rightId){ //根据id删除对应的权限
      //弹框提示用户是否要进行删除
      this.$confirm('此删除操作将不可逆是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {

        console.log(role);
        this.$ajax.delete(`role/${rightId}`, {
          data: {
            role
          }
        }).then(({data : result}) => {

          //校验状态码,判断是否成功

          //重新渲染当前角色的权限,而不是整个角色表格
          role.children = result.data;

        }).catch(err => err);

      }).catch(err => err);

    },
    showSetRightDialog(){ //打开分权限对话框
      //获取所有权限的数据
      this.$ajax.get('right/tree').then(({data: result}) => {

        this.rightsList = result.data;
      }).catch(err => err);

      this.setRightDialogVisible = true;
    }
  },
  created(){
    this.getRoleList();
  }
}
</script>

<style scoped>

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vertical_center{
  display: flex;
  align-items: center;
}
</style>
