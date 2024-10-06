import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    ...new Set(
      [...window.document.styleSheets]
        .map((style) => {
          return style.href !== null
            ? style.href
            : `data:text/css;base64,${btoa(
                unescape(
                  encodeURIComponent(
                    [...style.cssRules].map((rule) => rule.cssText).join('')
                  )
                )
              )}`
        })
        .filter((s) => s !== null && s !== 'data:text/css;base64,')
    ),

    // ...new Set(
    //   [...window.document.styleSheets]
    //     .map((style) => {
    //       return style.href
    //     })
    //     .filter((s) => s !== null && s !== 'data:text/css;base64,')
    // ),
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}
// npx tailwindcss -i './assets/tailwind.css' -o './public/css/tailwind.css'

Vue.use(VueHtmlToPaper, options)
