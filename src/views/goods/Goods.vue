<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" round icon="el-icon-plus" @click="toAddGoodsPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!--表格区域-->
      <el-table
        :data="goodsList"
        stripe
        v-loading = "this.$store.getters.getLoading"
        element-loading-text="拼命加载中..."
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品价格(￥)" prop="goodsPrice" width="100"></el-table-column>
        <el-table-column label="商品重量(g)" prop="goodsWeight" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle @click="showEditCategoryDialog(scope.row.catId)"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除商品" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteGoodsById(scope.row.goodsId)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true"
        background
      >
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import {deleteGoodsAPI, getGoodsAPI} from "@/api/system/goods";

export default {
  name: "Goods",
  data(){
    return{
      queryInfo: {
        query: '', //搜索框的内容
        pageNum: 1,
        pageSize: 10,
      },
      goodsList: [], //商品列表
      total: 0, //数据总数
    }
  },
  methods: {
    getGoodsList(){ //根据分页获取对应的商品列表
      getGoodsAPI(this.queryInfo).then((result) => {

        this.goodsList = result.data.records;
        this.total = result.data.total;
      });
    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;

      this.getGoodsList();
    },
    handleCurrentChange(newPageNum){
      this.queryInfo.pageNum = newPageNum;

      this.getGoodsList();
    },
    deleteGoodsById(goodsId){
      this.$confirm('此操作将永久删除,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsAPI(goodsId).then(({data: result}) => {

          this.$message.success(result.msg);
          this.getGoodsList();
        });
      }).catch((err) => console.log(err));
    },
    toAddGoodsPage(){ //页面跳转到添加商品的页面
      this.$router.push('/goods/addGoods');
    },
    showEditCategoryDialog(id){

    }

  },
  created(){
    this.getGoodsList();
  }
}
</script>

<style scoped>

</style>
