import { Spin } from "antd";
import React from "react";
import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <Spin tip="loading" fullscreen size="large">
      <div className={styles.overlayBox}></div>
    </Spin>
  );
}
