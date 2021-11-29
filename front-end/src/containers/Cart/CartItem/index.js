import React, { useState } from "react";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.soLuong);

  const { _id,maSach, tenSach, giaGoc,giamGia, hinhAnh,tongTien, soLuongConLai } = props.cartItem;

  const onQuantityIncrement = () => {
    if(qty+1> soLuongConLai)
    return
    var a = soLuongConLai
    setQty(qty + 1);
    props.onQuantityInc(maSach, qty + 1);
  };
  const onRemoveCartItem = () => {
    props.onRemoveCartItem(maSach);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(maSach, qty - 1);
  };
  const Format = (x) => {
    return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={hinhAnh} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{tenSach}</p>
            <p>Giá gốc: {Format(giaGoc)} (-{giamGia}%) </p>
            <p>Giá sau khi giảm: {Format(giaGoc)}  </p>
          </div>
          <div>{Format(tongTien)}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
          <h4 style={{ margin: '10px',fontSize: '.875rem', color: '#757575'}}> {soLuongConLai} sản phẩm có sẵn </h4>
        </div>
       
        <button
          className="cartActionBtn"
          onClick={() => onRemoveCartItem()}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
