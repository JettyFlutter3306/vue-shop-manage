const mockMenuList = [
  //用户管理
  {
    id: 125,
    authName: '用户管理',
    order: 1,
    path: 'users',
    icon: 'el-icon-user-solid',
    children: [
      {
        id: 100,
        authName: '用户列表',
        order: 1,
        path: 'users',
        icon: 'el-icon-user',
        children: []
      },
      {
        id: 67,
        authName: '会员列表',
        order: 1,
        path: 'user',
        icon: 'el-icon-s-custom',
        children: []
      },
    ]
  },
  //商品管理
  {
    id: 120,
    authName: '商品管理',
    order: 2,
    path: 'goods',
    icon: 'el-icon-goods',
    children: [
      {
        id: 121,
        authName: '商品列表',
        order: 1,
        path: 'goodsList',
        icon: 'el-icon-shopping-bag-1',
        children: []
      },
      {
        id: 122,
        authName: '用户管理',
        order: 2,
        path: '...',
        icon: 'el-icon-user',
        children: []
      }
    ]
  },
  //权限管理
  {
    id: 1,
    authName: '权限管理',
    order: 1,
    path: 'users',
    icon: 'el-icon-s-check',
    children: [
      {
        id: 3,
        authName: '权限列表',
        order: 2,
        path: 'rights',
        icon: 'el-icon-coordinate',
        children: []
      },
      {
        id: 2,
        authName: '角色列表',
        order: 1,
        path: 'roles',
        icon: 'el-icon-s-opportunity',
        children: []
      }
    ]
  },
  //订单管理
  {
    id: 6,
    authName: '订单管理',
    order: 1,
    path: 'users',
    icon: 'el-icon-s-order',
    children: [
      {
        id: 7,
        authName: '用户列表',
        order: 1,
        path: '...',
        icon: 'el-icon-user',
        children: []
      }
    ]
  },
  //统计数据
  {
    id: 11,
    authName: '统计数据',
    order: 1,
    path: 'users',
    icon: 'el-icon-data-analysis',
    children: [
      {
        id: 12,
        authName: '用户列表',
        order: 1,
        path: '...',
        icon: 'el-icon-user',
        children: []
      },
      {
        id: 13,
        authName: '用户管理',
        order: 2,
        path: '...',
        icon: 'el-icon-user',
        children: []
      }
    ]
  },
];

export default mockMenuList
