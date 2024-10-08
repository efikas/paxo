<template>
  <div>
    <!-- <v-breadcrumbs class="pt-0 breadcrumb" :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          class="pa-0 pt-4"
          :href="item.href"
          :disabled="item.disabled"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs> -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3580030528697!2d3.369163517443848!3d6.602355500000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b930030e18ca9%3A0xd87c1f59db3ec8f6!2sPaxo%20Health%20%26%20Beauty!5e0!3m2!1sen!2sng!4v1625233136759!5m2!1sen!2sng"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
    <div class="text-center py-16">
      <h1 class="primary--text">Contact Us For Any Questions</h1>
    </div>
<v-container>

  <v-row align="center" justify="center">
    <v-col md="3" class="text-center">
      <h3>Head Office</h3>
      <p>No 3, Billings Way, Oregun Ikeja, Lagos.</p>
    </v-col>
    <v-col md="3" class="text-center">
      <h3>Call Us </h3>
      <!-- <p>08146907099</p> -->
      <p>02018891758</p>
    </v-col>
    <v-col md="3" class="text-center">
      <h3>Email Us</h3>
      <p>info@paxo.com.ng</p>
    </v-col>
  </v-row>
</v-container>

<!-- <div class="get-in-touch pa-16">
    <v-container>
      <h1 class="text-center">Get In Touch</h1>
      <v-form>

      </v-form>
    </v-container>
</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '#',
        },
        {
          text: 'Shop',
          disabled: false,
          to: '#',
        },
      ],
    }
  },
}
</script>
<style scoped lang="scss">
  .get-in-touch{
    background: #f5f5f5;
  }
</style>
