const fs = require('fs');

const deviceInfo = async () => {
    fetch("https://console.huaweicloud.com/smb/rest/ecs/v1/c90a6c2630774fccb03ff32a8aa947f2/cloudservers/detail?server_id=38485551-188f-4a2b-b024-53f6232af1eb", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "agencyid": "074126f8689442d4b01b0a863d5598c8",
            "cache-control": "no-cache",
            "cf2-cftk": "",
            "cftk": "E7O4-UAEW-5KVQ-6P25-6NTM-4ICB-I0RP-NFGB",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "projectname": "ap-southeast-3",
            "region": "ap-southeast-3",
            "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Microsoft Edge\";v=\"132\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "vk=5f1c7ee7-fb08-42ce-9a27-ac6590a35fdb; deviceid=wKPG8mNz; _frid=6c2d080b1eba4eb18ee81707d44ecc2f; uba_vk=5f1c7ee7-fb08-42ce-9a27-ac6590a35fdb; cbc-sid=204937a036414671afab227504fcb40728e4061ad2a1575511022b2fa10fa1a9056880f2fc563792373c; _ga=GA1.2.1899967477.1736498538; Hm_lvt_e7a90fbb918d40aec64d1170a5ca608f=1736495348,1736496129,1736498670; flowCard4b17e9c2707d4be281df06de745ce644=4b17e9c2707d4be281df06de745ce644; flowCard5310d0220f034deca0a3c7a1e834d4eb=5310d0220f034deca0a3c7a1e834d4eb; _w3Fid=074126f8689442d4b01b0a863d5598c8; ua=5310d0220f034deca0a3c7a1e834d4eb; flowcardB5310d0220f034deca0a3c7a1e834d4ebsmb=5310d0220f034deca0a3c7a1e834d4eb; SessionID=6bc9c81e-a94e-4e1b-841b-edc293a38671; ad_sc=; ad_mdm=; ad_cmp=; ad_ctt=; ad_tm=; ad_adp=; user_tag=074126f8689442d4b01b0a863d5598c8; domain_tag=5310d0220f034deca0a3c7a1e834d4eb; popup_max_time=60; masked_phone=188****8723; masked_user=h*********acn7mk-2t; masked_domain=h*********acn7mk-2t; usite=cn; x-framework-ob=\"\"; uba_countrycode=IN; agreed-cookiepolicy=1; _gid=GA1.2.596969772.1737789378; HWWAFSESTIME=1737789396854; HWWAFSESID=7021d731a91075d085; ttf=1575688375; ttt=2136300817; SID=Set2; agencyID=074126f8689442d4b01b0a863d5598c8; third-party-access=; J_SESSION_REGION=cn-south-1; browserCheckResult=A; browserCheckResult=A; _fr_ssid=00ed9d311cb344e8a0fc8d6e15f154d5; locale=zh-cn; HWS_INTL_ID=p53lM03wXbzCul6cvYdP5w.._-_1737800463_-_6QgPA5u29SaMoedp3AAXtjob9nM.; J_SESSION_ID=7b8f9e7daeb0d35641edf3497f2764abff22039bfcaa6351; cftk=E7O4-UAEW-5KVQ-6P25-6NTM-4ICB-I0RP-NFGB; hid_c-g9vvacn7mk-2t_hid_c-g9vvacn7mk-2t_cfProjectName=cn-north-4; HWS_ID=9XTrQElqqpTyRd3XFmi7tw.._-_1737800516_-_64iAOcjPZEq7r5TVrZGBlgYsScM.; csrf=a6fb8c02-9cdf-4ab2-91fa-4a0a24bd4c4d; cf=www.bing.com; hothistory=JXsic2VhcmNoIjpbImFwaSJdfSU; search_info=%7B%22keyword%22%3A%22JWFwaSU%22%7D; cfLatestRecordTimestamp=1737798144934",
            "Referer": "https://console.huaweicloud.com/smb/?agencyId=074126f8689442d4b01b0a863d5598c8&region=ap-southeast-3&locale=zh-cn",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(async res => {
        console.log(res)
        const data = await res.text()
        console.log(data)
        return data
    })
}
const remainInfo = async () => {
    try {
        await fetch("https://console.huaweicloud.com/smb/rest/bss/v1/cloudservices/countdown", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "agencyid": "074126f8689442d4b01b0a863d5598c8",
                "cache-control": "no-cache",
                "cf2-cftk": "",
                "cftk": "E7O4-UAEW-5KVQ-6P25-6NTM-4ICB-I0RP-NFGB",
                "content-type": "application/json",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "projectname": "ap-southeast-3",
                "region": "ap-southeast-3",
                "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Microsoft Edge\";v=\"132\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "vk=5f1c7ee7-fb08-42ce-9a27-ac6590a35fdb; deviceid=wKPG8mNz; _frid=6c2d080b1eba4eb18ee81707d44ecc2f; uba_vk=5f1c7ee7-fb08-42ce-9a27-ac6590a35fdb; cbc-sid=204937a036414671afab227504fcb40728e4061ad2a1575511022b2fa10fa1a9056880f2fc563792373c; _ga=GA1.2.1899967477.1736498538; Hm_lvt_e7a90fbb918d40aec64d1170a5ca608f=1736495348,1736496129,1736498670; flowCard4b17e9c2707d4be281df06de745ce644=4b17e9c2707d4be281df06de745ce644; flowCard5310d0220f034deca0a3c7a1e834d4eb=5310d0220f034deca0a3c7a1e834d4eb; _w3Fid=074126f8689442d4b01b0a863d5598c8; ua=5310d0220f034deca0a3c7a1e834d4eb; flowcardB5310d0220f034deca0a3c7a1e834d4ebsmb=5310d0220f034deca0a3c7a1e834d4eb; SessionID=6bc9c81e-a94e-4e1b-841b-edc293a38671; ad_sc=; ad_mdm=; ad_cmp=; ad_ctt=; ad_tm=; ad_adp=; user_tag=074126f8689442d4b01b0a863d5598c8; domain_tag=5310d0220f034deca0a3c7a1e834d4eb; popup_max_time=60; masked_phone=188****8723; masked_user=h*********acn7mk-2t; masked_domain=h*********acn7mk-2t; usite=cn; x-framework-ob=\"\"; uba_countrycode=IN; agreed-cookiepolicy=1; _gid=GA1.2.596969772.1737789378; HWWAFSESTIME=1737789396854; HWWAFSESID=7021d731a91075d085; ttf=1575688375; ttt=2136300817; SID=Set2; agencyID=074126f8689442d4b01b0a863d5598c8; third-party-access=; J_SESSION_REGION=cn-south-1; browserCheckResult=A; browserCheckResult=A; _fr_ssid=00ed9d311cb344e8a0fc8d6e15f154d5; locale=zh-cn; HWS_INTL_ID=p53lM03wXbzCul6cvYdP5w.._-_1737800463_-_6QgPA5u29SaMoedp3AAXtjob9nM.; J_SESSION_ID=7b8f9e7daeb0d35641edf3497f2764abff22039bfcaa6351; cftk=E7O4-UAEW-5KVQ-6P25-6NTM-4ICB-I0RP-NFGB; hid_c-g9vvacn7mk-2t_hid_c-g9vvacn7mk-2t_cfProjectName=cn-north-4; HWS_ID=9XTrQElqqpTyRd3XFmi7tw.._-_1737800516_-_64iAOcjPZEq7r5TVrZGBlgYsScM.; csrf=a6fb8c02-9cdf-4ab2-91fa-4a0a24bd4c4d; cf=www.bing.com; hothistory=JXsic2VhcmNoIjpbImFwaSJdfSU; search_info=%7B%22keyword%22%3A%22JWFwaSU%22%7D; cfLatestRecordTimestamp=1737798144934",
                "Referer": "https://console.huaweicloud.com/smb/?agencyId=074126f8689442d4b01b0a863d5598c8&region=ap-southeast-3&locale=zh-cn",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "{\"tenantId\":\"c90a6c2630774fccb03ff32a8aa947f2\",\"regionId\":\"ap-southeast-3\",\"cloudServiceType\":\"hws.service.type.hcss\",\"resourceType\":\"hws.resource.type.hecsfusion\",\"resourceIds\":[\"6741702306f7cb39d76de54a\"]}",
            "method": "POST"
        }).then(async res => {

            const data = await res.text()
            console.log(res)
            return data
        })
    }
    catch (err) {
    }
}
// const a = deviceInfo()

// fs.writeFileSync('data.json', a)
remainInfo()