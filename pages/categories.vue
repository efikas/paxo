<template>
    <div>
        <h3 class="font-weight-medium ml-2">
            SHOP BY CATEGORIES
        </h3>
        <v-row justify="center" class="mt-4">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="(item, index) in sections.slice(0, 12)" :key="index">
                    <v-expansion-panel-header>
                        <nuxt-link :to="'/section/' + item.name + '?sectionId=' + item.id"
                            style="text-decoration: none; margin-bottom: 0 !important">
                            {{ item.name }}</nuxt-link>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row justify="center">
                            <v-expansion-panels accordion>
                                <v-expansion-panel
                                    v-for="(subItem, index) in item.category.filter((val, ind) => ind % 3 == 1)"
                                    :key="index">
                                    <v-expansion-panel-header>
                                        <a :to="'/category/' + subItem.name + '?categoryId=' + subItem.id"
                                            style="text-decoration: none; color: black !important; margin-bottom: 0 !important; ">
                                            {{ subItem.name }}</a>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row justify="center">
                                            <v-expansion-panels accordion readonly="true">
                                                <v-expansion-panel v-for="(subSubItem, index) in subItem.subcategory"
                                                    :key="index">
                                                    <v-expansion-panel-header>
                                                        <nuxt-link
                                                            :to="'/subcategory/' + subSubItem.name + '?subCategoryId=' + subSubItem.id"
                                                            style="text-decoration: none; margin-bottom: 0 !important">
                                                            {{ subSubItem.name }}</nuxt-link>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content></v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </v-row>

                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageloading: true,
            sections: [],

        }
    },
    methods: {
        async getSections() {
            await this.$store.dispatch('section/all').then((response) => {
                this.sections = response.data
                this.pageloading = false
            })
        },

    },
    created() {
        this.getSections()
    },
}
</script>