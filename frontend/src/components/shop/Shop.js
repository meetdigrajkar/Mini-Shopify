import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  CardActionArea,
  Typography,
  Divider,
  CardMedia,
  CardContent,
  Zoom,
  Snackbar,
} from "@material-ui/core";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DisplayShopTags from "./DisplayShopTags";
import ShopService from "../../services/ShopService";
import EditShop from "./EditShop";
import { Alert } from "@material-ui/lab";
import { withRouter } from "react-router-dom";
import { EMPTY_SHOP_IMG_URL } from "../../constants/constants";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
      anchorEl: null,
      openDialog: false,
      openSnackBar: false,
      currentShop: null,
      openEditShop: false,
    };

    this.deleteShop = this.deleteShop.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.closeEditShop = this.closeEditShop.bind(this);
    this.openShop = this.openShop.bind(this);
    this.openEditShop = this.openEditShop.bind(this);
    this.getShopImg = this.getShopImg.bind(this);
  }

  openShop(shop) {
    if (this.props.canOpen) {
      this.props.history.push("/shop/" + shop.shopID);
    }
  }

  openEditShop(shop) {
    this.setState({ currentShop: shop });
  }

  closeEditShop() {
    this.setState({ currentShop: null });
  }

  closeSnackBar() {
    this.setState({ openSnackBar: false });
  }

  async deleteShop() {
    if (this.state.currentShop) {
      await ShopService.deleteShop(this.state.currentShop.shopID);
      this.setState({ openDialog: false, openSnackBar: true });
    }
  }

  renderSnackBar() {
    return (
      <Snackbar
        open={this.state.openSnackBar}
        autoHideDuration={6000}
        onClose={this.closeSnackBar}
      >
        <Alert onClose={this.closeSnackBar} severity="success">
          Shop successfully deleted!
        </Alert>
      </Snackbar>
    );
  }

  getShopImg() {
    if (this.props.shop) {
      if (this.props.shop.picture === "") {
        return EMPTY_SHOP_IMG_URL;
      }
      return this.props.shop.picture;
    }
    return EMPTY_SHOP_IMG_URL;
  }

  render() {
    return (
      <div>
        {this.renderSnackBar()}
        {this.props.canEdit && this.state.currentShop && (
          <EditShop
            selectedShop={this.state.currentShop}
            onClose={() => this.closeEditShop()}
          />
        )}

        <Card
          style={{
            minWidth: "300px",
            maxWidth: "300px",
            minHeight: "300px",
            boxShadow:
              "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
            borderRadius: "16px",
          }}
        >
          <CardHeader
            avatar={<StorefrontIcon color="primary" />}
            title={this.props.shop && this.props.shop.name}
            action={
              this.props.canEdit ? (
                <Tooltip TransitionComponent={Zoom} title="Edit Shop">
                  <IconButton
                    onClick={() => this.openEditShop(this.props.shop)}
                  >
                    <MoreVertIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <MoreVertIcon htmlColor="white" />
              )
            }
          />
          <CardActionArea onClick={() => this.openShop(this.props.shop)}>
            <CardMedia
              style={{ height: 0, paddingTop: "56.25%" }}
              image={this.getShopImg()}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.shop && this.props.shop.description}
              </Typography>
              <Divider style={{ margin: "10px" }}></Divider>
              <DisplayShopTags tags={this.props.shop && this.props.shop.tags} />
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withRouter(Shop);
