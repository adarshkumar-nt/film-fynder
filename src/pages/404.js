import { Flex, Typography, Button, Empty, Space } from "antd";
import Link from "next/link";
import { WarningOutlined } from "@ant-design/icons";
import { roboto } from "@/utils/fonts.mjs";

const { Title, Text } = Typography;

export default function Custom404() {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: "70vh",
        width: "100%",
        textAlign: "center",
        paddingInline: "24px",
      }}
    >
      <Empty
        image={<WarningOutlined style={{ fontSize: 64, color: "#F06543" }} />}
        styles={{
          image: {
            marginBottom: 0,
            height: "auto",
            minHeight: 0,
          },
        }}
        description={
          <Space direction="vertical" align="center" size={0}>
            <Title
              level={2}
              className={roboto.className}
              style={{ margin: 0, color: "#EFF1ED" }}
            >
              Page Not Found
            </Title>

            <Text style={{ color: "#bdbdbd", marginTop: 8 }}>
              The page you were looking for doesn't exist or has been moved.
            </Text>
          </Space>
        }
      />

      <Link href="/" style={{ marginTop: 24 }}>
        <Button
          size="large"
          style={{
            fontWeight: 600,
          }}
        >
          Go Back Home
        </Button>
      </Link>
    </Flex>
  );
}
