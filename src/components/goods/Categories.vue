<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <el-row>
        <el-col :span="2">
          <el-button type="info" round @click="showAddCategoryDialog">
            <i class="el-icon-plus"/>
            添加分类
          </el-button>
        </el-col>
      </el-row>

      <!--表格-->
      <tree-table
        :data="categoryList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
        style="margin-top: 15px"
      >
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="!scope.row.catDeleted" style="color: #50A6FF;font-size: 30px"></i>
          <i class="el-icon-error" v-else-if="scope.row.catDeleted" style="color: #d91515;font-size: 30px"></i>
        </template>

        <template slot="order" slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.catLevel === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.catLevel === 1">二级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.catLevel === 2">三级</el-tag>
        </template>

        <template slot="operate" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle @click="showEditCategoryDialog(scope.row.catId)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除分类" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteCategoryById(scope.row.catId)"/>
          </el-tooltip>
        </template>

      </tree-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-card>

    <!--添加分类的对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="addCategoryDialogVisible"
      width="50%"
      @close="addCategoryClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryFormRules"
        ref="addCategoryFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="catName">
          <el-input v-model="addCategoryForm.catName"></el-input>
        </el-form-item>

        <el-form-item label="父级分类:">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCategoryList"
            :props="cascadeProps"
            @change="handleParentCategoryChange"
            :clearable="true"
          >
          </el-cascader>
        </el-form-item>
      </el-form>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改分类的对话框-->
    <el-dialog
      title="修改分类"
      :visible.sync="editCategoryDialogVisible"
      width="50%"
      @close="addCategoryClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryFormRules"
        ref="addCategoryFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="catName">
          <el-input v-model="addCategoryForm.catName"></el-input>
        </el-form-item>

        <el-form-item label="父级分类:">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCategoryList"
            :props="cascadeProps"
            @change="handleParentCategoryChange"
            :clearable="true"
            :disabled="[0,1].indexOf(addCategoryForm.catLevel) !== -1"
          >
          </el-cascader>
        </el-form-item>
      </el-form>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data(){
    return{
      queryInfo: { //查询条件
        type: 3,
        pageNum: 1,
        pageSize: 5
      },
      categoryList: [], //商品分类的数组
      total: 0, //总的数据条数
      columns: [//为table指定列的定义
        {
          label: '分类名称',
          prop: 'catName'
        },
        {
          label: '是否有效',
          type: 'template', //表示当前列定义为模板列
          template: 'isOk', //表示当前这一列用的模板名称
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
        },
      ],
      addCategoryDialogVisible: false, //控制添加分类对话框的显示与隐藏
      editCategoryDialogVisible: false, //控制修改分类对话框的显示和隐藏
      addCategoryForm: { //添加分类的表单对象
        catId: '', //分类id
        catName: '', //需要添加的分类的名称
        parentId: 0, //父级分类的id
        catLevel: 1 //分类等级,默认添加一级分类
      },
      addCategoryFormRules: { //添加分类表单的规则
        catName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
        ]
      },
      parentCategoryList: [], //父级分类的列表
      cascadeProps: { //级联选择器的配置项
        value: 'catId',
        label: 'catName',
        children: 'children',
        checkStrictly: true, //这样就可以选择一级分类
        expandTrigger: 'hover', //鼠标悬浮显示级联选择器
      },
      selectedKeys: [], //选中的父级分类的Id数组

    }
  },
  methods: {
    //获取商品分类的数据
    getCategoryList(){
      this.$ajax.get('category',{
        params: {
          type: this.queryInfo.type,
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize
        }
      }).then(({data: result}) => {

        if(!result.flag){
          return this.$message.error(result.msg);
        }

        let page = result.data; //获取分页体

        this.categoryList = page.records; //赋值给分类列表
        this.total = page.total;
      }).catch(err => console.log(err));
    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;

      this.getCategoryList();
    },
    handleCurrentChange(newPageNum){
      this.queryInfo.pageNum = newPageNum;

      this.getCategoryList();
    },
    showAddCategoryDialog(){
      this.getParentCategoryList(); //先获取父级分类的数据量列表

      this.addCategoryDialogVisible = true; //然后展示对话框
    },
    getParentCategoryList(){ //获取父级分类的列表
      this.$ajax.get('category/categoryList',{
        params: {
          type: 2
        }
      }).then(({data: result}) => {

        this.parentCategoryList = result.data;

        console.log(this.parentCategoryList);
      }).catch(err => console.log(err));
    },
    handleParentCategoryChange(){  //选择项发生变化触发这个函数
      console.log(this.selectedKeys);
      //selectedKeys数组中的元素个数大于0那么说明选中了父级分类,反之没有选中任何分类
      if(this.selectedKeys.length > 0){
        this.addCategoryForm.parentId = this.selectedKeys[this.selectedKeys.length - 1]; //父级分类的id

        this.addCategoryForm.catLevel = this.selectedKeys.length; //为当前分类的等级赋值
      }else{
        this.addCategoryForm.parentId = 0; //父级分类的id

        this.addCategoryForm.catLevel = 0; //为当前分类的等级赋值
      }
    },
    addCategory(){ //点击按钮添加新的分类
      this.$refs.addCategoryFormRef.validate(valid => {
        if(!valid){
          return;
        }

        this.$ajax.post('category',this.addCategoryForm).then(({data: result}) => {

          if(!result.flag){
            return  this.$message.error(result.msg);
          }

          this.$message.success(result.msg);
          this.getCategoryList();
          this.addCategoryDialogVisible = false;
        }).catch(err => console.log(err));
      });
    },
    addCategoryClosed(){ //监听对话框的关闭事件,重置表单数据
      this.$refs.addCategoryFormRef.resetFields();
      this.selectedKeys = [];
      this.addCategoryForm.catLevel = 0;
      this.addCategoryForm.parentId = 0;
    },
    showEditCategoryDialog(catId){
      this.getParentCategoryList();

      this.$ajax.get(`category/${catId}`).then(({data: result}) => {
        const {data} = result;

        this.addCategoryForm.catId = data.catId;
        this.addCategoryForm.catName = data.catName;
        this.addCategoryForm.catLevel = data.catLevel;
        this.addCategoryForm.parentId = data.parentId;

        console.log(data);
      }).catch(err => console.log(err));

      this.editCategoryDialogVisible = true;
    },
    editCategory(){
      this.$refs.addCategoryFormRef.validate(valid => {
        if(!valid){
          return;
        }

        this.$ajax.put('category',this.addCategoryForm).then(({data: result}) => {

          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);
          this.getCategoryList();
          this.editCategoryDialogVisible = false;
        }).catch(err => console.log(err));
      });
    },
    deleteCategoryById(catId){ //根据id逻辑删除
      this.$confirm('此操作将永久删除,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$ajax.delete(`category/${catId}`).then(({data: result}) => {
          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);

          this.getCategoryList();
        }).catch(err => console.log(err));

      }).catch((err) => console.log(err));
    }

  },
  created(){
    this.getCategoryList();
  }

}
</script>

<style scoped lang="less">

.el-cascader{
  width: 100%;
}

</style>
