import { nunito } from "./fonts.mjs";

export const theme = {
  token: {
    colorPrimary: "#F06543",
    colorSuccess: "#1C7C54",
    colorTextHeading: "#EFF1ED",
    colorTextBase: "#738290",
    colorBgBase: "#28282d",
  },
  components: {
    Typography: {
      fontFamily: nunito.style.fontFamily,
    },
    Card: {
      lineWidth: 0,
    },
    Input: {
      colorText: "#EFF1ED",
      colorTextPlaceholder: "#B0B3BA",
      colorBgContainer: "#3A3A42",
      activeShadow: "none",
      lineWidth: 1,
      lineWidthFocus: 2,
      colorIcon: "#F06543",
    },
    Carousel: {
      colorBgContainer: "#EFF1ED",
      arrowSize: 30,
      arrowOffset: 20,
      dotGap: 5,
      dotWidth: 26,
      dotheight:4
    }
  },
};
