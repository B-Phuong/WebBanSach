import React from "react";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/
 const Format = (x) => {
  return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
 }
const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Chi tiết giá"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Giá ({props.totalItem} món)</div>
          <div>{Format(props.totalPrice)}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Phí giao hàng</div>
          <div>{props.totalItem>0?"20.000 VND":"0 VND" }</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Tổng tiền</div>
          <div>{Format(props.totalPrice > 0 ? props.totalPrice + 20000 : 0)}</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
