interface iNewsletter {
  url: string;
  desktopHeight: string;
  mobileHeight: string;
}
interface iNewsletterRecord {
  [key: string]: iNewsletter;
}

const newsletters: iNewsletterRecord = {
  reset: {
    url: "https://www.wbez.org/reset-embed",
    desktopHeight: "180px",
    mobileHeight: "480px",
  },
  education: {
    url: "https://www.wbez.org/education-embed",
    desktopHeight: "160px",
    mobileHeight: "490px",
  },
  politics: {
    url: "https://www.wbez.org/politics-embed",
    desktopHeight: "310px",
    mobileHeight: "360px",
  },
  theGoods: {
    url: "https://www.wbez.org/goods-embed",
    desktopHeight: "220px",
    mobileHeight: "270px",
  },
};

export default newsletters;
