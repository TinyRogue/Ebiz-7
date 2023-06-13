import {FC} from "react";
import {Button, Divider, Typography} from "@mui/material";
import {Category} from "../../../model/category";

interface Props {
    name?: string;
    description?: string;
    category?: Category;
    price?: number;
    id: number;
    onAddToCart: (productId: number) => void;
}

export const Product: FC<Props> = ({ name, id, price, description, category, onAddToCart }) => {
    return <div className="Product">
        <Typography variant="h4">{name}</Typography>
        <Divider sx={{ marginBottom: 1, marginTop: 1 }}/>
        <Typography variant="body1"><strong>Description: </strong>{description}</Typography>
        <Typography variant="body2"><strong>Category: </strong>{category?.name}</Typography>
        <Typography variant="body2"><strong>Price: </strong>{price}</Typography>
        <Divider sx={{ marginBottom: 2, marginTop: 1 }}/>
        <Button variant="outlined" onClick={() => onAddToCart(id)}>Add to cart</Button>
    </div>
}

export default Product