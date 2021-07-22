<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <!--头部的警告区域-->
      <el-alert type="warning"
                title="注意:只允许为第三级分类设置相关参数!"
                :closable="false"
                show-icon
                center
      >
      </el-alert>

      <!--选择商品分类区域-->
      <el-row class="cat_opt" align="middle" justify="center" type="flex">
        <el-col :span="3">
          <span>选择商品分类: </span>
        </el-col>
        <el-col :span="4">
          <!--选择商品分类的级联选择框-->
          <el-cascader
            v-model="selectedCategoryKeys"
            :options="categoryList"
            :props="categoryProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!--tab页签区域-->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!--添加动态参数的面板-->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" round icon="el-icon-plus" :disabled="isBtnDisabled" @click="addParamDialogVisible = true">
            添加参数
          </el-button>

          <!--动态参数的表格-->
          <el-table :data="manyTableData" stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!--循环遍历标签项的部分-->
                <el-tag v-for="(item,index) in scope.row.attrVal" :key="index" closable @close="handleClose(index,scope.row)">
                  {{item}}
                </el-tag>

                <!--动态添加标签的区域-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>

              </template>
            </el-table-column> <!--展开行-->
            <el-table-column type="index" label="#"></el-table-column> <!--索引列-->
            <el-table-column label="参数名称" prop="attrName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
                  <el-button type="primary" icon="el-icon-edit" circle @click="showEditParamsDialog(scope.row.attrId)"/>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="删除参数" placement="top" :enterable="false">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteParams(scope.row.attrId)"/>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--添加静态属性的面板-->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" round icon="el-icon-plus" :disabled="isBtnDisabled" @click="addParamDialogVisible = true">
            添加属性
          </el-button>
          <!--静态属性的表格-->
          <el-table :data="onlyTableData" stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!--循环遍历标签项的部分-->
                <el-tag v-for="(item,index) in scope.row.attrVal" :key="index" closable @close="handleClose(index,scope.row)">
                  {{item}}
                </el-tag>

                <!--动态添加标签的区域-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>

              </template>
            </el-table-column> <!--展开行-->
            <el-table-column type="index" label="#"></el-table-column> <!--索引列-->
            <el-table-column label="参数名称" prop="attrName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
                  <el-button type="primary" icon="el-icon-edit" circle @click="showEditParamsDialog(scope.row.attrId)"/>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="删除参数" placement="top" :enterable="false">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteParams(scope.row.attrId)"/>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--添加分类参数的对话框-->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addParamDialogVisible"
      width="50%"
      @close="addParamDialogClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="addParamForm"
        :rules="addParamFormRules"
        ref="addParamFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attrName">
          <el-input v-model="addParamForm.attrName"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addParamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改参数的对话框-->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editParamDialogVisible"
      width="50%"
      @close="addParamDialogClosed"
    >
      <!--内容主体区域-->
      <el-form
        :model="addParamForm"
        :rules="addParamFormRules"
        ref="addParamFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attrName">
          <el-input v-model="addParamForm.attrName"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editParamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getCategoriesAPI} from "@/api/system/category";

export default {
  name: "Params",
  data(){
    return{
      categoryList: [], //商品分类的列表
      selectedCategoryKeys: [], //级联选择器双向绑定的数组
      categoryProps: { //级联选择器的配置项
        expandTrigger: 'hover',
        value: 'catId',
        label: 'catName',
        children: 'children'
      },
      activeName: 'many', //当前页签的类型 many表示动态参数,only表示静态属性,两个页签
      manyTableData: [], //动态参数的数据源
      onlyTableData: [], //静态属性的数据源
      addParamDialogVisible: false, //添加参数对话框的显示与关闭
      editParamDialogVisible: false, //修改参数对话框的显示与关闭
      addParamForm: { //添加参数的表单对象
        attrName: '', //属性名称

      },
      addParamFormRules: { //表单校验规则
        attrName: [
          {required: true, message: '请输入参数名称', trigger: 'blur'}
        ]
      },
      inputVisible: false, //控制按钮文本框的切换提示
      inputValue: '', //文本框中输入的内容
    }
  },
  methods: {
    getCategoryList(){ //获取所有的商品分类列表
      getCategoriesAPI().then((result) => {

        this.categoryList = result.data;
      });
    },
    handleChange(){
      this.getParamsData();
    },
    handleTabClick(){ //tab页签点击事件的处理
      this.getParamsData();
    },
    getParamsData(){ //获取参数列表的数据
      if(this.selectedCategoryKeys.length !== 3){ //证明不是三级分类
        this.selectedCategoryKeys = [];
        this.manyTableData = [];
        this.onlyTableData = [];

        return;
      }

      this.$ajax.get(`category/${this.catId}/attributes`,{ //根据所选分类的id,和当前所处的面板,获取对应的参数
        params: {
          sel : this.activeName
        }
      }).then(({data: result}) => {

        if(!result.flag){
          return this.$message.error(result.msg);
        }

        const {data} = result; //解构表达式

        data.forEach(item => {
          item.attrVal = item.attrVal ? item.attrVal.split(' ') : [];//做一下判断,防止字符串是空,或者后端JackSon对空值进行不返回处理

          item.inputVisible = false; //控制文本框的显示和隐藏
          item.inputValue = ''; //文本框中输入的值
        });

        if(this.activeName === 'many'){ //说明是动态参数
          this.manyTableData = data;
        }else{
          this.onlyTableData = data;
        }

      }).catch(err => console.log(err));
    },
    addParamDialogClosed(){
      this.$refs.addParamFormRef.resetFields();
    },
    addParams(){ //点击按钮,添加参数
      this.$refs.addParamFormRef.validate(valid => {
        if(!valid){
          return this.$message.error("参数有误");
        }

        this.$ajax.post(`category/${this.catId}/attributes`,{
          attrName: this.addParamForm.attrName,
          attrSel: this.activeName
        }).then(({data: result}) => {

          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);
          this.addParamDialogVisible = false;
          this.getParamsData();
        }).catch(err => console.log(err));
      });
    },
    showEditParamsDialog(attrId){ //点击按钮显示修改对话框
      this.editParamDialogVisible = true;

      this.$ajax.get(`category/${this.catId}/attributes/${attrId}`,{
        params: {
          attrSel: this.activeName
        }
      }).then(({data: result}) => {
        if(!result.flag){
          return this.$message.error(result.msg);
        }

        const {data} = result;
        this.addParamForm = data;
      }).catch(err => console.log(err));
    },
    editParams(){
      this.$refs.addParamFormRef.validate(valid => {
        if(!valid){
          return this.$message.error("参数有误!");
        }

        this.$ajax.put(`category/attributes/${this.addParamForm.attrId}`,{
          attrName: this.addParamForm.attrName
        }).then(({data: result}) => {
          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);
          this.editParamDialogVisible = false;
          this.getParamsData();
        }).catch(err => console.log(err));
      });
    },
    deleteParams(attrId){
      this.$confirm('此操作将永久删除,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$ajax.delete(`attribute/${attrId}`).then(({data: result}) => {
          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);

          this.getParamsData();
        }).catch(err => console.log(err));

      }).catch((err) => console.log(err));
    },
    handleInputConfirm(row){ //文本框失去焦点,或者按了Enter键都会触发
      if(row.inputValue.trim().length === 0){
        row.inputValue = '';
        row.inputVisible = false;
        return;
      }

      row.attrVal.push(row.inputValue.trim()); //如果没有return则证明输入的内容是合理的
      row.inputValue = '';
      row.inputVisible = false;

      this.saveAttrVal(row);
    },
    showInput(row){ //点击按钮展示文本输入框
      row.inputVisible = true;

      this.$nextTick(_ => { //让文本框自动获得焦点
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose(index,row){ //处理删除参数可选项标签的事件
      row.attrVal.splice(index,1); //根据索引删除数组里的元素

      this.saveAttrVal(row);
    },
    saveAttrVal(row){ //将对attrVal的操作保存到数据库
      this.$ajax.post(`category/attributes/${row.attrId}`,{
        attrVal: row.attrVal.join(' ')
      }).then(({data: result}) => {
        if(!result.flag){
          return this.$message.error(result.msg);
        }

        this.$message.success(result.msg);
      }).catch(err => console.log(err));
    }
  },
  computed: {
    isBtnDisabled(){ //如果按钮需要被禁用则返回true否则返回false

      return this.selectedCategoryKeys.length !== 3;
    },
    catId(){ //当前选中的三级分类的id

      return this.selectedCategoryKeys.length === 3 ? this.selectedCategoryKeys[this.selectedCategoryKeys.length-1] : null;
    },
    titleText(){ //动态计算标题的文本

      return this.activeName === 'many' ? '动态参数' : '静态属性';
    }
  },
  created() {
    this.getCategoryList();
  }
}
</script>

<style scoped lang="less">

.cat_opt{
  margin: 15px 0;
}

.el-tag{
  margin-left: 15px;
}

.input-new-tag{
  width: 120px;
}


</style>
