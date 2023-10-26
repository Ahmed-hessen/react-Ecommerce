import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { addToCart } from "../state/useSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { info },
  } = useTheme();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;
  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {" "}
        <img
          alt={item.name}
          width="250px"
          height="350px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : " none"}
          position="absolute"
          bottom="10%"
          width="100%"
          padding="0 5%"
        >
          {" "}
          <Box display="flex" justifyContent="space-between">
            {/* AMOUNT  */}
            <Box
              display="flex"
              alignItems="center"
              bgcolor={shades.neutral[100]}
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                {" "}
                <RemoveIcon />
              </IconButton>{" "}
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                {" "}
                <AddIcon />
              </IconButton>{" "}
            </Box>
            {/* {Button} */}
            <Button
              onClick={() => {
                // add count to know how many piece added
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt=".5px">
        <Typography variant="subtitle2" color={info.dark}>
          {category
            .replace(/([A-Z])/g, "$1")
            .replace(/^./, (string) => string.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}$ </Typography>
      </Box>
    </Box>
  );
};

export default Item;
