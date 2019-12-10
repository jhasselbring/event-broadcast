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
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE0MTk5ODA5OWJjZGNiYzNjY2UxODJiNWVhMmJkNzFiODg2ZDY2MDZjZmE2YzU1N2U1NDczMWIzZjY1MTJkYjc2MGU3YjhhMzYwOWI3NDJhIn0.eyJhdWQiOiI2IiwianRpIjoiYTQxOTk4MDk5YmNkY2JjM2NjZTE4MmI1ZWEyYmQ3MWI4ODZkNjYwNmNmYTZjNTU3ZTU0NzMxYjNmNjUxMmRiNzYwZTdiOGEzNjA5Yjc0MmEiLCJpYXQiOjE1NzU5OTEwNjksIm5iZiI6MTU3NTk5MTA2OSwiZXhwIjoxNjA3NjEzNDY5LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.c0E6TnqYMqXIf_hyX0dLUyg7dvv48wLqfF-MGTiqqViq-8wOv3epd4Wg5oNNWAOGNZX8R6JLKGOq4vmGq9sH75s2SVb65F_fTjILgQGZjaIpWCLZqgxsfYtjbcfvD_NWJw70RLKKfW8EmCNgsi-lH9JsUrj1kTd3Cr4sEc_cAB795Hh-jTdtSnaBKdBqlKuqG5LqA52PuaYQ7AIOaLXEWGd10DeXoINGKilaKb9DaS4W3CDlCiYtB0OobltHLlGTrx5bEcfdqKY53cWMV9ye0BS2aqIx39KkZxCHVu7iwhiFlx-K7oZnIty1iwNxedaPhyZtNTkznM6RjMHRtwnh8Os1dld3B2m4knGYRsVccKhZoJJ0qUz-ePrMwM7aVKnviNqRuuCur0UtxGKDWc5Bexp1GWliSg291DrTXk9suQKsIkerB_bwLMP0tzUBT6IUryC4O8-NTEy4P31Pgep2lm5o2qB276F0CQGjvLY1mClqPTz0-6ksT5Q19B7NfZEvVUIilY4SOluBDfq_Bx_i4mJcWZA1eWvDkcBZ1SHF5kQwxUg2ZSNx9X-buExK4gUKzh-CmlqM_5779A7kcoXW8oau1dMKsKQzyn2gc-dKJDtabKazgrB2urMr30toN033gHzLV-e9hDK-0HiF4HlRHj0ZaRC_1aKHdfi7bdH4Owc',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRhNjk3NjQ0NWMzOGZhOGRkM2UyY2ZiOGE0MzViYjY2NjdhMmZhNGM0MjhhNTlmZjVkYzFiZjk1MjdhMWQyZTZmODQ1YzM0NDVkN2EyNDVlIn0.eyJhdWQiOiI2IiwianRpIjoiNGE2OTc2NDQ1YzM4ZmE4ZGQzZTJjZmI4YTQzNWJiNjY2N2EyZmE0YzQyOGE1OWZmNWRjMWJmOTUyN2ExZDJlNmY4NDVjMzQ0NWQ3YTI0NWUiLCJpYXQiOjE1NzU5OTA5MDUsIm5iZiI6MTU3NTk5MDkwNSwiZXhwIjoxNjA3NjEzMzA1LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.IXl2Mn6Bz8yqMbT5EjOlkD7e6RUMWH_pRcM1HqNc49WsK6uWL5ndryHIjl3Ya4_wLrlTyaFzKifTaIbeFnV1okUjjWfDfc85wAPDgggiA9RLzOcUgu92vqstOYRY5B5_CmRyOl4d3lHfJfoEjmW9ohCWQu5rFFcyKbbajxbtBDTlr7arwwO5mBwCX7EG30PZVcIzhDts1hU_todtoaevQwlifgsLPtU7VnY_ycEc-TSAjk6QzBVC1sYr7JNGFqDaCZPDN2Bhs5ANhprdbBdHJN58S3277i9pBbXv7nTwydnS0jSTfCL8zwf1gI-kgKsmm4JUKOnIsvr1YWg3aTI-rPgSVzSDu1zFYNoYDYy6Wm-0GocH1cHkq_9cKNaciY0ZDBh1UWCgyEeXSMkEEUGcRMuqzR3tMvIn0qJGzzB62w-dUe6SdpMpr6v9J_-QUcM6ov3p1qRHKRbbTuD4FvhsfoDbozCvW9leL9UuaciSUIiZCeLPeOQlvzcOurfMzp74l89mcZfWfND-Ily-Zpxi3jrHjJWeFGlMHK08bkm8-PuCxjQqTUCHNcQ_OR7qUdBtYLbZXfn92_Ti9vvRpKjV5ayuwvCSiJnTRsNwivF91MheE0CecN0ILHvzc6KOvy1zzzMi8PxRbutkWc4O_npXqV3-OhCpxKboMgwpEuKCoQY',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2ODVmYmNiNGJkZTllNTVhOGY2ZGYzM2M0NmFkNjhmNTg0ZmE1ODUwYmRkZjFhOWIyYTYzNDM5ZWVhNTllNWQ1OTc2MjZhMTdjNDgxNmYwIn0.eyJhdWQiOiI2IiwianRpIjoiNDY4NWZiY2I0YmRlOWU1NWE4ZjZkZjMzYzQ2YWQ2OGY1ODRmYTU4NTBiZGRmMWE5YjJhNjM0MzllZWE1OWU1ZDU5NzYyNmExN2M0ODE2ZjAiLCJpYXQiOjE1NzU5OTA5NDIsIm5iZiI6MTU3NTk5MDk0MiwiZXhwIjoxNjA3NjEzMzQyLCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.Rr6zxEYvCf9EDBuVILgGsDnKw05rb_kmECfj9V8ZanBT5t5fbfpBKA5YhWbbKh-KdIPXLZEa1V5O6LXR_kXI4aMa1TGuCmCcZUSN7ukHOCQ-wrj6RRD0lcRsobhegY5T2vGbX0NloGtpsbyxlCQNfhI1udR-jqozLhXMklPWsazeOYmYursFSXrloHx1KI92c3EQvIImECPzgdh1XPZnUhtCWtVPTPvXHn7_viXPK2PSbag7cUnTuKVDgTN2n93bHSeJhkO5wCNTkTWamP5fSWn-TgHNQ_EylsMrdgUUNpsPRTjq_Yk9YiP6Jj09rQRq7dQ1R8_XzHGfck_KX_ycbPlhpAgcQxdG3N1itRwndL7qr_zM4njnNSiPLx_whCjWSMKww6vLt_bR12eOaCQ-6mnTRF9mmM99KbVmVgfHVducEpuz7YAeHukdfoeS3ee9bJltjxr1pfd9c1ZFsb8LamNYf0pfzg6evRBSusnQ-_Xe0FKO3rvoy5H7C_o2ts9Gxyi6BI0zxqkqX5FiTAjAAYga5GjiIgjd7zorkiaojosw7e1xTfwU9OAaPEmSjEQ-tu60xmfPRDOOdPP8jXP7MZsRGmYoFmYpSBP2gO8vwhxiXM_dJTgijnneeAX7e8SwZ7RhpdW3CE9rJ8AbNgIeQzhuXtY1hB_3TSmppQ_tUdk',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlMTA5ZmUzYjA2NTcxZmVjNzAyNTdmOGQzM2I4OGIzYjE3NDc0MDRhM2RkNTQ3ZmE5ZjRkMDc4OThiY2RmMDFiYjZjNDY0NGZjMDNkZDY1In0.eyJhdWQiOiI2IiwianRpIjoiZWUxMDlmZTNiMDY1NzFmZWM3MDI1N2Y4ZDMzYjg4YjNiMTc0NzQwNGEzZGQ1NDdmYTlmNGQwNzg5OGJjZGYwMWJiNmM0NjQ0ZmMwM2RkNjUiLCJpYXQiOjE1NzU5OTA5NTksIm5iZiI6MTU3NTk5MDk1OSwiZXhwIjoxNjA3NjEzMzU5LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.U1euFgG5mSnpPtLr2kURyfdAlFOV-YWuZH_nP9FD3MaJ_41QD8Ub8xv0qVUx3Gi1NypTT2V9JlqF6B4j2rQAg1LPn312_qgWuVHdt3GufASRGX-IUwTD149POQDJA7N85lFtl6UIgWJv6AuQcuDCTUGHDwwxPKiAwBFNgXQ-8broysdJAEF-dUWPPmZ9ai9_eCxlpGh_a5MgvJJZ8tR9LdpuV8ha-2iSZK_ZD16CPHbighJ65Hb_jFzFaoNOteanlJUfmz77wJWZKLVzi79p4HMmADe4MutNJqMc9lCWl_6Gb05yT4jdtjG1XhHaG7E-Rrjp4mCcD5Be0DNp6HKX9oEyMJwZRlzbzNYAD7dDtSMlFG9uCUMF8evrFL8rDaBnrwkYhkDEQo8eujb5JpYlkNdYMm1WcKV4MWda_Rb9sPMUU0sPDEc82lMFrLE4O5z4cjyxTblL1NlXytXktu4cEohfjlNxVDZEah9kaaTCc-NOEZGfb6O3TtT1DBCE9eXt3fN2FA_BNRk2FCMYaewY6NtQiZJ40Ih6pxu3Rh6LFGFrZrTNlT69YJx_nWVTOoztftkgPRSQxkLxwzXzU9iuTzM97shB3PjfBGxQ_a2BFmMmsl11XayueavwlimQC1zfnGC3iBegU7FF5gaEXxh3-FIUN33KgYfR4bKr0gYUzgY',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMzE4ZGRhM2Y4YmIzMzNkNjgzYWVhY2FhMzE3MTBkYzllYjJkNmVkMjFiY2E3NTMxYTIxNmIxMmEzNWU3YWEyODUxN2Q1ZGI3NjdiZTU3In0.eyJhdWQiOiI2IiwianRpIjoiMzMzMThkZGEzZjhiYjMzM2Q2ODNhZWFjYWEzMTcxMGRjOWViMmQ2ZWQyMWJjYTc1MzFhMjE2YjEyYTM1ZTdhYTI4NTE3ZDVkYjc2N2JlNTciLCJpYXQiOjE1NzU5OTA5ODAsIm5iZiI6MTU3NTk5MDk4MCwiZXhwIjoxNjA3NjEzMzgwLCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.CfrHF2L_ig0FcsZGYPHij-TcYJjtGae204crpzjcvws6lP-7M1qigsLHWh1fS5jWyuDuOcqZ1KtZoeRz7UpUeXNWp67GBDEfRqd8wzlBFPpMfqP9JI_-2i0Vg-cxP_W3826atGM2TQvsiOySxRQtEQF18n7dPbhX-ajc7V6aj6VYQgiZXUEitS46MjxS480hAcsFRM5d2aBS0YM7sPRLxBag5qgIHAYLu4Y5N9_MD_tam4thYKSswyLwXB3yEEiBAlKpIGQ1KbE1Yvz-zV7b-tL8EmvQdKSHobGAGK5-CH0R3C7Q16T7btxcm9lsAPNz76iY5Sc_oczP36uzeaoTjidO20e2XASlqs5iN4s2iTyXC7S16e0mR9f-kAOGfrxMNum_U5-swaRzfW3Xj9U_m6q7bMRO5Zl2jOIjTpJ5bWm-AMGbAkq-EaoisvAxXDG6PzNnOh9ZICHJtkWSRPBWsNZi4PR0CtYrRhlnxIFfBIuNXewrKJxsMN3-4vpmZWhjCoXqqyas7BOSYZuAnzjsPXG5h9LUT9sugM8p6gsQoN6NBVuxj_vR0FJa4JYY2rfAucr67A5bxFvA8HSwKN_XmKIeSq0OhW1dXKyi_LgfzpmNVOH6lOfbJylcnySX0LxAcGLPycFShUiBUlgKnZCpaFNPzbE4eoig3Z4QS0uaDp4',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcyYTdlMzQyOTIyMDVkOTNlZDllYTU4MDExMDE3NTI1YmQwOWFhZDJiOTA1ZGY2OWNkNDYyOGYzMmYzNWUyNjk4YjA0MWI0ZGQ3OWM4Y2E4In0.eyJhdWQiOiI2IiwianRpIjoiNzJhN2UzNDI5MjIwNWQ5M2VkOWVhNTgwMTEwMTc1MjViZDA5YWFkMmI5MDVkZjY5Y2Q0NjI4ZjMyZjM1ZTI2OThiMDQxYjRkZDc5YzhjYTgiLCJpYXQiOjE1NzU5OTA5OTAsIm5iZiI6MTU3NTk5MDk5MCwiZXhwIjoxNjA3NjEzMzkwLCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.p9bCRhIe3YM7ZHFLaIO0rZnPR-bc0oU_wH01di5oE_MLjxm9oxogrrfEHo0frIX-LbT-mCfv8OjguqKxS2vYiMF5yluTBSl8JEuSERoTDjSq5qlMkUndo1vsbIM2c12ZRZ1MgsulZ5Vf3nNapxMMDzhPiq0ALA5y5xBVG3W09kERRJviErlRkUFUBlZKCIxtZZAQzXsSk6yeLTmizFPJaMWeSHRSHUHqFfgfZc4XI0tVnZbl6YCe0UV3nsbbnHLUHtxwNbOonuqigfn45dm4KP9dI4OxeBDVWjIlLrnmxIpIoSiJ1Nrtbu8j35M1EGqzRl7ik1nIcSQiOiDXS-H-wnPkNuXJdCMqogjR_KttwB2HoihRyy-dlbpbemljXf65I5CotwltiShCdNrSzZS0jRepLmtui2WyMDNN0kQkxm_LM0sXiR4Uf16Llpla9budgrgZLdezWrI-QF13y5VIo7vVFp5rAmKHOr3ZfKVxeZ20DzRKW0tg2GPeE85fw9q0AOGVCvdz2EKoLOkKV5UjbviH11KHEN-g-qYDfZPbfu-2PN20XRZRZe7sk1otKHnWQLWlXUv4pf571tWFzBYHQR6JhGEY_Z1G9M6iDiRow6W0d8mnrAOooLyMM2VZ_fGFdhzthv8thNt_MBM68FAnE3HaWbkuftBOoi02F9_81Vk',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM1M2Y1M2JhZGI0YTI1MWMyZGQzNjE1OGI2MGQ3OWI0MWUzN2NlMWJmMTAyZDBlOGMxZjk0Mzk0NjMxNDg4ZTZkYzMyMTNlMzI4OTYyMzljIn0.eyJhdWQiOiI2IiwianRpIjoiMzUzZjUzYmFkYjRhMjUxYzJkZDM2MTU4YjYwZDc5YjQxZTM3Y2UxYmYxMDJkMGU4YzFmOTQzOTQ2MzE0ODhlNmRjMzIxM2UzMjg5NjIzOWMiLCJpYXQiOjE1NzU5OTEwMTAsIm5iZiI6MTU3NTk5MTAxMCwiZXhwIjoxNjA3NjEzNDEwLCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.jJ520N2DmRrQGPQHhxKUkAlHxfH7S3T-fPEQLTFkXaOZEladYOZ7xyzbDZ_zdXxps8iV8XbIARZ2OMh4Rfaa9WeYvT9AL3_Ls_8_Jjo8UFsOhpZ8Jp7Au-fnEy2QCI1s08DWQA8PrHGRt9iyzqWpgQDrtTLBut9mG9xdiWL_se449TaqH8ddc23XXyT74EbmwWitbkf-IWwbXa6lilOlNS3R7P5Zmtv0LqbN4mN4ZQS85L9JYUaiaxqbikVYvIf1WIFCPORwzRMQVInL_-lZyOz6FL7rbeJLuYGEIFwkG1n4xJrSxQQCnys2oluMbP5z7im5go_9QGtBBmPn-GlLns-pQvU9BdJgtRS2bklSBQmoy6urVT398Ze3iPWVZJ9np8Mo-gVieV4_CtE3Pufb01oYxq-4DKXok514OfvrSa0FpkNJMtPxfcg6UGh7jF59UyuyvgQvRyi4f3GVqEAN0ivpMc0Xgwa-ATt2u6EuUWYkohdLGmbWngpBHm6lwoTMOVb6kqaEY7TWGxkcz88NC_ilLaZl91vPdLVrJlxEvQNQuJOQLnVFNkE816nF3XABlPF-TRcmm-gnp6vB_zKQQTekeRhYz877YLhpfO3e2PgNEuGIQ8PBxVCApyj_HZEBZ6N2ftIUuiG0WJkjVQ4Geh5RCL2vNmIEQpGW_97pxdQ',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhY2I1MDc2MTNlYmFiMTgzOWJiYjkzNzUyYzU0NTU5N2RlYjdjNDc4NGZmMTBiMGFlMTRlYzM2OTRkOWM4MTA3NTg0NmFlNWFlOWY5YjViIn0.eyJhdWQiOiI2IiwianRpIjoiYmFjYjUwNzYxM2ViYWIxODM5YmJiOTM3NTJjNTQ1NTk3ZGViN2M0Nzg0ZmYxMGIwYWUxNGVjMzY5NGQ5YzgxMDc1ODQ2YWU1YWU5ZjliNWIiLCJpYXQiOjE1NzU5OTEwMjUsIm5iZiI6MTU3NTk5MTAyNSwiZXhwIjoxNjA3NjEzNDI1LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.KB4bXd81gJ7OuwVt9MTdD1OUFCqZ6-fkKnZ2talywMCIBB2yIl0bCYZFNIVQr-jTHKWZH1VDUXSw3Gy1ZCc0mKgJJA-TB4J8tABCExSHIeOWfPkRBFe7U5hTCjWUJJvjwqJrgL7EZ-RzCgonOLmh2Timqv1a6-GIHixbt2wJR0yz00u28sJ2jpiOsc6-eGbQjnUbtIILU4LLS3cdRWn4OcAdJ6yUtwbGIiC9kD9CK0U-2FwnateyI9muMpQSL3WbtpXnStoinaG3XjOu5uCK1orP-zTnBeQjJP_3M6XVg97GK07WHykzleXVFvmr2Ovq6n1KBdJYGX9jR9A7BMn-o0QGPSAC_HnjjAC4x059w_SKrO1_hx_uTG2612gJeALX6dOv9nzomiAwPmidr4Q6i0aHwuRmOkStAmR_yRgUYlBiB9SAkdO6nzO5YyeKsXKxJhXhcVAbFOP5AN2714Vy7y2OcgULxTg0QLW7MeETlXJadOziKdkxRD_9BIogyYnmqL9K8Kmq1ik_ayRSImNvONG9N4o7kYMoSavwFpo7hC1Gc1D0rHIe-g-wrJV1PnRr9LpSX0ql5gdJWGQZhQ-qZXCRN-TtoWUfKT0wmJvaqLdSbZh5Gs6mkPGxIjDXoLq-R8OAGY1aeZe15a9Dz3JRqqkq_79x1hhLE1pP1bvlsbg',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEzMzYxNTMxZjQxMWRkMDgzNDE5ODE4YmRhMGZhZDkzMGQ5MTc4OTkyZDU3YTE1MzU3ZjE4NTc3ODk1YjA5MDdlMzFkYzM4NmIyNjhiNTZmIn0.eyJhdWQiOiI2IiwianRpIjoiYTMzNjE1MzFmNDExZGQwODM0MTk4MThiZGEwZmFkOTMwZDkxNzg5OTJkNTdhMTUzNTdmMTg1Nzc4OTViMDkwN2UzMWRjMzg2YjI2OGI1NmYiLCJpYXQiOjE1NzU5OTEwMzYsIm5iZiI6MTU3NTk5MTAzNiwiZXhwIjoxNjA3NjEzNDM2LCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.OzcA8WfxmqKf48DWJhtxoFHuWafM3MbJ7-Wm0FIAO3h0-jGY2akOV1ouhysYmP2Y4JPctFPSeWI9JYWKTYf_-dz5qbV2QoCiLXR2n4M7HNxEx--UBEqj84D3OsW67PmoPK3ddBSzvEODByMqt-mplUxJ2TA3fc3iDZAV13-T-JM0MDQKeJmmwr68tEzW0dTaQuraOP7W1nE_XkkTbHqXiSszjfWSHDogZyle6wKtzDbQGSUQijPaEfgcnfS330C1LeF7SdYPLcC5ldhCFqOew0EpZdn_JT0BWB3b_9Txm2zxMyaDL3PoqH1tsW2N4iai8C6GDd0madH3OlM7p9zZ7bw6pLIJPQFyQZROpIn6Tbwk1xM-Dkyk004QuIokWuUl_A4Tg8GFl-9_VamkWbnwz4k00wDO38-5c9FlMZ95Wmobx_gUSfxtJG1UXFxFCanCyeHHCx-c8ra5mqqyp22gWD6vw7Z9wHHyo7gY4-NXDP6gGPIFSzJzTAehPXnlEG7mdmB6kUjgvrigpl_ujvqhVE9N3wz8sDknxxCQPf3NwAZaeVSAqtqedbJhPymAJqJL55jbvap_SvAmZNSoLBd2MJ0A8tDlOfOanWup4QoKySfd-idC45end2FmaZae9KsIERoqlhAA5YDmykNBe4J9wKJpP2MxvwswvRvEW0bx0Zc',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk0OTU3YWY5MWJjZTYxODlhNmZlNTFhZDE0YWJmNDZjNjRkZjUxNWY5NDExYzM0YmNlOTNkMWUzNDhmYzBhYjUwODIyZTczNjBiZTc5NWNhIn0.eyJhdWQiOiI2IiwianRpIjoiOTQ5NTdhZjkxYmNlNjE4OWE2ZmU1MWFkMTRhYmY0NmM2NGRmNTE1Zjk0MTFjMzRiY2U5M2QxZTM0OGZjMGFiNTA4MjJlNzM2MGJlNzk1Y2EiLCJpYXQiOjE1NzU5OTEwNTEsIm5iZiI6MTU3NTk5MTA1MSwiZXhwIjoxNjA3NjEzNDUxLCJzdWIiOiIxNDciLCJzY29wZXMiOltdfQ.nOnssPJV5ouzZ1A_EFwkiu2bjVSiY9XXyykOyyVr9udJVy-41jpp-deyw9_8Wt0B5lZGK2RVMo1q9242SpyFxqBqBjIPP5yqQ3JW8-X1pITpnLl9sdiIDid6A_bE_A1_ZGVUMM0PsaP5yDq76t8sBhJ9-lvbVEavsJ0h0yueauy_G5wZbbEW1Z49ntRpcV4ClJ4VwVAusBKYW1-zs3UeNREJs6pUY78gV0jRxpylhX_LpbXoM4GWI7AmT0fRsZRfCcaolMHwh95RvHvEyNYJIVBypMwBY4-VSe6K9HJG8ae3NeZBJ3gBwoCYO6NUDddvT8X8KKQKqQEsx46jTWRDIfZxCxIwi5vAho6qPb8o6meJUlPIiXAuBj6_y019f2FAsVoj5O9s6wYO_39DEHySeZSwES0FEI7AT-BxPGjbp2WiXmV3ZPnwHpQtk3JGBo3diqW_prH65e6N1J0NBqNExdforYhPXcLxNp13d-RaBJiA-YK7UgqqZtDxRBkbXmIZbdN0W_Cv8TWNsdkIX4fzeZsnOXa9xdIxcNP4jnM-E9k5HdIVh1qLTTtlNJHckn481_OsB_xZmQofSAp3FqFOQqIXY99Yxb-gFZzxTJt2D3cEkD7TKUlaFQVFvSmHCi7xhABiA5aIbV5PR5LMgCFV6rDot081KbkOIzZv7EKActg'
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
});