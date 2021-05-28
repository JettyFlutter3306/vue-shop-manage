<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像框-->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="">
      </div>

      <!--表单区域-->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="username"
            v-model="loginForm.username"/>
        </el-form-item>

        <!--密码-->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="password"
            v-model="loginForm.password"
            type="password"
          />
        </el-form-item>

        <el-form-item class="btns">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <slide-verify
              ref="slideblock"
              @again="onAgain"
              @fulfilled="onFulfilled"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              :accuracy="accuracy"
              :slider-text="text"
            ></slide-verify>
            <div>{{msg}}</div>
            <el-button type="primary" slot="reference">登录</el-button>
          </el-popover>

          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>



      </el-form>
    </div>



  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return {
      text: '向右滑',
      accuracy: 1,// 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      msg: '',
      visible: false,
      loginForm: {// 登录表单数据绑定对象
        username: '洛必达',
        password: '123456'
      },
      // 这是表单验证的规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur'}
        ]
      },

    }
  },
  methods: {
    // 点击重置按钮
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$ajax.post('userLogin',this.loginForm).then(({data: result}) => {

            console.log(result);

            if(!result.flag){
              return this.$message.error(result.msg);
            }

            /**
             * 1.将登录成功之后的token保存到客户端的localStorage中去
             *  1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
             *  1.2 token只应该在当前网站打开时生效,所以讲token保存在localStorage中
             * 2.通过编程式导航跳转到后台主页,路由地址是/home
             */

            window.localStorage.setItem('Authorization',result.data['Authorization']);
            window.localStorage.setItem('username',result.data.username);

            this.$message.success(result.msg);

            this.$router.push("/home"); //跳转页面
          }).catch((error) => {
            console.log(error);

            this.$message.error('登陆失败!');
          });
        }
      })
    },
    onSuccess(){
      this.visible = false;
      this.login();
    },
    onFail(){

    },
    onRefresh(){

    },
    onFulfilled() {

    },
    onAgain() {
      // 刷新
      this.$refs.slideblock.reset();
    }
  },
  watch: {
    popoverVisible(e) {
      if (e === true) {
        this.canvasInit();
        this.puzzle = false;
      }
    }
  },
}
</script>

<style lang="less" scoped>

.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.el-button{
  margin-right: 15px;
}

</style>

