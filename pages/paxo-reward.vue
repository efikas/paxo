<template>
  <v-container>
    <div class="text-center my-10">
      <v-btn outlined color="primary" :to="isAuthenticated ? '/dashboard' : '/login'"
        >{{isAuthenticated ? 'Check your Paxo Points' : 'Login to check your Paxo Points'}}</v-btn
      >
    </div>
    <h1 class="primary--text">What is Paxo Rewards?</h1>
    <p>
      Paxo Rewards is Paxo Beauty's loyalty program. It is the way we ensure
      that you get the most out of your shopping experience, across our stores
      as well as on our app. Members will earn Paxo Points on every purchase
      they make with us. These points can be redeemed against future purchases.
      Members will also get access to exclusive deals and offers!
    </p>

    <p>
      The beauty of Paxo Rewards is that it is an entirely card-less program.
      Your mobile number is your single point of identification.
    </p>
    <h2 class="primary--text">Purchase/Reward logic for points (Web App)</h2>
    <ul>
      <li>4 points for N500 spent</li>
      <li>4 points = N20</li>
      <li>1 point = N5</li>
      <li>N500 spent to get 4 points = N20</li>
      <li>N1000 spent to get 8 points = N40</li>
      <li>N5000 spent to get 40 points = N200</li>
      <li>N10,000 spent to get 80 points = N400</li>
      <li>N50,000 spent to get 400 points = N2,000</li>
      <li>N100,000 spent to get 800 points = N4,000</li>
    </ul>

    <h3 class="mt-6 primary--text">Referral/Affiliate Logic for points (Web App)</h3>

    <p>
      Same as above for every time you refer someone, you get the 4% off there
      initial and ONLY initial order.
    </p>

    <h3 class="primary--text">Purchase/Reward logic for points (Web App)</h3>
    <p>Same as above but with 5% instead of 4%</p>

    <h3 class="primary--text">Referral/Affiliate Logic for points (Mobile App)</h3>
    <p>Same as above but with 5% instead of 4%</p>

    <h4 class="primary--text">Wholesale Plan</h4>
    <p>
      As a wholesaler, the minimum purchase is &#8358;25,000 with a 30 days grace to
      buy at any price, after 30 days you have to re-activate again with &#8358;25,000
      to have access to another 30 days to shop at any price.
    </p>
    <p>
      <b> Example </b>
    </p>
    <p>
      Mrs Johnson's initial order must be =>&#8358;25,000 but has the ability to buy
      &#8358;5,000 within the month to replace an item but once a new month begins she
      has to buy => &#8358;25,000.
    </p>
    <h4 class="primary--text">Wholesale Reward System</h4>
    <p>
      There is a reward system for our wholesalers at the end of every
      year, wholesalers are categorized into Gold, Silver, and Bronze
    </p>
    <v-simple-table style="border: 1px solid #ddd;" class="mb-4">
      <thead>
        <tr>
          <th>Bronze</th>
          <th>Silver</th>
          <th>Gold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>300k - 600k Annually</td>
          <td>600k - 1m Annually</td>
          <td>1m and above Annually</td>
        </tr>
      </tbody>
    </v-simple-table>
    <!-- <p>
      on Wholesalers dashboard, we show what level they are at present, based on
      what they have bought so far in the year and the next level they are
      headed,a link at the top of the dashboard to show a breakdown of the
      reward system as the table above
    </p> -->
    <p>
      For the <b>bronze</b> category if a customer is able to buy 25k monthly it
      would meet up with 300k at the end of the year.
    </p>
    <p>
      For the <b>Sliver</b> category, if the customer buys 50k monthly he should
      get to the target.
    </p>
    <p>For the <b>Gold</b> category, if the wholesaler buys 85k monthly he/she should get to the target.</p>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  }
}
</script>
