if (typeof window == 'undefined') {
    var WebSocket = require('ws'),
        os = require('os');
}

(function (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory;
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["Ca$t"] = factory;
    else
        root["Ca$t"] = factory;
})(this, function (string = null) {
    auth = (function (string) {

        if (string == null || typeof string == 'undefined') {
            if (typeof window != 'undefined') {
                string = window.location.hostname
            } else {
                string = os.hostname();
                if (string.split('.').length < 2) {
                    string = string + '. ';
                }
            }
        }
        string = string.replace(/[\/\-_~ ]/g, '').replace('https', '').replace('http', '').replace(':', '');
        string = (string == '127.0.0.1') ? 'localhost.local' : string;

        let domainArr = string.split('.');
        if (domainArr.length < 2) {
            string = string + '. ';
            domainArr = string.split('.');
        }
        domain = domainArr[(string.split('.').length - 2)]
        let firstChan = Number(String(domain.charCodeAt(0)).charAt(0));
        let secondChan = Number(String(domain.charCodeAt(1)).charAt(0));
        firstChan = (firstChan > 8) ? 8 : firstChan;
        var chan = 0;
        let tokens = [
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0OWZhM2MzZDRkNTkyZmY2NzNkNzYwM2I3ZDIyY2Y2ODQ2OGM0NjcxMjZhYTkzODRiNTM1NDg5ZWVmMjkzNDBhNDk0YmVjYTU3M2I1MGQ4In0.eyJhdWQiOiI4IiwianRpIjoiNjQ5ZmEzYzNkNGQ1OTJmZjY3M2Q3NjAzYjdkMjJjZjY4NDY4YzQ2NzEyNmFhOTM4NGI1MzU0ODllZWYyOTM0MGE0OTRiZWNhNTczYjUwZDgiLCJpYXQiOjE1Nzg5Njk0MDgsIm5iZiI6MTU3ODk2OTQwOCwiZXhwIjoxNjEwNTkxODA4LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.hNy8KCHk_XCbmgulTlrAcNOEaLe3R3qEJGcJXege2L011bRdsPt4faOooTjxsmUDj1oFkOo8vtvbNkEDR0vOu47cC2LkUHIN3jpcgjGdzTIbearAwgTVaKfygwv57CEgUw5RRviqjpFAQ-pNHTDBhtIRYIMvrI_9iFSe1uafFeyeAsYA5jdJdB_SsHcZp6z9e8RWW5VJNOY-4ReMq9roPRiLkBEOgk8KaqzK3FUFFCRJvm-VqTGJYgj2DZLSYeeiEUVWyAD-JIuVzN8SehiCrjSGlJUraaD8IwmcKykefJnRsPK-1zlDORX5PEtX47Dd5LwN8OdSrJNoleajnKD6y8asnRX887aaAvDQCNLJeavH-zv4LnWnrjAggGX7VmTq_8zHPHnhSQILpmxk-W9QGV6EhQYzubAwoS4-9B-abKDIXtpec9bQJ8GRe_szPZ38PWy3Dvt_ivzqk7aDmR5D_wb7QO1eleOQCYvZs4VLJAJykE_rBnQdsthU0FOFkyPk0vwSB-RUQaGxNZFb42E2jJJZWvRh_yUCLZNffK7CeNDZSl54qgRdj4qzlw2dK7aQr8b9PuTlxSyp247MN_5w_AHObdKiBdlWJuqY5xMQKD_-Fa1bsue1CToSg-2z-qz3vH-I7SI8bENKNQ1Lao2KfJR1hsnzKgyFJ3bYpOVPzm0',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVmYTk1YTlkNzAzN2YxYmM5ZTg4ZDdkOTIxMDhkOGVmYTE0YmIwZjA3ZDhhY2QyMWY4MDAxOWEyOTIxZjllYjM2YzY5N2MyYWY4ZDU0M2Y3In0.eyJhdWQiOiI4IiwianRpIjoiNWZhOTVhOWQ3MDM3ZjFiYzllODhkN2Q5MjEwOGQ4ZWZhMTRiYjBmMDdkOGFjZDIxZjgwMDE5YTI5MjFmOWViMzZjNjk3YzJhZjhkNTQzZjciLCJpYXQiOjE1Nzg5Njk0MTgsIm5iZiI6MTU3ODk2OTQxOCwiZXhwIjoxNjEwNTkxODE4LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.ThH7Sakjgat64clJ-vGoIimVfjvnQpHrFtjp46fK_O4dkQkUaMxS1P6YKl5NEtmGdEpRVW3-oHQvQTy_bDrK2rlRy_xv8fxOf6vwe2lZX7PHLf1jdp7EDjywW1Phd-8yJj1NGstXRlrJtIVgkgk-wzx9X0cvldy74px7ccksbcBo4NkjG1slVtbDieDAIFZcoxtPM6-hFP9H-YI57ln_dBLBs0vy3gT_SeMFf98jP90ssltfXThx-8HV_NpARsXVnRVOi3HYyzeOz5SqGgHb5O8MGjyjZIVOJoe3JvbKWey9p1RjRGcwkEUZrDWpa4V4s2e6wTInd0whVosTfhWaIxz7_6Vm6DtLyBzpODkOxiEWHXT-zsLSYvc7hhOMcduiwPoMPsjE9-hMlVbvpPhEFNwIZp-lk8mGCwZtiS95m-jLnhNncm4DYcr10J2x4FgKhGz0CXKd8R-Z0Vq8zTsB_S9XjFbb3apXrGZDsP2sK9aTnfjffElQSDY8lGdAhFitydkJdwvfMVQJSIqICE8XJ1egcNYQQFFiBiZ_5Dp3kzEbP5IngbH80RkKzQ4uOFjWcuKczlfLZIfGuL18fuhLDbOKqj5ODqmzTxIJeaCB3MwgPU5C95W4XMLIqgSjHIon24jNz0jPcYEGPm0BHq1cnpGGjJPe9UDBTk3hxTdiSYA',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3MDNhYWU1ZjYzYzZiMTIzY2FhMmRiYjE2NjZlOTI5YTZhNWIxMGE3MzI5ZjcwMDExZjc3ZGU2ODAxNDBkZDY0M2RkMzcxM2VmZDk4YmY5In0.eyJhdWQiOiI4IiwianRpIjoiZTcwM2FhZTVmNjNjNmIxMjNjYWEyZGJiMTY2NmU5MjlhNmE1YjEwYTczMjlmNzAwMTFmNzdkZTY4MDE0MGRkNjQzZGQzNzEzZWZkOThiZjkiLCJpYXQiOjE1Nzg5Njk0MjksIm5iZiI6MTU3ODk2OTQyOSwiZXhwIjoxNjEwNTkxODI5LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.H8IBN82u7btcmYjjtakOxaUdoKkZ4zoWJnQxfGu27RYJvXCeLztcw9VQO9Oqx_vJ1iST8-UaeTIH_As5LDytNVeYAYLEnd1o9Acm5EoG17e-hHwnFwWULPI7MO0Lx4t9e9dCuAIqumPa-HrP1aAIFk3ZjHj2Gdx2fg2ylYMxtlDkbx3BRB2KrG8h1Zh4haqdTzNiyrDLEE4LwKh15eCkzkLfHFvEmof8sfBcrDW_OPJUR_DvOjNF_iar_OipT3lhGy4PpJi8AbEzwxwtYptA-CEXEu71_hc5Xht63rmDhqa1sW8vNAqpBApLSzV6LMZFIXo0Z0jr1ON5dkHKk7bMcCLP69xEuD8aE95us9F9rKqiiWwf2MwGvBC0SfvP0pr9jQwkoN7c6qc_VTLn-SjVtDqnMv297jhptRuYbTDfp3YHYJ5xQxH75ErWUNTCLvmcz2sFR223OTs7LkSSAwm8w3Dyevb319uGF761WW3DGSp_7LZKkFJzNlVawIabW_O4c9ndd1qZ3MWU17W2rnsCQDq-wSsvKNNIYJsO1SjCgAUvyz0YPuk_EOcZWS-WVI8QVRJYw7PH20wUESNMi2jmK7cNhd26-JFXF493b4NXPyDWbLOoRy0ZGYY8EiT67nlBw5dCLRP--sESAD6ZY_ABYVw12-QXdzIWLK7lQmTPXkg',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMwZGM4MGMzZjc5OWFhMjBhZTNkMjczYWQ5ZTIxZDJlNmZjMDUwZmVkZDJiNzBjOTNlZmU2YzIxNDgyNmY4ODM1MTA1YTE2NWFhZDc5MGRjIn0.eyJhdWQiOiI4IiwianRpIjoiYzBkYzgwYzNmNzk5YWEyMGFlM2QyNzNhZDllMjFkMmU2ZmMwNTBmZWRkMmI3MGM5M2VmZTZjMjE0ODI2Zjg4MzUxMDVhMTY1YWFkNzkwZGMiLCJpYXQiOjE1Nzg5Njk0NDEsIm5iZiI6MTU3ODk2OTQ0MSwiZXhwIjoxNjEwNTkxODQxLCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.KpsubDyGwxVKTdgUkh7OyaTAFFtc09YaiRkevaNOP_YQWr7idaEbv9NiIfGNshxaphjR34EVKY5RRywr2H0aaHNqOTVdB93CNgh7Quej3P4N0GrHHkHxEkGy0psiciSaMhNlp3NC__RPoQD7mfUXgL-dod80O8VOQDneA--9Z49Jbk9Qr8qgwow_i4nKn8CGxrZ1S_7eS6k-CuCIw1Guys-vmjuvaAM823952OqCKpFCa3CNXd8t4mAldeByofQaR27m5xNrKRm61Z6G2CAsEBeiBpLz4p1Fe0AgnfRHs_CRQwOsqhpOd0VKzMjE-RbYfOSmw-QLcJ4cBk3SjiOcmOCMre7pu3Sn_aBTi5V1xq5jGz2Tk8RhlrZgVkka5pHe35jOn0mqdtELI684fwYYW5vByBEoqiRo8zHnRK6XKGcTiJc-mjHoh_fuqQP9QarOBA8RSOaB7aqoALW8TWtYlY5XyMR5yssu3qUiEABmswCUEITaSW-byg_3O19p8YeStfiGKVCeXAG74N53eWHWde7sFzj7Fcju0iFAPugijskUiBDAjHJiFyLDYLvkCcTf6p-gipjwxZty9ahXsPzUiaXKa-P7Yatr5gV4bjAYmeiXx0xky2BlkM9TwdEjq2wDsJeIRM8qhDSsz-4jycF6rwO17zHhT0iCM1IRaGElpcY',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMxYzA1YzZiODI0MzI2NGMyY2I5NDE2MjQ1NmI0MDQ1OGRhZTM0OGQxZjlhMGZkMmRmZmJkNGMwYThjZjU1ZjkzOGRjNzM4N2RhZjYwMzJkIn0.eyJhdWQiOiI4IiwianRpIjoiYzFjMDVjNmI4MjQzMjY0YzJjYjk0MTYyNDU2YjQwNDU4ZGFlMzQ4ZDFmOWEwZmQyZGZmYmQ0YzBhOGNmNTVmOTM4ZGM3Mzg3ZGFmNjAzMmQiLCJpYXQiOjE1Nzg5Njk0NTIsIm5iZiI6MTU3ODk2OTQ1MiwiZXhwIjoxNjEwNTkxODUyLCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.q-ADAlafEUo0n-g2Z0Fx6tJ3vgSOux1nbtBXlp99sSbkIv9O6v-pw00ZHih4mnAlVTjtB8G3dKSYstuNEpfvJFDCd66IzPRQgyz6ZYLjTynh0eOgulxnotdpaW6LbErLlNqMENR_qBJe1e21EQn6RcgvolL56EA0JBSRP9AQMBrcY4ikut7Dx4UQTlif2QoPabpXuoaGyyPxkdm9g5diu0YfO4JVL3F7PsEwFD9uX1r66YeFnVS-Mk1pdYqJQ6OjupVcsyXMwYIOp8g6nh5K84BnRR_PVZffPwwdkSLEyIpf4dlbxAlMRd3LPz56OcAwXkueCtu6wVCJy7i0bLgZs2Gv4bws7tfW9vW28U7ykGP-JyeuSp0LKlkSCX5wEtu35a8196DshIY52yrjtSYQZzbNxwKIkTuZ5zkt5QvJWrcS1N7mpn5WpUa5P8nrdmSIO8LlTYg0g2U0skRbtZc5JlbyDFp6QaIJMNT1_hwucy-2bDk-kaiesPvdx4nLULs4b8BInsjXxUpdV23-NqdU9k28RwjC-l28NutyC9j7NDBvmJMRiTOD4zX2bJnp-uFUnDdKPXH7JR5HRl7fm_ZigUMLqdV1QAD3GRVr_lfqbUIkqDBDobrEAltWy2NZMKeaTvQR9o8Iy0RZG4qQpfk7GVx6ESFShb6xffd9UxzJpUo',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1Y2E5MDM0ODVkMDg0MjI2MGM5Mzg5ZTk1MTMxNWVlNDY5NTM4NmM1ZGY5NTUxOTU1NGVmZTQ1Njc1MDlmOTQ1MDA2OTBlMWExYjIwZWZjIn0.eyJhdWQiOiI4IiwianRpIjoiNTVjYTkwMzQ4NWQwODQyMjYwYzkzODllOTUxMzE1ZWU0Njk1Mzg2YzVkZjk1NTE5NTU0ZWZlNDU2NzUwOWY5NDUwMDY5MGUxYTFiMjBlZmMiLCJpYXQiOjE1Nzg5Njk0NjMsIm5iZiI6MTU3ODk2OTQ2MywiZXhwIjoxNjEwNTkxODYzLCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.P6BMnWc3fbu2P8F2cPlsvO8kbkErLhdyTBBiclaxcnxmeLQsT1hYgxc0VybbNMaD8EdmkUnu-fK7XG9iDZpvfqw4X61YbZ-kfOu1xD17xi1Qti5Xws8kA4MlLmdLlmGEOtqeuYyqRwt7Hq9ztLEtqf3r0lL-bahSYfm3LFDR_TU9ywEgVfhcARyDRRXs6iK3g8_34gpHgx9bQWB0THUPDrmW0Y0iALnrynOFDDQVsf79rQjUdKkd_5awiWSBrynk6dzGTwmmr5gCk4PcVTj1R4xiAIwvLu6es5GFgc9kIDvyIxVDWBlqyalXkmChb4kJyelEehYx-NbmNLmT1huBWeIJt4WgR8UO0XTLe71RDZOqQvHagWwTKsWllDTpUEPg2NqR6koQ2nkjA28Ok2IRZjqV5aOhigEnvDdyKwdcszMiDS5Z6K-NRAqicYPKQw4P-IFVTkN9ZFo60-juf-j51TYNXe1ruDcor8Hh7CJ0eRBAxPdNX2Eko_fhleA9BDAmVgdXhi3t6qEa9c0WnY8dXGXFLwBpItmpTmhrAQMudcFKLo_LRM2CpGwLNToVGWctj5KdynEC4oFjtIW5aFWdeBFvDfKgG0mVnvzSoGpw9dew-67eYdxDqCd_ToiFwHFIFx2yL8QLqqnspS-3wYSoK_rl4-JxxzFEECRBrIHVhZw',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyNTdiYmVjOTQxYWMwYTliODY2MDIxZmJkMTM5NTUzOWI4YWUxZDYwZTQ2NzI2NDNjYTU0ZTI1ZGY1NmY3ZmRhZDM3NDU3MTJmMmMyNTFkIn0.eyJhdWQiOiI4IiwianRpIjoiOTI1N2JiZWM5NDFhYzBhOWI4NjYwMjFmYmQxMzk1NTM5YjhhZTFkNjBlNDY3MjY0M2NhNTRlMjVkZjU2ZjdmZGFkMzc0NTcxMmYyYzI1MWQiLCJpYXQiOjE1Nzg5Njk0NzQsIm5iZiI6MTU3ODk2OTQ3NCwiZXhwIjoxNjEwNTkxODc0LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.wk35XvUHxGg_b3xGoJqb8H9jmAiqltHZz80iJcDi73HRcAWxO0LD0xvkS3ITAzOIPYqi_VYGs1SloCDtPzeA1XzJnnhFmm9_FevTXRozriHGUB22pTe2JSTS6B6etQhK52DUoWyZpG5jytTBqvEE01gwiIae2G_bhM7qZ6DfFeUHQG6j-ejONLkddUG7e_zr-cbU6ThK5WXo_0Q_8PbUInzdguw70tQk9nKaUyfLEwvI0Jjxe3rF4egTXNAQ-FdA7kgZpDBuas6F8FD9TSYvMX1xBVTH1BKyG8gHDPB5uMwSTbG9dh75aoQHfwB67xi_mQ2KNWdjpCRJPr2gA5lL1C3fIFJpB-pXufgLI0IzbHU9mCxzBZWzGrPhmOVmvGTL9yT1eBlRlYMhc_Hg_z-cpRxP9GMvP-dUHQ6wJznUCha5sFjnSm4pS8OZLD--8RIuXmJCL4En0I1-Y7Zu4AJJlE5yeHRe1qRbevnPHzFjJ9riXhVF-h9VVbS6mo5_C9q9Oihs-4v0gHNG99Mqwg16rGvyulqGZs-2w9cKtJ6lBj4AIdlchJ_PJJyP8OQWuwL4ZMh3DT32TH2yNL3LAkLOuFfY97nwS7K6mWZ3oUC4TAd4d0jRpw4L2sDwcMCELWx8NgqECUacsnyeU-JmUAKkBHbCO22UKhnuN9_DlLAI01o',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVmNjU5NjI0MDBmZGM0MzJmMzQ5NDQ3MGEwOGJhMGQ2MWYwMGU3YmVmOTE5ZDI3MzY4YTlmYzM4NDY2ZDc0MWNiMDYxOWNjZGMyOWQwNzkzIn0.eyJhdWQiOiI4IiwianRpIjoiZWY2NTk2MjQwMGZkYzQzMmYzNDk0NDcwYTA4YmEwZDYxZjAwZTdiZWY5MTlkMjczNjhhOWZjMzg0NjZkNzQxY2IwNjE5Y2NkYzI5ZDA3OTMiLCJpYXQiOjE1Nzg5Njk0ODUsIm5iZiI6MTU3ODk2OTQ4NSwiZXhwIjoxNjEwNTkxODg1LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.hCT07MZHSQQGqcqWcZ1WBwTfeNucsmYP1xFjGNRj3kLzBdI22X-fLt7NaD2PFGCwwREMA3BfqSAVSjYOl2gOmsfGqWrIvBQUjr9npnfutu0Atekn6jXDtF9QV1fIdkQXizbp12xq6AE3y5rUxDt_WIDel4mh1lNu4-dm5Kff3BeON8BTM8JIEapTVogN-EJXxdtBhF3NjEM9JgUV__CXRgs2vc4qc5lqS9hblYunjeAeRmW6jyFlvWi5LEJyNUeiL4DaWfGCDAH2pBaY5CWd3D4kKeCv-Z2OZTbukMc53HJtAuPVf8-k7P4YV09sFnRvy3PLqcd3KqZG31avkHb6Bka-CGYGSSXQXjCmpHpS7zBRZkGSrAI7OyeFg1UUHnU22xAYnO6zKrNuYiKGY_TN3I-N6fa-DzJ41YmWQyyfJUyy7MHUmMDNmY9FDNN-5Oew-_i5QbiGqa8fkv21EZz38Gr60h-aLuqpJEOqC9_0s1IUIthIfvlKSYR5dZzZ7fzudGqwG6dU9rU5VZGkz4xL3pmg_2YQkzrH6OLnE0NeMf6SAf2uRoXH2r3uGYiOzjOgu1cD3azvQODVGN2cFoDHCk01zqC-AMdvAvER_ab4JTXuVRxMZieS7UJhlwHIVGOtcaReA4jpTEGIRbW3BHYp4pKcx9HFOctVngnlr908BvQ',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4NjhlZWIxMDFjM2U0NDU1YjY4ZmJmNWU3ZmNmYzJlNWE0MTZkY2QyM2RhNDI3ZDM2MzE2NzMyNjViYTc5YjUyMTMxOGY4Yjg3ZmVjYTBmIn0.eyJhdWQiOiI4IiwianRpIjoiZTg2OGVlYjEwMWMzZTQ0NTViNjhmYmY1ZTdmY2ZjMmU1YTQxNmRjZDIzZGE0MjdkMzYzMTY3MzI2NWJhNzliNTIxMzE4ZjhiODdmZWNhMGYiLCJpYXQiOjE1Nzg5Njk1MDQsIm5iZiI6MTU3ODk2OTUwNCwiZXhwIjoxNjEwNTkxOTA0LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.xeAUvV1qsw-5DZyITGkVKmgJ7lXlU8jTQ97pr5p-oHFNVWSPPEuB6LeMpsExwKVVhYO3Ukgu-N9-RN0I29bFGfCnh3lRXF1hnh0kVX8pzj_m4akewbCYOZA4lYHJjtjT5Ln_dhmnxah-aPQT_sIOgZBPO8Xe4tXSKdMxTqZNaTAItZSdiuzUkaBnnsg1XhiRH8YzXbznE6pWYfn2l1Z2MA8_DnoNsksEaan4qT1psKuuk6cLI9JsulZLvTJB1OQWoNUPcstxyDU9-tZ4X44HpGAyw1t1kUTbhv6DumR2mtNZ5hpJaC5AZxccCFNX-WUTPqmoeki8E39FdY3xRSa7HulM6JVBV8gkQWXmJqnqSgvwG4eEhw_FHleu6CHqUosQbE9ceY-9ICPHfYOUGaaWcmj1sKArZNB_pRTza5SYedm1xMLM94YA_1cHPR0n3L89II2ER1jxjxb6lcZnF8vaxOz_XsM0Xs_jTCR53_3TaVa-fdDfRb_8zuSL8Gsl3xDJzScF2_YBpDTSa7f5ZG5ltzwOiPtlQfyjP8O5grKzxQl0hM6sTV9H-Fi2pvjTKa8J7WvOcWc5xa_QbxpoWMTsqpSrFg07blIkjxtzM7ktqSvS7AZxRYGOjkA9cDEiAxdbC0sjZ7M3-nphjzg7F-7tHXXvXNWPiKl39w1idbkKf_0',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllODNjNjM3YTY2YjA3YmFjZmFmZDM3ZTA0ZDIwZGU1MDllMTA3MzJjNWIzYTg3OWIwY2ExYzU0NmZkMWIwOTUxODUyYmQ1MWJjNDAzN2FjIn0.eyJhdWQiOiI4IiwianRpIjoiOWU4M2M2MzdhNjZiMDdiYWNmYWZkMzdlMDRkMjBkZTUwOWUxMDczMmM1YjNhODc5YjBjYTFjNTQ2ZmQxYjA5NTE4NTJiZDUxYmM0MDM3YWMiLCJpYXQiOjE1Nzg5Njk1MTYsIm5iZiI6MTU3ODk2OTUxNiwiZXhwIjoxNjEwNTkxOTE2LCJzdWIiOiIzMzMiLCJzY29wZXMiOltdfQ.DDaRUACTm4Ob0ZwCNjJBwGnFVz58g0D1hDdMLxeWdRI0V9DByDkDgW0UChkYLwpxDHwSfJW0_b0pNKUMG5c8Gh9PMV-AoJgYd5OhmtT6y4bRLWWcAVqZ415RakgN_NFeafdnTwbgOxEP48TZ1G50lb7wh_uzB1pkLzsHwfxzpgiKdks_Ou48qF7QPJWsMp8g0Z3UbJCHdImM2E1hBcyrfYqIVxrb45MDH06LT1jZlnazSJDgvWSeeTq27jebncR0K3He31JNyQOZvhKDSVii7J5enzdqJ_lD2WueoN21hj1xNlp7EtuR5EgCTL5T3Xvl_tJifj82c6Bx58BIPKicUVXGHznVF7LIecbEIMS_XFScmtM1l3u-lHyZ-miZMdwxgwPWNQsNEBh43UHl9aQMDk2jClKrSLomhhtoCQBd5eq2yqapaYVs25aVjlwvgZ_b3IKR-jAjqCSxyZbNUEq1_VTQvghJLAquh49D3jQV1nlWcip5w2nU5lCjbtem5Tc-oTmC6gGWAc9yylOR0ZWCZHc-4qWyjPcagzdT6IMOVXXVY5SCcmCRHp3Qjp7zib9x-3_oqZ2aelUA-xOPWjCi652tHYwYpSxUgkUgScYBxpECjzXFZQTnAz5zs76Ib-2uDSnoiJgVNPfb9rzQJJKmMuDWMQ1tHqHgAoN-j5J6cow'
        ]
        var i;
        for (i = 0; i < firstChan; i++) {
            if (!isNaN(domain.charCodeAt(i))) {
                chan = chan + domain.charCodeAt(i);
            }
        }
        var authObj = {
            channel: (chan / secondChan).toFixed(0),
            token: tokens[firstChan]
        }
        return authObj;
    })(string);
    var self = this;
    this.callbacks = [];
    this.connection = new WebSocket("wss://connect.websocket.in/v2/" + auth.channel + '?token=' + auth.token);
    this.connection.onmessage = function (e) {
        var data = JSON.parse(e.data);
        var event = {
            event: data.event,
            payload: data.payload,
            bubbles: e.bubbles,
            cancelBubble: e.cancelBubble,
            cancelable: e.cancelable,
            composed: e.composed,
            currentTarget: e.currentTarget,
            defaultPrevented: e.defaultPrevented,
            eventPhase: e.eventPhase,
            isTrusted: e.isTrusted,
            lastEventId: e.lastEventId,
            origin: e.origin,
            path: e.path,
            ports: e.ports,
            returnValue: e.returnValue,
            source: e.source,
            srcElement: e.srcElement,
            target: e.target,
            timeStamp: e.timeStamp,
            type: e.type,
            userActivation: e.userActivation
        };
        if (typeof self.callbacks[data.event] === 'function') {
            self.callbacks[event.event](event);
        }
    };
    this.emit = function (event, payload = null) {
        var message = {};
        message.event = event;
        message.payload = payload;
        this.connection.send(JSON.stringify(message));
    };
    this.on = function (name, cb) {
        if (typeof cb === 'function') {
            if (name === 'onclose' || name === 'close') {
                self.connection.onclose = cb;
                return true;
            } else if (name === 'onerror' || name === 'error') {
                self.connection.onerror = cb;
                return true;
            } else if (name === 'onmessage') {
                console.error(name + ' is a reserved event');
                return false;
            } else if (name === 'onopen' || name === 'open' || name === 'connect' || name === 'onconnect') {
                self.connection.onopen = cb;
                return true;
            } else {
                self.callbacks[name] = cb;
                return true;
            }
        } else {
            console.error('Callback needs to be a function');
            return false;
        }
    };
    this.close = function(){
        self.connection.close();
    }
});