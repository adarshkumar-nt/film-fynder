import { Flex, Menu, Typography } from 'antd'
import { useRouter } from 'next/router';
import React from 'react'

const boxStyle = {
  width: '100%',
};

const {Title} = Typography
export default function Navbar() {
  const router = useRouter()
  const items = [
    {
      key: "1",
      icon: "",
      label: "Bookmarks"
    },
    {
      key: "2",
      icon: "",
      label: "Movies"
    },
    {
      key: "3",
      icon: "",
      label: "TV"
    }
  ]

  const onClick = (e) => {
    console.log(items[e.key].label);
    router.push("/")
    
  }

  return (
    <Flex style={boxStyle} justify='space-between' align='center'> 
      <Title level={3} style={{color: "white"}}>
        FilmFynder
      </Title>
      <Menu onClick={onClick} items={items} mode='horizontal' theme='dark'/>
    </Flex>
  )
}

