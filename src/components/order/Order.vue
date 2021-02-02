<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--订单列表-->
      <el-table :data="orderList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="orderNumber"></el-table-column>
        <el-table-column label="订单价格(￥)" prop="orderPrice"></el-table-column>
        <el-table-column label="是否付款" prop="payStatus">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payStatus" type="success">已付款</el-tag>
            <el-tag v-else-if="!scope.row.payStatus" type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="isSend"></el-table-column>
        <el-table-column label="下单时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle @click="showEditAddressDialog(scope.row.catId)"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="物流信息" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-location" circle @click="showProgressBox"/>
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
        background
      >
      </el-pagination>
    </el-card>

    <!--修改地址的对话框-->
    <el-dialog
      title="修改地址"
      :visible.sync="setAddressVisible"
      width="50%"
    >
      <!--内容主体区域-->
      <el-form
        :model="editAddressForm"
        :rules="editAddressFormRules"
        ref="editAddressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县:" prop="address1">
          <el-cascader
            :options="cityData"
            :props="{expandTrigger: 'hover',value: 'value',label: 'text',children: 'children'}"
            v-model="editAddressForm.address1"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="详细地址:" prop="address2">
          <el-input v-model="editAddressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAddressVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--展示物流进度的对话框-->
    <el-dialog
      title="物流进度"
      :visible.sync="progressVisible"
      width="50%"
    >
      <!--内容主体区域-->
      <span>.....</span>

    </el-dialog>

  </div>
</template>

<script>
import cityData3 from '../../assets/js/city.data-3'
export default {
  name: "Order",
  data(){
    return{
      queryInfo: {//分页查询参数
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,//总数
      orderList: [],//订单列表
      setAddressVisible: false,//控制修改地址对话框的关闭和显示
      editAddressForm: {
        address1: [],//省市区地址
        address2: '',//详细地址
      },
      editAddressFormRules: {
        address1: [
          {required: true, message: '请选择省市区县!', trigger: 'blur'},
        ],
        address2: [
          {required: true, message: '请输入详细地址!', trigger: 'blur'},
        ]
      },
      cityData: cityData3,
      progressVisible: false,//物流进度对话框
      progressInfo: [],//物流信息数组
    }
  },
  methods: {
    getOrderList(){
      this.$ajax.get('order',{
        params: {
          query: this.queryInfo.query,
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize
        }
      }).then(({data: result}) => {
        if(!result.flag){
          return this.$message.error(result.msg);
        }

        const {data} = result;

        this.orderList = data.records;
        this.total = data.total;
      }).catch(err => console.log(err));
    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;

      this.getOrderList();
    },
    handleCurrentChange(newPageNum){
      this.queryInfo.pageNum = newPageNum;

      this.getOrderList();
    },
    showEditAddressDialog(){
      this.setAddressVisible = true;
    },
    handleEditDialogClosed(){
      this.$refs.editAddressFormRef.resetFields();
    },
    showProgressBox(){//显示物流的进度
      this.progressVisible = true;
    }

  },
  created(){
    this.getOrderList();
  }
}
</script>

<style scoped lang="less">

.el-cascader{
  width: 100%;
}

</style>
