import { Flex, Typography, Button,Result } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Custom404() {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link href={"/"}><Button>Back Home</Button></Link>}
  />
  );
}