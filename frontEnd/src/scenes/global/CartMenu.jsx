import React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state/useSlice";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    //overLay of whole page
    <Box
      display={isCartOpen ? "block" : "none"}
      bgcolor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={1000}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px , 30%)"
        height="100%"
        bgcolor={mode === "light" ? "white" : "black"}
      >
        {" "}
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER  */}
          <FlexBox marginBottom="15px">
            <Typography variant="h4">SHOPPING CART ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />{" "}
            </IconButton>
          </FlexBox>
          {/* CART LIST  */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name} - ${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%" gap="30px">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={`${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Box>
                  <Box>
                    {/* Item name  */}
                    <FlexBox m="5px 10px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography m=" 0 10px">
                      {item.attributes.shortDescription}
                    </Typography>
                    {/* Amount  */}
                    <FlexBox m="15px">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          {" "}
                          <RemoveIcon />
                        </IconButton>{" "}
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          {" "}
                          <AddIcon />
                        </IconButton>{" "}
                      </Box>
                      {/* Price  */}
                      <Typography fontWeight="bold">
                        $ {item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
          {/* Actions  */}
          <Box m="20px 0">
            <FlexBox m="20px 0 ">
              <Typography fontWeight="bold"> SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice} </Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                margin: "20px 0 ",
                letterSpacing: "2px",
                color: "gray",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
