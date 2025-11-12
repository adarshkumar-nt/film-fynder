import { Spin } from 'antd'
import React from 'react'

export default function Spinner() {
  return (
    <Spin tip="loading" fullscreen size="large">
        <div
          style={{
            padding: 50,
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: 4,
          }}
        ></div>
      </Spin>
  )
}
