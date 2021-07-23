<template>
  <div id="app">
    <a-layout class="layout">
      <a-layout-header>
        <div class="logo">{{ name }}</div>
        <a-menu
          :theme="'dark'"
          :mode="'horizontal'"
          :selectedKeys="selectKey"
          style="line-height: 64px"
        >
          <a-menu-item key="/">
            <router-link to="/">Home</router-link>
          </a-menu-item>
          <template v-for="(app, index) in apps">
            <a-menu-item v-if="index === 2" :key="app.to">
              <router-link to="/app3/123">{{ app.name }}</router-link>
            </a-menu-item>
            <a-menu-item v-else :key="app.to">
              <router-link :to="app.to">{{ app.name }}</router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-header>
      <a-layout-content class="content">
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="name in arr" :key="name">
            {{ name }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> Ant Design ©2019 Created by Ant UED </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
  /* eslint-disable-next-line  */
  const renderBreadCrumb = (pathname) => {
    let arr = pathname.split('/').slice(1);
    if (arr[0] === '') {
      arr[0] = 'Home';
    }
    return arr;
  };

  export default {
    data() {
      return {
        apps: [
          {
            name: 'app1',
            entry: 'http://localhost:8001/app1',
            to: '/app1',
            props: {
              testProp1: 'test1'
            }
          },
          {
            name: 'app2',
            entry: 'http://localhost:8002/app2',
            to: '/app2',
            props: {
              testProp2: 'test2'
            }
          },
          {
            name: 'app3',
            entry: 'http://localhost:8003/app3',
            to: '/app3'
          }
        ],
        name: 'WINEX',
        arr: renderBreadCrumb(window.location.pathname),
        selectKey: ['/' + window.location.pathname.split('/')[1]]
      };
    },
    watch: {
      $route: function () {
        this.selectKey = ['/' + window.location.pathname.split('/')[1]];
        this.arr = renderBreadCrumb(window.location.pathname);
      }
    }
  };
</script>

<style>
  #app {
    height: 100%;
  }

  #app .layout {
    height: 100%;
  }

  #app .logo {
    float: left;
    width: 100px;
    height: 31px;
    margin: 16px 24px 0 0;
    color: white;
    line-height: 31px;
    text-align: center;
    background: #b6898933;
  }

  #app .content {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }

  #app .breadcrumb {
    margin: 16px 0;
  }

  #app .footer {
    text-align: center;
  }
</style>
