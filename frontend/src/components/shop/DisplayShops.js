import React from "react";
import { Grid, Select, TextField, Typography } from "@material-ui/core";
import Shop from "./Shop";
import SearchIcon from "@material-ui/icons/Search";

class DisplayShops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingShop: false,
      shops: [],
      tags: [],
      selectedTag: "",
      searchValue: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.setShopAndShopTags = this.setShopAndShopTags.bind(this);
    this.displayShops = this.displayShops.bind(this);
    this.displaySearchBar = this.displaySearchBar.bind(this);
  }

  componentDidMount() {
    if (this.props.shops) {
      this.setShopAndShopTags();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shops !== this.props.shops) {
      this.setShopAndShopTags();
    }
  }

  setShopAndShopTags() {
    var tagsList = new Set();
    this.props.shops.forEach((shop) => {
      shop.tags.forEach((tag) => {
        tagsList.add(tag);
      });
    });
    this.setState({ shops: this.props.shops, tags: Array.from(tagsList) });
  }

  handleChange(event) {
    this.setState({ selectedTag: "", searchValue: event.target.value });
    if (event.target.value === "") {
      this.setState({ shops: this.props.shops });
    } else {
      const searchedValue = event.target.value.toLowerCase();
      const filteredData = this.props.shops.filter((shop) =>
        shop.name.toLowerCase().includes(searchedValue)
      );
      this.setState({ shops: filteredData });
    }
  }

  handleSelectChange(event) {
    this.setState({ selectedTag: event.target.value, searchValue: "" });
    if (event.target.value === "") {
      this.setState({ shops: this.props.shops });
    } else {
      const filteredData = this.props.shops.filter((shop) =>
        shop.tags.includes(event.target.value)
      );
      this.setState({ shops: filteredData });
    }
  }

  displayShops() {
    return (
      <div
        style={{
          width: "99vw",
          height: this.props.canEdit ? "70vh" : "77vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid container justify="center" spacing={3}>
          {this.state.shops &&
            this.state.shops.map((shop) => (
              <Grid item key={shop.shopID}>
                <Shop canEdit={this.props.canEdit} canOpen={true} shop={shop} />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

  displaySearchBar() {
    return (
      <div style={{ paddingTop: "10px", paddingBottom: "40px" }}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField
              value={this.state.searchValue}
              label="Search"
              onChange={(event) => {
                this.handleChange(event);
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              style={{ paddingLeft: "20px", paddingBottom: "5px" }}
            >
              Filter Tags:
            </Typography>
          </Grid>
          <Grid item>
            <Select
              value={this.state.selectedTag}
              native
              onChange={(event) => {
                this.handleSelectChange(event);
              }}
            >
              <option aria-label="Filter Shops" value="" />
              {this.state.tags &&
                this.state.tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
            </Select>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ paddingTop: "20px", fontFamily: "cursive" }}
            >
              {this.props.title}
            </Typography>
          </Grid>

          <Grid item>{this.displaySearchBar()}</Grid>

          <Grid item>{this.displayShops()}</Grid>
        </Grid>
      </div>
    );
  }
}

export default DisplayShops;
