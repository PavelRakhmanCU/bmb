import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import GalleryItem from "../components/GalleryItem";

const galleryData = [
  {
    "imageURL": "https://uc5a4ca089bd7f51a69597f7ddb3.previews.dropboxusercontent.com/p/thumb/AC8Z_LQ_YVe0A6KvuuHjM1FZYny28owBDPRQER6W6W5YucBRd2S_63L-D0mCp8V1ow63cD0CKko1BTrEDQo5u8xpEVS-vl7id-vGpEHFttW52AiSGYoMm_ebTbla2bZYsHOn2D3bGiK_8P-8w_aTv1lV58euXNJnKDPh3LXWOjExhrhMwm2duOPV3BCLsMjCaFgjKP2N9d2cDon_CDEadPgYFD4AqMOGnVO2epVfrQx6I36KiAo0t8JUHxKELGJiMdjVr0dgwxoz7FoiiUbeLuMNh2WQWsHg83neStamQctmeRojxP-WHjd2pPDXWSxOO8BQQn2PM9kxs9nCVPkmiCpjl8BnkI4bV5aByJqZb0dQwQ/p.jpeg",
    "title": "Transformed Space",
    "description": "Expertly renovated with precision and style"
  },
  {
    "imageURL": "https://ucab32963b3dce7380614a9b7649.previews.dropboxusercontent.com/p/thumb/AC-nJqSid_M1b22tdxj5Bgm3WXcbLhQAKf71EPPgcO_w-NEyPoeRwli-aasMc7l3tioNCrr7EX-2HqwlBbwuGFB6B3J0wwe7G_AgasGv3LOmhvbyQMYTuf0oRLMwPDswqLdwOD2Ug-nDmGt2H0VNCoR41RIxkZ2LjsabsDb9UCRwYgOcoFRJDUpBpEGr-FytN1pz_gd31G6CVAxAH5AI-QhWy7SKERYyp8VNF8I5QlWi9-ZNQMax4J4e8nM3MVBUeVHTb_o68Ht134_p3808WS-23Twe6a8ryOJnyiGOHz-lP2QTt619IUVa8Y2e_EOfdKOu-8RyfJg9xUM2k_7HxleFBt9AkuKbS4eACZY0eorMQahicZwxsmlwx0uoOEN579E78pJgfBf3EP-UgkPCM-RDhKZmegD1g7G9mn4RcJkSwA/p.jpeg",
    "title": "Thoughtful Update",
    "description": "A renovation focused on durability, comfort, and lasting appeal."
  },
  {
    "imageURL": "https://ucc42e7fc77d5ea2ae5ea7bf9f03.previews.dropboxusercontent.com/p/thumb/AC-hSXFKMKiuN-NB7CqTwmAqV0hx9iN6bDAudV2vG1cXS5Aidg99sstNUCEEpPwoLysoKKtj72y8OVEyp7KStnZzyJJYhO3d96hG7AIvZa3trX3ygb08zc4mXAkMbf5fjUMxoOjgiHXpKyGsoR88OFsjOkgBj9jPBHlP198EPYn6QPz8vgbQL1ESiA-guGK_XjEHbzRk-9HFSrxPDkrlquXexB6Ilr1SiyTE_mZ-_YskBgYdtIJ5hx_dyjD0iv2OxJ59jTMe6bUmt9iU1sSnCciLq1KDbzqJ4ylxFR8h3tbqw3czIVaPNClr9Q9cwbVks2dW5vbI2QVS4qjdI2pAp2aopXQmwjRwpFQRZdHZe-1KbQ/p.jpeg",
    "title": "Elevated Living",
    "description": "Renovation brings new life to spaces"
  },
  {
    "imageURL": "https://uc8157eafb826a7ba35c3da341e0.previews.dropboxusercontent.com/p/thumb/AC8jS1KB_0fDyt0sknGc46I2G0b_3n5jR4AmbpeNcpeXY3nZTJx3T0Uy9-wdsQEhcTTmvrAu_Nqv9vx9VOEmLkryv7p_HDt1ivFhlRlULE5QNFlVDqNRIGQ5afzYDNPmVKI89ouz58vn0RJFQkUHKI_Ywaw68qZuPicM1alb7grpv5NVi5berY3sBQtdt1EfvMG9C3edt9V99kKdup1lOIxR1gTtLjnF8IaAQKaO9jNNouoUCROy8n_TRQuRfZGuK00z3Uuwa-H76U4XVyF8Rb7He30VlW2jq2LcTyBS1c2OfhozzaOrP2wbUJ79I_Y_rZej2b8WlP3tQDMwdcZgZ2oIHKbt-c4dmR_xYTlLO8-f8Q/p.jpeg",
    "title": "Balanced Refresh",
    "description": "The project was guided by a balance of form, function, and fit."
  },
  {
    "imageURL": "https://uc08ecf4fa28ae5b166e9ec6b851.previews.dropboxusercontent.com/p/thumb/AC84rD1UEzcIZPWhPYvdtkUIQuQpQaaLDME5uz0xOUoeJLZvkbjhT0cFHuyybtcXGt5N-CZMV8mYh8xLVeL5pTBvRuJq8_Yej067bIvys1fJPom_LZk4tVlR541tYgksWeRlhw6UL-bqEzQsWOji2lWc-y3WVRfYcU44fXOcYo0AF0lLt0cRHmlFwd3SLdaf4MJQg2WSYX1k1FkthsxnsbPO0cpiwOYb-yVSMKNZRTk3WdGptulrvuJ0kq9iZs4MVwhdb-Cua0kQjt43vkFdlVcjOzWHDlos1-yiSqrgwLxTp52Cg58iumJm6k0omFIS8lu9wvRvn__8UNotVePTN_c6rNzvE9nPpWOKenYDlfk0Bw/p.jpeg",
    "title": "Space Reimagined",
    "description": "Innovative design meets expertise."
  },
  {
    "imageURL": "https://uc8ab8313e4d97d5a41dd955488d.previews.dropboxusercontent.com/p/thumb/AC9oIU-DSUK0ulOHjnEd8jae9UQTYOMPJIKuEAXiNbRfjcCU7ml0-1ePNgULkmftfZIaKVaSCzsvYzhl1kTgmSphTlmetNwisyTP7vL8trnRrtnlZb1b29BnGADJS6dLCxPhknZ45cwEmz27ShxEEp1zjP8LsIMTs49SCwZ0axBOpBsJQhPI63x1lxqgnKmYxyOIFKU6dsGvPFzr55KLd7FGORjsyIPKtgGzIHQLbEqgInakWoFgDuEpE5ftgJlj0QiRnjOX7HHSC-0a8i9AvNxVQiBMfATnA_wSXVoTETQ3ES-5wHj4IQBNXbekkF5thkRYzKJflLvB7B8EVhI7v02A57rHrjy382BRp83P52qkDA/p.jpeg",
    "title": "Modern Harmony",
    "description": "New elements were integrated with care for flow and cohesion."
  },
  {
    "imageURL": "https://ucb4b641c99df78247635d5cffb0.previews.dropboxusercontent.com/p/thumb/AC_nEgJk2cSGwhwLAhsBBjSOfxeiIquqnVdaB-pS7m1a83Sr5CeLeeLe1vFcOp3YKg01OAjJiFyNxI5MacApnJizKGb4hM9W5UM7don5CtshO6rzIlP-2H230UQy1BrA68vC7sSRydyTH5Qq0OGn3gyEae2QgQfPgSfRqOgqF1PSFDeoY0v_vPgeh8p-Jy497hJMoHgUH_KOuiGfzJPRs4Z-QHH4i9Ez8oVlRtu8QbAB0PxfaVe09B3ZnJ0LCI4kTd33axX2x_doqBuafLD2XixI1Uw20Ts1G3GYCmZalvoORfFn1UCxXoXmXSu863SHqZZRe7cySMsovud0ARVcsY0O-ZakeTm16Uq4Zk2U_1ScBQ/p.jpeg",
    "title": "Soft Revamp",
    "description": "Subtle upgrades that make everyday use feel more enjoyable."
  },
  {
    "imageURL": "https://uca920efe2ec94aff81a757b4ed0.previews.dropboxusercontent.com/p/thumb/AC9lix90gV13QTrgx9M_zAYDARddmWOzklfj8Gsl3t7qnNbf3dE0E-XeEsbUzLIyUwvnglmhWXEijSpFlYFz_5yRvJJkX8jnl0RwlzQh2DVxzQK04trbXLiZ566ZlBl8t-2ln9zIha5Pyin6KAPLbkzrcSM2GP7SW3wUPEWSS9BJYOESpyHyfhIWUFewyclV3PRZ_R4KG8Ip1bD6B2e2ev8ZDLv32aw5VedIwliAkIEKgEoXFoOb9NqqAZI3Lm-WMopNNTVfaIcIFNWPXwbcI1gfQgdCI_ZRFab3_zvoEcOe9nGFXvLbhWk-X_Urheu0ML1HbKj2g9_Je8MzZWjNk7FZ50ZRbx5kKxX7ResB6Y4HwA/p.jpeg",
    "title": "Crisp Renewal",
    "description": "Precision planning and tidy execution across every stage."
  },
  {
    "imageURL": "https://uc91e4ff28de3006640283ab767d.previews.dropboxusercontent.com/p/thumb/AC8q0iafFHR5fMrz8_1qRQ3PyKHSVirsns2EcMpJiYEoOoQV_cAILD7BvB-q-NylCNznwyb-IkLGmbVFzXENdEuurw3ww9gcOBNabGRXPjXDi_x9NOPdBLZx5vdi81Waudlj930AqhVfdA3UuKVuD30Eb6W3rSMPeaOrP5JwHAG8qzt7EROWbIOG-c3OpFTdgMog1bc9WdSJH5QBfR1cJRonNwaihIbMRh2m3tlxTLFWuPEazZOD8gzdn6ofsm7VKG6tlph_LLisaH6xae9eEYLFqzoFr-R_yKwHh6_wspHGAyXa1sMbU_cmOanw-Pq4xsFiqdt6poF3Afu9ymhl4L7bCeIYeJTKoAf8XqjIScFMlQ/p.jpeg",
    "title": "Layered Comfort",
    "description": "Texture, light, and proportion shaped the finished look."
  },
  {
    "imageURL": "https://uc848852c982d4442d5d057223e7.previews.dropboxusercontent.com/p/thumb/AC-5LzsovGyaSDwNZ89PGGC7Hfxh8gPgpTCSUEe-Ut9Nwv8gs12_OvWXMd5pD-unQdSzoWD-6oB6X8cRmRuMqgMzSX_lZQ6ub41BSYhxGH8zxzqMa96I0FmwCoPKEM0KgftTdErnGgbfCbPn58-ZFLLhnFBFqfhS6fp8_w6cYLsGAAH6IgdU1-iN4VMwE0D1-pBGTH6dwukR1g8LK4nQl29_TawluMZ6ReAIL_abWFpwbUZSxgzqOJ9pAPzQ0-h4DGcCliSkca8rrFR36dG4Ne5KrKZI87fedhClQCA4kk7RP-umscKZ_7T9lzOas_lR01TeKOfjkovdErlq2vQfrbxb7Qh6WczOOmNebObfB8Cr0w/p.jpeg",
    "title": "Refined Flow",
    "description": "Circulation and usability drove key decisions along the way."
  },
  {
    "imageURL": "https://uca550ebb9518be74484178b1c8e.previews.dropboxusercontent.com/p/thumb/AC_FA2NeP_gBPkifKnZ6mDPw_UxAE5gl8tZSnPD4Y5kqSirmmKcZd-1IC8sQfISQtDmflSqcliZAK-GuXljfcKGR1WVORu1nQv3EASFb-MSNZO3u-pD2blHZM7zKo5Ydd0Mw1rwieJjRN4ZH09pnrPFtdkR-6E02pE7-tdaCTHdJmyCdoijXyfqTf_5vrFcAASzB2a0n6PNU2J5YeZ2HBv38-VbSrY7rUqoK9JzhFS-CXAWkQMkx07wBkw574oHk7FkvDoAqRrYI8yTiehVk8MOgbcVF_W3Xw2Pt68aCfiRnHNgFHzMV8bSuVofFV__g9KsXOpflaJUxkemENOgc0vU07j9LsHX128U-ynJK5N3UPw/p.jpeg",
    "title": "Warm Update",
    "description": "A welcoming feel achieved through tone and finish choices."
  },
  {
    "imageURL": "https://ucda02ab1f37aaab01f9af6a8834.previews.dropboxusercontent.com/p/thumb/AC_O_zmkSAhOmQAzrpuUAPaveXKYWXRSRggKUnVB1KRri45Q_G9WVHH-eClgbsxdpZajOAr43LiXRyPTLiGcRQisqmu0QZ9WKe6r06Jo36A3dra6fGSTMwkfj2w469gn6mSJwSpdCr9ulHzoZ3EkXQGrM6NHfgITXl9BhgkZ2TMPKSaotePctXShvdPnduaRxF_ZOu4gmSg2NHCvMlAolQvfZtpQ3Pw3_05u9495QQB5x13JCPowWf6UebbKnw4x7r1mBW3HEbuR1gTd-J2yEEIb6ST0fnYryheItyzZCUyy0KUu2RhaBDlDpsj11Ul-rOEJo2zdJ58PMy8nmZjD8U821MgDWwxVuNQMKOVT9XL9gA/p.jpeg",
    "title": "Understated Style",
    "description": "Restraint in the palette keeps the focus on craftsmanship."
  },
  {
    "imageURL": "https://ucca1afbb99a4dd9dd7ff41c6a74.previews.dropboxusercontent.com/p/thumb/AC-TBP8qxcjowRP2wIL_s-oTXd-v63zU2nak9VZ0ihaR-p8nXhZya87dGlJGD8KyjPxzgqFrXglB7w7mXhQ5V9sY3mSVYdRKsCk2x0Xf8A19vQemeSo-QG15CD5w0P-1S9FmRrmqVkVl5Kt1kSGIJcD2iS_xcbWmZjZuoolvFx7oDuCD-xHt0eZIvr_Z8pXLTjdcWoUQivt3eO74hfn1e93GnDgDsXhay7syyV2J2oW81Ry2RvStSM5ilOtI6DDW3l4LOiJXRhxj5IgIP2n4tr42tk_qArT6pj_3DgECJYpPMHOSdc1hh5pATZ1kzMKxNN-aOErz9XiNlHv9o11doWBO3axLreesCvxN5q9YgZZzIQ/p.jpeg",
    "title": "Bold Simplicity",
    "description": "Strong lines and clear surfaces for a confident result."
  },
  {
    "imageURL": "https://uce8311f3f313957a07fb0909a0b.previews.dropboxusercontent.com/p/thumb/AC_HYppUR5xrnkL5JETEtCze6wJekckDqXWR1iYbwEhCIWw_KaUp2YcqpNWUzmt4BSkm7WaYfm_hbvCxdrSUV6YF0RoCtRW5Qw1BiPnNaWjQHI4HCOyJOwGIkqG73HaAnX_85bo9JKDc_onMUs_gHhLKVOSlLUi9qvW05J700f6E9pTmIKc490y7EhODY02NqzTK6gJMSLuUk8O02u9klMjvUe31a2xmCulQmIBdawQ0miWVsifH_R9-yPXZSY4VsOtwLsJb9KFwBWegSaap5AKmtjXOEsrNPrxgJX0Kg6JybPMd1cZlxS_1RPt-cPAyw8dgA46TZ_ZHltc59q5M3APDqk_VEfcaREGCLLGDSCcLkg/p.jpeg",
    "title": "Calm Transformation",
    "description": "The space feels settled, bright, and easy to live in."
  },
  {
    "imageURL": "https://uc0d8c63c2eed0e00f2a7028d7e4.previews.dropboxusercontent.com/p/thumb/AC8Lbp7O_6G4PeL54x__G63eEHJS9YEzDbfsBTDf7hsDu88HT-CQmH64X9wpp1XvuWWQVF2yKhIyIwxiEqsFuKRpSN7xcbdAvz7LZFq9VykpUlRKY8USbwMWgbro-nn1VgMCXVVkXMtfiqXu4j6Rrun_ZXNgN0y7yO4qn96M92QnQoux-0AMtSP2IK7XRIDkxwxW0gjd0kylgh5ibgA2DFNkQuQYmgLXkOLSZRzwXG4fbrtyD_3SN9COiPkJuWW3QV45DzjrMUh2dGo-wghTB4ZiN-YwQfpU1P0-pgk4J-981utM0U3XhWTWgbUutpjfm5ls7Xr07krtU9HBr8YlSTTNUOjv1hw1hGvF45s0-bNaZw/p.jpeg",
    "title": "Smart Refresh",
    "description": "Practical improvements paired with a polished visual direction."
  },
  {
    "imageURL": "https://uca564b05830a067847d41852d67.previews.dropboxusercontent.com/p/thumb/AC8stUsTxLDynqvygy4-wfHZWoMKUyzsYlpQpDU8_IRz0kup36IWOq3dXaTePGZnKo_IRjfoAa1I4wLayyZ0vXzincpcyC6lRvYKiXyMEkeBrRxqVdUNkkY5hkS09Dx1popdsDFVYW-aET-I9PWTQJxquc2C-af5ZBr3lP7YE3WNhritW_a5s1kgKPikN-JUPY3wIhHpGkcqXObAGdimYOjn659KwEPTtfSliSlaZiIi6NqGZGwoUXGFDL2Jg2JFHQAoAbpNpjx3WATtxKqP2sqTDZ7dAKdL5_O2zkz1sZ4JSGah_Oc8snXBra1aJ6m4sjJ-ZLIsHQjB6LbGh5QpkWmK8OsUIKbut3UhYP-js5VsIw/p.jpeg",
    "title": "Tailored Renewal",
    "description": "Details were adjusted to suit how the space is actually used."
  },
  {
    "imageURL": "https://uc1a486b7ed748e7bb68ea92abb6.previews.dropboxusercontent.com/p/thumb/AC8i1YaUQS9OKURVcPUNwcS_nhiU-yPD4MMoEAY4nWnFjJOwUQd_jHikA6Q2fRLRWFAPO0AIPR6OocQ7nfqIAjDgc2KFSvwbRnHgsTC6ka9pysCyGn7TrDf5SQrbgxUTrUeOx_KVytWs23zMKiGmt67azvy5bnpe2W5pGi5Dq0NCBbaDBhf5eKto3JOQlQr9QmKDBYumX-XEDEo5a2cweXQG9gsbHynFKSYzU45Vy4LfjZJPcXzNCRY9UjGZXv2f8CQC8BeLHzZFwL78tE1dE1hJZV7qjTxWo5UV8BfHSAKBDYm7vMhxUmGV_8B7pPj9rcrYKinQJ9qqbVDY2jBbDhpSCl_2CkHWWLN6T3g04OBKwQ/p.jpeg",
    "title": "Seamless Update",
    "description": "Old and new read as one coherent, intentional whole."
  },
  {
    "imageURL": "https://uc57af03a15c6b8a028502983460.previews.dropboxusercontent.com/p/thumb/AC8W9P41A_83adLpR3HDAGu1GZtSZYuRYKh--0sthhZf1781CzKruy695KpKEvnL0zmzhXhS0XtWGL7GbELfex1z82tcMg0h009V9btDRWIE0AXlSGl9k1uDcuQMd1VpAlCmCoyU0RYcpMgd-XCyJjRDG4hlShz-kfUAGuEX1H3O-cCj4uCg1-GfWYZRwXnjF0uLy2UZNEEzYrPVaX4Myaonv6b0B3MzlgRNuFwQsCWpUxtOW3cKgP8gizJv1hCd9wCC1auEKGZPWPYsota-UrIMJ5Ja0VJeivgTtosN8IaDfZI6BMOVQalpOh04vE2dHyvN6kQ3Eb12SGVS07-sw__hXx6QSKBVU3WE7S2t2TbLPg/p.jpeg",
    "title": "Honest Materials",
    "description": "Surfaces and fixtures selected for both look and longevity."
  },
  {
    "imageURL": "https://ucdd5e010385639bff0a57c53126.previews.dropboxusercontent.com/p/thumb/AC8tr7d98NpD2oVJ_8khTYqFjngiA_L6K6Gchd8Nscnwy1m7jNra6SWd7vw5rNCzIp2IFBMxyh5O4qLns50N6VxG05cgBYipkmuos3dCLuz-MOskWoOzI8S8GspkjzIXw8XQUZWKZXHqIIS3VzJoa_PgKPRRaHaEIDYMSixx2MjwhxjmuPNeArt1yPSypahvT7-fr54mNY_n-JjQSWznmszIrXgS8g7FbKyXsY7l7-KnxDnTu3-f6CTgPktqahXcThjnaewZs4bCXkKDZ0g5jUZ-mqa06xnPk4SsPfs3loCoID8RHgb948mpM-JK-si4mS2InO7BtqNpQv8ekKmSlW9N-FIdwr1es_RUqnNJnI5MfA/p.jpeg",
    "title": "Everyday Elegance",
    "description": "Elevated without feeling stiff—made for real routines."
  },
  {
    "imageURL": "https://ucafcbd44bc63f576c26a73900ce.previews.dropboxusercontent.com/p/thumb/AC-EJf3dXZ1BpjRjA9Ufv0oLtyx0QY85pcv2_gtgZAnpcFjQGFAA6rt1bICrlTwojNksyOFzrTS8YUXD4XyrG6mYbJ8cCRkLVDfInRdCvSu6Kk4kVKZoi-2Nmicu74MNf2Px3S-_hrBruIVRfINn4q93EG6jXttyU26vsJb801rXRn8D3XADDfJQf3axP1j9J5qtrDGrln-Bve1xWWCJFYDi9AAXAQarYjzfoYEuPDj2XjANmT8ly2a6nVtvReaJOB8TxCKErJPIcfYFSTWCp09KRWhyrV1eihkDqpk1d4fqcG8zBDOZK-HYBjcu_mqc-4Q6BuGNgcSebCNJ8ULbhoAK7CJ4w292XxAnQUkdlgPIkA/p.jpeg",
    "title": "Considered Details",
    "description": "Small choices add up to a noticeably refined outcome."
  },
  {
    "imageURL": "https://uc4367214008b36181659d6af495.previews.dropboxusercontent.com/p/thumb/AC-tr64O1UB8g2KlpdBgqlVjJ-R6-kLU9wTrl2wb3-FoVQadYLzuqedQ0q_O5cl-Yf4govrya9LQYpP6CUAt7gtiDWYuUu6dT6KPZbtYGDwzc0vj7PBvBvoiJ1H5pHXQ98EdHkWqVlMLWHUgITUYOAvbnwKQOl54C-Xl-9-kl2iEvACfO0jcDBaeNPpwKKSafIVueK98B6RjBLLj9OxemMODufLM7Ecf0bgQjtvkTfuPQV8t4TvTPD4zkQqYwa-an1OTMRIrbx6A5w6eBVZE9IfyCNC7_wcy_AeQDx5yePizTuAhceHg9qHjr3s1KXeApvpPcxi3W2KpELmvN6JirxzlMEhdHLKr0dJk5nmQEOKFKg/p.jpeg",
    "title": "Fresh Outlook",
    "description": "A renewed sense of order and ease throughout."
  },
  {
    "imageURL": "https://ucd9ce4c577201d811c93c02182b.previews.dropboxusercontent.com/p/thumb/AC_d-mrCcGYSPDXqGzc_O9ORoiHRHc74tqLh_SyV7YiJ15GW8NSB-Njgqr9CjZ5VqUlxQ0w0CCvN3qd7V893lB1JN-Tw9L3aajpOnjWjU3ufYcjk1PEQ-u7oMmiSelClLsOvio0riTD4Zcuw7Sb-qUTTgXJjTeSkzYFDtGvLhDkOv8VYdIbECDB0_RoqXuTRfaAqFHlyKrhN1qxGPjik4z74aRT_H7VTw6vHqKlbNO5mzePE25JlluLGaCmRIvgvj4KaLsvZ3m1Bdz1pa1rvYAyM5rUmVeMwnff5cQh3dwKxEyIanA8aU4gPlcki-0ZdZGsVtLV5LQWDEh0rIXppC9ZO6IyxKMBCqv8iNF0EWIvSXg/p.jpeg",
    "title": "Durable Beauty",
    "description": "Built to hold up to daily use while staying visually sharp."
  },
  {
    "imageURL": "https://uceb6f793d6ff35179d759b3b791.previews.dropboxusercontent.com/p/thumb/AC9okJja2wvo-Gu3upe5BgPygwRLZqsApEOLNJFyG-89Y3VKpCC6Gf_jQ_VsmA7_VxdeneWlMmxuYypVjkVyKI8WZ4VIpFGJgRsjqooA72LoH0dIz9VHattjIETq8BvRbzE8xCquq01QCNsmc3J0yCl-S3X5YBKYsFVDHbsYHk1v_5Zp3Yp6CGx5C7WOa-1oCAEnDYRLpn6tvR43t5DUE9gOvqHuCIEwMVdJIS8OtHUveAnBg_Xxi8VNdsrhS1pJa6IpauvQfRGdOA4DUeasn9wMEZXmfndiuE7tQQ1wuzOiNKj6m1KgbrAVQgms2d4gLuGh9RfE_fuTKeu5Sb5t0nvedXDd_1pAAJr6VOiqeWwPLw/p.jpeg",
    "title": "Cohesive Vision",
    "description": "One clear direction tied the scope together end to end."
  },
  {
    "imageURL": "https://uc1c8b39328019eaf8cf755a4cbe.previews.dropboxusercontent.com/p/thumb/AC9qDdFW0KMqJxP4Q7hkPulgF1Q7qWjc5TSdznpgcswOI6ZBmo4Jcc2Glkd6sSheRXugzDMlP0ZWIErjQXQ4fmqT4kSRVvRsGmWBLNw6H4NrfgxDxVTVssxenJWB1YjDDf8qA2aohmR1C1pqwQJLkOnpX0nLK6ViOl8UU-0n7jPSBYa8sZWEUGKxaft06R7_Z8tlfSRfLpVfrQBVi8Op495tTA2EkjmzWsQGwFgjzFroqRNAavlqIHAc0eaGMXb5U7TiJ38eiEvMxoQir9PRPn-ctJhElF-dSzm7XwU4ymN8i_iXBAC0UWgpT9ogykDFxusvjqxWXeCCmHF5n41KrgzDN_EHeV21h-AKyihIdN6y5Q/p.jpeg",
    "title": "Light & Airy",
    "description": "Brighter tones and thoughtful placement open the space up."
  },
  {
    "imageURL": "https://uc1c8b39328019eaf8cf755a4cbe.previews.dropboxusercontent.com/p/thumb/AC9qDdFW0KMqJxP4Q7hkPulgF1Q7qWjc5TSdznpgcswOI6ZBmo4Jcc2Glkd6sSheRXugzDMlP0ZWIErjQXQ4fmqT4kSRVvRsGmWBLNw6H4NrfgxDxVTVssxenJWB1YjDDf8qA2aohmR1C1pqwQJLkOnpX0nLK6ViOl8UU-0n7jPSBYa8sZWEUGKxaft06R7_Z8tlfSRfLpVfrQBVi8Op495tTA2EkjmzWsQGwFgjzFroqRNAavlqIHAc0eaGMXb5U7TiJ38eiEvMxoQir9PRPn-ctJhElF-dSzm7XwU4ymN8i_iXBAC0UWgpT9ogykDFxusvjqxWXeCCmHF5n41KrgzDN_EHeV21h-AKyihIdN6y5Q/p.jpeg",
    "title": "A Fresh Look",
    "description": "Renovation reveals hidden potential."
  },
  {
    "imageURL": "https://uc1c8b39328019eaf8cf755a4cbe.previews.dropboxusercontent.com/p/thumb/AC9qDdFW0KMqJxP4Q7hkPulgF1Q7qWjc5TSdznpgcswOI6ZBmo4Jcc2Glkd6sSheRXugzDMlP0ZWIErjQXQ4fmqT4kSRVvRsGmWBLNw6H4NrfgxDxVTVssxenJWB1YjDDf8qA2aohmR1C1pqwQJLkOnpX0nLK6ViOl8UU-0n7jPSBYa8sZWEUGKxaft06R7_Z8tlfSRfLpVfrQBVi8Op495tTA2EkjmzWsQGwFgjzFroqRNAavlqIHAc0eaGMXb5U7TiJ38eiEvMxoQir9PRPn-ctJhElF-dSzm7XwU4ymN8i_iXBAC0UWgpT9ogykDFxusvjqxWXeCCmHF5n41KrgzDN_EHeV21h-AKyihIdN6y5Q/p.jpeg",
    "title": "Classic Refresh",
    "description": "Respects what worked before while moving the look forward."
  },
  {
    "imageURL": "https://uc51d3ac23e263b00697d991e781.previews.dropboxusercontent.com/p/thumb/AC_HNfCft1ILHHwfgrt1RFnV1UglrYKKVBg_YErNDXrIcdOt7Mo_EGRxmrZTM8RwmPs7ACrs0dR4ZJNwN_mjHc4CIIYZ5ymH8OQ2J32MhDy6Js303iKtpBfTTWpqLTm-YQwraBtQ7zkK9woXlvhmfdUMH08OfSOn7mtf2rTpaDKFle8qeJ4PN0Rp7PkVjC3s-69nRommbiLiF95KA8TiXC6TAUtwojA6NITMlkm-Qfayr3csjXz5QpHtGmjwz-OzGOotSMbJdvnqTzDpdEvskbP2MDkdDltP73gDeVY5I2zm9vvywobtfyOPxx2rNrmIEfNhS-S4u4Omy1fthHFtuZWh34mV_movZbKPWXtTAbXJLQ/p.jpeg",
    "title": "Subtle Upgrade",
    "description": "Noticeable improvement without chasing trends for their own sake."
  },
  {
    "imageURL": "https://uc24bd8bf77b7889c380484f9d35.previews.dropboxusercontent.com/p/thumb/AC-Oxsz68ERFoNbjaWIJUJ3-qSj5dN-hyfVB8JVgunaz4y9QWtUNz3LhdiD_8J_s3LCJ-aWxHua8mkmHcnEkkcALQfQo7iEDRhYSgfqszD2kSWa_lC3SFRNAEv5WszSD0wdiJNLeN-wodAycXUuvlbewyQ_0s_icjEiOCnXoVJ4kV1X_5FijacjcQ-ql2bQULcSlD7jBQeUH5MV8a_FJT1i4s1aYT-IVYcaqYYffLuCpEMQCUh18pzAJg2tCAA020KeFnKdPkO1LePiNjC515mr4Zdb8UoRYJ042a8ySkFAQGxvjR0ZrieE5KqxnsTkRkplz4rvuuUa5P0YHvFQ66plb0PkLUamiBN-dHjdbtWt8kg/p.jpeg",
    "title": "Confident Lines",
    "description": "Layout and trim read clean from every angle."
  },
  {
    "imageURL": "https://uc24bd8bf77b7889c380484f9d35.previews.dropboxusercontent.com/p/thumb/AC-Oxsz68ERFoNbjaWIJUJ3-qSj5dN-hyfVB8JVgunaz4y9QWtUNz3LhdiD_8J_s3LCJ-aWxHua8mkmHcnEkkcALQfQo7iEDRhYSgfqszD2kSWa_lC3SFRNAEv5WszSD0wdiJNLeN-wodAycXUuvlbewyQ_0s_icjEiOCnXoVJ4kV1X_5FijacjcQ-ql2bQULcSlD7jBQeUH5MV8a_FJT1i4s1aYT-IVYcaqYYffLuCpEMQCUh18pzAJg2tCAA020KeFnKdPkO1LePiNjC515mr4Zdb8UoRYJ042a8ySkFAQGxvjR0ZrieE5KqxnsTkRkplz4rvuuUa5P0YHvFQ66plb0PkLUamiBN-dHjdbtWt8kg/p.jpeg",
    "title": "Inviting Finish",
    "description": "The completed work feels ready to use from day one."
  },
  {
    "imageURL": "https://uc24bd8bf77b7889c380484f9d35.previews.dropboxusercontent.com/p/thumb/AC-Oxsz68ERFoNbjaWIJUJ3-qSj5dN-hyfVB8JVgunaz4y9QWtUNz3LhdiD_8J_s3LCJ-aWxHua8mkmHcnEkkcALQfQo7iEDRhYSgfqszD2kSWa_lC3SFRNAEv5WszSD0wdiJNLeN-wodAycXUuvlbewyQ_0s_icjEiOCnXoVJ4kV1X_5FijacjcQ-ql2bQULcSlD7jBQeUH5MV8a_FJT1i4s1aYT-IVYcaqYYffLuCpEMQCUh18pzAJg2tCAA020KeFnKdPkO1LePiNjC515mr4Zdb8UoRYJ042a8ySkFAQGxvjR0ZrieE5KqxnsTkRkplz4rvuuUa5P0YHvFQ66plb0PkLUamiBN-dHjdbtWt8kg/p.jpeg",
    "title": "Purposeful Design",
    "description": "Each change earned its place in the overall plan."
  },
  {
    "imageURL": "https://uc5c58b6dfde89da74516f1ec0c2.previews.dropboxusercontent.com/p/thumb/AC-b2MLEiXErcf6wAa4_leeY9NlPL1yFuRXg1FewfGZvu-W1zrR-wT7pPI17W6wJsi23h2yfo3eb-U5p6J5LRorZ1EzQN8KV_STu6oUE1lSpKr4rczi_yevkW2IrG7xaVCO8qpPS6TcdrY_qp59KN79ds8fbPAJq2jF7JWlCaTtwlb4-Q2eCbNxdKSJ6aX-h-pOMwHhGFtsV6p57pYuwtB6120QSKNonvGcOqiqxVdfI7-1wduRJRfQcISrwI1eM0W0syVHWiiHihyVRdiMbCcPiERjjkY-8EhggLz8-uefTzHYGyKAuBX79eLAoZjdbzLUcfJf5txOCijZH2RW3t94ZgaeilBU18rX5hQbKFhMHTw/p.jpeg",
    "title": "Quality First",
    "description": "No shortcuts on the parts you touch and see every day."
  },
  {
    "imageURL": "https://uc239f9c0138d4dcc604084a8b58.previews.dropboxusercontent.com/p/thumb/AC9qsgQFp0GHb10HR3dZm4idHwe_pauKK8e8wzCfqs16iMnnJzY5X0Zdj7vQdFXdPnooEqY1e3SrS61KyqGqC7ySwpc5jBuukHLsxN6EgxGgz2auslSW0ganxY-191ussrq_KyDZRoHINhrarfJqtNDXnBvpL9MKJ3CacxM5pPhFDSjz6HYw4BvTmBG2p56RIRuabCmBE_SHm1NiM_gsizYOyWoVf81Eldd4gcl07t23PoDr2eSdASyiVL1dAYuZByjS9_orv7uIhMehiqIOFNAlc8md61tgW_FsogeH7vQZBdx4K3JpLxG5PKaG6ItkJgJDn7qulC733zvBWxLOE3j_aYSfsRsUiGN1ReNBx29WGg/p.jpeg",
    "title": "Finish Strong",
    "description": "The final stretch focused on fit, seal, and fine tuning."
  },
  {
    "imageURL": "https://ucba449f8e8b8fe3b5728fff549e.previews.dropboxusercontent.com/p/thumb/AC8RHz69aIMejEVx_EIrYT7kI6AOnmwnniUGG2P7S9j2oZHiUZEcMOK1pJ4H6P0HYsIA8aXEVuWb1stO42wzKQZq2QiBEDOyYS5IBBYQyks8aGNWOby0NttQQXDpBG4kV6XL8iFHv9IaRHOLKKdPhgllDPvAiEBESBdg-0N9d5ERR_cXwpAj1ySDqqtWQVEsHwppSFSW16ajDoQpXsvsoIwViS6nOSl8S0iuKDiYTriG1aYoIzYu6SyHebgYKo-I_PDjS9Z9be0bUedFPITDGuz-dLufYq50vVxN5AUJuJpMu6IyraEwlYNFzg_Ff8B5OuERqj5k4BFVh3xVB5jvsvqfxgLrp7Amm8osh2mau3rXCA/p.jpeg",
    "title": "Built to Last",
    "description": "Renovation choices aimed at years of steady performance."
  },
  {
    "imageURL": "https://ucba449f8e8b8fe3b5728fff549e.previews.dropboxusercontent.com/p/thumb/AC8RHz69aIMejEVx_EIrYT7kI6AOnmwnniUGG2P7S9j2oZHiUZEcMOK1pJ4H6P0HYsIA8aXEVuWb1stO42wzKQZq2QiBEDOyYS5IBBYQyks8aGNWOby0NttQQXDpBG4kV6XL8iFHv9IaRHOLKKdPhgllDPvAiEBESBdg-0N9d5ERR_cXwpAj1ySDqqtWQVEsHwppSFSW16ajDoQpXsvsoIwViS6nOSl8S0iuKDiYTriG1aYoIzYu6SyHebgYKo-I_PDjS9Z9be0bUedFPITDGuz-dLufYq50vVxN5AUJuJpMu6IyraEwlYNFzg_Ff8B5OuERqj5k4BFVh3xVB5jvsvqfxgLrp7Amm8osh2mau3rXCA/p.jpeg",
    "title": "New Perspective",
    "description": "The same footprint feels broader and more useful."
  },
  {
    "imageURL": "https://ucd46ade5b6519b87304fbeeaf4e.previews.dropboxusercontent.com/p/thumb/AC_9340M4NFKjG-jxLUpQsq-F0pgBSG5FUVgW4hkKxItp0KUIW9BSpPKqYlwmkKMg7T0SkYbVq2GVr-AFhFmUhfFbA7OVndsfcMhCQnJHoXts3PW8M_sjaIVUsVNVFdTUWn0_XikCeuWjfo21hREhNMG6-TXilvosV5imYFdFcuIK0bL1a_5-K6WTe6i-MjbZFNz41WZ9T7bfzyTJzEeJXk3AZCTJuzh6MtChXY4UDyaxpHVbbxfchkHajeOF0eDcpzhSHg7GNBbo6a00_agJl-IT8FdkuClH_eFEOGdDDCMmG_Wi5GjnbqFHg9yYxoSvW2SAWTc7cXyE5qfKR0qEGhfsIIACgeXXvGtpmC4WVdFRA/p.jpeg",
    "title": "Quiet Confidence",
    "description": "Understated results that still make a clear impression."
  },
  {
    "imageURL": "https://uc76417255b4a1305c0bc8762507.previews.dropboxusercontent.com/p/thumb/AC8I2eb3g1gQwt7ZbUy8ZS2b9jBzRGWhwQf1qfmBNk1qTUNWtxLra05b6Bjh1j3RSkQPyWI6cGnkkrJXFgHgmNoFw6XESimUEC5d5Mc2jlwP8bS2_LqEkFHPEeMlujo5CfQzUpMQUCr2BCBgS8pgmxirCzjzwG4TynrM0mXg82t8lA__kP6cp200i5hb4Dbih-xndhQUuNy6s_LUv4wCj0hzkbcd9hDKQp48Geq8riewIQQsUMdpQoLh_aIAyOIZ4WtMcThA-GM5qCieOik9B4T8kS9F6O0uBvBGjPUlh3ee1knoRRxo6tKDy_Iep4YEVoIhUZ5JEqhhetYn2-AZuHe5Bo8-03mYDrGgBZtU3RtWnQ/p.jpeg",
    "title": "Refined Palette",
    "description": "Coordinated tones keep the space feeling intentional."
  },
  {
    "imageURL": "https://ucb941a6dd70e81d2e6c0869d4c4.previews.dropboxusercontent.com/p/thumb/AC-JiCOcUmDil3iKW5qMItchFyjI2FMDSu0O2cOGZc1hYX2hEaMfWBHO_18FYwsSPH1cGfHigMQ1WKnr_t0QNo7LVcIpN1FR6pGux0BaAscUNLkwG2Pgwjg-L0YtdxXzvyZwa4HCGjGatD_3fzEuLhjgCZfzBFZnzpT0_e53oRT15YgxS6SA_P69E2n60tfm5_Wj_FLxaiIIan2rHB9u6x2SyCmcU8mZZDYQ3lGQFQXEjJW3vQHgVPF0p9PFtc_HG1NI8bWc111HDTjtF-aTOpM83GcqojXWKaAqCBe-SR0-UOYXtXxlQPNSfWx0UciQUnRVPlfLuEHu9Df0Rw4leUIIwUvgAbN_Tv7wC15FYceBRQ/p.jpeg",
    "title": "Open & Bright",
    "description": "Reflective surfaces and layout choices enhance natural light."
  },
  {
    "imageURL": "https://uc596fa95cff6a634e76aecfdd6f.previews.dropboxusercontent.com/p/thumb/AC_IDrmgCy0oIIrw9GFsMxu7abFfladCy-wNyJOqEhqdFTn-M-g7iZS8Z_2-lvCCVgrcICdjeL1axDYZN7b6fRVPfx-zx87Ff_nke2rm983FGfhhJ_f21_0Bq_HN3oucEKppTl9kZyzFaQZ9Sfi7nw005xVCVKdHP9uDIWsznZE7rjPis7R0EAXeANcbXql32B5vGRZdeSWfIjg-Qfnccixhr6DqQMki33RZ2JwAaD5b_eP30YL5lFtW7Xvd47AJhT_pEGlxIFArG9SOb1-xJ5K7pgUyV4RRb-Xtgu2RI-wJKQX6EtQKwPUwa5TqrNmxJqZMLw_9844oVNdp3oUo-vYR9jBYVMdg5wCjrQvEXzW0Xw/p.jpeg",
    "title": "Thoughtful Layers",
    "description": "Depth comes from overlapping texture and tone, not clutter."
  },
  {
    "imageURL": "https://ucade8b14f41209db1cae66e313f.previews.dropboxusercontent.com/p/thumb/AC_jv4ypLp91FqvlwYZZKpK1x1KVrgF2wrAxQ6pu7oprN0lvKw8H_ckDTnipjA8vE7vBnZCZ0U49KF1r-wfneNFgJ4U9WMaR_4JfjSmkzgKFgk8c7MTL1tP2oyQhUD6artc7au_f9b0IrcVjAFw6yCuMtAiaDomT0Xl3YTyXeSvN0AEPYIp9yoy6N7-LVFY1G0lX5RHEEIoF5_IPMmK1iik0u9rsyqxPmcq_wOB8LXpJPznVG-oIktgpUfWWJ66GuZrXKfVzBAwhFZBFZfbt9RV7Y8QHPIYkfV1gPKo1tTNrcJoOO3ZEn48jziMS0spHi2cQcTqZVYCbD98NHlnzrHy8JcQdX3dv3Y4YFYFv_6sHRw/p.jpeg",
    "title": "Steady Progress",
    "description": "Phased decisions kept the project on track and coherent."
  },
  {
    "imageURL": "https://ucf062e321787767551abeb09f9f.previews.dropboxusercontent.com/p/thumb/AC-_lI63fAdQKR7gNV_bOUmwszn-2Dddvv8hUwUwEbgn-DE-epPa8-lvrANL55X6LiIjXRoqkDyDdEm22-xTFtRKWuSeyON4ZkZf2k5zokHvDm0ILOu3x_-wfrHunBRTCvx_BjIfJVvIXhHFbbl1cshjP6-zfZKVYcS6t8moRHEQQMeOzeh7p0eVHb_B5rLLs-WF_i0ZrMkUiYujgBlHNG_2c7YOKhGNza2OXFPK2hVTOBnTxuoPx2EwKMdZVL60u2rtm0zdkziKbJgSD7zEEKYO8cFAhNUUbfZVtIRt6k-XF9UydB8yt77FdfAMeCQrX14uH4XEiczrl16-p2C7J_uY1mg4n4jhzxar9eh_LAzaWA/p.jpeg",
    "title": "Crafted Update",
    "description": "Hands-on skill visible in the transitions and junctions."
  },
  {
    "imageURL": "https://uc5846f2fd8bce5e3c8c4b4d86d3.previews.dropboxusercontent.com/p/thumb/AC9B5G5548cHWqZ7c6rbyQsFIif0EgfyF1mRUc8cXsM33Fn7HLooGQ1_b-eUHL998qVm-iUegzi0gApscCQNQmW4iomjSa0xoOV9LFhkXnkHIS0Bec2rWM9ucnQHEa6VelfLPy1x-wvIkMLseXrsMJN6nX1k6oSlIXvqoVUzuf1D_QRymavDF25GuazWTGwNqK8a5tDMmYzuKoxzjAG5YE0cVmV1b6A3pqzhGUel0WMWpTkG3uhmPgV3x-Et2FBSkFLliDTAaKqpmU3gX4paTdF781eo_EZpB4-YQyb10tAKbpOiGHYPrMaL5Z9OaFxvxGuNG6CEZl6iKcZrAYLeP8INSkzY36dtJQmp5JEZea543g/p.jpeg",
    "title": "Timeless Appeal",
    "description": "A look that will stay relevant as tastes evolve."
  },
  {
    "imageURL": "https://uc7dbc8d7bfb5ab037cc216ef0b9.previews.dropboxusercontent.com/p/thumb/AC--aYFXP4TGqVIgbV4YQ-i-9IzjjSSYL9utJeZ6o78BgMKQFqoMQIA5rUfQxSAZudPx09QtkuAhv5o3if5QntBk19b-JnoXflM_HQl4waBtqR0RegUlBndOadzIJ4uGBQFLij9pbSNsnPhqsrpQtPYIsE_qKE87PZYGDz8iBbnIpjbC0LU2-DvAPHrarXXUaIBcX8vFrRkrvvp-9dr4YyGJOd0nr99cjHF-q8dYehdkQM-Wh34_hJkDFahki9E2xWVeXHTJA2ssH484gNEBji2OhTOfNB0P8DIQfL2ttN6CzYd30_5DwLMDSIXOsY69443ntxGGrNU9zgrTESanUCkLsCQoiOCaUZAYSfWQ_h6R-g/p.jpeg",
    "title": "Forward Motion",
    "description": "Modern function with a nod to enduring building traditions."
  },
  {
    "imageURL": "https://uc0ee2a5dc039488e341238644af.previews.dropboxusercontent.com/p/thumb/AC8gGCRVh_BGI5GFZk4zmaa5Y4LP8HzY3bC98aGOuBj7uUGUJfjFnSbg6PtfBnUqG392Ee18HIoYAzh-aguSxzaAJNAg75VadQtKOSnKJii2gPfDBAW5wbj1qOhBmi-0s-O-VkK8OpcsCC6GYZK_IvJAiWC9Z2quoc_qsII5-OstRT9BQFeSjpFOi02WotHV0MU1CBH9SnhIAQRWMNtDn8WTckK8t-W3gb0ygJ8rOm_8ooq8mMVFV_i-hUcI880DPP_nse10kFvcWQpvTHuorYaN8atLc6-zG7YieMs-5GjEZkTxEBDHeDjLG52zaOLgrYaLJaXmMcxgWMGVC7_CZCF8rTim7-if3_VGHaRoPTR0wA/p.jpeg",
    "title": "Polished Renewal",
    "description": "Careful staging of trades delivered a unified finish."
  },
  {
    "imageURL": "https://uc594a21f5ed21bde7c5b8ba93c0.previews.dropboxusercontent.com/p/thumb/AC8rry3SDOxuPQ3YZYGqupZ8BnePxpXDp65cCdkIkRlm7otah-MnDfpMw8qCWrHF6HrGwyXzOgDrOA0GXx2ncVLobrgwYARGqlVInFDBeAoclBq7bL6AczRbkw8SkXoKwpVIaIoa9sUWDZSo0ng8jfMZBTTZA_6DG1GXCkrBY72gOB1xcqtCTToHBrGAgLbQeQ1qpVSBlgExSAvkbOfDJXM5aQfUgSbW2SIbILtnwnLqFPsBz4UTxwzIkBszJcxEZWD6NGrgfE7CLJbzZYNoLL8jHGnlBVl_FeWZsf6AdXfymfmfGVAy2No_TPF3ZmVaSx8IL7SYkHD0WTIF7VhB_4X9KZwTcw9nD93sHOULbHSsUw/p.jpeg",
    "title": "Measured Change",
    "description": "Strategic updates where they mattered most."
  },
  {
    "imageURL": "https://uc0616657f5c2e8196ac204df864.previews.dropboxusercontent.com/p/thumb/AC_S6f_RseA647EeP18-YGy9OqkYKlQr_WpsI605sp0sxv3WJH1HyjffMsppFoBKu9RdMZe6LQYPyrUoyLoP2Gnp1iM_YmuN_aBK8h0t8-0APYTIhOM0Ws39aYmC3keYn7uHTI5uuJQwbjT_CKdMGA3DyirC8gafQLhiTH4L1uNwx3l53BNQKBqVuLe0n73ZY4caZ5Dm2TlzvSGQnwb44BRdQ0wKGMl-yvEw3aKBLMujz55kAFjEHcsRVveCATFtneEcj5pv-KutfPNReme-TnF2gKOHuH19mDHy3AQTg_qpV0VLyjYtJj8vtssN1Lly1EmfmW5orLMwnwKy93UBCpXEe9wvXzIzmoCnXq1uoGOnyw/p.jpeg",
    "title": "Complete Picture",
    "description": "From rough work to final paint, one consistent standard."
  }
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const closeBtnRef = useRef(null);

  const openLightbox = useCallback((item) => {
    setLightbox(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [lightbox, closeLightbox]);

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>

      <div className="gallery-container">
        {galleryData.map((item, index) => (
          <GalleryItem
            key={`gallery-item-${index}`}
            imageURL={item.imageURL}
            title={item.title}
            description={item.description}
            onImageClick={openLightbox}
          />
        ))}
      </div>

      {lightbox ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            lightbox.title ? `Enlarged view: ${lightbox.title}` : "Enlarged image"
          }
          onClick={closeLightbox}
        >
          <div
            className="gallery-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox__media">
              <button
                ref={closeBtnRef}
                type="button"
                className="gallery-lightbox__close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                aria-label="Close enlarged image"
              >
                <MdClose aria-hidden />
              </button>
              <img
                className="gallery-lightbox__image"
                src={lightbox.imageURL}
                alt={
                  lightbox.title
                    ? `Renovation project: ${lightbox.title}`
                    : "Renovation project photo"
                }
              />
            </div>
            {lightbox.title ? (
              <p className="gallery-lightbox__title">{lightbox.title}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Gallery;
