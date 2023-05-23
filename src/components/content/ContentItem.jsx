/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

export default function ContentItem({ id, image, title, description, price }) {
  const basket = useSelector((state) => state);
  const dispatch = useDispatch();
  const addToBasket = (id, title, description, price, image) => {
    const checkBasket = basket?.find((q) => q.id === id);
    if (!checkBasket) {
      dispatch({
        type: "ADD_BASKET",
        payload: { id, title, description, price, image },
      });
    } else {
      dispatch({
        type: "REMOVE_BASKET",
        payload: id,
      });
    }
  };
  const checkBasket = basket.find((q) => q.id === id);
  return (
    <Card sx={{ width: "100%", height: "100%", padding: "5%" }}>
      <CardMedia
        component="img"
        height={180}
        width="100%"
        image={image}
        title={title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h6" component="p" noWrap>
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          noWrap
          sx={{ marginTop: 2 }}
        >
          {price}$
        </Typography>
        <Button
          onClick={() => addToBasket(id, title, description, price, image)}
          variant={checkBasket ? "contained" : "outlined"}
          sx={{ marginTop: 2 }}
        >
          {checkBasket ? "Remove from Basket" : "Add to Basket"}
        </Button>
      </CardContent>
    </Card>
  );
}
