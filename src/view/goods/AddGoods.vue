<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <!--头部的警告区域-->
      <el-alert type="success"
                title="添加商品信息"
                :closable="false"
                show-icon
                center
      >
      </el-alert>

      <!--步骤条-->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        :model="addGoodsForm"
        :rules="addGoodsFormRules"
        ref="addGoodsFormRef"
      >
        <el-tabs tab-position="left"
                 v-model="activeIndex"
                 :before-leave="beforeTableLeave"
                 @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称:" prop="goodsName">
              <el-input v-model="addGoodsForm.goodsName"></el-input>
            </el-form-item>

            <el-form-item label="商品价格:" prop="goodsPrice">
              <el-input v-model="addGoodsForm.goodsPrice" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品重量:" prop="goodsWeight">
              <el-input v-model="addGoodsForm.goodsWeight" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品数量:" prop="goodsNumber">
              <el-input v-model="addGoodsForm.goodsNumber" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品分类:" prop="goodsCat">
              <!--选择商品分类的级联选择框-->
              <el-cascader
                v-model="addGoodsForm.goodsCat"
                :options="categoryList"
                :props="{expandTrigger: 'hover',value: 'catId',label: 'catName',children: 'children'}"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品参数" name="1">
            <!--渲染表单的item项-->
            <el-form-item :label="item.attrName + ':'" v-for="item in manyTableData" :key="item.attrId">
              <el-checkbox-group v-model="item.attrVal">
                <el-checkbox :label="k" v-for="(k,i) in item.attrVal" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attrName" v-for="item in onlyTableData" :key="item.attrId">
              <el-input v-model="item.attrVal"></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品图片" name="3">
            <el-alert type="warning" show-icon :closable="false" title="点击上传图片"></el-alert>
            <br/>

            <el-upload
              :action="uploadURL"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="uploadDialogVisible" title="图片预览">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-tab-pane>

          <el-tab-pane label="商品内容" name="4">
            <!--quill富文本编辑器组件-->
            <quill-editor v-model="addGoodsForm.goodsIntroduce">

            </quill-editor>

            <!--添加商品的按钮-->
            <el-button type="success"
                       icon="el-icon-plus"
                       round
                       class="btn_add"
                       @click="handleAddGoods"
            >
              添加商品
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-card>


  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data(){
    return{
      uploadDialogVisible: false,//上传文件的对话框
      dialogImageUrl: '',//文件地址
      uploadURL: 'http://localhost:8081/upload/goodsPic',//文件上传的API地址
      categoryList: [], //商品分类列表
      activeIndex: '0', //步骤条的默认激活索引
      addGoodsForm: { //添加商品的表单数据对象
        goodsName: '', //商品名称
        goodsPrice: 0.00, //商品的价格
        goodsWeight: 0, //商品重量
        goodsNumber: 0, //商品数量
        goodsCat: [],//商品所属的分类数组,这个数组里面有一级分类的id和二级分类的
        pics: [],//图片url数组
        goodsIntroduce: '',//商品的详情描述
        attrs: [],//
      },
      addGoodsFormRules: { //校验规则
        goodsName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        goodsPrice: [
          {required: true, message: '请输入商品的价格', trigger: 'blur'},
        ],
        goodsWeight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'},
        ],
        goodsNumber: [
          {required: true, message: '请输入商品数量', trigger: 'blur'},
        ],
        goodsCat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'},
        ]
      },
      manyTableData: [],//动态参数列表数据
      onlyTableData: [],//静态属性列表数据
      headerObj: {      //图片上传组件的请求头
        Authorization: window.localStorage.getItem('Authorization')
      },
    }
  },
  methods: {
    getCategoryList(){ //获取所有的商品分类列表
      this.$ajax.get('category/categoryList').then(({data: result}) => {
        if(!result.flag){
          return;
        }

        this.categoryList = result.data;
      }).catch(err => console.log(err));
    },
    handleChange(){ //级联选择器选中项变化,会触发这个函数
      if(this.addGoodsForm.goodsCat.length !== 3){
        this.addGoodsForm.goodsCat = [];
      }
      console.log(this.addGoodsForm.goodsCat);
    },
    beforeTableLeave(activeName,oldActiveName){
      if(oldActiveName === '0' && this.addGoodsForm.goodsCat.length !== 3){
        this.$message.error('请先选择商品分类!');

        return false;
      }
    },
    tabClicked(){
      if(this.activeIndex === '1'){ //证明访问的是动态参数面板
        this.$ajax.get(`category/${this.catId}/attributes`,{
          params: {
            sel: 'many'
          }
        }).then(({data: result}) => {
          const {data} = result;
          data.forEach(item => {
            item.attrVal = item.attrVal ? item.attrVal.split(' ') : [];
          })

          this.manyTableData = data;
        }).catch(err => console.log(err));
      }else if(this.activeIndex === '2'){
        this.$ajax.get(`category/${this.catId}/attributes`,{
          params: {
            sel: 'only'
          }
        }).then(({data: result}) => {
          const {data} = result;

          this.onlyTableData = data;
        }).catch(err => console.log(err));
      }
    },
    handleRemove(file, fileList){
      console.log(file, fileList);
      const filePath = file.response.data;//1.获取将要删除的图片的路径

      const index = this.addGoodsForm.pics.findIndex(x => x === filePath);//2.从pics数组里面找到这个图片的索引值

      this.addGoodsForm.pics.splice(index,1);//3.调用数组的splice方法把图片的路径从pics数组中删除

    },
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.uploadDialogVisible = true;
    },
    handleSuccess(response){ //监听图片上传成功的事件
      const {data} = response;
      console.log(data);

      this.addGoodsForm.pics.push(data); //将图片信息对象,push到pics数组中去
    },
    handleAddGoods(){ //处理添加商品按钮
      this.$refs.addGoodsFormRef.validate(valid => {
        if(!valid){
          this.$message.error('有参数不合法!');
        }

        //执行添加的业务逻辑 使用JSON.parse(JSON.stringify(obj))进行深拷贝addGoodsForm
        let form = JSON.parse(JSON.stringify(this.addGoodsForm));

        this.manyTableData.forEach(item => {//处理动态参数
          this.addGoodsForm.attrs.push({
            attrId: item.attrId,
            attrVal: item.attrVal.join(' ')
          });
        });

        this.onlyTableData.forEach(item => {//处理静态属性
          this.addGoodsForm.attrs.push({
            attrId: item.attrId,
            attrVal: item.attrVal
          });
        });

        form.attrs = this.addGoodsForm.attrs;

        console.log(form);

        this.$ajax({
          method: 'put',
          url: 'goods',
          data: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(({data: result}) => {
          if(!result.flag){
            return this.$message.error(result.msg);
          }

          this.$message.success(result.msg);
          this.$router.push('/goods'); //跳转页面
        }).catch(err => console.log(err));

      });
    }
  },
  computed:{
    catId(){

      return this.addGoodsForm.goodsCat.length === 3 ? this.addGoodsForm.goodsCat[2] : null;
    }
  },
  created(){
    this.getCategoryList();
  }
}
</script>

<style scoped lang="less">

.el-cascader{
  right: 405px;
}

.el-checkbox{
  margin: 0 5px 0 0!important;
}

.btn_add{
  margin-top: 15px;
}
</style>
