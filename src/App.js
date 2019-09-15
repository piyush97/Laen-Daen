import React from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Laen Daen Home</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: "90vh" }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made with{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>{" "}
        by Team Whatever
      </Footer>
    </Layout>
  );
}

export default App;
