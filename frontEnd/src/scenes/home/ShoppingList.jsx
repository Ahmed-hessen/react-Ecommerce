import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/useSlice";
import Item from "../../components/Item";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getItems() {
      const items = await fetch(
        "https://react-ecommerce-mxg4.onrender.com/api/items?populate=image",
        {
          method: "GET",
        }
      );
      const itemsJson = await items.json();
      dispatch(setItems(itemsJson.data));
    }
    getItems();
  }, [dispatch]);

  const topRateditems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        OUR FEATURED <strong>PRODUCTS</strong>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : " none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="TOP RATED" value="topRated" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
      </Tabs>
      <Box
        margin=" 0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill,250px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRateditems.map((item) => (
            <Item width="" item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
