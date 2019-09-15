import React from "react";
import {
  Layout,
  Menu,
  Row,
  notification,
  Typography,
  Select,
  Input,
  Modal,
  Upload,
  Icon,
  message,
  Button,
  Col,
  Card
} from "antd";
const { Meta } = Card;

const { Header, Content } = Layout;
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

const key = "updatable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ModalText: "",
      visible: false,
      confirmLoading: false,
      billAmount: 0,
      billDiscount: 0,
      page: 0,
      name: "",
      working: false
    };
    this.billAmountCalc = this.billAmountCalc.bind(this);
    this.discountCalc = this.discountCalc.bind(this);
    this.shoppingStoreChalay = this.shoppingStoreChalay.bind(this);
    this.vapisChalay = this.vapisChalay.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.working = this.working.bind(this);
  }
  openNotification = () => {
    // notification.open({
    //   key,
    //   message: "Notification Title",
    //   description: "description."
    // });
    setTimeout(() => {
      notification.open({
        key,
        message: "Check Out the Shopping Store",
        description: <Button onClick={this.shoppingStoreChalay}>Open Up</Button>
      });
    }, 1000);
  };
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  discountCalc() {
    var discountAmount = (this.state.billAmount / 100) * 100;
    this.setState({ billDiscount: discountAmount });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "Thank You for your contribution",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      this.openNotification();
    }, 2000);
  };
  working() {
    this.setState({ page: 2 });
  }
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };
  shoppingStoreChalay() {
    this.setState({ page: 1 });
  }
  vapisChalay() {
    this.setState({ page: 0 });
  }
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
  billAmountCalc(event) {
    this.setState({ billAmount: event.target.value });
    this.discountCalc();
  }
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
    const { visible, confirmLoading, ModalText } = this.state;
    if (this.state.page === 0)
      return (
        <Layout
          className="layout"
          style={{ backgroundColor: "lightGreen", minHeight: "100%" }}
        >
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">Laen Daen Home</Menu.Item>
              <Menu.Item key="2" onClick={this.shoppingStoreChalay}>
                Shopping Store
              </Menu.Item>
              <Menu.Item key="3" onClick={this.working}>
                How Laen Daen Works
              </Menu.Item>
            </Menu>
          </Header>
          <center style={{ padding: "1%" }}>
            {" "}
            <Title>Laen Daen</Title>
            <p>
              A barter system app for recycling plastic food containers for Food
              Coupons
            </p>
          </center>
          <Content style={{ padding: "2% 10% 30% 10%" }}>
            <div
              style={{ background: "#f9f9f9", padding: 24, minHeight: "100%" }}
            >
              <Row>
                <Row style={{ width: "100%" }}>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    {" "}
                    <Input placeholder="Name" onChange={this.onNameChange} />
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
                    <Input
                      placeholder="₹200"
                      type="number"
                      pattern="[0-9\/]*"
                      onChange={this.billAmountCalc}
                    />
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
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                      <Option value="5+">5+</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      onClick={this.showModal}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Modal
                  title={<h3>{this.state.name}'s order details</h3>}
                  visible={visible}
                  onOk={this.handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                >
                  <p>Your food order was of ₹ {this.state.billAmount}</p>
                  <p>You get a Coupon of ₹ {this.state.billDiscount}</p>
                  <center>
                    <h2>You contribute to</h2>
                  </center>
                  <img
                    src="https://i.ibb.co/BKGsVCX/new.jpg"
                    alt="reward"
                    width="100%"
                  ></img>
                  <p>{ModalText}</p>
                </Modal>
              </Row>
            </div>
          </Content>
        </Layout>
      );
    else if (this.state.page === 1)
      return (
        <Layout
          className="layout"
          style={{ backgroundColor: "lightgreen", minHeight: "100%" }}
        >
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1" onClick={this.vapisChalay}>
                Laen Daen Home
              </Menu.Item>
              <Menu.Item key="2" onClick={this.shoppingStoreChalay}>
                Shopping Store
              </Menu.Item>
              <Menu.Item key="3" onClick={this.working}>
                How Laen Daen Works
              </Menu.Item>
            </Menu>
          </Header>
          <center>
            <Title style={{ padding: "1%" }}>Laen Daen Shopping Store</Title>
          </center>
          <Content style={{ padding: "2% 10% 30% 10%" }}>
            <div
              style={{ background: "#f9f9f9", padding: 24, minHeight: "100%" }}
            >
              <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="shirt"
                        src="https://www.recycleandrecoverplastics.org/wp-content/uploads/2014/12/bottles-into-shirt.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Shirt"
                      description={
                        <p>
                          Shirt made from plastic containers for <b>₹149</b>
                        </p>
                      }
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://www.recycleandrecoverplastics.org/wp-content/uploads/2014/12/bottle-cap-into-rake.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Brooms made from Bottle Caps"
                      description={
                        <p>
                          Brooms made from Bottle Caps for <b>₹99</b>
                        </p>
                      }
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://www.recycleandrecoverplastics.org/wp-content/uploads/2014/12/bag-into-bench.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Portable Benches"
                      description={
                        <p>
                          Made from the plastic bags for<b> ₹349</b>
                        </p>
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      );
    else if (this.state.page === 2)
      return (
        <Layout
          className="layout"
          style={{ backgroundColor: "lightgreen", minHeight: "100%" }}
        >
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1" onClick={this.vapisChalay}>
                Laen Daen Home
              </Menu.Item>
              <Menu.Item key="2" onClick={this.shoppingStoreChalay}>
                Shopping Store
              </Menu.Item>
              <Menu.Item key="3" onClick={this.working}>
                How Laen Daen Works
              </Menu.Item>
            </Menu>
          </Header>
          <center>
            <Title style={{ padding: "1%" }}>How it Works?</Title>
          </center>
          <Content style={{ padding: "2% 10% 30% 10%" }}>
            <div
              style={{ background: "#f9f9f9", padding: 24, minHeight: "100%" }}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <center>
                    <Title level={4}>
                      A digital platform for Sustainable business, earth and
                      happy consumers.
                    </Title>
                  </center>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      );
  }
}

export default App;
