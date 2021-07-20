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
                <el-tag>
                  {{item1.rightName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级和三级权限-->
              <el-col :span="19">
                <el-row :class="['bdbottom',i2 === 0 ? '' : 'bdbottom','vertical_center']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success"
                    >
                      {{item2.rightName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="18">
                    <el-tag v-for="(item3,i3) in item2.children"
                            :key="item3.id"
                            type="warning"
                    >
                      {{item3.rightName}}
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
              <el-button type="warning" icon="el-icon-info" circle @click="showSetRightDialog(scope.row)"></el-button>
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
      @close="setRightDialogClosed"
    >
      <!--内容主体区域-->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      />

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Roles",
  data(){
    return{
      roleList: [], //所有的角色列表
      setRightDialogVisible: false, //权限分配对话框的关闭和打开
      rightsList: [], //所有的权限的列表
      treeProps: { //树形控件的自定义属性
        label: 'rightName',
        children: 'children'
      },
      defKeys: [],  //默认选中的结点id数组
      roleId: '',
    }
  },
  methods: {
    getRoleList(){
      this.$ajax.get('role').then(({data: result}) => {

        this.roleList = result.data;

      }).catch((err) => console.log(err));
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
          params: {
            roleId: role.roleId
          }
        }).then(({data : result}) => {

          //校验状态码,判断是否成功
          if(!result.flag){
            this.$message.error(result.msg);

            return;
          }

          this.$message.success(result.msg);

          //重新渲染当前角色的权限,而不是整个角色表格
          role.children = result.data;

        }).catch(err => err);

      }).catch(err => err);

    },
    showSetRightDialog(role){ //打开分权限对话框

      this.roleId = role.roleId

      //获取所有权限的数据
      this.$ajax.get('right',{
        params: {
          tree: "tree"
        }
      }).then(({data: result}) => {

        this.rightsList = result.data;
      }).catch(err => err);

      //递归获取三级结点的id
      this.getLeafKeys(role,this.defKeys);

      this.setRightDialogVisible = true;
    },
    getLeafKeys(node,arr){ //通过递归的形式,获取角色下所有三级权限的id,并保存到defKeys数组中去

      //表示这是三级权限,递归终止
      if(node.children.length === 0){
        arr.push(node.id);

        return;
      }

      //不是三级权限,那么就继续递归
      node.children.forEach(item => this.getLeafKeys(item,arr));
    },
    setRightDialogClosed(){
      this.defKeys = [];
    },
    allotRights(){  //点击为角色分配权限

      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      const idStr = keys.join(',');

      this.$ajax.post(`role/${this.roleId}`,{rids: idStr}).then(({data: result}) => {

        if(!result.flag){
          this.$message.error(result.msg);

          return;
        }

        this.$message.success(result.msg);

        this.setRightDialogVisible = false;

        this.getRoleList();
      }).catch(err => console.log(err));

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
