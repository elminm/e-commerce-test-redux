import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

function Basket() {
  const basket = useSelector((state) => state);
  const dispatch = useDispatch();
  const total = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {basket?.map(({ id, title, price, image }) => (
          <>
            <Card sx={{ padding: "1% 2%", width: "200px" }}>
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
                <Typography variant="h5" color="text.primary" noWrap>
                  {price}$
                </Typography>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch({ type: "REMOVE_BASKET", payload: id })
                  }
                  sx={{
                    mt: 2,
                    padding: "10px 20px",
                    borderRadius: "4px",
                    boxShadow: "none",
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </>
        ))}
      </div>
      <h1>
        {total > 0 ? (
          <>
            Total: <span>{total.toFixed(2)}$</span>
          </>
        ) : (
          <p>Basket Is Empty</p>
        )}
      </h1>
    </>
  );
}

export default Basket;
