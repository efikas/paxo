<template>
     <v-app-bar app color="" style="" class="top-top hidden-sm-and-down" id="banner">
        <p style="font-size: 12px">Get a discount on your first order<br />  
          <span class="hidden-md-and-up">Use Code: <b>FIRSTGIFT</b></span>
        </p>
        <div
          style="
            background: white;
            border: 2px dashed #36bdb4;
            font-size: 12px;
            margin-top: -15px;
          "
          class="pa-0 hidden-sm-and-down px-1 ml-3"
          :class="{ 'mx-3': $vuetify.breakpoint.smAndDown }"
        >
          Use Code: <b>FIRSTGIFT</b>
        </div>
        <v-spacer></v-spacer>
       
        <p class="hidden-sm-and-down">
          <img src="../../static/assets/mail.png"  alt="" />
          <div class="text-xs">info@paxo.com.ng&emsp;</div>
        </p>
        <p class="hidden-sm-and-down">
          <img src="../../static/assets/whatsapp.png"  alt="" />
          <div class="text-xs">08146538456&emsp;</div>
        </p>
        <p class="hidden-sm-and-down">
          <img src="../../static/assets/track.png"  alt="" />
          <div class="text-xs">Track Order&emsp;</div>
        </p>
        <p class="hidden-sm-and-down" style="font-size: 0.9rem">
          DOWNLOAD APP:&emsp;
          <a
            style="color: #333; text-decoration:none"
            href="https://apps.apple.com/ng/app/paxo-beauty/id1534936621"
            target="_blank"
            >IOS</a
          >
          &emsp;
          <!-- <v-divider vertical thickness="4" class="mx-2l"></v-divider>
          &emsp; -->
          <a
            style="color: #333; text-decoration:none"
            href="https://play.google.com/store/apps/details?id=com.paxo.shop"
            target="_blank"
            >ANDROID</a
          >
        </p>

        <v-btn
          class="secondary hidden-md-and-up"
          @click="getApp()"
          small
          text
          style="margin-top: -15px"
        > 
          <v-icon size="18">smartphone</v-icon>
          GET APP</v-btn
        >
      </v-app-bar>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  <style lang="scss" scoped>
  .top-top {
    background-color: white !important;
    border-bottom: 3px solid rgba(16, 2, 2, 0.1) !important;
    height: 50px !important;
    }

.text-xs {
  font-size: 0.75rem;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 1px;
}

@media only screen and (min-width: 768px) {
  .top-top {
    padding-left: 5% !important;
    padding-right: 5% !important;
  }
}
  </style>
  