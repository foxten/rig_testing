/**
 * This is the configuration file for the project.
 */
import deploymentConfigs from "../config";
const { org } = deploymentConfigs;
const brightspotClientId = process.env.BRIGHTSPOT_CLIENT_ID
const brightspotClientSecret = process.env.BRIGHTSPOT_CLIENT_SECRET
const config = {
  wbez: {
    styles: {
      header: {
        accentColor: "#cf0000",
        backgroundColor: "#000000",
        buttonFontColor: "#ffffff",
        darkMode: true,
        donateBackgroundColor: "hsla(0,0%,100%,.15)",
        fontColor: "#ffffff",
        headerBorderBottom: "",
        headerBorderTop: "#cf0000",
        logoWidth: "7rem",
      },
      footer: {
        backgroundColor: "#000000",
        fontColor: "#ffffff",
        darkMode: true,
      },
    },
    images: {
      logo: {
        name: "wbez-dark-theme.svg",
        alt: "WBEZ Chicago",
      },
    },
    config: {
      baseUrl: "https://www.wbez.org",
      donateUrl: "https://donate.wbez.org/",
      gtm: "GTM-N5LZXP4",
      metaData: {
        org: "WBEZ",
        title: "This is the default title", // This is the default title that is seen through social shares and search engines.
        description:
          "This is the default text description that is seen through social shares and search engines.", // This is the default description that is seen through social shares and search engines.
        image: {
          path: "https://www.wbez.org/wbez-social-default.jpg",
          type: "image/jpeg",
          alt: "WBEZ Chicago Logo",
        },
        twitter: {
          card: "summary_large_image",
          site: "@wbez",
          creator: "@wbez",
        },
      },
    },
    // Update with WBEZ's brightspot endpoint and client credentials when we get it!
    brightspotEndpoint: "https://cms.chicago.suntimes.com/api/rest/cma/contents/",
    brightspotClientSecret: brightspotClientSecret,
    brightspotClientId: brightspotClientId,
  },
  suntimes: {
    styles: {
      header: {
        accentColor: "#cf0000",
        backgroundColor: "#ffffff",
        buttonFontColor: "#ffffff",
        darkMode: false,
        donateBackgroundColor: "#d3242c",
        fontColor: "#000000",
        headerBorderBottom: "#000000",
        headerBorderTop: "",
        logoWidth: "20rem",
      },
      footer: {
        backgroundColor: "#ffffff",
        fontColor: "#000000",
        darkMode: false,
      },
    },
    images: {
      logo: {
        name: "cst-logo.svg",
        alt: "Chicago Sun-Times",
      },
    },
    config: {
      baseUrl: "https://chicago.suntimes.com/",
      donateUrl: "https://chicago.suntimes.com/become-a-member",
      gtm: "GTM-PRHXFPN",
      metaData: {
        org: "Chicago Sun-Times",
        title: "This is the default title", // This is the default title that is seen through social shares and search engines.
        description:
          "This is the default text description that is seen through social shares and search engines.", // This is the default description that is seen through social shares and search engines.
        image: {
          path: "https://cst.brightspotcdn.com/a7/da/9a739da544a698cdb98e1b1c5f27/ctimes-logo.svg",
          type: "image/jpeg",
          alt: "Chicago Sun-Times Logo",
        },
        twitter: {
          card: "summary_large_image",
          site: "@suntimes",
          creator: "@suntimes",
        },
      },
    },
    brightspotEndpoint: "https://cms.chicago.suntimes.com/api/rest/cma/contents/",
    brightspotClientSecret: brightspotClientSecret,
    brightspotClientId: brightspotClientId,
  },
};

export default config[org];
