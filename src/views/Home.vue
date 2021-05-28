<template>
  <el-container class="home_container">

    <!--主页-->
    <el-aside :width="isCollapsed ? '64px' : '200px'">
      <div>
        <img src="../assets/logo.png" alt="" width="25px">
        <span v-show="!isCollapsed">Vue管理系统</span>
      </div>

      <el-menu
        @open="handleOpen"
        @close="handleClose"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#63B0FF"
        unique-opened
        :collapse="isCollapsed"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">欢迎首页</span>
        </el-menu-item>

        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">

          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.rightName }}</span>
          </template>

          <el-menu-item :index="'/' + item0.rootPath" v-for="item0 in item.children" @click="addTab(item0)">
            <template slot="title">
              <i :class="item0.icon"></i>
              <span>{{ item0.rightName }}</span>
            </template>
          </el-menu-item>

        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div @click="closeMenu" class="header_button">
          <i :class="flexButtonClass"></i>
        </div>

        <div>
          <el-avatar>
            <img src="../assets/avatar.png" alt="">
          </el-avatar>

          <el-dropdown>
            <span style="font-size: 16px;position: relative;bottom: 12px;cursor: pointer;color: #409EFF;" class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-back" @click.native="dialogVisible = true">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>


      </el-header>

<!--      <div>-->
<!--        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">-->
<!--          <el-tab-pane-->
<!--            v-for="(item, index) in editableTabs"-->
<!--            :key="item.rootPath"-->
<!--            :label="item.title"-->
<!--            :name="item.name"-->
<!--          >-->
<!--          </el-tab-pane>-->
<!--        </el-tabs>-->
<!--      </div>-->

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

    <el-dialog
      title="系统提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认退出登录吗?</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="logout">确定</el-button>
      <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [{
        title: '首页',
        name: '1',
        path: '/welcome',
      }],
      tabIndex: 1,
      isCollapsed: false,
      flexButtonClass: 'el-icon-s-fold',
      menuList: [],
      dialogVisible: false,
      username: window.localStorage.getItem('username')
    }
  },
  methods: {
    logout() {
      window.localStorage.clear();//清空token

      this.$router.push('/login');//重定向到登录页面
    },
    getMenuList() {//获取所有的菜单
      this.$ajax.get('right/menus').then(({data: result}) => {

        this.menuList = result.data;
      }).catch((err) => console.log(err));
    },
    closeMenu() {
      this.isCollapsed = !this.isCollapsed;

      if (this.isCollapsed) {
        this.flexButtonClass = 'el-icon-s-unfold';
      } else {
        this.flexButtonClass = 'el-icon-s-fold';
      }
    },
    handleOpen() {

    },
    handleClose() {

    },
    // addTab(target) {
    //   let newTabName = ++this.tabIndex + '';
    //   this.editableTabs.push({
    //     title: target.rightName,
    //     name: newTabName,
    //     path: '/' + target.rootPath,
    //   });
    //   this.editableTabsValue = newTabName;
    // },
    // removeTab(targetName) {
    //   let tabs = this.editableTabs;
    //   let activeName = this.editableTabsValue;
    //   if(targetName === '1'){
    //     return;
    //   }
    //
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.name === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1];
    //         if (nextTab) {
    //           activeName = nextTab.name;
    //
    //           if(activeName !== '1'){
    //             this.$router.push(this.editableTabs[activeName-1].path);
    //           }
    //
    //         }
    //       }
    //     });
    //   }
    //
    //   this.editableTabsValue = activeName;
    //   this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    // }
  },
  created() {
    this.getMenuList();
  }
}
</script>

<style lang="less" scoped>

.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #304156;
  color: #fff;
  font-size: 20px;

  div {
    text-align: center;
  }
;

  .el-menu {
    border-right: none;
  }
;

  img {
    position: relative;
    top: 2px;
  }
}

.el-main {
  background-color: #E9EEF3;
  text-align: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.header_button{
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 25px;
  text-align: center;
  line-height: 50px;
}

.header_button:hover{
  background-color: #F9F9F9;
}


</style>
