export const FILE_URL = "https://neuronus.fra1.digitaloceanspaces.com";
export const FILE_CDN_URL = "https://neuronus.fra1.cdn.digitaloceanspaces.com";

export const FILE_LINKS = {
  nav: {
    menu: {
      light: `${FILE_CDN_URL}/menu_light_8eedbc72f0.svg`,
      dark: `${FILE_CDN_URL}/menu_449c3654e7.svg`,
    },
  },
  home: {
    hero_section: {
      bg: `${FILE_CDN_URL}/header_bg_36c753c466.mp4`,
      mouse_icon: `${FILE_CDN_URL}/mouse_d35aae24c3.svg`,
      socailMedia: {
        youtube: `/assets/home/header/youtube.png`,
        linkedin: `/assets/home/header/linkedin.png`,
        X: `/assets/home/header/twitter.png`,
        mastodon: `/assets/home/header/mastodon.png`,
        codepen: `/assets/home/header/codepen.png`,
      },
    },
    expert_web: {
      bg: `${FILE_CDN_URL}/skull_bg_2d44f31a3e.mp4`,
      robot_img: {
        desktop: "/assets/home/expert-web/robot.png",
        mobile: "/assets/home/expert-web/robot-mbl.png",
      },
      ceo: {
        light: `${FILE_CDN_URL}/ceo_light_d613590bfa.svg`,
        dark: `${FILE_CDN_URL}/ceo_5c7c76056c.svg`,
      },
      step: `${FILE_CDN_URL}/step_78dae08c76.svg`,
    },
    services: {
      list: [
        "/assets/home/services/service1.png",
        "/assets/home/services/service2.png",
        "/assets/home/services/service4.png",
        "/assets/home/services/service3.png",
      ],
      arrow: {
        light: `${FILE_CDN_URL}/arrow_light_24295d810b.svg`,
        dark: `${FILE_CDN_URL}/arrow_dark_15a4a037e1.svg`,
      },
    },
    sdp: {
      bg: `${FILE_CDN_URL}/animated_graph_f217806070.svg`,
      spline: "/assets/spline/spline.png",
      graph: [
        `${FILE_CDN_URL}/checkpoint_graph1_d20fdd43f7.svg`,
        `${FILE_CDN_URL}/checkpoint_graph2_d98f956784.svg`,
        `${FILE_CDN_URL}/checkpoint_graph3_01bbb1a9b0.svg`,
        `${FILE_CDN_URL}/checkpoint_graph4_eda5890b0e.svg`,
        `${FILE_CDN_URL}/checkpoint_graph5_d33ab0303a.svg`,
        `${FILE_CDN_URL}/checkpoint_graph6_b02c8cd9cb.svg`,
      ],
      arrow: {
        left: {
          active: `${FILE_CDN_URL}/left_arrow_active_24fe078dcb.svg`,
          inactive: `${FILE_CDN_URL}/left_arrow_39ed2fe93c.svg`,
        },
        right: {
          active: `${FILE_CDN_URL}/right_arrow_active_2e20e07562.svg`,
          inactive: `${FILE_CDN_URL}/right_arrowsvg_70355922a2.svg`,
        },
      },
    },
    products: {
      bg: `${FILE_CDN_URL}/our_products_bg_e7899ee70e.mp4`,
      icons: [
        `${FILE_CDN_URL}/product1_3d16e78f29.svg`,
        `${FILE_CDN_URL}/product2_91ef7839dd.svg`,
        `${FILE_CDN_URL}/product3_6c6b52545c.svg`,
        `${FILE_CDN_URL}/product4_743692e669.svg`,
        `${FILE_CDN_URL}/product5_9c0502b160.svg`,
        `${FILE_CDN_URL}/product6_5d7b66f4f7.svg`,
        `${FILE_CDN_URL}/product7_eb291d69cd.svg`,
        `${FILE_CDN_URL}/product8_c7845f1ebf.svg`,
      ],
      bgs: [
        `${FILE_CDN_URL}/product1_bg_a49b7ee89b.svg`,
        `${FILE_CDN_URL}/product2_bg_3fdcfd827c.svg`,
        `${FILE_CDN_URL}/product3_bg_97cb53d41d.svg`,
        `${FILE_CDN_URL}/product4_bg_5132e8f48b.svg`,
        `${FILE_CDN_URL}/product5_bg_1d5104e9ac.svg`,
        `${FILE_CDN_URL}/product6_bg_dd0517c542.svg`,
        `${FILE_CDN_URL}/product7_bg_4794b67367.svg`,
        `${FILE_CDN_URL}/product1_bg_a49b7ee89b.svg`,
      ],
    },
    portfolio: {
      bg: `${FILE_CDN_URL}/text_bg_7dca792fb6.mp4`,
      horizontal: [
        {
          icon: `${FILE_CDN_URL}/quantumlogo_7b44c947dc.svg`,
          slides: {
            first: {
              type: "video",
              source: `${FILE_CDN_URL}/quantum_8903563734.mp4`,
            },
            second: [
              {
                type: "image",
                source: `${FILE_CDN_URL}/quantum2_5e17ddb053.png`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/quantum3_aa3ee8ba76.png`,
              },
            ],
          },
        },
        {
          icon: `${FILE_CDN_URL}/resonancelogo_10ad8c0332.svg`,
          slides: {
            first: {
              type: "video",
              source: `${FILE_CDN_URL}/resonance1_062c1790f1.mp4`,
            },
            second: [
              {
                type: "video",
                source: `${FILE_CDN_URL}/resonance2_333decf4ae.mp4`,
              },
              {
                type: "video",
                source: `${FILE_CDN_URL}/resonance3_f26317c1e5.mp4`,
              },
            ],
          },
        },
        {
          icon: `${FILE_CDN_URL}/barclayslogo_ccaf7114ee.svg`,
          slides: {
            first: {
              type: "image",
              source: `${FILE_CDN_URL}/barclay1_8bbdeeaa2b.png`,
            },
            second: [
              {
                type: "image",
                source: `${FILE_CDN_URL}/barclay2_32a05fd3ba.png`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/barclay3_975161ea83.png`,
              },
            ],
          },
        },
      ],
      verticle: [
        {
          icon: `${FILE_CDN_URL}/microsoftlogo_ed0807cffd.svg`,
          slides: {
            first: {
              type: "video",
              source: `${FILE_CDN_URL}/microsoft_d127269407.mp4`,
            },
            second: [
              {
                type: "image",
                source: `${FILE_CDN_URL}/microsoft2_9c5e7fe8b8.png`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/microsoft3_1f11d97551.png`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/microsoft4_5a62345d93.png`,
              },
            ],
          },
        },
        {
          icon: `${FILE_CDN_URL}/mcdonaldslogo_cff7b0f2f3.svg`,
          slides: {
            first: {
              type: "video",
              source: "/assets/home/portfolio/mcdonalds.mp4",
            },
            second: [
              {
                type: "video",
                source: `${FILE_CDN_URL}/mcdonalds2_6e347a2c6b.mp4`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/mc_Donalds3_5fd814e3df.png`,
              },
              {
                type: "image",
                source: `${FILE_CDN_URL}/mc_Donalds4_8f8ee6a967.png`,
              },
            ],
          },
        },
      ],
    },
    ebooks: {
      bg: `${FILE_CDN_URL}/ebook_bg_0b4404a571.mp4`,
      download_icon: `${FILE_CDN_URL}/download_d7dcbdbb1e.svg`,
    },
    tools: {
      techicons: {
        python: {
          dark: `${FILE_CDN_URL}/python_2feebfb83e.svg`,
          light: `${FILE_CDN_URL}/python_light_65797636b8.svg`,
        },
        js: `${FILE_CDN_URL}/js_18a693d3b5.svg`,
        sql: {
          dark: `${FILE_CDN_URL}/sql_5f5ed35ed1.svg`,
          light: `${FILE_CDN_URL}/sql_light_836a34689b.svg`,
        },
        css: `${FILE_CDN_URL}/css_e76ed7d049.svg`,
        html: `${FILE_CDN_URL}/html_02236232fe.svg`,
        figma: `${FILE_CDN_URL}/figma_9f97bb2001.svg`,
      },
    },
    footer: {
      socialmedia: {
        youtube: `${FILE_CDN_URL}/youtube_60a4a4dcb7.svg`,
        linkedin: `${FILE_CDN_URL}/linkedin_ca68e25c26.svg`,
        X: `${FILE_CDN_URL}/x_fac484e5a4.svg`,
        mastodon: `${FILE_CDN_URL}/mastodon_6ca7b2a1ec.svg`,
      },
    },
    common: {
      dots: {
        desktop: `${FILE_CDN_URL}/dots_78029affd8.svg`,
        mobile: `${FILE_CDN_URL}/dots_mobile_aa70b3dfa9.svg`,
      },
      logo: {
        desktop: {
          light: "/assets/brandLogo/neuronus_logo_light.png",
          dark: "/assets/brandLogo/neuronus_logo.png",
        },
        mobile: {
          light: "/assets/brandLogo/logo_mobile_light.png",
          dark: "/assets/brandLogo/logo_mobile.png",
        },
      },
      export_icon: `${FILE_CDN_URL}/export_ad40932cf8.svg`,
      send_icon: `${FILE_CDN_URL}/send_2daf7bc93f.svg`,
    },
  },
};
