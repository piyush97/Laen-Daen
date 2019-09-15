import React from "react";
import {
  Layout,
  Menu,
  Row,
  Typography,
  Select,
  Input,
  Upload,
  Icon,
  message,
  Button,
  Col
} from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class App extends React.Component {
  state = {
    loading: false
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`
    });
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Layout className="layout" style={{ backgroundColor: "lightgreen" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Laen Daen Home</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{ background: "#f9f9f9", padding: 24, minHeight: "90vh" }}
          >
            <Row>
              <center>
                {" "}
                <Title>Laen Daen</Title>
              </center>
              <Row style={{ width: "100%" }}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  {" "}
                  <Input placeholder="Name" />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  {" "}
                  <Input placeholder="Address" />
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select the Food Delivery App"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Zomato">Zomato</Option>
                    <Option value="Swiggy">Swiggy</Option>
                    <Option value="Uber Eats">Uber Eats</Option>
                    <Option value="Local Vendor">Local Vendor</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Input placeholder="₹200" type="number" pattern="[0-9\/]*" />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}></Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Upload
                    style={{ width: "100%" }}
                    name="Bill Upload"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Bill"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Number of Containers"
                  ></Select>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Button style={{ width: "100%" }} type="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Row>
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
}

export default App;
