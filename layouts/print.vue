<template>
    <v-app dark>
        <Nuxt />
    </v-app>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  <style lang="scss" scoped>
  // .v-list-item{
  //   &:hover{
  //     color: #fff !important;
  //     background: #ff4e50;
  //   }
  // }
  .search-btn {
    border-radius: 0 4px 4px 0;
    margin-top: -25.5px !important;
  }
  .auth-btn {
    color: #000;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      color: #ff4e50;
    }
  }
  a {
    text-decoration: none;
  }
  
  .brands-container {
    display: flex;
    flex-flow: row;
    min-height: 392px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: scroll !important;
    .brands {
      flex: 0 0 auto;
    }
  }
  
  .nav-btn {
    color: #000;
    background: none;
    display: block;
    font-size: 13px;
    cursor: pointer;
    font-weight: 400;
    border-radius: 0;
    &-brand {
      border: 1px solid #000;
    }
    .v-btn--active {
      border-bottom: 3px solid #36bdb4;
      color: #36bdb4;
    }
    &:hover {
      border-bottom: 3px solid #36bdb4;
      color: #36bdb4;
    }
    &:hover::before {
      background: transparent !important;
    }
  }
  .nav-btn-small {
    text-decoration: none;
    font-size: 14px;
    &:hover {
      color: #ff4e50;
    }
  }
  .sub-menu a {
    text-decoration: none;
    color: #000;
    font-size: 14px;
    &:hover {
      color: #ff4e50;
    }
  }
  .newsletter {
    // background: #444;
    padding: 65px 0;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    h3 {
      font-weight: 600;
      margin-bottom: 5px;
      font-size: 24px;
    }
    p {
      font-size: 14px;
      line-height: 1.6em;
      color: #666;
    }
  }
  .footer {
    background-color: #000;
    h4 {
      font-size: 16px;
      margin-bottom: 30px;
      color: #fff;
      font-weight: 600;
    }
    p {
      font-size: 14px;
      line-height: 1.6em;
      color: #fff;
    }
    h3 {
      // color: #fcb800;
      font-size: 24px;
    }
  }
  .pt-120 {
    padding-top: 120px !important;
  }
  .pt-100 {
    padding-top: 170px !important;
  }
  .footer-bottom {
    display: flex;
    justify-content: center;
  }
  .dark-bg {
    background-color: #f1f1f1 !important;
  }
  .second-nav {
    margin-top: 69.5px !important;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 10%) !important;
  }
  .second-nav-sm {
    margin-top: 119px !important;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 10%) !important;
  }
  .top-top {
    background-color: #36bdb4 !important;
    // opacity: 0.8;
  }
  @media only screen and (max-width: 768px) {
    .second-nav {
      margin-top: 71px !important;
    }
    a.nav-btn {
      padding-bottom: 0 !important;
      height: 30px !important;
    }
  }
  .v-btn--active {
    border-bottom: 3px solid #36bdb4;
    color: #36bdb4;
    &:before {
      background: transparent !important;
    }
  }
  a {
    padding-bottom: 0 !important;
  }
  .logo-size-md {
    width: 130px;
  }
  .logo-size-sm {
    width: 100px;
  }
  .back-to-top {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999999;
    border-radius: 50px !important;
  }
  .whatsapp-fab {
    background: #00e676 !important;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
    border-radius: 50px !important;
  }
  .back-to-top:hover {
    background: #ff4e50 !important;
    color: #000 !important;
  }
  </style>
  