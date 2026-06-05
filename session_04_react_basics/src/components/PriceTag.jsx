// 📄 File: src/components/PriceTag.jsx

function PriceTag({ originalPrice, salePrice }) {
    return (
        <div style={{ background: "#fff", padding: "10px", border: "1px dashed #ccc", display: "inline-block" }}>
            <span style={{ textDecoration: "line-through", color: "#95a5a6", marginRight: "10px", fontSize: "14px" }}>
                {originalPrice.toLocaleString()}đ
            </span>
            <span style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "18px" }}>
                {salePrice.toLocaleString()}đ
            </span>
        </div>
    );
}

export default PriceTag;