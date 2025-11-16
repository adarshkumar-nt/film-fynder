"use client";
import { Result } from "antd";
import Link from "next/link";
import styles from "./error.module.css";

export default function ErrorComp({ message = "Something went wrong", error }) {
  return (
    <Result
      status="error"
      title={message}
      subTitle={error}
      extra={
        <Link href="/" className={styles.homeLink}>
          Go back to homepage
        </Link>
      }
    />
  );
}
